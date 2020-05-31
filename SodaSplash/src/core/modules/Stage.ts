/// <reference path="../modules/Container.ts"/>
/// <reference path='../controller/GameController.ts'/>
namespace Core.Modules {

    import GameController = Core.Controller.GameController;
    export abstract class Stage extends Container{

        public game:any;
        
          /**
         * display manager constructor
         * @param {number} x - Stage's positionX
         * @param {number} y - Stage's positionY
         * @param {number} n - Stage's name
         * @param {number} p - Stage's parent
         */
        constructor(x?: number, y?: number,p?: PIXI.Container, n?: string) {
            super(x, y,p,n);
        }

        /**
         * running when loading stage
         * @param args - any arguments
         */
        public abstract init(...args: any[]): void; 

        /**z
         * running when destroying stage
         */
        public abstract dispose(): void;
        public abstract setVisualPortrait():void;
        public abstract setVisualLandscape(): void;
        public abstract initEvents():void;

        public initDisplayEvents(){
            let dI = Dev.Enum.DisplayListener;
            this.game.on(dI.OrientationChanged,this.onOrientationChanged.bind(this));
        }

        onOrientationChanged(value:any){
            switch(value){
                case Dev.Enum.Orientation.Landscape:
                    this.setVisualLandscape();
                    break;
                case Dev.Enum.Orientation.Portrait:
                    this.setVisualPortrait();
                break;
            }
        }
    }
}