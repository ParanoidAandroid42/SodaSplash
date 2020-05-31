namespace Core.Modules {

    export class ButtonText extends Modules.Button {

        private _text: Modules.Text;

        /**
         * running when loading class
         * @param x - position x
         * @param y - position y 
         * @param w - width
         * @param h - height
         * @param c - button text config
         * @param cB - callback function
         * @param p - parent
         */
        constructor(x: number, y: number, w: number, h: number, c: Interface.IButtonTextConfig, cB?: Function, p?: PIXI.Container) {
            super(x, y, c.bConfig, cB, p,w, h);
            this._text = new Modules.Text(0, 0,c.tConfig, this,w,h);
            if(c.name) this.name = c.name;
        }

        public get textAsset() {
            return this._text;
        }
    }
}