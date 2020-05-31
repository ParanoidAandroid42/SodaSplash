namespace Dev.Controller {
    import Listener = Enum.Listeners;

    /** Running like dictionary */
    interface Machine<T> {
        [K: string]: T;
    }

    /**
     * Manages the slot machine's state, animations, and interactions.
     */
    export class MachineController extends PIXI.utils.EventEmitter {
        private _slotMachine: Machine<Modules.Machine> = {};
        private _machineType: Enum.MachineType;
        private _container: Core.Modules.Container;
        private _controlBar: Modules.ControlBar;
        private _winLines: Modules.Winlines;
        private _currentSpinAction: Enum.SpinAction = Enum.SpinAction.StartSpin;
        private _currentMachineType: string;
        private _game: Core.Controller.GameController;

        /**
         * Creates an instance of MachineController.
         * @param container - The parent container for the slot machine.
         */
        public constructor(container: Core.Modules.Container) {
            super();
            this._machineType = Config.SlotConfig.MachineType;
            this._container = new Core.Modules.Container(0, 0, container, 'SlotMachineContainer');
            this._game = GameController.Instance;
            this.initProperties();
            this._slotMachine[this._currentMachineType].updateSlotSymbolIndex(this._game.dataController.data.symbolMatrix);
        }

        /**
         * Initializes properties of the MachineController.
         */
        private initProperties(): void {
            this.initSlotMachine(this._machineType);
            this._controlBar = new Modules.ControlBar(this._container);
            this._winLines = new Modules.Winlines(this._container);
            this._controlBar.updateData(this._game.dataController.data, false);
            this.initEvents();
        }

        /**
         * Initializes event listeners for the controller.
         */
        private initEvents(): void {
            this.initSlotBarEvents();
            this.initSlotMachineEvents();
            this.initWinLinesEvents();
        }

        /**
         * Initializes the slot machine based on the machine type.
         * @param type - The type of slot machine.
         */
        private initSlotMachine(type: Enum.MachineType): void {
            switch (type) {
                case Enum.MachineType.Slider:
                    this._currentMachineType = 'SliderMachine';
                    this._slotMachine[this._currentMachineType] = new Modules.SliderMachine(this._container);
                    break;
                // Add other machine types if needed
            }
        }

        /**
         * Initializes events for the slot bar.
         */
        private initSlotBarEvents(): void {
            this._controlBar.on(Listener.OnSpinBarAction, this.checkSlotBarAction.bind(this));
        }

        /**
         * Initializes events for the slot machine.
         */
        private initSlotMachineEvents(): void {
            this._slotMachine[this._currentMachineType].on(Listener.OnSpinMachineAction, this.checkSlotAnimState.bind(this));
        }

        /**
         * Initializes events for the win lines.
         */
        private initWinLinesEvents(): void {
            this._winLines.on(Listener.OnWinLinesAction, this.checkSlotAnimState.bind(this));
        }

        /**
         * Changes the slot machine type and re-initializes the slot machine.
         * @param type - The new slot machine type.
         */
        private changeSlotMachineType(type: Enum.MachineType): void {
            this._machineType = type;
            this._slotMachine[this._currentMachineType].destroy();
            this.initSlotMachine(type);
        }

        /**
         * Handles data actions.
         * @param action - The type of data action.
         * @param data - The response data.
         */
        public onDataAction(action: Dev.Enum.DataListener, data: Interface.IResponseData): void {
            if (action === Dev.Enum.DataListener.message) {
                this._currentSpinAction = Enum.SpinAction.StopSpin;
                this.checkSlotBarAction();
            }
        }

        /**
         * Handles game animation actions.
         * @param action - The type of game animation action.
         */
        public onGameAnimationAction(action: Dev.Enum.GameAnimListener): void {
            const machine = this._slotMachine[this._currentMachineType];
            const data = this._game.dataController.data;
            const matchOffset = machine.slotMachineConfig.duration.winOffset;
            const loopOffset = machine.slotMachineConfig.duration.loopOffset;

            switch (action) {
                case Enum.GameAnimListener.MatchSymbolWin:
                    machine.playMatchAnimation(data.symbolWins, 0, matchOffset);
                    break;
                case Enum.GameAnimListener.LoopMatchSymbolWin:
                    machine.playLoopMatchAnimation(data.symbolWins, 0, loopOffset);
                    break;
            }
        }

        /**
         * Handles animation actions.
         * @param action - The type of animation action.
         */
        public onAnimationAction(action: Dev.Enum.AnimListener): void {
            const data = this._game.dataController.data;
            switch (action) {
                case Enum.AnimListener.PlayNextAnimation:
                case Enum.AnimListener.SortScenarioAnimation:
                    this.emit(Enum.Listeners.OnAnimationAction, action, data);
                    break;
            }
        }

        /**
         * Checks and handles slot bar actions.
         */
        private checkSlotBarAction(): void {
            const machine = this._slotMachine[this._currentMachineType];
            switch (this._currentSpinAction) {
                case Enum.SpinAction.StartSpin:
                    machine.playSpinAnimation();
                    this._game.dataController.fakePayCalculate();
                    this._controlBar.setButtonState(Enum.SpinButtonState.Stop, false);
                    this._currentSpinAction = Enum.SpinAction.ForceSpin;
                    machine.reelStoppedIndex = 0;
                    const spinningDuration = machine.slotMachineConfig.duration.spinningDuration;
                    Core.Managers.TickerManager.instance.addTimeout(
                        'fakeData',
                        spinningDuration,
                        () => {
                            this.onDataAction(Dev.Enum.DataListener.message, null);
                        },
                        false,
                    );
                    break;
                case Enum.SpinAction.ForceSpin:
                    machine.updateSlotSymbolIndex(this._game.dataController.data.symbolMatrix);
                    machine.playForceStopAnimation();
                    this._controlBar.setButtonState(Enum.SpinButtonState.Stop, false);
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
                    this._controlBar.setButtonState(Enum.SpinButtonState.Stop, true);
                    break;
            }
        }

        /**
         * Checks and handles slot animation state changes.
         * @param animationAction - The type of slot animation state.
         * @param value - Additional value or data.
         */
        public checkSlotAnimState(animationAction: Enum.SlotAnimState, value: any): void {
            const machine = this._slotMachine[this._currentMachineType];
            const data = this._game.dataController.data;
            switch (animationAction) {
                case Enum.SlotAnimState.SpinStarted:
                    machine.playSkippedAnimation();
                    this._controlBar.setButtonState(Enum.SpinButtonState.Stop, true);
                    this._currentSpinAction = Enum.SpinAction.ForceSpin;
                    data.balance.cents--;
                    data.balance.coins--;
                    this._controlBar.updateData(data, false);
                    break;
                case Enum.SlotAnimState.ReelSpinCompleted:
                    this.emit(Enum.Listeners.OnSpinMachineAction, Enum.SlotAnimState.ReelSpinCompleted);
                    break;
                case Enum.SlotAnimState.SpinCompleted:
                    this._controlBar.setButtonState(Enum.SpinButtonState.Normal, true);
                    this._currentSpinAction = Enum.SpinAction.StartSpin;
                    break;
                case Enum.SlotAnimState.SpinQuicked:
                    break;
                case Enum.SlotAnimState.WinUpdated:
                    this._controlBar.updateWin(value, true);
                    break;
                case Enum.SlotAnimState.SpinForceStopped:
                    this._controlBar.setButtonState(Enum.SpinButtonState.Normal, false);
                    this._currentSpinAction = Enum.SpinAction.StartSpin;
                    this.onAnimationAction(Enum.AnimListener.SortScenarioAnimation);
                    break;
                case Enum.SlotAnimState.SpinStopped:
                    this._controlBar.setButtonState(Enum.SpinButtonState.Normal, true);
                    this._currentSpinAction = Enum.SpinAction.StartSpin;
                    this.onAnimationAction(Enum.AnimListener.SortScenarioAnimation);
                    break;
                case Enum.SlotAnimState.MatchSymbolWinStarted:
                    this._currentSpinAction = Enum.SpinAction.SkipSpin;
                    this._controlBar.setButtonState(Enum.SpinButtonState.Skip, true);
                    break;
                case Enum.SlotAnimState.MatchSymbolWinFinished:
                    this._currentSpinAction = Enum.SpinAction.StartSpin;
                    this._controlBar.setButtonState(Enum.SpinButtonState.Normal, true);
                    Core.Managers.TickerManager.instance.addTimeout(
                        'fakelerderya',
                        3.5,
                        () => {
                            this.onAnimationAction(Enum.AnimListener.PlayNextAnimation);
                        },
                        false,
                    );
                    break;
                case Enum.SlotAnimState.WinLineStarted:
                    this._winLines.playWinlineAnimation(
                        machine.slotMachineConfig,
                        data.symbolWins,
                        value.index,
                        machine.matrixSymbols,
                        value.loop,
                    );
                    break;
                case Enum.SlotAnimState.WinLineFinished:
                    this._winLines.playWinLineFadeOutAnimation(machine.winLineInfo);
                    break;
                case Enum.SlotAnimState.SpinSkipped:
                    this._currentSpinAction = Enum.SpinAction.StartSpin;
                    this._winLines.stopWinLineAnimation();
                    break;
            }
        }

        /**
         * Gets the current slot machine.
         */
        public get slotMachine(): Modules.Machine {
            return this._slotMachine[this._currentMachineType];
        }

        /**
         * Gets the container.
         */
        public get container() {
            return this._container;
        }
    }
}
