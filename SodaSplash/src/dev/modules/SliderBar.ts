
namespace Dev.Modules {    

    export class SliderBar extends PIXI.utils.EventEmitter {

        private _container : Core.Modules.Container;
        private _spineBarContainer : Core.Modules.Container;
        private _machineInfo : Interface.ISlotConfig;
        private _front:Core.Modules.Sprite;
        private _frontFilter:Core.Modules.Sprite;
        private _barSpineMask:Core.Modules.Graphic;
        private _back:Core.Modules.Sprite;
        private _barSpine : Core.Modules.Spine;
        private _barSpineFilter:Core.Modules.Spine;
        private _head:Core.Modules.Sprite;
        private _barMeter:Core.Modules.Text;
        private _amountPercent:number = 0;

        public constructor(x:number, y :number, mI:Interface.ISlotConfig,p:Core.Modules.Container|any) {
            super();
            this._container = new Core.Modules.Container(x,y,p,"SliderBarContainer");
            this._machineInfo = mI;
            this.initProperties();
        }

        private initProperties(){
            let aI = Config.AssetConfig;
            let a = Core.Enum.Anchor;
            this._spineBarContainer = new Core.Modules.Container(0,-16,this._container,"spineBarContainer");
            this._spineBarContainer.scale.set(1,.9);
            this._back = new Core.Modules.Sprite(-5,-119,Config.AssetConfig.FruitBarBg,this._spineBarContainer);
            this._barSpine = new Core.Modules.Spine(-30,5,Config.AssetConfig.FruitBar,this._spineBarContainer,a.MiddleCenter);
            this._barSpineFilter = new Core.Modules.Spine(-30,5,Config.AssetConfig.FruitBar,this._spineBarContainer,a.MiddleCenter);
            this._barSpine.playAnimation(Dev.Enum.AnimNames.FruitBarLoop);
            this._barSpineMask = new Core.Modules.Graphic(0,4,53,803,Config.AssetConfig.FruitBarMask,this._spineBarContainer);
            this._head = new Core.Modules.Sprite(-7,170,Config.AssetConfig.FruitBarHead,this._spineBarContainer,a.UpCenter);
            this._barSpine.scale.set(.8,.7);
            this._front = new Core.Modules.Sprite(-5,-118,Config.AssetConfig.FruitBarFront,this._spineBarContainer);
            this._frontFilter = new Core.Modules.Sprite(-5,-118,Config.AssetConfig.FruitBarFront,this._spineBarContainer);
            this._front.scale.set(1.25,1.05); 
            this._frontFilter.scale = this._front.scale;
            this._frontFilter.name = "frontFilter";
            this._barSpineMask.scale.set(.8,.693);    
            this._back.scale.set(.7,.69);
            this._barSpine.mask = this._barSpineMask;
            this._barSpineFilter.mask = this._barSpineMask;
            this._barSpine.position.y += this._barSpineMask.height; 
            this._barSpineFilter.scale = this._barSpine.scale;
            this._barSpineFilter.position.y += this._barSpineMask.height; 
            this._barSpineFilter.name = "barSpineFilter";
            this._head.mask = this._barSpineMask;
            this._head.scale.set(1.25,1.5);
            this._frontFilter.alpha = 0;
            this._barMeter = new Core.Modules.Text(-7,-397,aI.SliderBarHeaderText,this._container);
        }
        
        public onAnimationAction(sA:Enum.SlotAnimState,matchIcon:SliderMatchIcon){
            switch(sA){
                case Enum.SlotAnimState.MatchIconFinished:
                    this.playBarFillAnimation(matchIcon);
                    break;
            }
        }

        public playBarFillAnimation(matchIcon:SliderMatchIcon){
            let up = 15;
            let end = 100;
            let matchIconWin = 5;
            let h = this._barSpine.height+105;
            up = h * matchIconWin / end;
            let duration = this._machineInfo.duration.barFill;
            let ease = this._machineInfo.ease.barFill;
            this._head.alpha = 1;
            if(this._amountPercent+matchIconWin<end){
                if(this._amountPercent+matchIconWin>=end){
                    up = this._amountPercent+matchIconWin - end;
                    this._amountPercent = end;
                }else{
                    this._amountPercent += matchIconWin;
                }
                let aI = Config.AssetConfig;
                let container = new Core.Modules.Container(-20,0,this._head);
                let emitter = new PIXI.particles.Emitter(container, aI.Bubbles[3].frame, aI.SliderBarBubble);
                emitter.autoUpdate = true;
                emitter.playOnceAndDestroy(()=>{ 
                    container.destroy();
                });
                TweenMax.to(this._barSpine,duration,{y:this._barSpine.position.y-up});
                TweenMax.to(this._barSpineFilter,duration,{y:this._barSpineFilter.position.y-up});
                TweenMax.to(this._head,duration,{y:this._head.position.y-up});
                TweenMax.to(this._barSpineFilter,duration/2,{alpha:.75,ease:ease,
                    onStart:()=>{
                        let colorMatrix = new PIXI.filters.GlowFilter(1,1,1,matchIcon.symbolInfo.winSprite.tint)
                        this._barSpineFilter.filters = [colorMatrix];
                        colorMatrix.blendMode = PIXI.BLEND_MODES.ADD;
                        this._barMeter.text = "%"+ Math.floor(this._amountPercent);
                    },
                    onComplete:()=>{
                        TweenMax.to(this._barSpineFilter,duration/2,{alpha:0,ease:ease,onComplete:()=>{
                            this._barSpineFilter.filters = null;
                            this._barSpineFilter.tint = 0xffffff;
                        }});
                    }
                });

                TweenMax.to(this._frontFilter,duration/2,{alpha:1,ease:ease,
                    onStart:()=>{
                        let colorMatrix = new PIXI.filters.GlowFilter(1,1,1,matchIcon.symbolInfo.winSprite.tint)
                        this._frontFilter.filters = [colorMatrix];
                        colorMatrix.blendMode = PIXI.BLEND_MODES.ADD;
                    },
                    onComplete:()=>{
                        TweenMax.to(this._frontFilter,duration/2,{alpha:0,ease:ease,onComplete:()=>{
                            this._frontFilter.filters = null;
                            this._frontFilter.tint = 0xffffff;
                        }});
                    }
                });
            }
            else{
                this._head.alpha = 0;
                this._amountPercent = 100;
                TweenMax.to(this._barSpineFilter,duration/2,{alpha:.75,
                    ease:ease,
                    onStart:()=>{
                        this._barSpineFilter.tint = 0xffffff;
                        let colorMatrix = new PIXI.filters.GlowFilter(1,1,1,0xffffff)
                        this._barSpineFilter.filters = [colorMatrix];
                        colorMatrix.blendMode = PIXI.BLEND_MODES.ADD;
                        this._barMeter.text = "%"+ Math.floor(this._amountPercent);
                    },
                    onComplete:()=>{
                        TweenMax.to(this._barSpineFilter,duration/2,{alpha:0,ease:ease,onComplete:()=>{
                            this._barSpineFilter.filters = null;
                            this._barSpineFilter.tint = 0xffffff;
                        }});
                    }
                });
            }
        }
    }
}