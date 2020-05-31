namespace Dev.Modules {

    export class Menu extends PIXI.utils.EventEmitter {

        private _container : Core.Modules.Container;

        public constructor(container:Core.Modules.Container) {
            super();
            this._container = new Core.Modules.Container(0,0,container,"BackgroundContainer");
            this.initProperties();
        }

        private initProperties(){
            let r = Dev.Config.GameConfig.DisplayConfig;
            let aI = Config.AssetConfig;
           // let menu = new Core.Modules.Sprite(r.width/2,r.height/2,aI.MenuRef,this._container,1280,720);
        }
    }
}