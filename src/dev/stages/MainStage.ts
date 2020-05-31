namespace Dev.Stages {
    import GameController = Controller.GameController;
    import DisplayManager = Core.Managers.DisplayManager;
    import AnimInfo = Config.AnimConfig;

    /**
     * MainStage handles the main gameplay stage, including the background, slot machine, menu, and win animations.
     */
    export class MainStage extends Core.Modules.Stage {
        private _background: Modules.Background;
        private _winAnimation: Modules.WinAnimation;
        private _menuBar: Modules.Menu;
        private _slotMachineController: Controller.MachineController;

        /** Initializes the main stage and its components. */
        public init() {
            this.game = GameController.Instance;
            this._background = new Modules.Background(this);
            this._slotMachineController = new Controller.MachineController(this);
            this._menuBar = new Modules.Menu(this);
            this._winAnimation = new Modules.WinAnimation(this);
            this.onOrientationChanged(DisplayManager.instance.currentOrientation);
        }

        /** Initializes events for the main stage. */
        initEvents() {
            this.initDisplayEvents();
            this.initGameEvents();
            this.initSlotMachineEvents();
            this.initWinAnimationEvents();
            this.initBackgroundEvents();
            this.initMenuBarEvents();
        }

        /** Initializes bonus stage events. */
        private initBonusStage() {
            const bonusState = Core.Managers.StageManager.Instance.getStage(Dev.Stages.BonusStage);
            bonusState.once(Enum.Listeners.OnGameAnimAction, this.onGameAnimationAction.bind(this));
        }

        /**
         * Handles game data actions.
         * @param action The data listener action.
         * @param data The response data.
         */
        private onGameDataAction(action: Dev.Enum.DataListener, data: Interface.IResponseData) {
            switch (action) {
                case Dev.Enum.DataListener.message:
                    this.game.emit(Enum.AnimListener.SortScenarioAnimation, data);
                    break;
            }
            this._slotMachineController.onDataAction(action, data);
            const gameUIData: Interface.IGameUIData = {
                action: Interface.MessageType.SpinState,
                spinButtonState: {
                    skin: Interface.SpinButtonState.Normal,
                    enabled: true,
                    visible: true,
                },
            };
        }

        /**
         * Handles animation actions.
         * @param action The animation listener action.
         * @param data Optional data for the action.
         */
        private onAnimationAction(action: Dev.Enum.AnimListener, data?: any): void {
            switch (action) {
                case Dev.Enum.AnimListener.SortScenarioAnimation:
                    this.game.emit(Enum.Listeners.OnAnimationAction, Enum.AnimListener.SortScenarioAnimation, data);
                    break;
                case Dev.Enum.AnimListener.PlayNextAnimation:
                    this.game.emit(Enum.Listeners.OnAnimationAction, Enum.AnimListener.PlayNextAnimation, data);
                    break;
            }
        }

        /**
         * Handles game animation actions.
         * @param action The game animation listener action.
         * @param data Data for the action.
         */
        private onGameAnimationAction(action: Dev.Enum.GameAnimListener, data: any): void {
            console.log(action);
            let wI: Interface.IWinInfo;
            const r = Dev.Config.GameConfig.DisplayConfig;
            switch (action) {
                case Dev.Enum.GameAnimListener.BigWin:
                    wI = this._slotMachineController.slotMachine.winInfo.bigWin;
                    this._winAnimation.playWinAnimation(Enum.WinType.BigWin, wI, 100);
                    break;
                case Dev.Enum.GameAnimListener.MegaWin:
                    wI = this._slotMachineController.slotMachine.winInfo.megaWin;
                    this._winAnimation.playWinAnimation(Enum.WinType.MegaWin, wI, 100);
                    break;
                case Dev.Enum.GameAnimListener.SuperWin:
                    wI = this._slotMachineController.slotMachine.winInfo.superWin;
                    this._winAnimation.playWinAnimation(Enum.WinType.SuperWin, wI, 100);
                    break;
                case Dev.Enum.GameAnimListener.MatchSymbolWin:
                case Dev.Enum.GameAnimListener.LoopMatchSymbolWin:
                    this._slotMachineController.onGameAnimationAction(action);
                    break;
                case Dev.Enum.GameAnimListener.ShowWinAmount:
                    wI = this._slotMachineController.slotMachine.winInfo.freeSpinStartWin;
                    this._winAnimation.showWinAnimation(1, 300);
                    break;
                case Dev.Enum.GameAnimListener.FreeSpinStart:
                    wI = this._slotMachineController.slotMachine.winInfo.freeSpinStartWin;
                    this._winAnimation.playWinAnimation(Enum.WinType.FreeSpinStartWin, wI, 100);
                    break;
                case Dev.Enum.GameAnimListener.FreeSpinFinished:
                    // Handle free spin finished animation
                    this._background.changeBackgroundType(Enum.SpinMode.NormalSpin);
                    Core.Managers.TickerManager.instance.addTimeout(
                        'fake2',
                        1.5,
                        () => {
                            this.onAnimationAction(Enum.AnimListener.PlayNextAnimation);
                        },
                        false,
                    );
                    break;
                case Dev.Enum.GameAnimListener.BonusStart:
                    this.startBonusStage();
                    break;
                case Dev.Enum.GameAnimListener.BonusFinished:
                    this.endBonusStage();
                    break;
            }
        }

        /**
         * Starts the bonus stage.
         */
        private startBonusStage() {
            const aC = Dev.Config.AnimConfig.Animation;
            const duration = aC.duration.bgChangePosition;
            const ease = aC.ease.bgChangePosition;
            const r = Dev.Config.GameConfig.DisplayConfig;

            TweenMax.fromTo(this._slotMachineController.container.scale, duration, { x: 1, y: 1 }, { ease: ease, x: 2, y: 2 });
            TweenMax.fromTo(
                this._slotMachineController.container,
                duration,
                { x: 0, y: 0 },
                { ease: ease, x: -r.width / 2, y: -r.height / 2 },
            );
            TweenMax.fromTo(
                this._slotMachineController.container,
                1,
                { alpha: 1 },
                {
                    alpha: 0,
                    ease: ease,
                    onCompconste: () => {
                        this._slotMachineController.container.visible = false;
                    },
                },
            );

            let bonusStage: any = Core.Managers.StageManager.Instance.getStage(Stages.BonusStage);
            if (!bonusStage) {
                Core.Managers.StageManager.Instance.addStage(Stages.BonusStage, false);
                bonusStage = Core.Managers.StageManager.Instance.getStage(Stages.BonusStage);
            }

            this._background.playBackgroundPositionAnimation(r.width / 2, r.height / 2 - 200);
            bonusStage.startBonusScreen();
            this.initBonusStage();
        }

        /**
         * Ends the bonus stage and transitions back to the main stage.
         */
        private endBonusStage() {
            const aC = Dev.Config.AnimConfig.Animation;
            const duration = aC.duration.bgChangePosition;
            const ease = aC.ease.bgChangePosition;
            const r = Dev.Config.GameConfig.DisplayConfig;
            const bonusStage = Core.Managers.StageManager.Instance.getStage(Dev.Stages.BonusStage);

            bonusStage.off(Enum.Listeners.OnGameAnimAction);
            this._slotMachineController.container.visible = true;

            TweenMax.fromTo(this._slotMachineController.container.scale, duration, { x: 2, y: 2 }, { x: 1, y: 1, ease: ease });
            TweenMax.fromTo(
                this._slotMachineController.container,
                duration,
                { x: -r.width / 2, y: -r.height / 2 },
                { x: 0, y: 0, ease: ease },
            );
            TweenMax.fromTo(
                this._slotMachineController.container,
                1,
                { alpha: 0 },
                {
                    alpha: 1,
                    ease: ease,
                    onCompconste: () => {
                        Core.Managers.TickerManager.instance.addTimeout(
                            'fake3',
                            0.5,
                            () => {
                                this.onAnimationAction(Enum.AnimListener.PlayNextAnimation);
                            },
                            false,
                        );
                    },
                },
            );

            this._background.playBackgroundPositionAnimation(r.width / 2, r.height / 2);
        }

        /** Initializes slot machine events. */
        private initSlotMachineEvents() {
            this._slotMachineController.on(Enum.Listeners.OnGameAnimAction, this.onGameAnimationAction.bind(this));
            this._slotMachineController.on(Enum.Listeners.OnAnimationAction, this.onAnimationAction.bind(this));
            this._slotMachineController.on(Enum.Listeners.OnSpinMachineAction, this.checkSlotAnimState.bind(this));
        }

        /** Initializes menu bar events. */
        private initMenuBarEvents() {
            // Implementation for menu bar events
        }

        /** Initializes background events. */
        private initBackgroundEvents() {
            // Implementation for background events
        }

        /** Initializes win animation events. */
        private initWinAnimationEvents() {
            this._winAnimation.on(Enum.Listeners.OnWinAnimAction, this.checkSlotAnimState.bind(this));
            this._winAnimation.on(Enum.Listeners.OnAnimationAction, this.onAnimationAction.bind(this));
        }

        /**
         * Checks the slot animation state based on the action.
         * @param animationAction The slot animation state.
         * @param value Additional data for the action.
         */
        public checkSlotAnimState(animationAction: Enum.SlotAnimState, value: any): void {
            switch (animationAction) {
                case Enum.SlotAnimState.FinishedStartFreeSpinWin:
                    this._background.changeBackgroundType(Enum.SpinMode.FreeSpin);
                    Core.Managers.TickerManager.instance.addTimeout(
                        'fake',
                        1.5,
                        () => {
                            this.onAnimationAction(Enum.AnimListener.PlayNextAnimation);
                        },
                        false,
                    );
                    break;
                case Enum.SlotAnimState.ReelSpinCompleted:
                    this._background.playBackgroundBuzzAnimation();
                    break;
            }
        }

        /** Initializes game events. */
        private initGameEvents() {
            const dataListener = Object.keys(Enum.DataListener);
            for (let i = 0; i < dataListener.length; i++) {
                const dataName = Enum.DataListener[dataListener[i]];
                this.game.on(dataName, (data: Interface.IResponseData) => {
                    this.onGameDataAction(dataName, data);
                });
            }
            this.game.on(Enum.Listeners.OnGameAnimAction, this.onGameAnimationAction.bind(this));
        }

        /** Sets the visual layout for portrait mode. */
        setVisualPortrait(): void {
            // Implementation for portrait mode layout
        }

        /** Sets the visual layout for landscape mode. */
        setVisualLandscape(): void {
            // Implementation for landscape mode layout
        }

        /** Cleans up resources and listeners when destroying the stage. */
        public dispose() {
            // Implementation for cleanup
        }
    }
}
