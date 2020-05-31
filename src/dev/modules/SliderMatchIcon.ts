namespace Dev.Modules {
    /**
     * Class representing a slider match icon in the slot machine.
     * Extends the Core.Modules.Sprite class.
     */
    export class SliderMatchIcon extends Core.Modules.Sprite {
        private _container: Core.Modules.Container;
        private _machineInfo: Interface.ISlotConfig;
        private _symbolInfo: Interface.ISymbolConfig;
        private _symbolIndex: number;
        private _sEmitter: PIXI.particles.Emitter;
        private _particleContainer: Core.Modules.Container;

        /**
         * Constructor for the SliderMatchIcon class.
         * @param x - The x position of the slider match icon.
         * @param y - The y position of the slider match icon.
         * @param mI - The machine information configuration.
         * @param sI - The symbol index.
         * @param p - The parent container.
         */
        public constructor(x: number, y: number, mI: Interface.ISlotConfig, sI: number, p: Core.Modules.Container | any) {
            super(0, 0, mI.slotSymbols[sI].winSprite, p, mI.symbol.winSpriteScale.x, mI.symbol.winSpriteScale.y);
            this._container = new Core.Modules.Container(x, y, p, 'MatchIcon');
            this._particleContainer = new Core.Modules.Container(0, 0, this._container, 'MatchIcon');
            const aI = Config.AssetConfig;
            this._machineInfo = mI;
            this._symbolInfo = mI.slotSymbols[sI];
            this._symbolIndex = sI;
            this._sEmitter = new PIXI.particles.Emitter(this._particleContainer, aI.ParticleSpark.frame, aI.FireSparkEmitter);
            this._container.addChild(this);
            this._sEmitter.maxParticles = 10;
            this._sEmitter.autoUpdate = true;
        }

        /**
         * Plays the win symbol animation for the slider match icon.
         * @param tP - The target position of the icon.
         * @param rM - The reel matrix position.
         */
        public playWinSymbolAnim(tP: { x: number; y: number }, rM: { r: number; c: number }) {
            const l = Enum.Listeners;
            const sA = Enum.SlotAnimState;
            const duration = this._machineInfo.duration.matchIconFallDown;
            const ease = this._machineInfo.ease.winSymbolMatch;
            const container = this._container;

            TweenMax.to(container, duration, {
                y: tP.y,
                onComplete: function () {
                    const speed = this._machineInfo.duration.matchIconLeftSide + this._machineInfo.duration.matchIconLeftSide * rM.c;
                    TweenMax.to(container, speed, {
                        x: tP.x,
                        ease: ease,
                        onComplete: function () {
                            this.emit(l.OnSpinMachineAction, sA.MatchIconFinished, this);
                            container.destroy();
                        }.bind(this),
                    });
                }.bind(this),
            });
        }

        /**
         * Gets the symbol information.
         */
        public get symbolInfo() {
            return this._symbolInfo;
        }
    }
}
