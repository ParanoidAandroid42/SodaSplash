
namespace Dev.Modules {

    const BubblePaths : any[] = [
        { repeatDelay:8,duration:20,path: [{x: 1207, y: 816}, {x: 1000, y: 534},{x: 1180, y: 124},{x: 1049, y: -100}]},
        { repeatDelay:10,duration:15,path: [{x: 800, y: 816}, {x: 620, y: 534},{x: 890, y: 124},{x: 620, y: -100}]},
        { repeatDelay:12,duration:12,path: [{x: 350, y: 816}, {x: 480, y: 534},{x: 320, y: 124},{x: 438, y: -100}]},
        { repeatDelay:5,duration:3,path: [{x: 1107, y: 816}, {x: 1250, y: 534},{x: 1100, y: 124},{x: 1189, y: -300}]}
    ]

    export class Background extends PIXI.utils.EventEmitter{

        private _container : Core.Modules.Container;
        private _planeBackground2d : Core.Modules.Plane2d;
        private _floatContainer:Core.Modules.Container;
        private _bgContainer2d : Core.Modules.Container2d;
        private _bgCurrent: Core.Modules.Sprite;
        private _bgCurrentDark: Core.Modules.Sprite;
        private _bgNext: Core.Modules.Sprite;
        private _bgNextClone: Core.Modules.Sprite;
        private _shadowLeft : Core.Modules.Sprite;
        private _shadowRight : Core.Modules.Sprite;
        private _currentSpinMode :Enum.SpinMode;
        private _idleBackground : any;

        private _floats: Core.Modules.Sprite[] = [];
        private _bubbles: Core.Modules.Sprite[] = [];

        public constructor(container:Core.Modules.Container) {
            super();
            let r = Dev.Config.GameConfig.DisplayConfig;
            let aC = {yP:new PIXI.Point(0,250),yFactor:-1};
            this._planeBackground2d = new Core.Modules.Plane2d(0,-r.height/2,container,aC,"PlaneBackground");
            this._container = new Core.Modules.Container(0,0,container,"BackgroundContainer");
            this.initProperties();
        }

        private initProperties(){
            let r = Dev.Config.GameConfig.DisplayConfig;
            let aI = Config.AssetConfig;
            let a = Core.Enum.Anchor;

            this._floatContainer = new Core.Modules.Container(0,0,this._container,"FloatContainer");
            this._bgContainer2d = new Core.Modules.Container2d(-r.width/2,-r.height/2,this._planeBackground2d,"BgContainer2d");

            this._bgNext = new Core.Modules.Sprite(r.width/2,r.height/2+200,aI.FreeSpinSpinBg,this._container);
            this._bgNextClone = new Core.Modules.Sprite(r.width/2,r.height/2+200,aI.FreeSpinSpinDarkBg,this._container);
            this._bgCurrent = new Core.Modules.Sprite(r.width/2,r.height/2+200,aI.NormalSpinBg,this._container);
            this._bgCurrentDark = new Core.Modules.Sprite(r.width/2,r.height/2+200,aI.NormalSpinDarkBg,this._container);

            let float = new Core.Modules.Sprite(966,314.5,aI.Floats[0],this._floatContainer,null,null,);
            this._floats.push(float);
            float = new Core.Modules.Sprite(302,554,aI.Floats[1],this._floatContainer,null,null,);
            this._floats.push(float);
            float = new Core.Modules.Sprite(902,150,aI.Floats[2],this._floatContainer,null,null);
            this._floats.push(float);
            float = new Core.Modules.Sprite(722,530,aI.Floats[3],this._floatContainer,null,null);
            this._floats.push(float);
            float = new Core.Modules.Sprite(1100,630,aI.Floats[4],this._floatContainer,null,null);
            this._floats.push(float);
            float = new Core.Modules.Sprite(252,358,aI.Floats[5],this._floatContainer,null,null);
            this._floats.push(float);
            
            let bubble = new Core.Modules.Sprite(1136,816,aI.Bubbles[0],this._container,null,null);
            this._bubbles.push(bubble);
            bubble = new Core.Modules.Sprite(844,816,aI.Bubbles[1],this._container,null,null);
            this._bubbles.push(bubble);
            bubble = new Core.Modules.Sprite(994,816,aI.Bubbles[2],this._container,null,null);
            this._bubbles.push(bubble);
            bubble = new Core.Modules.Sprite(1136,816,aI.Bubbles[3],this._container,null,null);
            this._bubbles.push(bubble);
            this._currentSpinMode = Enum.SpinMode.NormalSpin; //TODO will be changed by response data
            
            this.playBackgroundPositionAnimation(r.width/2,r.height/2);

            this.playIdleBubbles();
            this.playIdleBackground();
        }

        public changeBackgroundType(type:Enum.SpinMode){            
            this.changeBackgroundSpriteType(this._currentSpinMode,this._bgNext,this._bgNextClone,this._bgCurrentDark.alpha,0);
            this.changeBackgroundSpriteType(type,this._bgCurrent,this._bgCurrentDark,0,1);
        }

        public playBackgroundBuzzAnimation(){
            let r = Dev.Config.GameConfig.DisplayConfig;
            let aC = Dev.Config.AnimConfig.Animation;
            let duration = aC.duration.bgBuzzFallDown;
            let ease = aC.ease.bgBuzzFallDown;
            let count = aC.count.bgBuzzFallDown;
            let y = r.height/2+count;
            if(this._idleBackground)
            this._idleBackground.pause();
            TweenMax.to(this._bgCurrent,duration,{y:y,ease:ease,yoyo:true,repeat:1});
            TweenMax.to(this._bgCurrentDark,duration,{y:y,ease:ease,yoyo:true,repeat:1});
            TweenMax.to(this._bgNext,duration,{y:y,ease:ease,yoyo:true,repeat:1});
            TweenMax.to(this._bgNextClone,duration,{y:y,ease:ease,yoyo:true,repeat:1});
        }

        public playBackgroundPositionAnimation(toX:number,toY:number){
            let aC = Dev.Config.AnimConfig.Animation;
            let duration = aC.duration.bgChangePosition;
            let ease = aC.ease.bgChangePosition;
            
            TweenMax.to(this._bgCurrent,duration,{x:toX,y:toY,ease:ease});
            TweenMax.to(this._bgCurrentDark,duration,{x:toX,y:toY,ease:ease});
            TweenMax.to(this._bgNext,duration,{x:toX,y:toY,ease:ease});
            TweenMax.to(this._bgNextClone,duration,{x:toX,y:toY,ease:ease,onComplete:()=>{
                this._idleBackground.resume();
            }});
        }

        /**
         * Changes background sprite type
         * @param type - Enum.SpinMode type
         * @param cBg - current bg
         * @param cDBg -current dark bg
         * @param from - from value
         * @param to - to value
         */
        private changeBackgroundSpriteType(type:Enum.SpinMode,cBg:Core.Modules.Sprite,cDBg:Core.Modules.Sprite,from:number,to:number){
            let aC = Config.AnimConfig.Animation;  
            switch (type) {
                case Enum.SpinMode.FreeSpin:
                    cBg.changeSprite(Config.AssetConfig.FreeSpinSpinBg.frame);
                    cDBg.changeSprite(Config.AssetConfig.FreeSpinSpinDarkBg.frame);
                    this._floatContainer.visible = false;
                    break;
                case Enum.SpinMode.NormalSpin:
                    cBg.changeSprite(Config.AssetConfig.NormalSpinBg.frame);
                    cDBg.changeSprite(Config.AssetConfig.NormalSpinDarkBg.frame);
                    this._floatContainer.visible = true;
                    break;
            }
            TweenMax.fromTo(cBg, aC.duration.bgSwitch,{alpha:from},{alpha:to,ease:aC.ease.bgSwitch});
            TweenMax.fromTo(cDBg, aC.duration.bgSwitch,{alpha:from},{alpha:to,ease:aC.ease.bgSwitch});
            this._currentSpinMode = type;
        }

        private playIdleBackground():void {
            let aC = Config.AnimConfig.Animation;
            if(this._idleBackground){
                this._idleBackground.resume();
            }else{
                this._idleBackground = new TimelineMax({repeat:-1});
                let randomTime =  aC.duration.bgIdleRandTimeMin + Math.floor(Math.random() * Math.floor(aC.duration.bgIdleRandTimeMax));
                let randAlpha =  aC.count.bgIdleRandMinAlpha + Math.floor(Math.random() * Math.floor(aC.count.bgIdleRandMaxAlpha));

                this._idleBackground.to(this._bgCurrentDark,aC.duration.bgIdle,{alpha:1,ease:aC.ease.bgIdle});
                this._idleBackground.to(this._bgCurrentDark,aC.duration.bgIdle,{alpha:randAlpha,ease:aC.ease.bgIdle});
                this._idleBackground.to(this._bgCurrentDark,aC.duration.bgIdle,{alpha:1,ease:aC.ease.bgIdle});
                this._idleBackground.to(this._bgCurrentDark,aC.duration.bgIdle,{alpha:1,ease:aC.ease.bgIdle},"+="+randomTime);
            }
        }

        private playIdleBubbles(){
            let aC = Config.AnimConfig.Animation;
            for(let i = 0; i<this._bubbles.length; i++){
                gsap.to(this._bubbles[i], {
                    motionPath: {
                        path: BubblePaths[i].path,
                        align: "self"
                    },
                    repeat:-1,
                    duration: BubblePaths[i].duration,
                    delay: 1,
                    repeatDelay:BubblePaths[i].repeatDelay,
                    ease: aC.ease.bgIdleBubble
                });
            }
        }

        public get container(){
            return this._container;
        }
    }
}
