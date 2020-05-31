namespace Dev.Stages {
    import GameController = Controller.GameController;

    /**
     * BonusStage handles the bonus game stage, including animations and events.
     */
    export class BonusStage extends Core.Modules.Stage {
        private _container: Core.Modules.Container;
        private _cocktailContainer: Core.Modules.Container;
        private _wheel: Modules.Wheel;
        private _cocktail: Core.Modules.Spine;
        private _liquid: Core.Modules.Spine;
        private _glassBg: Core.Modules.Sprite;
        private _cocktailLiquid: Array<Core.Modules.Spine> = [];
        private _cocktailLiquidMask: Array<Core.Modules.Graphic> = [];

        /**
         * Initializes the bonus stage.
         */
        public init() {
            this.game = GameController.Instance;
            const a = Core.Enum.Anchor;
            this._container = new Core.Modules.Container(0, 200, this, 'Container');
            this._cocktailContainer = new Core.Modules.Container(0, 0, this._container, 'cocktailContainer');
            this._cocktailContainer.scale.set(0.5, 0.5);
            this._wheel = new Modules.Wheel(this._container);
            this._glassBg = new Core.Modules.Sprite(1029, 161, Config.AssetConfig.Glass, this._cocktailContainer, a.MiddleLeft);
            this._liquid = new Core.Modules.Spine(
                -this._glassBg.width - 10,
                -this._glassBg.height / 2 - 25,
                Config.AssetConfig.Liquid,
                this._glassBg,
            );

            for (let i = 0; i < 4; i++) {
                const liquid = new Core.Modules.Spine(
                    -this._glassBg.width - 10,
                    -this._glassBg.height / 2 - 25,
                    Config.AssetConfig.Liquid,
                    this._glassBg,
                );
                this._cocktailLiquid.push(liquid);
                liquid.tint = 0x06ff6a;
                liquid.alpha = 0;
                const blur = new PIXI.filters.BlurFilter(10);
                const mask = new Core.Modules.Graphic(250, 310 + 45 * i, 500, 500, Config.AssetConfig.PopupRect, liquid);
                mask.alpha = 1;
                liquid.mask = mask;
                liquid.alpha = 0;
                if (i == 0) liquid.tint = 0x06ff6a;
                if (i == 1) liquid.tint = 0xb608ff;
                if (i == 2) liquid.tint = 0xffea00;
                if (i == 3) liquid.tint = 0xff1e1e;
            }

            this._cocktail = new Core.Modules.Spine(1029, 210, Config.AssetConfig.Cocktail, this._cocktailContainer);
        }

        /**
         * Starts the bonus screen animation.
         */
        public startBonusScreen() {
            this._cocktailContainer.visible = false;
            this._wheel.resetProperties();
            this.ChangeCocktail(Dev.Enum.AnimNames.CocktailStrawberry);
            this._cocktail.state.timeScale = 0;
            this._liquid.state.timeScale = 0;
            const aC = Dev.Config.AnimConfig.Animation;
            const duration = aC.duration.bgChangePosition;
            const ease = aC.ease.bgChangePosition;
            TweenMax.fromTo(this._container, duration, { alpha: 0 }, { ease: ease, alpha: 1 });
            TweenMax.fromTo(this._container, duration, { y: 200 }, { ease: ease, y: 0 });

            this._wheel.playWheelsCircleAnimation(1, 3);

            let xx = 1011;
            let xy = -1137;
            let yy = 1472;
            let yx = 1992;
            Core.Managers.TickerManager.instance.addTimeout(
                'bonusStart',
                0.01,
                () => {
                    yy -= 5;
                    yx += 5;
                    xx -= 10;
                    xy = +10;
                    if (yy <= 1148) {
                        Core.Managers.TickerManager.instance.removeTicker('bonusStart');
                        yy = 1148;
                    }
                    if (yx >= 2316) yx = 2316;
                    if (xx <= 363) xx = 363;
                    if (xy >= -489) xy = -489;

                    this._wheel.plane2d.setAxisY(new PIXI.Point(yx, yy), 1);
                    this._wheel.plane2d.setAxisX(new PIXI.Point(xx, xy), 1);
                },
                true,
            );
        }

        /**
         * Plays the cocktail animation based on the value.
         * @param value - The value determining which cocktail animation to play.
         */
        private playCocktailAnimation(value: number) {
            this._cocktailContainer.visible = true;
            TweenMax.fromTo(
                this._cocktailContainer,
                0.35,
                { x: 500, y: -300 },
                {
                    y: 150,
                    ease: 'back.out(0.5)',
                    onCompconste: () => {
                        switch (value) {
                            case 0:
                                this.ChangeCocktail(Dev.Enum.AnimNames.CocktailStrawberry);
                                break;
                            case 1:
                                this.ChangeCocktail(Dev.Enum.AnimNames.CocktailMix);
                                break;
                            case 2:
                                this.ChangeCocktail(Dev.Enum.AnimNames.CocktailPlum);
                                break;
                            case 3:
                                this.ChangeCocktail(Dev.Enum.AnimNames.CocktailGrape);
                                break;
                            case 4:
                                this.ChangeCocktail(Dev.Enum.AnimNames.CocktailMix);
                                break;
                        }
                    },
                },
            );
        }

        /**
         * Changes the cocktail animation.
         * @param cocktailName - The name of the cocktail animation.
         */
        private ChangeCocktail(cocktailName: Dev.Enum.AnimNames): void {
            switch (cocktailName) {
                case Dev.Enum.AnimNames.CocktailStrawberry:
                case Dev.Enum.AnimNames.CocktailLemon:
                case Dev.Enum.AnimNames.CocktailPlum:
                case Dev.Enum.AnimNames.CocktailGrape:
                    this._liquid.tint = this._cocktail.animConfig[cocktailName].tint;
                    this._cocktail.playAnimation(cocktailName);
                    this._liquid.playAnimation(Dev.Enum.AnimNames.Liquid);
                    break;
                case Dev.Enum.AnimNames.CocktailMix:
                    for (let index = this._cocktailLiquid.length - 1; index >= 0; index--) {
                        this._cocktailLiquid[index].playAnimation(Dev.Enum.AnimNames.Liquid);
                        Core.Managers.TickerManager.instance.addTimeout(
                            'count' + index,
                            0.8 + 0.4 * (this._cocktailLiquid.length - 1 - index),
                            () => {
                                this._liquid.tint = this._cocktailLiquid[index].tint;
                                this._cocktailLiquid[index].alpha = 1;
                                const colorMatrix = new PIXI.filters.GlowFilter(1, 1, 1, this._cocktailLiquid[index].tint);
                                this._cocktailLiquid[index].filters = [colorMatrix];
                                colorMatrix.blendMode = PIXI.BLEND_MODES.ADD;
                                if (index != 0) {
                                    this._cocktailLiquid[index].filters = null;
                                }
                            },
                            false,
                        );
                    }
                    this._liquid.playAnimation(Dev.Enum.AnimNames.Liquid);
                    this._cocktail.playAnimation(cocktailName);
                    break;
            }

            this._cocktail.state.onComplete = () => {
                const aC = Dev.Config.AnimConfig.Animation;
                const duration = aC.duration.bgChangePosition;
                const ease = aC.ease.bgChangePosition;
                this._cocktail.state.onComplete = null;
                TweenMax.fromTo(this._container, duration, { alpha: 1 }, { ease: ease, alpha: 0 });
                TweenMax.fromTo(this._container, duration, { y: 0 }, { ease: ease, y: 200 });
                this.emit(Enum.Listeners.OnGameAnimAction, Enum.GameAnimListener.BonusFinished);
            };
        }

        /**
         * Initializes display events.
         */
        initEvents(): void {
            this.initDisplayEvents();
            this.initWheelEvent();
        }

        /**
         * Initializes wheel events.
         */
        private initWheelEvent() {
            this._wheel.on(Enum.Listeners.OnBonusGameAction, (action: Enum.SlotAnimState, value: number) => {
                if (action == Enum.SlotAnimState.WheelTurnStopped) {
                    this.playCocktailAnimation(value);
                }
            });
        }

        /**
         * Sets the visual layout for portrait mode.
         */
        setVisualPortrait(): void {
            // Implementation for setting up portrait visuals
        }

        /**
         * Sets the visual layout for landscape mode.
         */
        setVisualLandscape(): void {
            // Implementation for setting up landscape visuals
        }

        /**
         * Cleans up resources and listeners when destroying the stage.
         */
        public dispose() {
            this._cocktail.destroy();
            this._liquid.destroy();
            this._wheel.off(Enum.Listeners.OnBonusGameAction);
            this.off(Enum.Listeners.OnBonusGameAction);
        }
    }
}
