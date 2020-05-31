module Dev.Animation {
    /**
     * TimerAnimation class manages a timer animation displayed within a specified container.
     * It includes methods to initialize, update, and animate the timer.
     */
    export class TimerAnimation extends PIXI.utils.EventEmitter {
        private _container: Core.Modules.Container;
        private _mask: Core.Modules.Graphic;
        private _timeText: PIXI.Text;
        private _time: any;

        /**
         * TimerAnimation constructor
         * @param parentContainer - Parent container
         */
        constructor(parentContainer: Core.Modules.Container) {
            super();
            this._container = new Core.Modules.Container(0, 0, parentContainer, 'TimerAnimation');
            parentContainer.addChild(this._container);
            this.init();
        }

        /**
         * Initializes the timer animation elements.
         */
        private init(): void {
            const aI = Dev.Config.AssetConfig;

            this._mask = new Core.Modules.Graphic(300, 1450, 500, 500, aI.TimerCircle, this._container);
            this._timeText = new Core.Modules.Text(0, 0, aI.TimerText, this._container);
            this._container.alpha = 0;
        }

        /**
         * Animates the mask with a scale and fade effect.
         */
        private maskAnimation(): void {
            this._mask.alpha = 0.85;
            TweenLite.fromTo(
                this._mask.scale,
                0.25,
                { x: 0, y: 0 },
                {
                    x: 1,
                    y: 1,
                    onComplete: () => {
                        TweenLite.to(this._mask, 0.25, { alpha: 0 });
                    },
                },
            );
        }

        /**
         * Sets the visual position of the timer for portrait orientation.
         */
        setVisualPortrait(): void {
            const dR = Dev.Config.GameConfig.DisplayConfig;
            this._container.position.set(dR.width / 2, dR.height / 2);
        }

        /**
         * Sets the visual position of the timer for landscape orientation.
         */
        setVisualLandscape(): void {
            const dR = Dev.Config.GameConfig.DisplayConfig;
            this._container.position.set(dR.width / 2, dR.height / 2);
        }

        /**
         * Resolves the timer visibility and updates the timer text.
         * @param isShow - Whether to show or hide the timer
         */
        public resolveTimer(isShow: boolean): void {
            if (isShow) {
                TweenLite.to(this._container, 0.25, { alpha: 0.8 });
                this.setTimeText(this.setTime);
            } else {
                TweenLite.to(this._container, 0.25, { alpha: 0 });
                this.setTimeText(this.setTime);
            }
        }

        /**
         * Animates the timer text scaling and updates the timer visibility.
         * @param value - The current timer value
         */
        private resolveTiming(value: any): void {
            TweenLite.fromTo(
                this._timeText.scale,
                0.25,
                { x: 1.5, y: 1.5 },
                {
                    x: 1,
                    y: 1,
                    onStart: () => {
                        TweenLite.to(this._timeText.scale, 0.25, { x: 1.5, y: 1.5 });
                        if (value == 0) {
                            this.resolveTimer(false);
                        } else {
                            this.resolveTimer(true);
                        }
                    },
                },
            );
        }

        /**
         * Updates the timer text and starts the mask animation.
         * @param value - The new timer value
         */
        public setTimeText(value: any): void {
            if (value != 0) {
                this.maskAnimation();
                this._timeText.text = value + '';
                this.setTime = value;
            } else {
                this._timeText.text = '';
                this.setTime = value;
            }
        }

        /**
         * Sets the current timer value and triggers the timing resolution.
         * @param value - The new timer value
         */
        public set setTime(value: any) {
            if (value != undefined) {
                if (this._time != value) {
                    this._time = value;
                    this.resolveTiming(value);
                }
            }
        }

        /**
         * Gets the current timer value.
         * @returns The current timer value
         */
        public get setTime(): any {
            return this._time;
        }

        /**
         * Gets the container for the timer animation.
         * @returns The container for the timer animation
         */
        public get container(): Core.Modules.Container {
            return this._container;
        }
    }
}
