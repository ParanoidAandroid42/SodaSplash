namespace Dev.Modules {

    export class Winlines extends PIXI.utils.EventEmitter {

        private _container : Core.Modules.Container;
        private _winLines : Array<Core.Modules.Graphic> = new Array<Core.Modules.Graphic>();
        private _winLineAnimTimeline : any;
        private _amount:Core.Modules.Text;
        private _baseContainer:Core.Modules.Container;

        public constructor(container:Core.Modules.Container) {
            super();
            this._baseContainer = container;
            this.initProperties();
        }

        private initProperties(){
            this._winLineAnimTimeline = new TimelineMax();
        }

        /**
         * Plays winline animation 
         * @param sC - slot Info
         * @param index - winline index
         * @param mS - matrix symbols
         */
        public playWinlineAnimation(sC:Interface.ISlotConfig,wS:Array<Interface.IWData>,index:number,mS:Array<Symbol>[],loop:boolean):void{
            let r = Dev.Config.GameConfig.DisplayConfig;
            let aI = Config.AssetConfig;
            let lineIndex = wS[index].lineIndex;
            let path = sC.winLine.winLinesPath[lineIndex];      
            let duration =  sC.winLine.duration;
            let offset = sC.symbol.offset;
            let scale = sC.symbol.scale;
            let line : Core.Modules.Graphic;
            if( this._container){
                this._container.destroy({children:true,baseTexture:false,texture:false});
            }
            this._container = new Core.Modules.Container(0,0,this._baseContainer,"WinLinesContainer");
            this._winLines = new Array<Core.Modules.Graphic>();      

            for(let j = 0 ; j<path.length-1; j++){
                let currentRow = path[j].row;
                let currentColumn = path[j].column;
                let nextRow = path[j+1].row;
                let nextColumn = path[j+1].column;
                let width = mS[currentRow][currentColumn].parent.position.x;
                let x = mS[currentRow][currentColumn].parent.position.x;
                let y = (scale.y+offset.y)*(currentRow) + mS[currentRow][currentColumn].parent.position.y/2 + 30;
                line = new Core.Modules.Graphic(x,y,path[j].thickness,null,Config.AssetConfig.SlotWinLine,this._container);
                width -= mS[nextRow][nextColumn].parent.position.x;
                width = Math.abs(width);
                x = mS[nextRow][nextColumn].parent.position.x;
                y = (scale.y+offset.y)*(nextRow)-((scale.y+offset.y)*(currentRow));
                y = currentRow==nextRow ? 0:y;
                line.drawLine(new PIXI.Point(x,y),width+path[j].thickness/3.2);
                this._winLines.push(line);
            } 
            
            this._amount = new Core.Modules.Text(r.width/2,r.height/2,aI.WinLineText,this._container);
            this._winLineAnimTimeline.fromTo(this._container,duration,{alpha:0},{alpha:1});
            this._amount.text = wS[index].currency.cents.toString();
            this._amount.position.y =  130 + lineIndex*150;
            if(!loop)
            this.emit(Enum.Listeners.OnWinLinesAction,Enum.SlotAnimState.WinUpdated, wS[index].currency);
        }

        public playWinLineFadeOutAnimation(wI:Interface.IMatchWinLineInfo){
            let duration =  wI.duration;
            this._winLineAnimTimeline.fromTo(this._container,duration,{alpha:1},{alpha:0});
        }

        public stopWinLineAnimation():void{
            if(this._winLineAnimTimeline){
                this._winLineAnimTimeline.restart();
                this._winLineAnimTimeline.kill();
                if( this._container){
                    this._container.destroy({children:true,baseTexture:false,texture:false});
                    this._container.alpha = 0;
                }
                this._winLineAnimTimeline = new TimelineMax();
            }
        }
    }
}