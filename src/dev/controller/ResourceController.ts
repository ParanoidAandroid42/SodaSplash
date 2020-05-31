/// <reference path="../stages/LoaderStage.ts"/>

namespace Dev.Controller {
    import ResourceManager = Core.Managers.ResourceManager;
    import StageManager = Core.Managers.StageManager;
    import LoaderStage = Stages.LoaderStage;

    /**
     * Manages the loading and initialization of game resources.
     */
    export class ResourceController extends Core.Controller.ResourceController {
        /**
         * Creates an instance of ResourceController.
         */
        constructor() {
            super();
        }

        /**
         * Initializes the resource controller.
         */
        init(): void {
            // Initialization logic can be added here
        }

        /**
         * Initializes event listeners for resource loading.
         */
        initEvents(): void {
            const listener = Dev.Enum.ResourceListener;
            const resource = ResourceManager.Instance;
            resource.once(listener.AssetLoading, this.assetLoading.bind(this));
            resource.on(listener.AssetLoadCompleted, this.assetsLoadCompleted.bind(this));
            resource.once(listener.AssetPreLoadCompleted, resource.assetLoading.bind(resource));

            resource.assetPreLoading();
        }

        /**
         * Handles the asset loading process by adding the loader stage.
         */
        assetLoading(): void {
            StageManager.Instance.addStage(LoaderStage, true);
        }

        /**
         * Handles actions to be performed after assets have been loaded.
         */
        assetsLoadCompleted(): void {
            const listener = Dev.Enum.ResourceListener;
            const stage = StageManager.Instance;
            Core.Managers.TickerManager.instance.addTimeout(
                'loaded',
                1,
                () => {
                    stage.changeStage(Stages.MainStage, true);
                    GameController.Instance.emit(listener.AssetLoadCompleted);
                },
                false,
            );
        }
    }
}
