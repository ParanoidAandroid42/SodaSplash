
namespace Dev.Modules { 

    export enum SpinDirection {
        up,
        down,
        left,
        right,
        none
    }

    export abstract class Machine extends PIXI.utils.EventEmitter {

        public slotMachineConfig : Interface.ISlotConfig;
        public reelContainers : Array<Core.Modules.Container>;
        public baseReelContainer : Core.Modules.Container;
        public container : Core.Modules.Container;
        public reelContainerPositionY:number;
        public matrixSymbols: Array<Symbol>[] = [];
        public winLineInfo: Interface.IMatchWinLineInfo;
        public winInfo:Interface.IWinsInfo;
        public reelStoppedIndex:number = 0;

        public constructor(slotMachineConfig: Interface.ISlotConfig,container:Core.Modules.Container) {
            super();
            this.slotMachineConfig = slotMachineConfig;
            this.container = new Core.Modules.Container(0,-70,container, "MachineContainer");
            this.baseReelContainer = new Core.Modules.Container(0,0,this.container, "ReelContainer");
            this.initProperties();
        }

        private initProperties():void{
            this.createReelContainers();
            this.init();
        }

        private createReelContainers(){
            this.reelContainers = new Array<Core.Modules.Container>();
            let column = this.slotMachineConfig.machine.reelMatrix.column;
            let dR = Dev.Config.GameConfig.DisplayConfig;
            let row = this.slotMachineConfig.machine.reelMatrix.row;
            for(let i = 0; i<column; i++){
                let sS = this.slotMachineConfig.symbol.scale;
                let sO = this.slotMachineConfig.symbol.offset;
                let pX = dR.width/2 - (Math.floor(column/2)-i)*(sO.x+sS.x);
                let pY = dR.height/2 - (Math.floor(row/2)*(sS.y+sO.y));

                if(column%2 == 0){
                    pX += sS.x/2;
                }
                if(row%2 == 0){
                    pY += sS.y /2;
                }
                this.reelContainerPositionY = pY;
                let container = new Core.Modules.Container(pX,pY,this.baseReelContainer,"ReelContainer");
                this.reelContainers.push(container);
                this.createSlotSymbol(container,i);
            }

            this.matrixSymbols = this.transpose(this.matrixSymbols);
        }

        public updateSlotSymbolIndex(symbolMatrix:Array<Array<number>>){
            for(let i = 0; i<this.matrixSymbols.length; i++){
                for(let j=0; j<this.matrixSymbols[i].length; j++){
                    this.matrixSymbols[i][j].index = symbolMatrix[i][j];
                }
            }
        }
        
        private transpose(matrix: Array<Symbol>[]): Array<Symbol>[]{
            const rows = matrix.length, cols = matrix[0].length;
            const grid = [];
            for (let j = 0; j < cols; j++) {
              grid[j] = Array(rows);
            }
            for (let i = 0; i < rows; i++) {
              for (let j = 0; j < cols; j++) {
                grid[j][i] = matrix[i][j];
              }
            }
            return grid;
          }

        private createSlotSymbol(container:Core.Modules.Container,reelIndex:number){
            let symbols = new Array<Symbol>();
            
            for(let i = -1;i<this.slotMachineConfig.machine.reelMatrix.row; i++){
                let random = 0 + Math.floor(Math.random() * Math.floor(this.slotMachineConfig.slotSymbols.length));
                let symbol = new Symbol(this.slotMachineConfig,random,this.reelContainers[reelIndex],{r:i,c:reelIndex});
                if(i>=0)
                    symbols.push(symbol);
            }
            this.matrixSymbols.push(symbols);
        }

        private playIdleAnimation():void{
            const rows = this.matrixSymbols.length, cols = this.matrixSymbols[0].length;
            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    this.matrixSymbols[i][j].spine.playAnimation(Dev.Enum.AnimNames.SymbolIdle);
                }
            }
        }

        public playFallDownContainer(reelSpinMask:Core.Modules.Graphic):void {
            let sC = this.slotMachineConfig;
            let x = sC.reelMask.fallDownScale.x;
            let y = sC.reelMask.fallDownScale.y;
            reelSpinMask.width = x;
            reelSpinMask.height = y;
            let t1 = this.reelContainers[0].position.y;
            let t2 = this.reelContainers[0].position.y + sC.count.fallDown;
            for(let i = 0; i<this.reelContainers.length; i++){
                let timeline = new TimelineMax({delay:i*sC.duration.fallDownReelOffset});
                this.reelContainers[i].position.y -= sC.count.fallDownEndPositionY;
                timeline.to(this.reelContainers[i], sC.duration.fallDown,  {ease: sC.ease.fallDown,y: t2});
                timeline.to(this.reelContainers[i], sC.duration.fallUp,  
                {
                    ease: sC.ease.fallUp,y: t1,onComplete:()=>
                    {
                        if(i == this.reelContainers.length-1){
                            x = Config.SlotConfig.SliderMachine.reelMask.normalScale.x;
                            y = Config.SlotConfig.SliderMachine.reelMask.normalScale.y;
                            reelSpinMask.width = x;
                            reelSpinMask.height = y;
                            this.playIdleAnimation();
                        }
                    }
                });
            }
        }

        public destroy(){
            this.dispose();
            this.container.destroy({ children: true, baseTexture: true });

        }

        public abstract init():void;
        public abstract playMatchAnimation(wins:Array<Interface.IWData>,index:number,offsetDuration:number):void;
        public abstract playLoopMatchAnimation(wins:Array<Interface.IWData>,index:number,offsetDuration:number):void;
        public abstract playForceStopAnimation():void;
        public abstract playSpinAnimation():void;
        public abstract playStopAnimation():void;
        public abstract playQuickSpinAnimation():void;
        public abstract playSkippedAnimation():void;
         /** running when destroying stage*/
        public abstract dispose():void;
    }
}