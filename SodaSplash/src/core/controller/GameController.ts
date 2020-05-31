
namespace Core.Controller{

    export abstract class GameController extends PIXI.utils.EventEmitter  {

        public static Instance: GameController;

        public resourceController: Dev.Controller.ResourceController;
        public animationController: Dev.Controller.AnimationController;
        public dataController:Dev.Controller.DataController;

        constructor(data:Core.Interface.IStartConfig) {
            super();
            Dev.Config.GameConfig.StartConfig = data;
            this.initProperties();
        }
        
        /**
         * Inits properties
         */
        private initProperties(){
            this.createManagers();
            this.init();
            this.initResource();
        }

        /**
         * Creates managers
         */
        private createManagers():void {
            new Managers.TickerManager();
            if(Dev.Config.GameConfig.StartConfig.fpsMeter)
                new Modules.StatElement();
            new Managers.AnimationManager();
            new Managers.DisplayManager();
            new Managers.StageManager();
            new Managers.ResourceManager();
        }
        
        abstract init():void;
        abstract initResource():void;
    }
}