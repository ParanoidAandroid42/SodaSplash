

namespace Core.Managers {

    export class ResourceManager extends PIXI.utils.EventEmitter {
        
        private _loader: PIXI.Loader;
        private _cdnPath:string;
        public static Instance: ResourceManager;  
        
        /**
       * ResourceManager constructor
        */
        constructor() {
            super();
            ResourceManager.Instance = this;
            this._cdnPath = Dev.Config.GameConfig.StartConfig.cdnPath;
        }

        public assetLoading() {  
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

        public assetPreLoading(){
            this._loader = new PIXI.Loader(); 
            this.addPreTextures();
            this._loader.load();   
            
            this._loader.onProgress.add(this.onPreProgress.bind(this)); 
            this._loader.onError.add(this.onPreError.bind(this)); 
            this._loader.onLoad.add(this.onPreLoad.bind(this)); 
            this._loader.onComplete.add(this.onPreComplete.bind(this));
        }

        public addTextures(){
            let textures = Object.keys(Dev.Enum.Texture);
            for(let i = 0; i<textures.length; i++)
                this._loader.add(this._cdnPath + Dev.Enum.Texture[textures[i]]);
        }

        public addPreTextures(){
            let textures = Object.keys(Dev.Enum.PreTexture);
            for(let i = 0; i<textures.length; i++)
                this._loader.add(this._cdnPath + Dev.Enum.PreTexture[textures[i]]);
        }

        public addWebFonts(){
            let webFonts = Object.keys(Dev.Enum.WebFont);
            for(let i = 0; i<webFonts.length; i++){
                WebFont.load({
                    custom: {
                        families: [Dev.Enum.WebFont[webFonts[i]]],
                        urls: [this._cdnPath+Dev.Enum.WebFont.FontUrl]
                    }
                });
            }
        }

        public addSpines(){
            let spines = Object.keys(Dev.Enum.SpineAnimation);
            for(let i = 0; i<spines.length; i++)
                this._loader.add(this._cdnPath+Dev.Enum.SpineAnimation[spines[i]]);
        }

         /**
        * Called once per error file
         */
        private onError() {

        }

        /**
        * Called once per loaded file
        */
        private onLoad() {
            this.emit(Dev.Enum.ResourceListener.AssetLoading);
        }

        /**
        * Called once when the queued resources all load.
         */
        private onComplete() {
            this.emit(Dev.Enum.ResourceListener.AssetLoadCompleted);
        }

        /**
        *Called once per loaded/error file
        */
        private onProgress() {
        }

           /**
        * Called once per error file
         */
        private onPreError() {

        }

        /**
        * Called once per loaded file
        */
        private onPreLoad() {
        }

        /**
        * Called once when the queued resources all load.
         */
        private onPreComplete() {
            this.emit(Dev.Enum.ResourceListener.AssetPreLoadCompleted);
        }

        /**
        *Called once per loaded/error file
        */
        private onPreProgress() {
        }


        public getSpineData(resourceName:string): any{
            return this._loader.resources[resourceName].spineData;
        }
    } 
}