namespace Core.Modules {
    /**
     * Spine class extends PIXI.spine.Spine to manage and play Spine animations.
     * It allows setting initial position, size, name, and anchor for the Spine animation.
     */
    export class Spine extends PIXI.spine.Spine {
        private _animationsConfig: { [animType: string]: Core.Interface.IAnimation };
        private _spineConfig: Interface.ISpineConfig;
        private _anchor: Enum.Anchor;

        /**
         * Spine constructor
         * @param x - Position x
         * @param y - Position y
         * @param c - Spine configuration
         * @param p - Parent container
         * @param w - Width
         * @param h - Height
         * @param a - Anchor
         * @param n - Name
         */
        constructor(
            x: number,
            y: number,
            c: Interface.ISpineConfig,
            p: PIXI.Container,
            w?: number,
            h?: number,
            a?: Enum.Anchor,
            n?: string,
        ) {
            super(Core.Managers.ResourceManager.Instance.getSpineData(c.skeletonDataName));
            this._animationsConfig = c.animations;
            if (w) this.width = w;
            if (h) this.height = h;
            this.name = n ? n : 'spine';
            this.position.set(x, y);
            this._spineConfig = c;
            this._anchor = a;
            this.setAnchor(a);
            p.addChild(this);
        }

        /**
         * Sets the position of the Spine animation.
         * @param x - Position x
         * @param y - Position y
         */
        public setPosition(x: number, y: number): void {
            this.position.set(x, y);
            this.setAnchor(this._anchor);
        }

        /**
         * Sets the anchor point for the Spine animation based on the provided anchor enum.
         * @param anchor - The anchor point
         */
        private setAnchor(anchor?: Enum.Anchor): void {
            if (anchor != null) {
                switch (anchor) {
                    case Enum.Anchor.UpLeft:
                        this.pivot.set(0, 0);
                        break;
                    case Enum.Anchor.UpCenter:
                        this.pivot.set(0.5, 0);
                        break;
                    case Enum.Anchor.UpRight:
                        this.pivot.set(1, 0);
                        break;
                    case Enum.Anchor.MiddleLeft:
                        this.pivot.set(0, 0.5);
                        break;
                    case Enum.Anchor.MiddleCenter:
                        this.position.set(this.position.x - this.width / 2, this.position.y - this.height / 2);
                        break;
                    case Enum.Anchor.MiddleRight:
                        this.pivot.set(1, 0.5);
                        break;
                    case Enum.Anchor.DownLeft:
                        this.pivot.set(0, 1);
                        break;
                    case Enum.Anchor.DownCenter:
                        this.pivot.set(0.5, 1);
                        break;
                    case Enum.Anchor.DownRight:
                        this.pivot.set(1, 1);
                        break;
                    default:
                        this.position.set(this.position.x - this.width / 2, this.position.y - this.height / 2);
                        break;
                }
            } else {
                this.position.set(this.position.x - this.width / 2, this.position.y - this.height / 2);
            }
        }

        /**
         * Plays the specified animation.
         * @param animationName - The name of the animation to play
         */
        public playAnimation(animationName: Dev.Enum.AnimNames): void {
            const config: Interface.IAnimation = this._animationsConfig[animationName];
            this.state.timeScale = config.speed || 1;
            this.state.setAnimation(0, config.resource, config.loop);
        }

        /**
         * Sets the transition mix between two animations.
         * @param fromName - The name of the starting animation
         * @param toName - The name of the ending animation
         */
        public setMix(fromName: string, toName: string): void {
            const fromConfig: Interface.IAnimation = this._animationsConfig[fromName];
            const toConfig: Interface.IAnimation = this._animationsConfig[toName];
            this.stateData.setMix(fromConfig.resource, toConfig.resource, toConfig.speed || 1);
        }

        /**
         * Gets the current animation configurations.
         */
        public get animConfig(): { [animType: string]: Core.Interface.IAnimation } {
            return this._animationsConfig;
        }

        /**
         * Sets the animation configurations.
         * @param value - The new animation configurations
         */
        public set animConfig(value: { [animType: string]: Core.Interface.IAnimation }) {
            this._animationsConfig = value;
        }
    }
}
