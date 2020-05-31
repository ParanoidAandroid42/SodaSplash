module Core.Controller {
    export abstract class AnimationController extends PIXI.utils.EventEmitter {
        /** Constructor for the AnimationController class. Initializes the class. */
        public constructor() {
            super();
            this.init();
            this.initEvents();
        }

        /** Abstract method to initialize the class. Must be implemented by subclasses. */
        public abstract init(): void;

        /**
         * Abstract method to sort scenario animations.
         * Must be implemented by subclasses.
         * @param data The data used to sort the animations.
         */
        public abstract sortScenarioAnimation(data: unknown): void;

        /** Abstract method to initialize events. Must be implemented by subclasses. */
        public abstract initEvents(): void;
    }
}
