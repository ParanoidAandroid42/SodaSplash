namespace Dev.Modules {
    /**
     * SliderBar class for managing the slider bar component in the game.
     */
    export class SliderBar extends PIXI.utils.EventEmitter {
        private _container: Core.Modules.Container;
        private _spineBarContainer: Core.Modules.Container;
        private _machineInfo: Interface.ISlotConfig;
        private _front: Core.Modules.Sprite;
        private _frontFilter: Core.Modules.Sprite;
        private _barSpineMask: Core.Modules.Graphic;
        private _back: Core.Modules.Sprite;
        private _barSpine: Core.Modules.Spine;
        private _barSpineFilter: Core.Modules.Spine;
        private _head: Core.Modules.Sprite;
        private _barMeter: Core.Modules.Text;
        private _amountPercent: number = 0;

        /**
         * Constructor for the SliderBar class.
         * @param x - The x position of the slider bar.
         * @param y - The y position of the slider bar.
         * @param mI - The slot machine configuration.
         * @param p - The parent container.
         */
        public constructor(x: number, y: number, mI: Interface.ISlotConfig, p: Core.Modules.Container | any) {
            super();
            this._container = new Core.Modules.Container(x, y, p, 'SliderBarContainer');
            this._machineInfo = mI;
            this.initProperties();
        }

        /**
         * Initializes the properties of the SliderBar class.
         */
        private initProperties(): void {
            const aI = Config.AssetConfig;
            const a = Core.Enum.Anchor;
            this._spineBarContainer = new Core.Modules.Container(0, -16, this._container, 'spineBarContainer');
            this._spineBarContainer.scale.set(1, 0.9);
            this._back = new Core.Modules.Sprite(-5, -119, Config.AssetConfig.FruitBarBg, this._spineBarContainer);
            this._barSpine = new Core.Modules.Spine(-30, 5, Config.AssetConfig.FruitBar, this._spineBarContainer, a.MiddleCenter);
            this._barSpineFilter = new Core.Modules.Spine(-30, 5, Config.AssetConfig.FruitBar, this._spineBarContainer, a.MiddleCenter);
            this._barSpine.playAnimation(Dev.Enum.AnimNames.FruitBarLoop);
            this._barSpineMask = new Core.Modules.Graphic(0, 4, 53, 803, Config.AssetConfig.FruitBarMask, this._spineBarContainer);
            this._head = new Core.Modules.Sprite(-7, 170, Config.AssetConfig.FruitBarHead, this._spineBarContainer, a.UpCenter);
            this._barSpine.scale.set(0.8, 0.7);
            this._front = new Core.Modules.Sprite(-5, -118, Config.AssetConfig.FruitBarFront, this._spineBarContainer);
            this._frontFilter = new Core.Modules.Sprite(-5, -118, Config.AssetConfig.FruitBarFront, this._spineBarContainer);
            this._front.scale.set(1.25, 1.05);
            this._frontFilter.scale = this._front.scale;
            this._frontFilter.name = 'frontFilter';
            this._barSpineMask.scale.set(0.8, 0.693);
            this._back.scale.set(0.7, 0.69);
            this._barSpine.mask = this._barSpineMask;
            this._barSpineFilter.mask = this._barSpineMask;
            this._barSpine.position.y += this._barSpineMask.height;
            this._barSpineFilter.scale = this._barSpine.scale;
            this._barSpineFilter.position.y += this._barSpineMask.height;
            this._barSpineFilter.name = 'barSpineFilter';
            this._head.mask = this._barSpineMask;
            this._head.scale.set(1.25, 1.5);
            this._frontFilter.alpha = 0;
            this._barMeter = new Core.Modules.Text(-7, -397, aI.SliderBarHeaderText, this._container);
        }

        /**
         * Handles animation actions based on the slot animation state.
         * @param sA - The slot animation state.
         * @param matchIcon - The matching icon for the slider.
         */
        public onAnimationAction(sA: Enum.SlotAnimState, matchIcon: SliderMatchIcon): void {
            switch (sA) {
                case Enum.SlotAnimState.MatchIconFinished:
                    this.playBarFillAnimation(matchIcon);
                    break;
            }
        }

        /**
         * Plays the bar fill animation.
         * @param matchIcon - The matching icon for the slider.
         */
        public playBarFillAnimation(matchIcon: SliderMatchIcon): void {
            const maxPercent = 100;
            const matchIconWin = 5;
            const totalHeight = this._barSpine.height + 105;
            const fillAmount = (totalHeight * matchIconWin) / maxPercent;
            const duration = this._machineInfo.duration.barFill;
            const ease = this._machineInfo.ease.barFill;

            this._head.alpha = 1;

            if (this._amountPercent + matchIconWin < maxPercent) {
                if (this._amountPercent + matchIconWin >= maxPercent) {
                    this._amountPercent = maxPercent;
                } else {
                    this._amountPercent += matchIconWin;
                }
                this.animateBarFill(fillAmount, duration, ease, matchIcon);
            } else {
                this._head.alpha = 0;
                this._amountPercent = maxPercent;
                this.animateBarFill(fillAmount, duration, ease, matchIcon, true);
            }
        }

        /**
         * Animates the bar fill.
         * @param fillAmount - The amount to fill.
         * @param duration - The duration of the animation.
         * @param ease - The easing function for the animation.
         * @param matchIcon - The matching icon for the slider.
         * @param isComplete - Whether the fill is complete.
         */
        private animateBarFill(fillAmount: number, duration: number, ease: string, matchIcon: SliderMatchIcon, isComplete?: boolean): void {
            const aI = Config.AssetConfig;
            const container = new Core.Modules.Container(-20, 0, this._head);
            const emitter = new PIXI.particles.Emitter(container, aI.Bubbles[3].frame, aI.SliderBarBubble);

            emitter.autoUpdate = true;
            emitter.playOnceAndDestroy(() => {
                container.destroy();
            });

            TweenMax.to(this._barSpine, duration, { y: this._barSpine.position.y - fillAmount });
            TweenMax.to(this._barSpineFilter, duration, { y: this._barSpineFilter.position.y - fillAmount });
            TweenMax.to(this._head, duration, { y: this._head.position.y - fillAmount });

            if (!isComplete) {
                this.playGlowEffect(duration, ease, matchIcon);
            } else {
                this.playCompleteEffect(duration, ease);
            }
        }

        /**
         * Plays the glow effect animation.
         * @param duration - The duration of the animation.
         * @param ease - The easing function for the animation.
         * @param matchIcon - The matching icon for the slider.
         */
        private playGlowEffect(duration: number, ease: string, matchIcon: SliderMatchIcon): void {
            TweenMax.to(this._barSpineFilter, duration / 2, {
                alpha: 0.75,
                ease: ease,
                onStart: () => {
                    const colorMatrix = new PIXI.filters.GlowFilter(1, 1, 1, matchIcon.symbolInfo.winSprite.tint);
                    this._barSpineFilter.filters = [colorMatrix];
                    colorMatrix.blendMode = PIXI.BLEND_MODES.ADD;
                    this._barMeter.text = '%' + Math.floor(this._amountPercent);
                },
                onComplete: () => {
                    TweenMax.to(this._barSpineFilter, duration / 2, {
                        alpha: 0,
                        ease: ease,
                        onComplete: () => {
                            this._barSpineFilter.filters = null;
                            this._barSpineFilter.tint = 0xffffff;
                        },
                    });
                },
            });

            TweenMax.to(this._frontFilter, duration / 2, {
                alpha: 1,
                ease: ease,
                onStart: () => {
                    const colorMatrix = new PIXI.filters.GlowFilter(1, 1, 1, matchIcon.symbolInfo.winSprite.tint);
                    this._frontFilter.filters = [colorMatrix];
                    colorMatrix.blendMode = PIXI.BLEND_MODES.ADD;
                },
                onComplete: () => {
                    TweenMax.to(this._frontFilter, duration / 2, {
                        alpha: 0,
                        ease: ease,
                        onComplete: () => {
                            this._frontFilter.filters = null;
                            this._frontFilter.tint = 0xffffff;
                        },
                    });
                },
            });
        }

        /**
         * Plays the complete effect animation.
         * @param duration - The duration of the animation.
         * @param ease - The easing function for the animation.
         */
        private playCompleteEffect(duration: number, ease: string): void {
            TweenMax.to(this._barSpineFilter, duration / 2, {
                alpha: 0.75,
                ease: ease,
                onStart: () => {
                    this._barSpineFilter.tint = 0xffffff;
                    const colorMatrix = new PIXI.filters.GlowFilter(1, 1, 1, 0xffffff);
                    this._barSpineFilter.filters = [colorMatrix];
                    colorMatrix.blendMode = PIXI.BLEND_MODES.ADD;
                    this._barMeter.text = '%' + Math.floor(this._amountPercent);
                },
                onComplete: () => {
                    TweenMax.to(this._barSpineFilter, duration / 2, {
                        alpha: 0,
                        ease: ease,
                        onComplete: () => {
                            this._barSpineFilter.filters = null;
                            this._barSpineFilter.tint = 0xffffff;
                        },
                    });
                },
            });
        }
    }
}
