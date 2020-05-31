namespace Dev.Modules {

    export class Symbol extends Core.Modules.Container{

        private _matchAnim : Core.Modules.SequenceAnimation;
        private _fakeMatchAnim : Core.Modules.SequenceAnimation;
        private _symbolInfo : Interface.ISymbolConfig;
        private _machineInfo : Interface.ISlotConfig;
        private _symbolConfig : Interface.ISymbolConfig;
        private _index : number;
        private _reelMatrix : {r:number,c:number};
        private _spine:Core.Modules.Spine;

        /**
         * Creates an instance of symbol.
         * @param p - parent container
         * @param sI - symbol Index
         * @param rM - reel matrix
         */
        public constructor(mI:Interface.ISlotConfig,sI : number,p:Core.Modules.Container,rM:{r:number,c:number}) {
            let offset = mI.symbol.offset;
            let scale = mI.symbol.scale;
            super(0,(scale.y+offset.y)*(rM.r),p);
            this._spine = new Core.Modules.Spine(0,0,mI.slotSymbols[sI].spineConfig,p,scale.x,scale.y)
            this._index = sI;
            this._machineInfo = mI;
            this._symbolInfo =  mI.slotSymbols[sI];
            this._reelMatrix = rM;
            this.initProperties();
        }

        private initProperties(){
            let matchFrame = Config.AssetConfig.MatchFrame;
            this._matchAnim = new Core.Modules.SequenceAnimation(0,0,matchFrame,this);
            this.addChild(this._spine);
            this._fakeMatchAnim = new Core.Modules.SequenceAnimation(0,0,matchFrame,this);
            this._fakeMatchAnim.alpha = .2;
            this._matchAnim.alpha = .5;
        }

        public playMatchAnimation(){
             this._matchAnim.playAnimation(Enum.AnimNames.MatchFrame);
             this._fakeMatchAnim.playAnimation(Enum.AnimNames.MatchFrame);
             this._spine.playAnimation(Dev.Enum.AnimNames.SymbolMatch);
        }

        public set symbolConfig(config:Interface.ISymbolConfig){
            this._symbolConfig = config;
            let width = this._spine.width;
            let height = this._spine.height;
            this._spine.destroy();
            let spine = new Core.Modules.Spine(0,0,config.spineConfig,this,width,height);
            this._spine = spine;
            this._spine.playAnimation(Dev.Enum.AnimNames.SymbolIdle);
            this.addChild( this._fakeMatchAnim);
        }

        public set index(index:number){
            this._index = index;
            this.symbolConfig = this._machineInfo.slotSymbols[this._index];
        }

        public get spine(){
            return this._spine;
        }

        public get index(){
            return this._index;
        }

        public get reelMatrix(){
             return this._reelMatrix;
        }
    }
}