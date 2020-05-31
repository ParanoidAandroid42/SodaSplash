namespace Dev.Modules {

    export class SliderMatchIcon extends Core.Modules.Sprite {

        private _container : Core.Modules.Container;
        private _machineInfo : Interface.ISlotConfig;
        private _symbolInfo : Interface.ISymbolConfig;
        private _symbolIndex:number;
        private _sEmitter: PIXI.particles.Emitter;
        private _particleContainer:Core.Modules.Container;

        public constructor(x:number, y :number, mI:Interface.ISlotConfig,sI: number,p:Core.Modules.Container|any) {
            super(0,0,mI.slotSymbols[sI].winSprite,p,mI.symbol.winSpriteScale.x,mI.symbol.winSpriteScale.y);
            this._container = new Core.Modules.Container(x,y,p,"MatchIcon");
            this._particleContainer = new Core.Modules.Container(0,0,this._container,"MatchIcon");
            let aI = Config.AssetConfig;
            this._machineInfo = mI;
            this._symbolInfo = mI.slotSymbols[sI];
            this._symbolIndex = sI;
            this._sEmitter = new PIXI.particles.Emitter(this._particleContainer, aI.ParticleSpark.frame, aI.FireSparkEmitter); 
            this._container.addChild(this);
            this._sEmitter.maxParticles = 10;
            this._sEmitter.autoUpdate = true;
        }

        /**
         * 
         * Params slider match icon
         * @param fP - from position
         * @param tP - to position
         * @param rM - reel matrix
         */
        public playWinSymbolAnim(tP: {x:number,y:number},rM:{r:number,c:number}){ 
            let l = Enum.Listeners;
            let sA = Enum.SlotAnimState; 
            TweenMax.to(this._container, this._machineInfo.duration.matchIconFallDown,{y:tP.y,
                onComplete:()=>{
                    let speed = this._machineInfo.duration.matchIconLeftSide + this._machineInfo.duration.matchIconLeftSide*rM.c;
                    let ease = this._machineInfo.ease.winSymbolMatch;
                    TweenMax.to(this._container,speed,{x:tP.x,ease:ease,onComplete:()=>{
                        this.emit(l.OnSpinMachineAction,sA.MatchIconFinished,this);
                        this._container.destroy(); 
                    }});
            }});
        }

        public get symbolInfo() {
            return this._symbolInfo;
        }
    }
}