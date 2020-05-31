namespace Core.Modules {
    /**
     * SequenceAnimation class extends PIXI.AnimatedSprite to create and manage
     * animations based on a sequence of textures.
     */
    export class SequenceAnimation extends PIXI.AnimatedSprite {
        private _config: Core.Interface.ISequenceConfig;
        private _animationsConfig: { [animType: string]: Core.Interface.IAnimation };

        /**
         * SequenceAnimation constructor
         * @param x - Position x
         * @param y - Position y
         * @param c - Sequence configuration
         * @param p - Parent container
         * @param n - Name of the animation
         */
        constructor(x: number, y: number, c: Core.Interface.ISequenceConfig, p?: PIXI.Container, n?: string) {
            super(
                SequenceAnimation.generateTextures(
                    c.animations[c.defaultAnimName].resource,
                    c.animations[c.defaultAnimName].from,
                    c.animations[c.defaultAnimName].to,
                ),
            );
            this._config = c;
            this._animationsConfig = c.animations;
            this.position.set(x, y);
            if (n) this.name = n;
            if (p) p.addChild(this);
            this.setAnchor(Enum.Anchor.MiddleCenter);
        }

        /**
         * Generates an array of textures for the animation.
         * @param frame - The base name of the frame resource
         * @param from - The starting frame index
         * @param to - The ending frame index
         * @returns An array of PIXI.Texture objects
         */
        public static generateTextures(frame: string, from: number, to: number): PIXI.Texture[] {
            const textures: PIXI.Texture[] = [];
            for (let i = from; i <= to; i++) {
                const index = ('00000' + i).slice(-5); // ES5 compatible padding
                const texture = PIXI.Texture.from(frame + '/' + index);
                textures.push(texture);
            }
            return textures;
        }

        /**
         * Sets the anchor point for the animation based on the provided anchor enum.
         * @param anchor - The anchor point
         */
        private setAnchor(anchor: Enum.Anchor): void {
            switch (anchor) {
                case Enum.Anchor.UpLeft:
                    this.anchor.set(0, 0);
                    break;
                case Enum.Anchor.UpCenter:
                    this.anchor.set(0.5, 0);
                    break;
                case Enum.Anchor.UpRight:
                    this.anchor.set(1, 0);
                    break;
                case Enum.Anchor.MiddleLeft:
                    this.anchor.set(0, 0.5);
                    break;
                case Enum.Anchor.MiddleCenter:
                    this.anchor.set(0.5, 0.5);
                    break;
                case Enum.Anchor.MiddleRight:
                    this.anchor.set(1, 0.5);
                    break;
                case Enum.Anchor.DownLeft:
                    this.anchor.set(0, 1);
                    break;
                case Enum.Anchor.DownCenter:
                    this.anchor.set(0.5, 1);
                    break;
                case Enum.Anchor.DownRight:
                    this.anchor.set(1, 1);
                    break;
                default:
                    this.anchor.set(0.5, 0.5);
                    break;
            }
        }

        /**
         * Plays the specified animation.
         * @param animationName - The name of the animation to play
         */
        public playAnimation(animationName: Dev.Enum.AnimNames): void {
            const config: Interface.IAnimation = this._animationsConfig[animationName];
            const textures = SequenceAnimation.generateTextures(config.resource, config.from, config.to);
            this.textures = textures;
            this.animationSpeed = config.speed || 1;
            this.loop = config.loop;
            this.gotoAndPlay(config.from);
        }
    }
}
