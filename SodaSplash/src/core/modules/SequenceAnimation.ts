namespace Core.Modules {
    export class SequenceAnimation extends PIXI.AnimatedSprite {

        private _config: Core.Interface.ISequenceConfig; 
        private _animationsConfig :  { [animType: string]: Core.Interface.IAnimation; };

        /**
         * Creates an instance of sequence animation.
         * @param c - IAnimation config 
         * @param [x] - position x
         * @param [y] - position y
         * @param [p] - parent
         * @param [n] - name
         */
        constructor(x:number,y:number,c:Core.Interface.ISequenceConfig,p?:PIXI.Container, n?: string) {
            super(SequenceAnimation.generateTextures(c.animations[c.defaultAnimName].resource,c.animations[c.defaultAnimName].from, c.animations[c.defaultAnimName].to));
            this._config = c;
            this._animationsConfig = c.animations;
            this.position.set(x,y);
            this.name = n;
            p.addChild(this);
            this.setAnchor(Enum.Anchor.MiddleCenter);
        }

        public static generateTextures(frame: string, from:number, to: number): PIXI.Texture[] {
            const textures: any = [];
            for (let i = from; i < to; i++) {
                let index;
                if(i<10){
                    index = "0000"+i;
                }else if(i<100){
                    index = "000"+i;
                }else{
                    index = "00"+i;
                }
                const texture = PIXI.Texture.from(frame + "/" + index);
                textures.push(texture);
            }
            return textures;    
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

        public playAnimation(animationName:Dev.Enum.AnimNames): void{
            let config : Interface.IAnimation = this._animationsConfig[animationName];
            SequenceAnimation.generateTextures(config.resource, config.from,config.to)
            config.speed ? this.animationSpeed = config.speed : this.animationSpeed=1;
            this.loop = config.loop;
            this.gotoAndPlay(config.from);
        }
    }
}