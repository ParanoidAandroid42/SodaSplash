

namespace Core.Modules {
    export class Spine extends PIXI.spine.Spine{
        private _animationsConfig :  { [animType: string]: Core.Interface.IAnimation; };
        private _spineConfig : Interface.ISpineConfig;
        private _anchor:Enum.Anchor;
        /**
         *  running when loading class
         * @param x - position x
         * @param y - position y
         * @param w - width
         * @param h - height
         * @param c - spineConfig
         * @param p - parent
         * @param n - name
         */
        constructor(x: number, y: number, c: Interface.ISpineConfig, p: PIXI.Container,w?: number, h?: number,a?:Enum.Anchor,n?:string) {
            super(Core.Managers.ResourceManager.Instance.getSpineData(c.skeletonDataName));
            this._animationsConfig = c.animations;
            w && (this.width = w);
            h && (this.height = h);
            n ? this.name = n : this.name = "spine";
            this.position.set(x, y);
            this._spineConfig = c;
            this._anchor = a;
            this.setAnchor(a);
            p.addChild(this);
        }

        public setPosition(x:number,y:number){
            this.position.set(x, y);
            this.setAnchor(this._anchor);
        }

        private setAnchor(anchor:Enum.Anchor):void{
            if(anchor!=null || anchor!=undefined){
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
                        this.position.set(this.position.x-this.width/2,this.position.y-this.height/2);
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
                    default:
                        this.position.set(this.position.x-this.width/2,this.position.y-this.height/2);
                        break;
                }
            }else{
                this.position.set(this.position.x-this.width/2,this.position.y-this.height/2);
            }
        }

        public playAnimation(animationName: Dev.Enum.AnimNames): void {
            let config : Interface.IAnimation = this._animationsConfig[animationName];
            config.speed ? this.state.timeScale = config.speed : this.state.timeScale=1;
            this.state.setAnimation(0, config.resource, config.loop);
        }

        public setMix(fromName: string, toName: string): void {
            let fC : Interface.IAnimation = this._animationsConfig[fromName];
            let tC : Interface.IAnimation = this._animationsConfig[toName];
            let time = 1;
            tC.speed ? time = tC.speed : time = 1;
            this.stateData.setMix(fC.resource, tC.resource,3);
        }

        public get zIndex() {
            return this._zIndex;
        }

        public set zIndex(zIndex) {
            this._zIndex = zIndex;
        }

        public get animConfig():{ [animType: string]: Core.Interface.IAnimation; }{
            return this._animationsConfig;
        }

        public set animConfig(value){
            this._animationsConfig = value;
        }
    }
}