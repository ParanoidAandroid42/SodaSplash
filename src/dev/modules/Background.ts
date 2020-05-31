namespace Dev.Modules {
    // Constants for Bubble Paths
    const BUBBLE_PATHS = [
        {
            repeatDelay: 8,
            duration: 20,
            path: [
                { x: 1207, y: 816 },
                { x: 1000, y: 534 },
                { x: 1180, y: 124 },
                { x: 1049, y: -100 },
            ],
        },
        {
            repeatDelay: 10,
            duration: 15,
            path: [
                { x: 800, y: 816 },
                { x: 620, y: 534 },
                { x: 890, y: 124 },
                { x: 620, y: -100 },
            ],
        },
        {
            repeatDelay: 12,
            duration: 12,
            path: [
                { x: 350, y: 816 },
                { x: 480, y: 534 },
                { x: 320, y: 124 },
                { x: 438, y: -100 },
            ],
        },
        {
            repeatDelay: 5,
            duration: 3,
            path: [
                { x: 1107, y: 816 },
                { x: 1250, y: 534 },
                { x: 1100, y: 124 },
                { x: 1189, y: -300 },
            ],
        },
    ];

    /**
     * Background class for managing background animations and sprites.
     */
    export class Background extends PIXI.utils.EventEmitter {
        private _container: Core.Modules.Container;
        private _planeBackground2d: Core.Modules.Plane2d;
        private _floatContainer: Core.Modules.Container;
        private _bgContainer2d: Core.Modules.Container2d;
        private _bgCurrent: Core.Modules.Sprite;
        private _bgCurrentDark: Core.Modules.Sprite;
        private _bgNext: Core.Modules.Sprite;
        private _bgNextClone: Core.Modules.Sprite;
        private _currentSpinMode: Enum.SpinMode;
        private _idleBackground: any;

        private _floats: Core.Modules.Sprite[] = [];
        private _bubbles: Core.Modules.Sprite[] = [];

        /**
         * Constructor for the Background class.
         * @param container - Parent container for the background.
         */
        public constructor(container: Core.Modules.Container) {
            super();
            const r = Dev.Config.GameConfig.DisplayConfig;
            const aC = { yP: new PIXI.Point(0, 250), yFactor: -1 };
            this._planeBackground2d = new Core.Modules.Plane2d(0, -r.height / 2, container, aC, 'PlaneBackground');
            this._container = new Core.Modules.Container(0, 0, container, 'BackgroundContainer');
            this.initProperties();
        }

        /**
         * Initialize background properties and sprites.
         */
        private initProperties() {
            const r = Dev.Config.GameConfig.DisplayConfig;
            const aI = Config.AssetConfig;
            const a = Core.Enum.Anchor;

            this._floatContainer = new Core.Modules.Container(0, 0, this._container, 'FloatContainer');
            this._bgContainer2d = new Core.Modules.Container2d(-r.width / 2, -r.height / 2, this._planeBackground2d, 'BgContainer2d');

            this._bgNext = new Core.Modules.Sprite(r.width / 2, r.height / 2 + 200, aI.FreeSpinSpinBg, this._container);
            this._bgNextClone = new Core.Modules.Sprite(r.width / 2, r.height / 2 + 200, aI.FreeSpinSpinDarkBg, this._container);
            this._bgCurrent = new Core.Modules.Sprite(r.width / 2, r.height / 2 + 200, aI.NormalSpinBg, this._container);
            this._bgCurrentDark = new Core.Modules.Sprite(r.width / 2, r.height / 2 + 200, aI.NormalSpinDarkBg, this._container);

            this.addFloatSprites(aI);
            this.addBubbleSprites(aI);

            this._currentSpinMode = Enum.SpinMode.NormalSpin;

            this.playBackgroundPositionAnimation(r.width / 2, r.height / 2);
            this.playIdleBubbles();
            this.playIdleBackground();
        }

        /**
         * Add float sprites to the float container.
         * @param aI - Asset config.
         */
        private addFloatSprites(aI: any) {
            const floatPositions = [
                { x: 966, y: 314.5 },
                { x: 302, y: 554 },
                { x: 902, y: 150 },
                { x: 722, y: 530 },
                { x: 1100, y: 630 },
                { x: 252, y: 358 },
            ];

            for (let i = 0; i < floatPositions.length; i++) {
                const float = new Core.Modules.Sprite(
                    floatPositions[i].x,
                    floatPositions[i].y,
                    aI.Floats[i],
                    this._floatContainer,
                    null,
                    null,
                );
                this._floats.push(float);
            }
        }

        /**
         * Add bubble sprites to the container.
         * @param aI - Asset config.
         */
        private addBubbleSprites(aI: any) {
            const bubblePositions = [
                { x: 1136, y: 816 },
                { x: 844, y: 816 },
                { x: 994, y: 816 },
                { x: 1136, y: 816 },
            ];

            for (let i = 0; i < bubblePositions.length; i++) {
                const bubble = new Core.Modules.Sprite(
                    bubblePositions[i].x,
                    bubblePositions[i].y,
                    aI.Bubbles[i],
                    this._container,
                    null,
                    null,
                );
                this._bubbles.push(bubble);
            }
        }

        /**
         * Change the background type based on spin mode.
         * @param type - Spin mode type.
         */
        public changeBackgroundType(type: Enum.SpinMode) {
            this.changeBackgroundSpriteType(this._currentSpinMode, this._bgNext, this._bgNextClone, this._bgCurrentDark.alpha, 0);
            this.changeBackgroundSpriteType(type, this._bgCurrent, this._bgCurrentDark, 0, 1);
        }

        /**
         * Play background buzz animation.
         */
        public playBackgroundBuzzAnimation() {
            const r = Dev.Config.GameConfig.DisplayConfig;
            const aC = Dev.Config.AnimConfig.Animation;
            const duration = aC.duration.bgBuzzFallDown;
            const ease = aC.ease.bgBuzzFallDown;
            const count = aC.count.bgBuzzFallDown;
            const y = r.height / 2 + count;
            if (this._idleBackground) this._idleBackground.pause();
            TweenMax.to(this._bgCurrent, duration, { y: y, ease: ease, yoyo: true, repeat: 1 });
            TweenMax.to(this._bgCurrentDark, duration, { y: y, ease: ease, yoyo: true, repeat: 1 });
            TweenMax.to(this._bgNext, duration, { y: y, ease: ease, yoyo: true, repeat: 1 });
            TweenMax.to(this._bgNextClone, duration, { y: y, ease: ease, yoyo: true, repeat: 1 });
        }

        /**
         * Play background position animation to move to specified coordinates.
         * @param toX - Target X coordinate.
         * @param toY - Target Y coordinate.
         */
        public playBackgroundPositionAnimation(toX: number, toY: number) {
            const aC = Dev.Config.AnimConfig.Animation;
            const duration = aC.duration.bgChangePosition;
            const ease = aC.ease.bgChangePosition;

            TweenMax.to(this._bgCurrent, duration, { x: toX, y: toY, ease: ease });
            TweenMax.to(this._bgCurrentDark, duration, { x: toX, y: toY, ease: ease });
            TweenMax.to(this._bgNext, duration, { x: toX, y: toY, ease: ease });
            TweenMax.to(this._bgNextClone, duration, {
                x: toX,
                y: toY,
                ease: ease,
                onComplete: () => {
                    this._idleBackground.resume();
                },
            });
        }

        /**
         * Changes the background sprite type based on the spin mode.
         * @param type - Spin mode type.
         * @param cBg - Current background sprite.
         * @param cDBg - Current dark background sprite.
         * @param from - Starting alpha value.
         * @param to - Target alpha value.
         */
        private changeBackgroundSpriteType(
            type: Enum.SpinMode,
            cBg: Core.Modules.Sprite,
            cDBg: Core.Modules.Sprite,
            from: number,
            to: number,
        ) {
            const aC = Config.AnimConfig.Animation;
            switch (type) {
                case Enum.SpinMode.FreeSpin:
                    cBg.changeSprite(Config.AssetConfig.FreeSpinSpinBg.frame);
                    cDBg.changeSprite(Config.AssetConfig.FreeSpinSpinDarkBg.frame);
                    this._floatContainer.visible = false;
                    break;
                case Enum.SpinMode.NormalSpin:
                    cBg.changeSprite(Config.AssetConfig.NormalSpinBg.frame);
                    cDBg.changeSprite(Config.AssetConfig.NormalSpinDarkBg.frame);
                    this._floatContainer.visible = true;
                    break;
            }
            TweenMax.fromTo(cBg, aC.duration.bgSwitch, { alpha: from }, { alpha: to, ease: aC.ease.bgSwitch });
            TweenMax.fromTo(cDBg, aC.duration.bgSwitch, { alpha: from }, { alpha: to, ease: aC.ease.bgSwitch });
            this._currentSpinMode = type;
        }

        /**
         * Play idle background animation with random alpha changes.
         */
        private playIdleBackground(): void {
            const aC = Config.AnimConfig.Animation;
            if (this._idleBackground) {
                this._idleBackground.resume();
            } else {
                this._idleBackground = new TimelineMax({ repeat: -1 });
                const randomTime = aC.duration.bgIdleRandTimeMin + Math.floor(Math.random() * Math.floor(aC.duration.bgIdleRandTimeMax));
                const randAlpha = aC.count.bgIdleRandMinAlpha + Math.floor(Math.random() * Math.floor(aC.count.bgIdleRandMaxAlpha));

                this._idleBackground.to(this._bgCurrentDark, aC.duration.bgIdle, { alpha: 1, ease: aC.ease.bgIdle });
                this._idleBackground.to(this._bgCurrentDark, aC.duration.bgIdle, { alpha: randAlpha, ease: aC.ease.bgIdle });
                this._idleBackground.to(this._bgCurrentDark, aC.duration.bgIdle, { alpha: 1, ease: aC.ease.bgIdle });
                this._idleBackground.to(this._bgCurrentDark, aC.duration.bgIdle, { alpha: 1, ease: aC.ease.bgIdle }, '+=' + randomTime);
            }
        }

        /**
         * Play idle bubbles animation along predefined paths.
         */
        private playIdleBubbles() {
            const aC = Config.AnimConfig.Animation;
            for (let i = 0; i < this._bubbles.length; i++) {
                gsap.to(this._bubbles[i], {
                    motionPath: {
                        path: BUBBLE_PATHS[i].path,
                        align: 'self',
                    },
                    repeat: -1,
                    duration: BUBBLE_PATHS[i].duration,
                    delay: 1,
                    repeatDelay: BUBBLE_PATHS[i].repeatDelay,
                    ease: aC.ease.bgIdleBubble,
                });
            }
        }

        /**
         * Get the background container.
         */
        public get container() {
            return this._container;
        }
    }
}
