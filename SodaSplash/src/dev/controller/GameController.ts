
namespace Dev.Controller{

    export class GameController extends Core.Controller.GameController {

        constructor(data:Core.Interface.IStartConfig) {
            super(data);
            GameController.Instance = this;
        }

        init(): void {
            this.resourceController = new ResourceController();
        }

        initResource(): void {
            let listener = Dev.Enum.ResourceListener;
            this.once(listener.AssetLoadCompleted,this.onAssetLoadedCompleted);
        }

        initEventData():void {
            let dataListener = Object.keys(Dev.Enum.DataListener);
            for(let i = 0; i<dataListener.length; i++){
                let dataName = Dev.Enum.DataListener[dataListener[i]];
                this.dataController.on(dataName,(data:Interface.IResponseData)=>{
                    this.emit(dataName,data);
                });
            }
        }

        initEventAnimation(): void {
            this.animationController.on(Dev.Enum.Listeners.OnGameAnimAction,this.onGameAnimationAction.bind(this));
            this.on(Dev.Enum.Listeners.OnAnimationAction,this.onAnimationAction.bind(this));
        }

        private onAnimationAction(action : Dev.Enum.AnimListener,data:any):void {
            let onAnimAction = Dev.Enum.Listeners.OnAnimationAction;
            switch(action){
                case Dev.Enum.AnimListener.SortScenarioAnimation:
                    this.animationController.emit(onAnimAction,action,data);
                    break;
                case Dev.Enum.AnimListener.PlayNextAnimation:
                    this.animationController.emit(onAnimAction,action,data);
                    break;
            }
        } 

        private onGameAnimationAction(action : Dev.Enum.GameAnimListener,data:any):void {
            this.emit(Enum.Listeners.OnGameAnimAction,action,data);
        } 

        initEventsDisplay(){
            let display = Core.Managers.DisplayManager.instance;
            display.on(Dev.Enum.DisplayListener.OrientationChanged,this.onOrientationChanged.bind(this));
        }

        onOrientationChanged(value:Dev.Enum.Orientation){
            this.emit(Dev.Enum.DisplayListener.OrientationChanged,value);
        }

        onAssetLoadedCompleted():void{
            this.animationController = new AnimationController();
            this.dataController = new DataController();
            this.initEventsDisplay();
            this.initEventData();
            this.initEventAnimation();
        }
    }
}