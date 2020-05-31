namespace Core.Modules {
    /**
     * Text2d class extends PIXI.projection.Text2d to create and manage 2D projected text elements.
     * It allows setting initial position, size, text configuration, and anchor for the text.
     */
    export class Text2d extends PIXI.projection.Text2d {
        /**
         * Text2d constructor
         * @param x - Position x
         * @param y - Position y
         * @param z - Position z
         * @param w - Width
         * @param h - Height
         * @param c - Text configuration
         * @param p - Parent container
         */
        constructor(x: number, y: number, z: number, w: number, h: number, c: Interface.ITextConfig, p?: PIXI.Container) {
            super(c.text, c.textStyle);
            if (c.name) this.name = c.name;
            if (w) this.width = w;
            if (h) this.height = h;
            this.position.set(x, y, z);
            this.anchor.set(0.5, 0.5);
            if (p) p.addChild(this);
            this.setAnchor(c.anchor);
        }

        /**
         * Updates the text configuration.
         * @param config - The new text configuration
         */
        public setTextConfig(config: Interface.ITextConfig): void {
            this.style = new PIXI.TextStyle(config.textStyle);
            this.text = config.text;
        }

        /**
         * Sets the anchor point for the text based on the provided anchor enum.
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
