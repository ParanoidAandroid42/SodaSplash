namespace Core.Modules {
    /**
     * Sprite class extends PIXI.Sprite to create and manage sprites with configurable properties.
     * It allows setting initial position, size, name, and anchor for the sprite.
     */
    export class Sprite extends PIXI.Sprite {
        /**
         * Sprite constructor
         * @param x - Position x
         * @param y - Position y
         * @param w - Width
         * @param h - Height
         * @param c - Sprite configuration
         * @param p - Parent container
         * @param a - Anchor
         */
        constructor(
            x: number,
            y: number,
            c: Interface.ISpriteConfig,
            p: PIXI.Container | PIXI.projection.Container2d,
            w?: number,
            h?: number,
            a?: Enum.Anchor,
        ) {
            super(PIXI.Texture.from(c.frame));
            if (w) this.width = w;
            if (h) this.height = h;
            this.name = c.name ? c.name : 'button';
            this.setAnchor(a);
            this.position.set(x, y);
            if (p) p.addChild(this);
        }

        /**
         * Changes the texture of the sprite.
         * @param frameName - The name of the new texture frame
         */
        public changeSprite(frameName: string): void {
            this.texture = PIXI.Texture.from(frameName);
        }

        /**
         * Sets the anchor point for the sprite based on the provided anchor enum.
         * @param anchor - The anchor point
         */
        private setAnchor(anchor?: Enum.Anchor): void {
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
    }
}
