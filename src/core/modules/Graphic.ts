namespace Core.Modules {

    /**
     * Graphic class extends PIXI.Graphics to provide additional functionality.
     * It allows setting initial position, size, shape, and anchor for the graphic.
     */
    export class Graphic extends PIXI.Graphics {

        private _width: number;
        private _height: number;
        private _position: { x: number, y: number };
        private _config: Interface.IMaskConfig;

        /**
         * Graphic constructor
         * @param x - Position x
         * @param y - Position y
         * @param w - Width
         * @param h - Height
         * @param c - Mask configuration
         * @param p - Parent container
         * @param a - Anchor
         */
        constructor(x: number, y: number, w: number, h: number, c: Interface.IMaskConfig, p?: PIXI.Container, a?: Enum.Anchor) { 
            super();
            this._config = c;
            this._width = w;
            this._height = h;
            this.name = c.name ? c.name : "mask";
            this._position = { x, y };
            this._config.anchor = a;
            this.alpha = c.alpha ? c.alpha : 1;
            if (p) p.addChild(this);
            this.setShape(c);
            this.setAnchor(a);
            this.scale.set(1, 1);
        }

        /**
         * Sets the shape of the graphic based on the configuration.
         * @param c - Mask configuration
         */
        private setShape(c: Interface.IMaskConfig): void {
            switch (c.shape) {
                case Enum.Shape.Circle:
                    const fillCircle = c.fill ? c.fill : 0x000000;
                    const radiusCircle = c.radius ? c.radius : 1000;
                    const alphaCircle = c.alpha ? c.alpha : 1;
                    this.beginFill(fillCircle, alphaCircle).drawCircle(0, 0, radiusCircle).endFill();
                    break;
                case Enum.Shape.Rectangle:
                    const fillRect = c.fill ? c.fill : 0x000000;
                    const alphaRect = c.alpha ? c.alpha : 1;
                    this.beginFill(fillRect, alphaRect)
                        .drawRect(0, 0, this._width, this._height)
                        .endFill();
                    break;
                case Enum.Shape.Line:
                    const fillLine = c.fill ? c.fill : 0x000000;
                    const alphaLine = c.alpha ? c.alpha : 1;
                    this.beginFill(fillLine, alphaLine);
                    this.lineStyle(this._width, fillLine, 1, 0.5);
                    this.endFill();
                    break;
                case Enum.Shape.RoundRect:
                    const fillRoundRect = c.fill ? c.fill : 0x000000;
                    const alphaRoundRect = c.alpha ? c.alpha : 1;
                    const radiusRoundRect = c.radius ? c.radius : 1000;
                    this.beginFill(fillRoundRect, alphaRoundRect);
                    this.drawRoundedRect(0, 0, this._width, this._height, radiusRoundRect);
                    this.endFill();
                    break;
            }
        }

        /**
         * Sets the anchor point for the graphic based on the configuration.
         * @param anchor - Anchor point
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
                        this.position.set(this._position.x - this._width / 2, this._position.y - this.height / 2);
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
                }
            } else {
                this.position.set(this._position.x - this._width / 2, this._position.y - this.height / 2);
            }
        }

        /**
         * Draws a line from the current position to the specified endpoint.
         * @param endPoint - Endpoint of the line
         * @param width - Width of the line
         */
        public drawLine(endPoint: PIXI.Point, width: number): void {
            this.lineTo(endPoint.x, endPoint.y);
            this.width = width;
        }

        /**
         * Sets the position of the graphic.
         * @param x - Position x
         * @param y - Position y
         */
        public setPosition(x: number, y: number): void {
            this._position.x = x;
            this._position.y = y;
            this.setAnchor(this._config.anchor);
        }
    }
}
