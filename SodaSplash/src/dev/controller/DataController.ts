
module Dev.Controller {
    export class DataController extends Core.Controller.DataController{

        private _developmentMode:boolean;

        private _data: Interface.IResponseData = {
            balance: {cents:500,coins:500},
            currencySymbol: "Euro",
            earn: { coins: 0, cents: 0 },
            totalEarn: { coins: 0, cents: 0 },
            bet: { betLines: 10, betLevelValues: null, coinValues: null },
            symbolWins: null,
            symbolMatrix: [
                [this.randomSymbolIndex(),this.randomSymbolIndex(),this.randomSymbolIndex(),this.randomSymbolIndex(),this.randomSymbolIndex()],
                [this.randomSymbolIndex(),this.randomSymbolIndex(),this.randomSymbolIndex(),this.randomSymbolIndex(),this.randomSymbolIndex()],
                [this.randomSymbolIndex(),this.randomSymbolIndex(),this.randomSymbolIndex(),this.randomSymbolIndex(),this.randomSymbolIndex()]
            ]
        };

        /** DataController class's init function */
        public constructor() {
            super();
            this._developmentMode = false;
        }

        init(){
        }
        public fakePayCalculate(){
            if(!this._developmentMode){
                this._data.symbolMatrix = [
                    [this.randomSymbolIndex(),this.randomSymbolIndex(),this.randomSymbolIndex(),this.randomSymbolIndex(),this.randomSymbolIndex()],
                    [this.randomSymbolIndex(),this.randomSymbolIndex(),this.randomSymbolIndex(),this.randomSymbolIndex(),this.randomSymbolIndex()],
                    [this.randomSymbolIndex(),this.randomSymbolIndex(),this.randomSymbolIndex(),this.randomSymbolIndex(),this.randomSymbolIndex()]
                ]
            }

            let wins = new Array<Interface.IWData>();
            let symbolCounts : Array<Array<number>> = new Array<Array<number>>();
            for(let t = 0; t<Object.keys(Enum.SlotSymbol).length/2; t++){
                let symbolCount: Array<number> = new Array<number>();
                symbolCounts.push(symbolCount);
            }
            for(let i = 0; i<this._data.symbolMatrix.length; i++){
                for(let t = 0; t<Object.keys(Enum.SlotSymbol).length/2; t++)symbolCounts[t].push(0);
                for(let j = 0; j<this._data.symbolMatrix[i].length; j++){
                    let symbolIndex = this._data.symbolMatrix[i][j];
                    symbolCounts[symbolIndex][i]++;
                }
            }
            
            let payoutData = Config.DataConfig.PayoutData;
            for(let i = 0; i<payoutData.length; i++){
                if(this.checkCombination(payoutData,symbolCounts,i)){
                    let winSymbolMatrix = this.setSymbolMatrix(payoutData[i]);
                    let win:Interface.IWData = {
                        winType:Enum.WinType.SymbolWin,
                        lineIndex:payoutData[i].lineIndex,
                        currency:payoutData[i].payout,
                        winSymbolMatrix : winSymbolMatrix
                    }
                    wins.push(win);
                }
            }   

            if(wins.length!=0)
            this._data.symbolWins = wins;
            else
            this._data.symbolWins = null;
        }

        private setSymbolMatrix(payoutData:Interface.IPayout):Array<Dev.Interface.IMatrix>{
            let winline = Config.SlotConfig.SliderMachine.winLine;
            let path = winline.winLinesPath[payoutData.lineIndex];
            let combination = payoutData.combination;
            let winSymbolMatrix: Array<Dev.Interface.IMatrix> = new Array<Dev.Interface.IMatrix>();
            for(let i = 0; i<path.length; i++){
                let row = 0;
                let column  = 0;
                for(let j = 0; j<combination.length; j++){
                    row = path[i].row;
                    column = path[i].column;
                    if(this._data.symbolMatrix[row][column] == combination[j].symbol){
                        winSymbolMatrix.push({row:row,column:column});
                    }
                }

                if(winSymbolMatrix.length == 0)
                winSymbolMatrix.push({row:row,column:column});
            }
            return winSymbolMatrix;
        }

        private checkCombination(payoutData:any,symbolCounts:any,index:number):boolean{
            let checks : Array<boolean> = new Array<boolean>();
            for(let j = 0; j<payoutData[index].combination.length; j++){
                checks.push(false);
                let symbolCount = symbolCounts[payoutData[index].combination[j].symbol];
                if(payoutData[index].combination[j].count == symbolCount[payoutData[index].lineIndex]){
                    checks[j] = true;
                }
            }

            for(let m = 0; m<checks.length; m++){
                if(!checks[m])
                return false;
            }

            return true;
        }

        private randomSymbolIndex(){
            let random = 0 + Math.floor(Math.random() * Math.floor(5)); 
            return random;
        }

        dataAction(data:Interface.IResponseData){
            if(data.currentAction != undefined){
                this._data = data;
                this.fakeFreeSpinData();
                this.emit(Dev.Enum.DataListener.message,this._data);
            }
        }

        fakeFreeSpinData(){
            this._data.currentAction = Dev.Enum.DataListener.spin;
            this._data.nextAction = Dev.Enum.DataListener.freeSpin;
            this._data.earn = {cents:100,coins:100};
            this._data.freeSpin.remainingSpinCount = 5;
            this._data.freeSpin.earn = {cents:100,coins:100};
            this._data.reelSetType = Enum.MachineType.Slider;
            this._data.reelMatrix = {row:3,column:5};
          //  this._data.symbolMatrix = 
            return this._data;
        }

        initEvents(){
            window.addEventListener(Dev.Enum.DataListener.message,(data:any)=>{ this.dataAction(data.data);});
        }
        
        public get data(): Interface.IResponseData {
            return this._data;
        }
        public set data(value: Interface.IResponseData) {
            this._data = value;
        }
    }
}