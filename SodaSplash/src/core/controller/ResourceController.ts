
module Core.Controller { 

    export abstract class ResourceController extends PIXI.utils.EventEmitter {

        /** ResourceController class's init function. */
        public constructor() {
            super();
            this.init();
            this.initEvents();
        }

        abstract init():void;
        abstract assetLoading():void;
        abstract assetsLoadCompleted():void;
        abstract initEvents():void;
    }
}