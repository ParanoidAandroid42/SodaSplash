namespace Dev.Stages {
    import GameController = Controller.GameController;

    /**
     * LoaderStage handles the loading screen, including logo and loading animations.
     */
    export class LoaderStage extends Core.Modules.Stage {
        private _container: Core.Modules.Container;
        private _bg: Core.Modules.Graphic;
        private _logo: Core.Modules.Sprite;
        private _loadingBorders: Core.Modules.Graphic[] = [];
        private _loadingFills: Core.Modules.Graphic[] = [];
        private _sequence: any;

        /**
         * Initializes the loading stage.
         */
        public init() {
            this.game = GameController.Instance;
            this._container = new Core.Modules.Container(0, 0, this, 'Container');
            this.playLogoAnimation();
        }

        /**
         * Plays the logo animation with loading indicators.
         */
        public playLogoAnimation() {
            const dR = Dev.Config.GameConfig.DisplayConfig;
            const aC = Config.AssetConfig;
            const aI = Config.AnimConfig.Animation;

            this._bg = new Core.Modules.Graphic(dR.width / 2, dR.height / 2, dR.width * 2, dR.height * 2, aC.LoadingBg, this._container);
            this._logo = new Core.Modules.Sprite(dR.width / 2, 300, aC.Logo, this._container);
            for (let i = 0; i < 3; i++) {
                this._loadingBorders.push(
                    new Core.Modules.Graphic(dR.width / 2 - 50 + i * 50, dR.height / 2 + 220, 35, 35, aC.LoadingCircleBg, this._container),
                );
                this._loadingFills.push(new Core.Modules.Graphic(17.5, 17.5, 35, 35, aC.LoadingCircleFill, this._loadingBorders[i]));
                this._loadingFills[i].alpha = 0;
            }

            TweenMax.fromTo(this._logo.scale, aI.duration.logoScale, { x: 0, y: 0 }, { x: 1, y: 1, ease: aI.ease.logoScale });
            TweenMax.fromTo(this._logo, aI.duration.logoAlpha, { alpha: 0 }, { alpha: 1, ease: aI.ease.logoAlpha });

            this._sequence = new TimelineMax({ repeat: -1, delay: 0.75 });
            const offset = aI.speed.boxFillsOffset;
            this._sequence.to(this._loadingFills[0], aI.duration.boxFillsAlpha, { alpha: 1, ease: aI.ease.boxFillsAlpha });
            this._sequence.to(this._loadingFills[0], aI.duration.boxFillsAlpha, { alpha: 0, ease: aI.ease.boxFillsAlpha });
            this._sequence.to(this._loadingFills[1], aI.duration.boxFillsAlpha, { alpha: 1, ease: aI.ease.boxFillsAlpha }, '-=' + offset);
            this._sequence.to(this._loadingFills[1], aI.duration.boxFillsAlpha, { alpha: 0, ease: aI.ease.boxFillsAlpha });
            this._sequence.to(this._loadingFills[2], aI.duration.boxFillsAlpha, { alpha: 1, ease: aI.ease.boxFillsAlpha }, '-=' + offset);
            this._sequence.to(this._loadingFills[2], aI.duration.boxFillsAlpha, { alpha: 0, ease: aI.ease.boxFillsAlpha });
        }

        /**
         * Initializes events for the loader stage.
         */
        initEvents(): void {
            // Implementation for event initialization
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
            this._sequence.kill();
        }
    }
}
