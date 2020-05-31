namespace Dev.Modules {

    const tileWidth:number = 50;

    export class SliderPlatform extends PIXI.utils.EventEmitter {

        private _container : Core.Modules.Container;
        private _leftSide:Core.Modules.Sprite;
        private _tilesContainer:Core.Modules.Container;
        private _tileCirclesContainer:Core.Modules.Container;
        private _tileLinesContainer:Core.Modules.Container;
        private _rightSide:Core.Modules.Sprite;
        private _machineInfo : Interface.ISlotConfig;
        private _containerFilter:Core.Modules.Graphic;
        private _sliderTween:any;

        private _width:number;

        /**
         * Creates an instance of slider.
         * @param x - position x
         * @param y - position y
         * @param w - width
         * @param p - parent container
         */
        public constructor(x:number,y:number,w:number,machineInfo:Interface.ISlotConfig,p:Core.Modules.Container) {
            super();
            this._machineInfo = machineInfo;
            this._container = new Core.Modules.Container(x,y,p,"Platform");
            this._width = w;
            this.initProperties();
        }

        private initProperties(){
            let aI = Config.AssetConfig;
            let r = Dev.Config.GameConfig.DisplayConfig;
            let a = Core.Enum.Anchor;

            this._tilesContainer = new Core.Modules.Container(0,0,this._container,"TilesContainer");
            this._tileCirclesContainer = new Core.Modules.Container(0,0,this._container,"TileCircleContainer");
            this._tileLinesContainer = new Core.Modules.Container(0,0,this._container,"TileLinesContainer");

            this._leftSide = new Core.Modules.Sprite(-this._width/2,0,aI.PlatformSide,this._container,null,null,a.MiddleLeft);
            this._leftSide.scale.set(-1,1);
            let tile:Core.Modules.Sprite;

            let tileCount = this._width/tileWidth;
            for(let i = 0; i<Math.floor(tileCount); i++){
                tile = new Core.Modules.Sprite(this._leftSide.position.x+i*tileWidth,0,aI.PlatformTile,this._tilesContainer,tileWidth,null,a.MiddleLeft);
                let tileLines = new Core.Modules.Sprite(tile.position.x,0,aI.PlatformLine,this._tileLinesContainer,null,null,a.DownLeft);
                if(i%4==0 && i/4>0){
                    let tileCircle = new Core.Modules.Sprite(tile.position.x-tileWidth,0,aI.PlatformCircle,this._tileCirclesContainer);
                }
            }

            this._rightSide = new Core.Modules.Sprite(tile.position.x+tileWidth,0,aI.PlatformSide,this._container,null,null,a.MiddleLeft);
            let tileLines = new Core.Modules.Sprite(tile.position.x+tileWidth,0,aI.PlatformLine,this._tileLinesContainer,null,null,a.DownLeft);
            this._container.addChild(this._tileLinesContainer);
            this._containerFilter = new Core.Modules.Graphic(0,0,this._container.width,this._container.height,aI.SliderFilterMask,this._container);
            this._containerFilter.alpha = 0;
            this.playSliderAnimation();
        }

        /**
         * Plays match icon animation
         * @param sI - symbol index
         * @param sP - symbol position
         * @param rM - reel matrix 
         */
        public playMatchIconAnimation(sI:number,sP:{x:number,y:number},rM:{r:number,c:number}){
            let slotSymbols = Config.SlotConfig.SliderMachine.slotSymbols;
            if(slotSymbols[sI].winSprite!=null){
                let r = Dev.Config.GameConfig.DisplayConfig;
                let sliderMatchIcon = new Modules.SliderMatchIcon(sP.x-r.width/2,sP.y,this._machineInfo,sI,this._container);
                sliderMatchIcon.playWinSymbolAnim({x:this._leftSide.position.x-20,y:this._leftSide.position.y-this._leftSide.width},rM);
                this.initEvent(sliderMatchIcon);
            }   
        }

        private playSliderFilterAnimation(mIcon:SliderMatchIcon){
            let duration = this._machineInfo.duration.barFill;
            let ease = this._machineInfo.ease.barFill;
            this._sliderTween = TweenMax.to(this._containerFilter,duration/2,{alpha:.2,
                ease:ease,
                onStart:()=>{
                    let tint = 0xf9fdff; 
                    let colorMatrix = new PIXI.filters.GlowFilter(1,1,1,tint);
                    this._containerFilter.filters = [colorMatrix];
                    colorMatrix.blendMode = PIXI.BLEND_MODES.ADD; 
                },
                onComplete:()=>{
                    TweenMax.to(this._containerFilter,duration,{alpha:0,ease:ease,onComplete:()=>{
                        this._containerFilter.filters = null;
                        this._containerFilter.tint = 0xf9fdff;
                    }});
                }
            });
        }

        private initEvent(mIcon:SliderMatchIcon){
            let l = Enum.Listeners;
            let sA = Enum.SlotAnimState;
            mIcon.on(l.OnSpinMachineAction,(sA:Enum.SlotAnimState,sI:number)=>{
                this.playSliderFilterAnimation(mIcon);
                this.emit(l.OnSpinMachineAction,sA,sI);
            });
        }

        private playSliderAnimation(){
            let timeline = new TimelineMax({repeat:-1});
            let moveX = (this._tileLinesContainer.children.length+1)*tileWidth/2;
            let duration = this._machineInfo.duration.slider;
            let ease = this._machineInfo.ease.slider;

            timeline.to(this._tileLinesContainer.children,duration, {
                ease: ease,
                x: "-="+tileWidth, 
                modifiers: {
                    x: function(x:number) {
                        return x%moveX + tileWidth/2 + 2;
                    }
                }
            });
        }
    }
}