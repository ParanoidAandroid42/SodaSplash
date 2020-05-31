
namespace Core.Managers {

    /** running like dictionary*/
    interface Stage<T> {
        [K: string]: T; 
    }

    export class StageManager {        
        
        private _stages: Stage<Core.Modules.Stage> = {};
        private readonly _stageContainer: Modules.Container;
        private _currentStage : Modules.Stage = null;
        private _bg:Core.Modules.Graphic;
        public static Instance: StageManager;


        constructor() {
            let dR = Dev.Config.GameConfig.DisplayConfig;
            let aI = Dev.Config.AssetConfig;
            StageManager.Instance = this;
            this._stageContainer = new Modules.Container(0,0,DisplayManager.instance.rendererContainer, "StageContainer");
            this._bg = new Core.Modules.Graphic(dR.width/2,dR.height/2,dR.width*3,dR.height*3,aI.StageRect,this._stageContainer);
        }

        /**
         * Creates stage
         * @param stage 
         * @param stageName 
         * @param tween - alpha animation boolean 
         */
        private createStage(stage: any, stageName: string,tween:boolean) {
            if (this._stages[stageName] == null) {   
                this._stages[stageName] = new stage();
                this._stages[stageName].name = stageName;
                this._stageContainer.addChild(this._stages[stageName]);
                if(tween)
                {
                    TweenMax.fromTo(this._bg,1,{alpha:1},{alpha:0});
                    TweenMax.fromTo(this._stages[stageName],1,{alpha:0},{alpha:1});
                }else{
                    this._bg.alpha = 0;
                    this._stages[stageName].alpha = 1;
                }
                this._stageContainer.addChild(this._bg);
            }
            this._currentStage = stage;
        }

        /**
         * change stage according to stageType. if run this function will be remove current stage
         *  @param {any}  stage - Stage type
         *  @param {any}  tween - alpha animation boolean
         */
        public changeStage(stage: any,tween:boolean) {
            StageManager.Instance.removeStage(this._currentStage,tween);
            if(tween)
            {
                Core.Managers.TickerManager.instance.addTimeout("stageChange",1,()=>{
                    StageManager.Instance.addStage(stage,tween);
                },false);
            }else{
                StageManager.Instance.addStage(stage,tween);
            }
            
        }

        /**
         * started stage's init function.if run this function will not be remove current stage
         * @param {any}  stage - Stage type 
         *  @param {any}  tween - alpha animation boolean
          */
        public addStage(stage: any,tween:boolean) {
            this.createStage(stage, stage.name,tween);
            this._stages[stage.name].init();
            this._stages[stage.name].initEvents();
        }

        /**
         * getting stage' if the stage was created before.
         * @param stage
         */
        public getStage(stage: any): Core.Modules.Stage { 
            return this._stages[stage.name];
        }

         /**
          * remove stage if the stage was created before.
          * @param stage
          */
        public removeStage(stage: any,tween:boolean) {
            let stageName = stage.name;
             if(tween)
            {
                TweenMax.fromTo(this._bg,1,{alpha:0},{alpha:1});
                TweenMax.fromTo(this._stages[stageName],1,{alpha:1},{alpha:0,onComplete:()=>{
                    this._stages[stageName].dispose();
                    this._stages[stageName].destroy({ children: true, baseTexture: true });
                    delete this._stages[stageName];
                }});
            }else{
                this._bg.alpha = 0;
                this._stages[stageName].alpha = 0;
                this._stages[stageName].dispose();
                this._stages[stageName].destroy({ children: true, baseTexture: true });
                delete this._stages[stageName];
            }
        }

        /**
         * getting main container
        */
        public get stageContainer(): Modules.Container{
            return this._stageContainer;
        }

        public get currentStage():Modules.Stage {
            return this._currentStage;
        }
    }
}