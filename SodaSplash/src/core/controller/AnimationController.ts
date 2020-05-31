module Core.Controller { 

    export abstract class AnimationController extends PIXI.utils.EventEmitter {
        
        /** AnimationController class's init function. */
        public constructor() {
            super();
            this.init();
            this.initEvents();
        }

        public abstract init():void;
        public abstract sortScenarioAnimation(data:any):void;
        public abstract initEvents():void;
    }
}