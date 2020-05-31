namespace Core.Modules {
    export class Text extends PIXI.Text {

        /**
         *  running when loading class
         * @param x - position x 
         * @param y - position y 
         * @param c - text config
         * @param p - parent
         */
        constructor(x: number, y: number, c: Interface.ITextConfig, p: PIXI.Container,w?: number, h?: number) {
            super(c.text, c.textStyle);
            if (c.name) this.name = c.name;
            w && (this.width = w);
            h && (this.height = h);
            this.position.set(x, y);
            this.anchor.set(.5, .5);
            p.addChild(this);
            this.setAnchor(c.anchor);
        }

        public setTextConfig(config: Interface.ITextConfig) {
            this.style = new PIXI.TextStyle(config.textStyle);
            this.text = config.text;
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
    }
}