module Core.Controller {
    export abstract class ResourceController extends PIXI.utils.EventEmitter {
        /** Constructor for the ResourceController class. Initializes the class. */
        public constructor() {
            super();
            this.init();
            this.initEvents();
        }

        /** Abstract method to initialize the class. Must be implemented by subclasses. */
        public abstract init(): void;

        /** Abstract method to handle asset loading. Must be implemented by subclasses. */
        public abstract assetLoading(): void;

        /** Abstract method called when assets load is completed. Must be implemented by subclasses. */
        public abstract assetsLoadCompleted(): void;

        /** Abstract method to initialize events. Must be implemented by subclasses. */
        public abstract initEvents(): void;
    }
}
