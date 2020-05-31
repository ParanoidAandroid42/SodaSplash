
module Dev.Controller {

    import Listener = Enum.Listeners; 
    
    /** running like dictionary*/
    interface Machine<T> {
        [K: string]: T; 
    }
    
    export class MachineController extends PIXI.utils.EventEmitter{
        
        private _slotMachine: Machine<Modules.Machine> = {};
        private _machineType : Enum.MachineType;
        private _container:Core.Modules.Container;
        private _controlBar : Modules.ControlBar;
        private _winLines:Modules.Winlines;
        private _currentSpinAction: Enum.SpinAction = Enum.SpinAction.StartSpin;
        private _currentMachineType : string;
        private _game:Core.Controller.GameController;

        /**
         * Creates an instance of slot machine controller.
         * @param slotMachineType -Information.SlotMachineType
         * @param container - parentContainer
         */
        public constructor(container:Core.Modules.Container) {
            super();
            this._machineType = Config.SlotConfig.MachineType;
            this._container = new Core.Modules.Container(0,0,container,"SlotMachineContainer");
            this._game = GameController.Instance;
            this.initProperties();
            this._slotMachine[this._currentMachineType].updateSlotSymbolIndex(this._game.dataController.data.symbolMatrix);
        }

        private initProperties():void {
            this.initSlotMachine(this._machineType);
            this._controlBar = new Modules.ControlBar(this._container);
            this._winLines = new Modules.Winlines(this._container);
            this._controlBar.updateData(this._game.dataController.data,false);
            this.initEvents();
        }

        /**
         * Inits events
         */
        private initEvents():void{
            this.initSlotBarEvents();
            this.initSlotMachineEvents();
            this.initWinLinesEvents();
        }

        /**
         * init slot machine due to slot machine type
         * @param type - slot machine type
         */
        private initSlotMachine(type:Enum.MachineType){
            switch(this._machineType){
                case Enum.MachineType.Slider:
                    this._currentMachineType = Modules.SliderMachine.toString();
                    this._slotMachine[this._currentMachineType] = new Modules.SliderMachine(this._container);
                    break;
            }
        }
        /**
         * Inits slot bar events
         */
        private initSlotBarEvents(){
            let mL = Enum.Listeners; 
            this._controlBar.on(mL.OnSpinBarAction,this.checkSlotBarAction.bind(this));
        }

        private initSlotMachineEvents(){
            let mL = Enum.Listeners; 
            this._slotMachine[this._currentMachineType].on(mL.OnSpinMachineAction,this.checkSlotAnimState.bind(this));
        }
        
        private initWinLinesEvents(){
            let mL = Enum.Listeners;
            this._winLines.on(mL.OnWinLinesAction,this.checkSlotAnimState.bind(this)); 
        } 

        /**
         * Change slot machine configurations due to slot machine type
         * @param type - slot machine type
         */
        private changeSlotMachineType(type:Enum.MachineType){
            this._machineType = type;
            this._slotMachine[this._currentMachineType].destroy();
            this.initSlotMachine(type);
        }
        
        public onDataAction(action:Dev.Enum.DataListener,data:Interface.IResponseData){
            switch(action){
                case Dev.Enum.DataListener.message:   
                    this._currentSpinAction = Enum.SpinAction.StopSpin;
                    this.checkSlotBarAction();         
                    break;
            }
        }

        public onGameAnimationAction(action : Dev.Enum.GameAnimListener):void {
            let machine = this._slotMachine[this._currentMachineType];
            let data:Interface.IResponseData = this._game.dataController.data;
            let matchOffset = this._slotMachine[this._currentMachineType].slotMachineConfig.duration.winOffset;
            let loopOffset = this._slotMachine[this._currentMachineType].slotMachineConfig.duration.loopOffset;
            switch(action){
                case Enum.GameAnimListener.MatchSymbolWin:
                    machine.playMatchAnimation(data.symbolWins,0,matchOffset);
                    break;
                case Enum.GameAnimListener.LoopMatchSymbolWin:
                    machine.playLoopMatchAnimation(data.symbolWins,0,loopOffset);
                    break;
            }
        } 

        public onAnimationAction(action : Dev.Enum.AnimListener):void {
            let data:Interface.IResponseData = this._game.dataController.data;
            switch(action){
                case Enum.AnimListener.PlayNextAnimation:
                    this.emit(Enum.Listeners.OnAnimationAction,action,data);
                    break;
                case Enum.AnimListener.SortScenarioAnimation: 
                    this.emit(Enum.Listeners.OnAnimationAction,action,data);
                    break;
            }
        }
        
        /**
         * Checks slot bar action
         */
        private checkSlotBarAction(){
            let machine = this._slotMachine[this._currentMachineType];
            switch(this._currentSpinAction){
                case Enum.SpinAction.StartSpin:
                    machine.playSpinAnimation();
                    this._game.dataController.fakePayCalculate();
                    this._controlBar.setButtonState(Enum.SpinButtonState.Stop,false);
                    this._currentSpinAction = Enum.SpinAction.ForceSpin;
                    machine.reelStoppedIndex = 0;
                    let spinningDuration = machine.slotMachineConfig.duration.spinningDuration;
                    Core.Managers.TickerManager.instance.addTimeout("fakeData",spinningDuration,()=>{
                        this.onDataAction(Dev.Enum.DataListener.message,null);
                    },false)
                    break;
                case Enum.SpinAction.ForceSpin:
                    machine.updateSlotSymbolIndex(this._game.dataController.data.symbolMatrix);
                    machine.playForceStopAnimation();
                    this._controlBar.setButtonState(Enum.SpinButtonState.Stop,false);
                    break;
                case Enum.SpinAction.SkipSpin:
                    machine.playSkippedAnimation();
                    this.onAnimationAction(Enum.AnimListener.PlayNextAnimation);
                    break;
                case Enum.SpinAction.QuickSpin:
                    break;
                case Enum.SpinAction.StopSpin:
                    machine.updateSlotSymbolIndex(this._game.dataController.data.symbolMatrix);
                    this._currentSpinAction = Enum.SpinAction.ForceSpin;
                    machine.playStopAnimation();  
                    this._controlBar.setButtonState(Enum.SpinButtonState.Stop,true);
                    break;
            }
        }

        /**
         * Checks slot anim state according to Info.SlotAnimState
         * @param animationAction 
         */
        public checkSlotAnimState(animationAction:Enum.SlotAnimState,value:any):void{
            let machine = this._slotMachine[this._currentMachineType];
            let data:Interface.IResponseData = this._game.dataController.data;
            switch(animationAction){
                case Enum.SlotAnimState.SpinStarted:
                    machine.playSkippedAnimation();
                    this._controlBar.setButtonState(Enum.SpinButtonState.Stop,true);  //TODO will be changed
                    this._currentSpinAction = Enum.SpinAction.ForceSpin;
                    this._game.dataController.data.balance.cents --;
                    this._game.dataController.data.balance.coins --;  
                    this._controlBar.updateData(this._game.dataController.data,false);
                    break;
                case Enum.SlotAnimState.ReelSpinCompleted:
                    this.emit(Enum.Listeners.OnSpinMachineAction,Enum.SlotAnimState.ReelSpinCompleted);
                    break;
                case Enum.SlotAnimState.SpinCompleted:
                    this._controlBar.setButtonState(Enum.SpinButtonState.Normal,true); 
                    this._currentSpinAction = Enum.SpinAction.StartSpin;
                    break;
                case Enum.SlotAnimState.SpinQuicked:
                    break;
                case Enum.SlotAnimState.WinUpdated:
                    this._controlBar.updateWin(value,true);
                    break;
                case Enum.SlotAnimState.SpinForceStopped:
                    this._controlBar.setButtonState(Enum.SpinButtonState.Normal,false); 
                    this._currentSpinAction = Enum.SpinAction.StartSpin;
                    this.onAnimationAction(Enum.AnimListener.SortScenarioAnimation);
                    break;
                case Enum.SlotAnimState.SpinStopped:
                    this._controlBar.setButtonState(Enum.SpinButtonState.Normal,true); 
                    this._currentSpinAction = Enum.SpinAction.StartSpin;
                    this.onAnimationAction(Enum.AnimListener.SortScenarioAnimation); 
                    break;
                case Enum.SlotAnimState.MatchSymbolWinStarted: 
                    this._currentSpinAction = Enum.SpinAction.SkipSpin;
                    this._controlBar.setButtonState(Enum.SpinButtonState.Skip,true); 
                    break;
                case Enum.SlotAnimState.MatchSymbolWinFinished:
                    this._currentSpinAction = Enum.SpinAction.StartSpin;
                    this._controlBar.setButtonState(Enum.SpinButtonState.Normal,true); 
                    Core.Managers.TickerManager.instance.addTimeout("fakelerderya",3.5,()=>{
                        this.onAnimationAction(Enum.AnimListener.PlayNextAnimation);
                    },false)
                    break;
                case Enum.SlotAnimState.WinLineStarted:
                    this._winLines.playWinlineAnimation(machine.slotMachineConfig,data.symbolWins,value.index,machine.matrixSymbols,value.loop);
                    break;
                case Enum.SlotAnimState.WinLineFinished:
                    this._winLines.playWinLineFadeOutAnimation(machine.winLineInfo);
                    break;
                case Enum.SlotAnimState.SpinSkipped:
                    this._currentSpinAction = Enum.SpinAction.StartSpin;
                    //todo kazandığı anim winler sliderbara eklenecek ve winler update
                    this._winLines.stopWinLineAnimation();
                    break;
            }
        }
        
        public get slotMachine(): Modules.Machine {
            return this._slotMachine[this._currentMachineType];
        }

        public get container(){
            return this._container;
        }
    }
}