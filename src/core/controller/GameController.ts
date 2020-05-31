namespace Core.Controller {
    export abstract class GameController extends PIXI.utils.EventEmitter {
        public static Instance: GameController;

        public resourceController: Dev.Controller.ResourceController;
        public animationController: Dev.Controller.AnimationController;
        public dataController: Dev.Controller.DataController;

        /**
         * Constructor for the GameController class.
         * @param data Configuration data used to start the game.
         */
        constructor(data: Core.Interface.IStartConfig) {
            super();
            Dev.Config.GameConfig.StartConfig = data;
            this.initProperties();
        }

        /**
         * Initializes properties.
         */
        private initProperties(): void {
            this.createManagers();
            this.init();
            this.initResource();
        }

        /**
         * Creates managers required by the game.
         */
        private createManagers(): void {
            new Managers.TickerManager();
            if (Dev.Config.GameConfig.StartConfig.fpsMeter) {
                new Modules.StatElement();
            }
            new Managers.AnimationManager();
            new Managers.DisplayManager();
            new Managers.StageManager();
            new Managers.ResourceManager();
        }

        /** Abstract method to initialize the game. Must be implemented by subclasses. */
        abstract init(): void;

        /** Abstract method to initialize game resources. Must be implemented by subclasses. */
        abstract initResource(): void;
    }
}
