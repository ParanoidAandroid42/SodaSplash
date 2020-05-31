/// <reference path="../../dev/config/GameConfig.ts"/>

namespace Core.Managers {
    import GameInformation = Dev.Config.GameConfig;
    import ResizeModeType = Dev.Enum.ScaleModeType;
    import Orientation = Dev.Enum.Orientation;
    import DisplayListener = Dev.Enum.DisplayListener;

    /**
     * DisplayManager is responsible for handling the display settings and managing
     * the PIXI application, including resizing and orientation changes.
     */
    export class DisplayManager extends PIXI.utils.EventEmitter {
        public static instance: DisplayManager;

        private _renderer: PIXI.CanvasRenderer;
        private _rendererContainer: PIXI.Container;
        private _targetCanvas: HTMLElement;

        private _width: number;
        private _height: number;

        private _currentOrientation: Orientation;
        private _app: PIXI.Application;
        private resizeTimeout: number = 0;

        /**
         * Constructs the DisplayManager, initializing the PIXI application and setting up properties.
         */
        constructor() {
            super();
            DisplayManager.instance = this;
            const { width, height } = GameInformation.DisplayConfig;
            this.initProperties(width, height);
        }

        /**
         * Initializes display properties and sets up the PIXI application.
         * @param w - Display width
         * @param h - Display height
         */
        private initProperties(w: number, h: number): void {
            const targetCanvasName = GameInformation.StartConfig.targetCanvasName;
            this._targetCanvas = document.getElementById(targetCanvasName) as HTMLElement;
            this._app = new PIXI.Application({
                width: w,
                height: h,
                backgroundColor: 0x000000,
                antialias: true,
            });
            this._app.renderer.view.id = 'videoslot';

            if (this._targetCanvas) {
                this._targetCanvas.appendChild(this._app.view);
            } else {
                document.body.appendChild(this._app.view);
            }

            if (GameInformation.StartConfig.maxHeight) {
                GameInformation.DisplayConfig.resizeMode = ResizeModeType.MaxHeight;
            }

            this._rendererContainer = this._app.stage;
            this._renderer = this._app.renderer as PIXI.CanvasRenderer;
            this._width = w;
            this._height = h;
            this._currentOrientation = Orientation.None;

            this.onResizeHandler();
            this.initEvents();
        }

        /**
         * Initializes event listeners for resizing and fullscreen changes.
         */
        private initEvents(): void {
            if (GameInformation.StartConfig.fullScreen) {
                document.body.ontouchend = this.onFullscreenChange.bind(this);
                document.body.onclick = this.onFullscreenChange.bind(this);
            }
            window.addEventListener(DisplayListener.Resize, this.onResizeHandler.bind(this));
        }

        /**
         * Handles fullscreen change requests.
         */
        public onFullscreenChange(): void {
            const elem = document.documentElement;
            if (elem.requestFullscreen) {
                elem.requestFullscreen();
            } else if (elem['mozRequestFullScreen']) {
                /* Firefox */
                elem['mozRequestFullScreen']();
            } else if (elem['webkitRequestFullscreen']) {
                /* Chrome, Safari & Opera */
                elem['webkitRequestFullscreen']();
            } else if (elem['msRequestFullscreen']) {
                /* IE/Edge */
                elem['msRequestFullscreen']();
            }
        }

        /**
         * Handles window resize events, updating the display accordingly.
         */
        public onResizeHandler(): void {
            this.setResizeMode();
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = window.setTimeout(() => {
                this.setOrientationMode();
            }, 50);
        }

        /**
         * Sets the orientation mode based on the current resize mode.
         */
        public setOrientationMode(): void {
            let width, height;
            switch (GameInformation.DisplayConfig.resizeMode) {
                case ResizeModeType.Full:
                    width = window.innerWidth;
                    height = window.innerHeight;
                    this._currentOrientation = height >= width ? Orientation.Portrait : Orientation.Landscape;
                    break;
                case ResizeModeType.MaxHeight:
                    width = this._targetCanvas.clientWidth;
                    height = this._targetCanvas.clientHeight;
                    this._currentOrientation = width <= 450 ? Orientation.Portrait : Orientation.Landscape;
                    break;
                case ResizeModeType.SafeArea:
                    // Implement safe area handling if necessary
                    break;
            }
        }

        /**
         * Sets the resize mode, updating the renderer size and scale.
         */
        public setResizeMode(): void {
            let width, height, scaleRatio;
            switch (GameInformation.DisplayConfig.resizeMode) {
                case ResizeModeType.Full:
                    height = window.innerHeight;
                    scaleRatio = Math.min(
                        window.innerWidth / GameInformation.DisplayConfig.width,
                        height / GameInformation.DisplayConfig.height,
                    );
                    width = Math.ceil(GameInformation.DisplayConfig.width * scaleRatio);
                    height = Math.ceil(GameInformation.DisplayConfig.height * scaleRatio);
                    this._renderer.resize(width, height);
                    this._rendererContainer.scale.set(scaleRatio);
                    break;
                case ResizeModeType.MaxHeight:
                    const maxHeight = GameInformation.StartConfig.maxHeight;
                    scaleRatio = Math.min(
                        this._targetCanvas.clientWidth / GameInformation.DisplayConfig.width,
                        this._targetCanvas.clientHeight / GameInformation.DisplayConfig.height,
                    );
                    width = Math.ceil(GameInformation.DisplayConfig.width * scaleRatio);
                    height = Math.ceil(GameInformation.DisplayConfig.height * scaleRatio);
                    this._renderer.resize(this._targetCanvas.clientWidth, Math.min(maxHeight, height));
                    this._rendererContainer.scale.set(scaleRatio);
                    this._rendererContainer.position.x = (this._targetCanvas.clientWidth - width) / 2;
                    break;
                case ResizeModeType.SafeArea:
                    // Implement safe area handling if necessary
                    break;
            }
        }

        /**
         * Gets the current renderer instance.
         */
        public get renderer(): PIXI.CanvasRenderer {
            return this._renderer;
        }

        /**
         * Gets the renderer container.
         */
        public get rendererContainer(): PIXI.Container {
            return this._rendererContainer;
        }

        /**
         * Gets the current display width.
         */
        public get width(): number {
            return this._width;
        }

        /**
         * Gets the current display height.
         */
        public get height(): number {
            return this._height;
        }

        /**
         * Gets the current orientation.
         */
        public get currentOrientation(): Orientation {
            return this._currentOrientation;
        }

        /**
         * Sets the current orientation and emits an orientation change event.
         */
        public set currentOrientation(value: Orientation) {
            this._currentOrientation = value;
            this.emit(DisplayListener.OrientationChanged, value);
        }
    }
}
