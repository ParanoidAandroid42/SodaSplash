namespace Core.Modules {
    /**
     * SpriteText class extends Modules.Sprite to create a sprite with text overlay.
     * It combines both sprite and text configurations to create a sprite with text.
     */
    export class SpriteText extends Modules.Sprite {
        private _text: Modules.Text;

        /**
         * SpriteText constructor
         * @param x - Position x
         * @param y - Position y
         * @param w - Width
         * @param h - Height
         * @param c - Sprite text configuration
         * @param p - Parent container
         */
        constructor(x: number, y: number, w: number, h: number, c: Interface.ISpriteTextConfig, p?: PIXI.Container) {
            super(x, y, c.sConfig, p, w, h);
            this._text = new Modules.Text(0, 0, c.tConfig, this, w, h);
            if (c.name) this.name = c.name;
        }

        /**
         * Gets the text asset of the sprite.
         * @returns The text asset
         */
        public get textAsset(): Modules.Text {
            return this._text;
        }
    }
}
