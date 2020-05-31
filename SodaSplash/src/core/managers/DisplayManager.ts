

/// <reference path="../../dev/config/GameConfig.ts"/>
namespace Core.Managers {

    import GameInformation = Dev.Config.GameConfig;
    import ResizeModeType = Dev.Enum.ScaleModeType;
    import Orientation = Dev.Enum.Orientation;
    import DisplayListener = Dev.Enum.DisplayListener;

    export class DisplayManager extends PIXI.utils.EventEmitter  {
        
        public static instance: DisplayManager;
        
        private _renderer:PIXI.CanvasRenderer;
        private _rendererContainer: PIXI.Container;
        private _targetCanvas:any;

        private _width: number;
        private _height: number;

        private _currentOrientation:Orientation;                                                                                                                                    ;
        private _app:any;
        private to: any = 0;

          /**
         * display manager constructor
          */
        constructor() {
            super();
            DisplayManager.instance = this;
            let w = GameInformation.DisplayConfig.width;
            let h = GameInformation.DisplayConfig.height;
            this.initProperties(w,h);
        }

          /**
         * display manager manager's init function
         * @param {number}  w - Display width
         * @param {number} h - Display height
          */
        private initProperties(w: number, h: number) {
            let targetCanvasName: any = GameInformation.StartConfig.targetCanvasName;
            this._targetCanvas = document.getElementById(targetCanvasName);
            this._app = new PIXI.Application({
                width:w,
                height:h,
                backgroundColor: 0x0000,
                antialias:true
              });
            this._app.renderer.view.id = "videoslot";
            if(this._targetCanvas!=undefined)
            this._targetCanvas.appendChild(this._app.view);
            else
            document.body.appendChild(this._app.view);
            if(GameInformation.StartConfig.maxHeight!=undefined && GameInformation.StartConfig.maxHeight!=0)
            GameInformation.DisplayConfig.resizeMode = ResizeModeType.MaxHeight;
            this._rendererContainer = this._app.stage;
            this._renderer = this._app.renderer;
            this._width = w;
            this._height = h;
            this._currentOrientation = Dev.Enum.Orientation.None;
            document.getElementById("videoslot"); 
            this.onResizeHandler(); 
            this.initEvents();
        }

        private initEvents() {
            if(Dev.Config.GameConfig.StartConfig.fullScreen){
                //init event for mobile
                document.body.ontouchend = this.onFullscreenChange.bind(this);
                //init event for desktop
                document.body.onclick = this.onFullscreenChange.bind(this);
            }

            window.addEventListener(DisplayListener.Resize, this.onResizeHandler.bind(this));
        }
        
        public onFullscreenChange() {
            var elem = document.documentElement;
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem["mozRequestFullScreen"]) { /* Firefox */
                elem["mozRequestFullScreen"]();
            } else if (elem["webkitRequestFullscreen"]) { /* Chrome, Safari & Opera */
                elem["webkitRequestFullscreen"]();
            } else if (elem["msRequestFullscreen"]) { /* IE/Edge */
                elem["msRequestFullscreen"]();
            }
        }

        public onResizeHandler(): void {
            this.setResizeMode();
            clearTimeout(this.to);
            this.to = setTimeout(() => {
                this.setOrientationMode();
            }, 50);
        }

        public setOrientationMode(){
            let width ,height;
            switch(GameInformation.DisplayConfig.resizeMode){
                case ResizeModeType.Full:
                    width = window.innerWidth;
                    height = window.innerHeight;
                    if (height >= width && this._currentOrientation !=Orientation.Portrait) {
                        this.currentOrientation = Orientation.Portrait;
                    } else if(height < width && this._currentOrientation !=Orientation.Landscape) {
                        this.currentOrientation = Orientation.Landscape;
                    }
                    break;
                case ResizeModeType.MaxHeight:
                    width = this._targetCanvas.clientWidth;
                    height = this._targetCanvas.clientHeight;
                    if (width<=450 && this._currentOrientation !=Orientation.Portrait) {
                        this.currentOrientation = Orientation.Portrait;
                    } else if(width>450 && this._currentOrientation !=Orientation.Landscape) {
                        this.currentOrientation = Orientation.Landscape;
                    }
                    break;
                case ResizeModeType.SafeArea:
                    break;
            }
        }

        public setResizeMode(){
            let r;
            let w,h;
            switch(GameInformation.DisplayConfig.resizeMode){
                case ResizeModeType.Full:
                    h = window.innerHeight;
                    r = Math.min(window.innerWidth/GameInformation.DisplayConfig.width,
                        window.innerHeight/ GameInformation.DisplayConfig.height);
                    w = Math.ceil(GameInformation.DisplayConfig.width * r);
                    h = Math.ceil(GameInformation.DisplayConfig.height * r);
                    this._renderer.resize(w,h);
                    this._rendererContainer.scale.y = this._rendererContainer.scale.x = r;
                    break;
                case ResizeModeType.MaxHeight:
                    var maxHeight = GameInformation.StartConfig.maxHeight;
                    w = this._targetCanvas.clientHeight;
                    r = Math.min(this._targetCanvas.clientWidth / GameInformation.DisplayConfig.width,this._targetCanvas.clientHeight / GameInformation.DisplayConfig.height);
                    w = Math.ceil(GameInformation.DisplayConfig.width * r);
                    h = Math.ceil(GameInformation.DisplayConfig.height * r);
                    if(h<maxHeight)
                       maxHeight = h;
                    this._renderer.resize(this._targetCanvas.clientWidth,maxHeight);
                    this._rendererContainer.scale.y = this._rendererContainer.scale.x = r;
                    var clientW = this._targetCanvas.clientWidth;
                    var displayW = GameInformation.DisplayConfig.width * r;
                    this._rendererContainer.position.x = (clientW - displayW) / 2;
                    break;
                case ResizeModeType.SafeArea:
                    break;
            }
        }

        public get renderer(): PIXI.CanvasRenderer {
            return this._renderer;
        } 

        public get rendererContainer() {
            return this._rendererContainer;
        }

        public get width() {
            return this._width;
        }

        public get height() {
            return this._height;
        }

        public get currentOrientation(){
            return this._currentOrientation;
        }

        public set currentOrientation(value:Dev.Enum.Orientation){
            this._currentOrientation = value;
            this.emit(Dev.Enum.DisplayListener.OrientationChanged,value);
        }
    }
}