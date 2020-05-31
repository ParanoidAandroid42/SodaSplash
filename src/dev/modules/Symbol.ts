namespace Dev.Modules {

    export class Symbol extends Core.Modules.Container {

        private _matchAnim: Core.Modules.SequenceAnimation;
        private _fakeMatchAnim: Core.Modules.SequenceAnimation;
        private _symbolInfo: Interface.ISymbolConfig;
        private _machineInfo: Interface.ISlotConfig;
        private _symbolConfig: Interface.ISymbolConfig;
        private _index: number;
        private _reelMatrix: { r: number, c: number };
        private _spine: Core.Modules.Spine;

        /**
         * Creates an instance of Symbol.
         * @param machineInfo - Slot machine configuration.
         * @param symbolIndex - Symbol index.
         * @param parentContainer - Parent container.
         * @param reelMatrix - Reel matrix.
         */
        public constructor(machineInfo: Interface.ISlotConfig, symbolIndex: number, parentContainer: Core.Modules.Container, reelMatrix: { r: number, c: number }) {
            const offset = machineInfo.symbol.offset;
            const scale = machineInfo.symbol.scale;
            super(0, (scale.y + offset.y) * reelMatrix.r, parentContainer);
            this._spine = new Core.Modules.Spine(0, 0, machineInfo.slotSymbols[symbolIndex].spineConfig, parentContainer, scale.x, scale.y);
            this._index = symbolIndex;
            this._machineInfo = machineInfo;
            this._symbolInfo = machineInfo.slotSymbols[symbolIndex];
            this._reelMatrix = reelMatrix;
            this.initProperties();
        }

        /**
         * Initializes properties of the Symbol.
         */
        private initProperties() {
            const matchFrame = Config.AssetConfig.MatchFrame;
            this._matchAnim = new Core.Modules.SequenceAnimation(0, 0, matchFrame, this);
            this.addChild(this._spine);
            this._fakeMatchAnim = new Core.Modules.SequenceAnimation(0, 0, matchFrame, this);
            this._fakeMatchAnim.alpha = 0.2;
            this._matchAnim.alpha = 0.5;
        }

        /**
         * Plays match animation on the symbol.
         */
        public playMatchAnimation() {
            this._matchAnim.playAnimation(Enum.AnimNames.MatchFrame);
            this._fakeMatchAnim.playAnimation(Enum.AnimNames.MatchFrame);
            this._spine.playAnimation(Dev.Enum.AnimNames.SymbolMatch);
        }

        /**
         * Sets the symbol configuration.
         * @param config - Symbol configuration.
         */
        public set symbolConfig(config: Interface.ISymbolConfig) {
            this._symbolConfig = config;
            const width = this._spine.width;
            const height = this._spine.height;
            this._spine.destroy();
            const spine = new Core.Modules.Spine(0, 0, config.spineConfig, this, width, height);
            this._spine = spine;
            this._spine.playAnimation(Dev.Enum.AnimNames.SymbolIdle);
            this.addChild(this._fakeMatchAnim);
        }

        /**
         * Sets the symbol index.
         * @param index - Symbol index.
         */
        public set index(index: number) {
            this._index = index;
            this.symbolConfig = this._machineInfo.slotSymbols[this._index];
        }

        /**
         * Gets the spine instance.
         * @returns The spine instance.
         */
        public get spine() {
            return this._spine;
        }

        /**
         * Gets the symbol index.
         * @returns The symbol index.
         */
        public get index() {
            return this._index;
        }

        /**
         * Gets the reel matrix.
         * @returns The reel matrix.
         */
        public get reelMatrix() {
            return this._reelMatrix;
        }
    }
}
