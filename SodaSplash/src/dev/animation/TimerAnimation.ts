
module Dev.Animation {

    export class TimerAnimation extends PIXI.utils.EventEmitter{

        private _container: Core.Modules.Container
        private _mask: Core.Modules.Graphic;
        private _timeText: PIXI.Text;
        private _time: any;

        /**
         * Creates an instance of timer animation.
         * @param parentContainer - parent
         */
        constructor(parentContainer:Core.Modules.Container) {
            super();
            this._container = new Core.Modules.Container(0,0,parentContainer,"TimerAnimation");
            parentContainer.addChild(this._container);
            this.init();
        }

        private init(): void {
            let dR = Config.GameConfig.DisplayConfig;
            let aI = Dev.Config.AssetConfig;
            let a = Core.Enum.Anchor;

            this._mask = new Core.Modules.Graphic(300,1450,500,500,aI.TimerCircle,this._container);
            this._timeText = new Core.Modules.Text(0,0,aI.TimerText,this._container);
            this._container.alpha = 0;
        }

        private maskAnimation(): void {
            this._mask.alpha = 0.85;
            TweenLite.fromTo(this._mask.scale, 0.25, {x:0,y:0},{
                x: 1, y: 1,
                onComplete: () => {
                    TweenLite.to(this._mask, 0.25, {alpha: 0});
                }
            });
        }

        setVisualPortrait(): void {
            let dR = Dev.Config.GameConfig.DisplayConfig;
            this._container.position.set(dR.width/2,dR.height/2);
        }

        setVisualLandscape(): void {
            let dR = Dev.Config.GameConfig.DisplayConfig;
            this._container.position.set(dR.width/2,dR.height/2);
            
        } 

        public resolveTimer(isShow: boolean): void {
            switch (isShow) {
                case true:
                    TweenLite.to(this._container, 0.25, {alpha: 0.8});
                    this.setTimeText(this.setTime);
                    break;
                case false:
                    TweenLite.to(this._container, 0.25, {alpha: 0 });
                    this.setTimeText(this.setTime);
                    break;
            }
        }

        private resolveTiming(value: any): void {
            TweenLite.fromTo(this._timeText.scale, 0.25,{x: 1.5, y: 1.5}, {
                x: 1, y: 1, onStart: () => {
                    TweenLite.to(this._timeText.scale, 0.25, {x: 1.5, y: 1.5});
                    if(value == 0){
                        this.resolveTimer(false);
                    }else{
                        this.resolveTimer(true);
                    }
                }
            });
        }

        public setTimeText(value: any) {
            if(value != 0){
                this.maskAnimation();
                this._timeText.text = (value)  + "";
                this.setTime = value;
            }else{
               // this.maskAnimation();
                this._timeText.text = "";
                this.setTime = value;
            }
        }

        public set setTime(value: any) {
            if(value!=undefined){
                if (this._time != value) {
                    this._time = value;
                    this.resolveTiming(value);
                }
            }
        }

        public get setTime(): any {
            return this._time;
        }

        public get container():Core.Modules.Container{
            return this._container;
        }
    }

}