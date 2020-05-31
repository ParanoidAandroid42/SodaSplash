/// <reference path="./Container.ts"/>
/// <reference path='../controller/GameController.ts'/>

namespace Core.Modules {
    import GameController = Core.Controller.GameController;

    /**
     * Stage class extends Container to manage different stages in the game.
     * It provides abstract methods for initialization, disposal, and handling visual changes based on orientation.
     */
    export abstract class Stage extends Container {
        public game: any;

        /**
         * Stage constructor
         * @param x - Stage's positionX
         * @param y - Stage's positionY
         * @param p - Stage's parent
         * @param n - Stage's name
         */
        constructor(x?: number, y?: number, p?: PIXI.Container, n?: string) {
            super(x, y, p, n);
        }

        /**
         * Method to be implemented for initializing the stage.
         * @param args - Any arguments required for initialization
         */
        public abstract init(...args: any[]): void;

        /**
         * Method to be implemented for disposing of the stage.
         */
        public abstract dispose(): void;

        /**
         * Method to be implemented for setting visual elements in portrait orientation.
         */
        public abstract setVisualPortrait(): void;

        /**
         * Method to be implemented for setting visual elements in landscape orientation.
         */
        public abstract setVisualLandscape(): void;

        /**
         * Method to be implemented for initializing events.
         */
        public abstract initEvents(): void;

        /**
         * Initializes display events to handle orientation changes.
         */
        public initDisplayEvents(): void {
            const dI = Dev.Enum.DisplayListener;
            this.game.on(dI.OrientationChanged, this.onOrientationChanged.bind(this));
        }

        /**
         * Handles orientation changes and sets visual elements accordingly.
         * @param value - The new orientation value
         */
        public onOrientationChanged(value: any): void {
            switch (value) {
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
