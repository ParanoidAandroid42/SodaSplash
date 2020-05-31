
namespace Core.Modules{

    export class Graphic extends PIXI.Graphics{

        private _width:number;
        private _height:number;
        private _position : {x:number,y:number}
        private _config : Interface.IMaskConfig;

        /**
         *  running when loading class
         * @param x - position x
         * @param y - position y
         * @param w - width
         * @param h - height
         * @param c - MaskConfig
         * @param p - parent
         */
        constructor(x: number, y: number, w: number, h: number, c: Interface.IMaskConfig, p?: PIXI.Container,a?:Enum.Anchor) { 
            super();
            this._config = c;
            this._width = w;
            this._height = h;
            c.name ? this.name = c.name : this.name = "mask";
            this._position = {x:x,y:y};
            this._config.anchor = a;
            c.alpha ? this.alpha = c.alpha : this.alpha = 1;
            p && p.addChild(this);
            this.setShape(c);
            this.setAnchor(a);
            this.scale.set(1,1);
        }

        private setShape(c:Interface.IMaskConfig):void {
            switch(c.shape){
                case Enum.Shape.Circle:
                    let fill = c.fill?c.fill : 0x000000; 
                    let radius = c.radius?c.radius : 1000; 
                    let alpha = c.alpha?c.alpha : 1; 
                    this.beginFill(fill, alpha).drawCircle(0,0,radius).endFill();
                    break;
                case Enum.Shape.Rectangle:
                    fill = c.fill?c.fill : 0x00000; 
                    alpha = c.alpha?c.alpha : 1; 
                    this.beginFill(fill, alpha)
                    .drawRect(0,0, this._width,this._height)
                    .endFill();
                    break;
                case Enum.Shape.Line:
                    fill = c.fill?c.fill : 0x00000; 
                    alpha = c.alpha?c.alpha : 1; 
                    this.beginFill(fill, alpha);
                    this.lineStyle(this._width, fill,1,.5);
                    this.endFill();
                    break;
                case Enum.Shape.RoundRect:
                    fill = c.fill?c.fill : 0x00000; 
                    alpha = c.alpha?c.alpha : 1; 
                    radius = c.radius?c.radius : 1000; 
                    this.beginFill(fill,alpha);
                    this.drawRoundedRect(0,0,this._width,this._height, radius);
                    this.endFill();
                    break;
            }
        }

        private setAnchor(anchor:Enum.Anchor):void{
            if(anchor!=null){
                switch(anchor){
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
                        this.position.set(this._position.x-this._width/2,this._position.y-this.height/2);
                        break;
                    case Enum.Anchor.MiddleRight:
                        this.pivot.set(1, 0.5);
                        break;
                    case Enum.Anchor.DownLeft:
                        this.pivot.set(0, 1);
                        break;
                    case Enum.Anchor.DownCenter:
                        this.pivot.set(0.5,1);
                        break;
                    case Enum.Anchor.DownRight:
                        this.pivot.set(1, 1);
                        break;
                }
            }else{
                this.position.set(this._position.x-this._width/2,this._position.y-this.height/2);
            }
        }

        public drawLine(endPoint:PIXI.Point,width:number):void{
            this.lineTo(endPoint.x,endPoint.y);
            this.width = width;
        }

        public get zIndex() {
            return this._zIndex;
        }

        public set zIndex(zIndex) {
            this._zIndex = zIndex;
        }

        public setPosition(x:number,y:number){
            this._position.x = x;
            this._position.y = y;
            this.setAnchor(this._config.anchor);
        }
    }
}