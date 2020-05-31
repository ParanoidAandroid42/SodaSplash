namespace Core.Modules {
    /**
     * Sprite2d class extends PIXI.projection.Sprite2d to create and manage 2D projected sprites.
     * It allows setting initial position, size, name, anchor, and axis configurations for the sprite.
     */
    export class Sprite2d extends PIXI.projection.Sprite2d {
        private _config: Interface.ISpriteConfig;

        /**
         * Sprite2d constructor
         * @param x - Position x
         * @param y - Position y
         * @param w - Width
         * @param h - Height
         * @param c - Sprite configuration
         * @param p - Parent container
         * @param a - Anchor
         */
        constructor(x: number, y: number, c: Interface.ISpriteConfig, p?: PIXI.Container, a?: Enum.Anchor, w?: number, h?: number) {
            super(PIXI.Texture.from(c.frame));
            if (w) this.width = w;
            if (h) this.height = h;
            this.name = c.name ? c.name : 'sprite2d';
            this._config = c;
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
         * Sets the X axis position and factor for the sprite's projection.
         * @param pos - The position point to set for the X axis
         * @param factor - The factor to apply to the X axis
         */
        public setAxisX(pos: PIXI.Point, factor: number): void {
            this.proj.setAxisX(pos, factor);
        }

        /**
         * Sets the Y axis position and factor for the sprite's projection.
         * @param pos - The position point to set for the Y axis
         * @param factor - The factor to apply to the Y axis
         */
        public setAxisY(pos: PIXI.Point, factor: number): void {
            this.proj.setAxisY(pos, factor);
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

        /**
         * Gets the sprite configuration.
         */
        public get config(): Interface.ISpriteConfig {
            return this._config;
        }
    }
}
