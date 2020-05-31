
namespace Core.Modules {
    export class Sprite extends PIXI.Sprite{

        /**
         *  running when loading class
         * @param x - position x
         * @param y - position y
         * @param w - width
         * @param h - height
         * @param c - SpriteConfig
         * @param p - parent
         */
        constructor(x: number, y: number,c: Interface.ISpriteConfig,p: PIXI.Container|PIXI.projection.Container2d, w?: number, h?: number, a?: Enum.Anchor) {
            super(PIXI.Texture.from(c.frame));
            w && (this.width = w);
            h && (this.height = h);
            c.name ? this.name = c.name : this.name = "button";
            this.setAnchor(a);
            this.position.set(x, y);
            p && p.addChild(this);
        }

        public changeSprite(frameName:string){
            this.texture = PIXI.Texture.from(frameName);
        }

        private setAnchor(anchor:Enum.Anchor):void{
            if(anchor!=null){
                switch(anchor){
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
                        this.anchor.set(0.5,1);
                        break;
                    case Enum.Anchor.DownRight:
                        this.anchor.set(1, 1);
                        break;
                }
            }else{
                this.anchor.set(0.5, 0.5);
            }
        }

        public get zIndex() {
            return this._zIndex;
        }

        public set zIndex(zIndex) {
            this._zIndex = zIndex;
        }
    }
}