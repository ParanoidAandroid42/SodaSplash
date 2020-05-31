namespace Dev.Modules {

    /**
     * Menu class for creating and managing the game's menu.
     */
    export class Menu extends PIXI.utils.EventEmitter {

        private _container: Core.Modules.Container;

        /**
         * Constructor for the Menu class.
         * @param container - The parent container.
         */
        public constructor(container: Core.Modules.Container) {
            super();
            this._container = new Core.Modules.Container(0, 0, container, "MenuContainer");
            this.initProperties();
        }

        /**
         * Initializes the properties of the Menu class.
         */
        private initProperties(): void {
            var displayConfig = Dev.Config.GameConfig.DisplayConfig;
            var assetConfig = Config.AssetConfig;

            // Uncomment and update the following line when the MenuRef asset is available
            //var menu = new Core.Modules.Sprite(displayConfig.width / 2, displayConfig.height / 2, assetConfig.MenuRef, this._container, 1280, 720);
        }
    }
}
