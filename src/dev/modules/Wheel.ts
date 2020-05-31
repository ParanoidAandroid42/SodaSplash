namespace Dev.Modules {
    export enum WheelPartSort {
        Base,
        Red,
        Yellow,
        Purple,
        Green,
        Inner,
        Light,
    }

    export class Wheel extends PIXI.utils.EventEmitter {
        private _wheelContainer2d: Core.Modules.Container2d;
        private _wheelBackContainer2d: Core.Modules.Container2d;
        private _plane2d: Core.Modules.Plane2d;
        private _mask: Core.Modules.Graphic;

        private _frames: any = {
            frameBase: Core.Modules.Sprite2d,
            frame: Core.Modules.Sprite2d,
            redBase: Core.Modules.Sprite2d,
            redLine: Core.Modules.Sprite2d,
            yellowBase: Core.Modules.Sprite2d,
            yellowLine: Core.Modules.Sprite2d,
            purpleBase: Core.Modules.Sprite2d,
            purpleLine: Core.Modules.Sprite2d,
            greenBase: Core.Modules.Sprite2d,
            greenLine: Core.Modules.Sprite2d,
        };

        private _light: Core.Modules.Sprite2d;
        private _inner: Core.Modules.Sprite2d;
        private _indicator: Core.Modules.Sprite2d;
        private _nextIcon: Core.Modules.Sprite2d;
        private _indicatorIndex: number;
        private _wheelSpark: Core.Modules.SequenceAnimation;

        /**
         * Creates an instance of Wheel.
         * @param container - Parent container.
         */
        public constructor(container: Core.Modules.Container) {
            super();
            this._plane2d = new Core.Modules.Plane2d(0, 0, container, null, 'Plane');
            this._wheelBackContainer2d = new Core.Modules.Container2d(0, 0, this._plane2d, 'WheelContainer');
            this._wheelContainer2d = new Core.Modules.Container2d(0, 0, this._plane2d, 'WheelContainer');
            this.initProperties();
        }

        /**
         * Initializes the properties of the Wheel.
         */
        private initProperties() {
            const dR = Dev.Config.GameConfig.DisplayConfig;
            const aI = Config.AssetConfig;
            const aC = Config.AnimConfig;
            this._plane2d.position.set(225, 477);
            this._wheelBackContainer2d.position.set(-49, -20);
            this._wheelContainer2d.position.set(-61, -2);
            this._plane2d.scale.set(1.3);

            const wheelPart = Object.keys(WheelPartSort);
            for (var i = 0; i < wheelPart.length; i++) {
                this.setWheelPart(WheelPartSort[wheelPart[i]]);
            }

            const w = this._frames.frameBase.width;
            const h = this._frames.frameBase.height;
            this._mask = new Core.Modules.Graphic(440, 280, w, h, Config.AssetConfig.WheelMask, this._frames.frameBase);
            this._mask.alpha = 1;
            this._light.mask = this._mask;
            this._wheelSpark = new Core.Modules.SequenceAnimation(710, 500, aI.WheelSpark, this._plane2d.parent);
            this._wheelSpark.scale.set(-1, -1);
            this._wheelSpark.visible = false;
        }

        /**
         * Resets the properties of the Wheel.
         */
        public resetProperties() {
            this._frames.redBase.scale.set(1, 1);
            this._frames.yellowBase.scale.set(1, 1);
            this._frames.purpleBase.scale.set(1, 1);
            this._frames.greenBase.scale.set(1, 1);
            this._light.scale.set(1, 1);
            this._inner.scale.set(1, 1);
        }

        /**
         * Sets the specific part of the wheel.
         * @param part - Part of the wheel to set.
         */
        private setWheelPart(part: WheelPartSort) {
            const aI = Config.AssetConfig;
            switch (part) {
                case WheelPartSort.Base:
                    this._frames.frameBase = new Core.Modules.Sprite2d(596, 362, aI.WheelBase, this._wheelBackContainer2d);
                    this._frames.frame = new Core.Modules.Sprite2d(27, 7, aI.WheelFrame, this._frames.frameBase);
                    break;
                case WheelPartSort.Red:
                    this._frames.redBase = new Core.Modules.Sprite2d(666, 364, aI.WheelRedBase, this._wheelContainer2d);
                    this._frames.redLine = new Core.Modules.Sprite2d(0, 0, aI.WheelRedLine, this._frames.redBase);
                    break;
                case WheelPartSort.Yellow:
                    this._frames.yellowBase = new Core.Modules.Sprite2d(666, 364, aI.WheelYellowBase, this._wheelContainer2d);
                    this._frames.yellowLine = new Core.Modules.Sprite2d(0, 0, aI.WheelYellowLine, this._frames.yellowBase);
                    break;
                case WheelPartSort.Purple:
                    this._frames.purpleBase = new Core.Modules.Sprite2d(666, 364, aI.WheelPurpleBase, this._wheelContainer2d);
                    this._frames.purpleLine = new Core.Modules.Sprite2d(0, 0, aI.WheelPurpleLine, this._frames.purpleBase);
                    break;
                case WheelPartSort.Green:
                    this._frames.greenBase = new Core.Modules.Sprite2d(666, 364, aI.WheelGreenBase, this._wheelContainer2d);
                    this._frames.greenLine = new Core.Modules.Sprite2d(0, 0, aI.WheelGreenLine, this._frames.greenBase);
                    break;
                case WheelPartSort.Inner:
                    this._inner = new Core.Modules.Sprite2d(666, 364, aI.WheelInner, this._wheelContainer2d);
                    break;
                case WheelPartSort.Light:
                    this._light = new Core.Modules.Sprite2d(669, 364, aI.WheelLight, this._wheelContainer2d);
                    break;
            }
        }

        /**
         * Plays the circle animation for the specified wheel part.
         * @param partIndex - Index of the part to animate.
         * @param endIndex - End index of the animation.
         */
        public playWheelsCircleAnimation(partIndex: WheelPartSort, endIndex: number) {
            switch (partIndex) {
                case WheelPartSort.Red:
                    this.playWheelPartCircle(this._frames.redBase, 2.51, partIndex, endIndex);
                    break;
                case WheelPartSort.Yellow:
                    this.playWheelPartCircle(this._frames.yellowBase, 2.51, partIndex, endIndex);
                    break;
                case WheelPartSort.Purple:
                    this.playWheelPartCircle(this._frames.purpleBase, 2.51, partIndex, endIndex);
                    break;
                case WheelPartSort.Green:
                    this.playWheelPartCircle(this._frames.greenBase, 2.51, partIndex, endIndex);
                    break;
            }
        }

        /**
         * Plays the scale-up animation for the specified wheel part.
         * @param partIndex - Index of the part to animate.
         * @param endIndex - End index of the animation.
         */
        private playWheelsScaleUpAnimation(partIndex: WheelPartSort, endIndex: number) {
            var scale = 1;
            var part: Core.Modules.Sprite2d;

            switch (partIndex) {
                case WheelPartSort.Red:
                    part = this._frames.redBase;
                    scale = 1;
                    break;
                case WheelPartSort.Yellow:
                    part = this._frames.yellowBase;
                    scale = 1.25;
                    break;
                case WheelPartSort.Purple:
                    part = this._frames.purpleBase;
                    scale = 1.66;
                    break;
                case WheelPartSort.Green:
                    part = this._frames.greenBase;
                    scale = 2.5;
                    break;
            }

            this.playWheelScaleUp(part, scale, partIndex, endIndex);
        }

        /**
         * Plays the circle animation for a specific part.
         * @param part - Part of the wheel to animate.
         * @param rotation - Rotation value.
         * @param partIndex - Index of the part.
         * @param endIndex - End index of the animation.
         */
        private playWheelPartCircle(part: Core.Modules.Sprite2d, rotation: number, partIndex: number, endIndex: number) {
            TweenMax.to(part, 1.2, {
                rotation: part.rotation - rotation,
                ease: 'sine.out',
                onComplete: () => {
                    this._wheelSpark.visible = true;
                    this._wheelSpark.playAnimation(Enum.AnimNames.WheelSparkLoop);
                    TweenMax.to(part, 2, {
                        rotation: part.rotation + Math.PI * 4 + Math.PI * 0.125,
                        ease: 'power0',
                        onComplete: () => {
                            this._wheelSpark.playAnimation(Enum.AnimNames.WheelSparkOutre);
                            this._wheelSpark.onComplete = () => {
                                this._wheelSpark.visible = false;
                            };
                            TweenMax.to(part, 1.2, {
                                rotation: part.rotation + rotation,
                                yoyo: true,
                                ease: 'back.out(3)',
                                onComplete: () => {
                                    if (partIndex <= endIndex) {
                                        partIndex++;
                                        this.playWheelsScaleUpAnimation(partIndex, endIndex);
                                    } else {
                                        this.emit(Enum.Listeners.OnBonusGameAction, Enum.SlotAnimState.WheelTurnStopped, endIndex);
                                    }
                                },
                            });
                        },
                    });
                },
            });
        }

        /**
         * Plays the scale-up animation for a specific part.
         * @param part - Part of the wheel to animate.
         * @param scale - Scale value.
         * @param partIndex - Index of the part.
         * @param endIndex - End index of the animation.
         */
        private playWheelScaleUp(part: Core.Modules.Sprite2d, scale: number, partIndex: number, endIndex: number) {
            TweenMax.to(part.scale, 0.75, {
                x: scale,
                y: scale,
                delay: 1,
                ease: 'back.out(2)',
                onStart: () => {
                    const filter = new PIXI.filters.ColorMatrixFilter();
                    part.filters = [filter];
                    filter.saturate(1, false);
                },
                onComplete: () => {
                    Core.Managers.TickerManager.instance.addTimeout(
                        'wait',
                        1,
                        () => {
                            this.playWheelsCircleAnimation(partIndex, endIndex);
                        },
                        false,
                    );
                    part.filters = null;
                },
            });
        }

        /**
         * Gets the plane2d property.
         */
        public get plane2d() {
            return this._plane2d;
        }
    }
}
