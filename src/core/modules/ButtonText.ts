namespace Core.Modules {
    /**
     * ButtonText class extends the Button class to include a text element.
     * It combines both button and text configurations to create a button with text.
     */
    export class ButtonText extends Modules.Button {
        private _text: Modules.Text;

        /**
         * ButtonText constructor
         * @param x - Position x
         * @param y - Position y
         * @param w - Width
         * @param h - Height
         * @param c - Button text configuration
         * @param cB - Callback function when button is released
         * @param p - Parent container
         */
        constructor(x: number, y: number, w: number, h: number, c: Interface.IButtonTextConfig, cB?: Function, p?: PIXI.Container) {
            super(x, y, c.bConfig, cB, p, w, h);
            this._text = new Modules.Text(0, 0, c.tConfig, this, w, h);
            if (c.name) this.name = c.name;
        }

        /**
         * Gets the text asset of the button.
         * @returns The text asset
         */
        public get textAsset(): Modules.Text {
            return this._text;
        }
    }
}
