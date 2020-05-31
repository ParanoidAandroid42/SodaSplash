namespace Dev.Controller {
    /**
     * GameController manages the overall game initialization, resource loading, event handling for data and animations.
     */
    export class GameController extends Core.Controller.GameController {
        /**
         * GameController constructor
         * @param data - Initial game configuration data
         */
        constructor(data: Core.Interface.IStartConfig) {
            super(data);
            GameController.Instance = this;
        }

        /**
         * Initializes the game, setting up the resource controller.
         */
        init(): void {
            this.resourceController = new ResourceController();
        }

        /**
         * Initializes resource loading and sets up a listener for when assets are fully loaded.
         */
        initResource(): void {
            const listener = Dev.Enum.ResourceListener;
            this.once(listener.AssetLoadCompleted, this.onAssetLoadedCompleted.bind(this));
        }

        /**
         * Initializes event listeners for data-related events.
         */
        initEventData(): void {
            const dataListeners = Object.keys(Dev.Enum.DataListener);
            for (let i = 0; i < dataListeners.length; i++) {
                const dataName = Dev.Enum.DataListener[dataListeners[i]];
                this.dataController.on(dataName, (data: Interface.IResponseData) => {
                    this.emit(dataName, data);
                });
            }
        }

        /**
         * Initializes event listeners for animation-related events.
         */
        initEventAnimation(): void {
            this.animationController.on(Dev.Enum.Listeners.OnGameAnimAction, this.onGameAnimationAction.bind(this));
            this.on(Dev.Enum.Listeners.OnAnimationAction, this.onAnimationAction.bind(this));
        }

        /**
         * Handles animation actions and forwards them to the animation controller.
         * @param action - The animation action
         * @param data - The associated data
         */
        private onAnimationAction(action: Dev.Enum.AnimListener, data: any): void {
            const onAnimAction = Dev.Enum.Listeners.OnAnimationAction;
            switch (action) {
                case Dev.Enum.AnimListener.SortScenarioAnimation:
                case Dev.Enum.AnimListener.PlayNextAnimation:
                    this.animationController.emit(onAnimAction, action, data);
                    break;
            }
        }

        /**
         * Handles game animation actions and emits the event.
         * @param action - The game animation action
         * @param data - The associated data
         */
        private onGameAnimationAction(action: Dev.Enum.GameAnimListener, data: any): void {
            this.emit(Enum.Listeners.OnGameAnimAction, action, data);
        }

        /**
         * Initializes display-related event listeners.
         */
        initEventsDisplay(): void {
            const display = Core.Managers.DisplayManager.instance;
            display.on(Dev.Enum.DisplayListener.OrientationChanged, this.onOrientationChanged.bind(this));
        }

        /**
         * Handles orientation changes and emits the event.
         * @param value - The new orientation value
         */
        onOrientationChanged(value: Dev.Enum.Orientation): void {
            this.emit(Dev.Enum.DisplayListener.OrientationChanged, value);
        }

        /**
         * Called when asset loading is completed. Initializes the animation and data controllers, and sets up event listeners.
         */
        onAssetLoadedCompleted(): void {
            this.animationController = new AnimationController();
            this.dataController = new DataController();
            this.initEventsDisplay();
            this.initEventData();
            this.initEventAnimation();
        }
    }
}
