namespace Core.Modules {

    export class SpriteText extends Modules.Sprite {

        private _text: PIXI.Text;

         /**
         * running when loading class
         * @param x - position x
         * @param y - position y 
         * @param w - width
         * @param h - height
         * @param c - sprite text config
         * @param p - parent
         */
        constructor(x: number, y: number, w: number, h: number, c: Interface.ISpriteTextConfig, p?: PIXI.Container) {
            super(x, y,  c.sConfig, p,w, h);
            this._text = new Modules.Text(0, 0, c.tConfig, this,w,h);
            if (c.name) this.name = c.name;        
        }

        public get textAsset() {
            return this._text;
        }
    }
}