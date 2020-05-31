
/// <reference path="../stages/LoaderStage.ts"/>

namespace Dev.Controller{

    import ResourceManager = Core.Managers.ResourceManager;

    import StageManager = Core.Managers.StageManager;
    import LoaderStage = Stages.LoaderStage;

    export class ResourceController extends Core.Controller.ResourceController {

        constructor() {
            super();
        }

        init(): void {
        }

        initEvents(): void {
            let listener = Dev.Enum.ResourceListener;
            let resource = ResourceManager.Instance;
            resource.once(listener.AssetLoading,this.assetLoading.bind(this));
            resource.on(listener.AssetLoadCompleted,this.assetsLoadCompleted.bind(this));
            resource.once(listener.AssetPreLoadCompleted,resource.assetLoading.bind(resource));
            
            resource.assetPreLoading();
        }

        assetLoading(): void {
            StageManager.Instance.addStage(LoaderStage,true);
        }

        assetsLoadCompleted(): void {
            let listener = Dev.Enum.ResourceListener;
            let stage = StageManager.Instance;
            Core.Managers.TickerManager.instance.addTimeout("loaded",1,()=>{
                stage.changeStage(Stages.MainStage,true);
                GameController.Instance.emit(listener.AssetLoadCompleted);
            },false);
        }
    }
}