namespace Dev.Modules {

    const TILE_WIDTH: number = 50; // Defined as a constant to avoid magic numbers

    /**
     * Class representing a slider platform in the slot machine.
     * Extends the PIXI.utils.EventEmitter class.
     */
    export class SliderPlatform extends PIXI.utils.EventEmitter {

        private _container: Core.Modules.Container;
        private _leftSide: Core.Modules.Sprite;
        private _tilesContainer: Core.Modules.Container;
        private _tileCirclesContainer: Core.Modules.Container;
        private _tileLinesContainer: Core.Modules.Container;
        private _rightSide: Core.Modules.Sprite;
        private _machineInfo: Interface.ISlotConfig;
        private _containerFilter: Core.Modules.Graphic;
        private _sliderTween: any;

        private _width: number;

        /**
         * Creates an instance of SliderPlatform.
         * @param x - The x position of the platform.
         * @param y - The y position of the platform.
         * @param w - The width of the platform.
         * @param machineInfo - The slot machine configuration.
         * @param p - The parent container.
         */
        public constructor(x: number, y: number, w: number, machineInfo: Interface.ISlotConfig, p: Core.Modules.Container) {
            super();
            this._machineInfo = machineInfo;
            this._container = new Core.Modules.Container(x, y, p, "Platform");
            this._width = w;
            this.initProperties();
        }

        /**
         * Initializes the properties of the SliderPlatform.
         */
        private initProperties() {
            const aI = Config.AssetConfig;
            const r = Dev.Config.GameConfig.DisplayConfig;
            const a = Core.Enum.Anchor;

            this._tilesContainer = new Core.Modules.Container(0, 0, this._container, "TilesContainer");
            this._tileCirclesContainer = new Core.Modules.Container(0, 0, this._container, "TileCircleContainer");
            this._tileLinesContainer = new Core.Modules.Container(0, 0, this._container, "TileLinesContainer");

            this._leftSide = new Core.Modules.Sprite(-this._width / 2, 0, aI.PlatformSide, this._container, null, null, a.MiddleLeft);
            this._leftSide.scale.set(-1, 1);
            var tile: Core.Modules.Sprite;

            const tileCount = this._width / TILE_WIDTH;
            for (var i = 0; i < Math.floor(tileCount); i++) {
                tile = new Core.Modules.Sprite(this._leftSide.position.x + i * TILE_WIDTH, 0, aI.PlatformTile, this._tilesContainer, TILE_WIDTH, null, a.MiddleLeft);
                const tileLines = new Core.Modules.Sprite(tile.position.x, 0, aI.PlatformLine, this._tileLinesContainer, null, null, a.DownLeft);
                if (i % 4 === 0 && i / 4 > 0) {
                    const tileCircle = new Core.Modules.Sprite(tile.position.x - TILE_WIDTH, 0, aI.PlatformCircle, this._tileCirclesContainer);
                }
            }

            this._rightSide = new Core.Modules.Sprite(tile.position.x + TILE_WIDTH, 0, aI.PlatformSide, this._container, null, null, a.MiddleLeft);
            const tileLines = new Core.Modules.Sprite(tile.position.x + TILE_WIDTH, 0, aI.PlatformLine, this._tileLinesContainer, null, null, a.DownLeft);
            this._container.addChild(this._tileLinesContainer);
            this._containerFilter = new Core.Modules.Graphic(0, 0, this._container.width, this._container.height, aI.SliderFilterMask, this._container);
            this._containerFilter.alpha = 0;
            this.playSliderAnimation();
        }

        /**
         * Plays match icon animation.
         * @param sI - The symbol index.
         * @param sP - The symbol position.
         * @param rM - The reel matrix.
         */
        public playMatchIconAnimation(sI: number, sP: { x: number, y: number }, rM: { r: number, c: number }) {
            const slotSymbols = Config.SlotConfig.SliderMachine.slotSymbols;
            if (slotSymbols[sI].winSprite != null) {
                const r = Dev.Config.GameConfig.DisplayConfig;
                const sliderMatchIcon = new Modules.SliderMatchIcon(sP.x - r.width / 2, sP.y, this._machineInfo, sI, this._container);
                sliderMatchIcon.playWinSymbolAnim({ x: this._leftSide.position.x - 20, y: this._leftSide.position.y - this._leftSide.width }, rM);
                this.initEvent(sliderMatchIcon);
            }
        }

        /**
         * Plays the slider filter animation.
         * @param mIcon - The slider match icon.
         */
        private playSliderFilterAnimation(mIcon: SliderMatchIcon) {
            const duration = this._machineInfo.duration.barFill;
            const ease = this._machineInfo.ease.barFill;
            this._sliderTween = TweenMax.to(this._containerFilter, duration / 2, {
                alpha: .2,
                ease: ease,
                onStart: function () {
                    const tint = 0xf9fdff;
                    const colorMatrix = new PIXI.filters.GlowFilter(1, 1, 1, tint);
                    this._containerFilter.filters = [colorMatrix];
                    colorMatrix.blendMode = PIXI.BLEND_MODES.ADD;
                }.bind(this),
                onComplete: function () {
                    TweenMax.to(this._containerFilter, duration, {
                        alpha: 0,
                        ease: ease,
                        onComplete: function () {
                            this._containerFilter.filters = null;
                            this._containerFilter.tint = 0xf9fdff;
                        }.bind(this)
                    });
                }.bind(this)
            });
        }

        /**
         * Initializes the event for the slider match icon.
         * @param mIcon - The slider match icon.
         */
        private initEvent(mIcon: SliderMatchIcon) {
            const l = Enum.Listeners;
            const sA = Enum.SlotAnimState;
            mIcon.on(l.OnSpinMachineAction, function (sA: Enum.SlotAnimState, sI: number) {
                this.playSliderFilterAnimation(mIcon);
                this.emit(l.OnSpinMachineAction, sA, sI);
            }.bind(this));
        }

        /**
         * Plays the slider animation.
         */
        private playSliderAnimation() {
            const timeline = new TimelineMax({ repeat: -1 });
            const moveX = (this._tileLinesContainer.children.length + 1) * TILE_WIDTH / 2;
            const duration = this._machineInfo.duration.slider;
            const ease = this._machineInfo.ease.slider;

            timeline.to(this._tileLinesContainer.children, duration, {
                ease: ease,
                x: "-=" + TILE_WIDTH,
                modifiers: {
                    x: function (x: number) {
                        return x % moveX + TILE_WIDTH / 2 + 2;
                    }
                }
            });
        }
    }
}
