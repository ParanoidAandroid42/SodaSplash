namespace Core.Managers {
    /**
     * ResourceManager is responsible for loading and managing game assets,
     * including textures, spine animations, and web fonts. It uses PIXI's loader
     * to handle asset loading and emits events during the loading process.
     */
    export class ResourceManager extends PIXI.utils.EventEmitter {
        private _loader: PIXI.Loader;
        private _cdnPath: string;
        public static Instance: ResourceManager;

        /**
         * ResourceManager constructor
         */
        constructor() {
            super();
            ResourceManager.Instance = this;
            this._cdnPath = Dev.Config.GameConfig.StartConfig.cdnPath;
        }

        /**
         * Loads all assets including textures, spines, and web fonts.
         */
        public assetLoading(): void {
            this._loader = new PIXI.Loader();
            this.addTextures();
            this.addSpines();
            this.addWebFonts();
            this._loader.load();

            this._loader.onProgress.add(this.onProgress.bind(this));
            this._loader.onError.add(this.onError.bind(this));
            this._loader.onLoad.add(this.onLoad.bind(this));
            this._loader.onComplete.add(this.onComplete.bind(this));
        }

        /**
         * Preloads assets like textures.
         */
        public assetPreLoading(): void {
            this._loader = new PIXI.Loader();
            this.addPreTextures();
            this._loader.load();

            this._loader.onProgress.add(this.onPreProgress.bind(this));
            this._loader.onError.add(this.onPreError.bind(this));
            this._loader.onLoad.add(this.onPreLoad.bind(this));
            this._loader.onComplete.add(this.onPreComplete.bind(this));
        }

        /**
         * Adds textures to the loader.
         */
        public addTextures(): void {
            const textures = Object.keys(Dev.Enum.Texture);
            for (const texture of textures) {
                this._loader.add(this._cdnPath + Dev.Enum.Texture[texture]);
            }
        }

        /**
         * Adds preloading textures to the loader.
         */
        public addPreTextures(): void {
            const textures = Object.keys(Dev.Enum.PreTexture);
            for (const texture of textures) {
                this._loader.add(this._cdnPath + Dev.Enum.PreTexture[texture]);
            }
        }

        /**
         * Adds web fonts to the loader.
         */
        public addWebFonts(): void {
            const webFonts = Object.keys(Dev.Enum.WebFont);
            for (const font of webFonts) {
                WebFont.load({
                    custom: {
                        families: [Dev.Enum.WebFont[font]],
                        urls: [this._cdnPath + Dev.Enum.WebFont.FontUrl],
                    },
                });
            }
        }

        /**
         * Adds spine animations to the loader.
         */
        public addSpines(): void {
            const spines = Object.keys(Dev.Enum.SpineAnimation);
            for (const spine of spines) {
                this._loader.add(this._cdnPath + Dev.Enum.SpineAnimation[spine]);
            }
        }

        /**
         * Called once per error file during asset loading.
         */
        private onError(): void {
            // Handle asset loading error
        }

        /**
         * Called once per loaded file.
         */
        private onLoad(): void {
            this.emit(Dev.Enum.ResourceListener.AssetLoading);
        }

        /**
         * Called once when all queued resources are loaded.
         */
        private onComplete(): void {
            this.emit(Dev.Enum.ResourceListener.AssetLoadCompleted);
        }

        /**
         * Called once per loaded/error file to track progress.
         */
        private onProgress(): void {
            // Handle progress update
        }

        /**
         * Called once per error file during asset preloading.
         */
        private onPreError(): void {
            // Handle preloading error
        }

        /**
         * Called once per loaded file during asset preloading.
         */
        private onPreLoad(): void {
            // Handle file load during preloading
        }

        /**
         * Called once when all queued resources are preloaded.
         */
        private onPreComplete(): void {
            this.emit(Dev.Enum.ResourceListener.AssetPreLoadCompleted);
        }

        /**
         * Called once per loaded/error file during asset preloading to track progress.
         */
        private onPreProgress(): void {
            // Handle progress update during preloading
        }

        /**
         * Retrieves spine data for a given resource.
         * @param resourceName - The name of the resource to get spine data for.
         * @returns The spine data associated with the resource.
         */
        public getSpineData(resourceName: string): any {
            return this._loader.resources[resourceName]?.spineData;
        }
    }
}
