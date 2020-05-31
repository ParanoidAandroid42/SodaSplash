namespace Dev.Modules {
    /**
     * Class representing a Slider Machine in the game.
     * Extends the Machine class and handles the functionality specific to a slider machine.
     */
    export class SliderMachine extends Machine {
        private _reelSpinMask: Core.Modules.Graphic;
        private _frame: Core.Modules.Graphic;
        private _playTimeline: any[];
        private _stopTimeline: any;
        private _sliderPlatform: Modules.SliderPlatform;
        private _sliderBar: Modules.SliderBar;

        /**
         * Constructor for the SliderMachine class.
         * @param container - The parent container where the slider machine will be added.
         */
        public constructor(container: Core.Modules.Container) {
            super(Config.SlotConfig.SliderMachine, container);
        }

        /**
         * Initialize the slider machine by setting up properties, mask, and events.
         */
        public init(): void {
            const r = Dev.Config.GameConfig.DisplayConfig;
            const aI = Config.AssetConfig;

            this.winLineInfo = Config.SlotConfig.SliderMachine.winLine;
            this.winInfo = Config.SlotConfig.SliderMachine.win;

            const frameScale = Config.SlotConfig.SliderMachine.reelMask.frameScale;
            this._frame = new Core.Modules.Graphic(frameScale.pX, frameScale.pY, frameScale.x, frameScale.y, aI.Frame, this.container);
            this.container.addChild(this.reelContainers[0].parent);

            this._sliderPlatform = new Modules.SliderPlatform(r.width / 2, 637, 900, Config.SlotConfig.SliderMachine, this.container);
            this._sliderBar = new Modules.SliderBar(130, 543, Config.SlotConfig.SliderMachine, this.container);

            this.initMask();
            this.playFallDownContainer(this._reelSpinMask);
            this.initEvents();
        }

        /**
         * Initialize events related to the slider machine.
         */
        private initEvents(): void {
            const l = Enum.Listeners;
            this._sliderPlatform.on(l.OnSpinMachineAction, this._sliderBar.onAnimationAction.bind(this._sliderBar));
        }

        /**
         * Initialize mask for the reel spin.
         */
        private initMask(): void {
            const aI = Config.AssetConfig;
            const maskScale = Config.SlotConfig.SliderMachine.reelMask.normalScale;
            this._reelSpinMask = new Core.Modules.Graphic(
                maskScale.pX,
                maskScale.pY,
                maskScale.x,
                maskScale.y,
                aI.GeneralReelMask,
                this.reelContainers[0].parent,
            );
            this.reelContainers[0].parent.mask = this._reelSpinMask;
        }

        /**
         * Play match animation for the winning symbols.
         * @param wins - Array of winning data.
         * @param index - Index of the current win to play animation.
         * @param offsetDuration - Duration offset for the animation.
         */
        public playMatchAnimation(wins: Array<Interface.IWData>, index: number, offsetDuration: number): void {
            const r = Dev.Config.GameConfig.DisplayConfig;
            const aI = Config.AssetConfig;
            const container = new Core.Modules.Container(r.width / 2 + 50, r.height / 2 - 200, this.container);

            const platformY = this.slotMachineConfig.count.matchIconEndPositionY;
            if (index === 0) {
                this.emit(Enum.Listeners.OnSpinMachineAction, Enum.SlotAnimState.MatchSymbolWinStarted);
                const emitter = new PIXI.particles.Emitter(container, aI.Bubbles[0].frame, aI.BubbleVertical);
                emitter.autoUpdate = true;
                let max = 10 * wins.length;
                if (max > 100) max = 100;
                emitter.maxParticles = max;
                emitter.playOnceAndDestroy(() => {
                    container.destroy();
                });
            }
            this.emit(Enum.Listeners.OnSpinMachineAction, Enum.SlotAnimState.WinLineStarted, { index: index, loop: false });
            for (let i = 0; i < wins[index].winSymbolMatrix.length; i++) {
                (function (i: number) {
                    const row = wins[index].winSymbolMatrix[i].row;
                    const column = wins[index].winSymbolMatrix[i].column;
                    const winSymbol = this.matrixSymbols[row][column];
                    winSymbol.playMatchAnimation();
                    const px = winSymbol.parent.position.x;
                    const offset = Config.SlotConfig.SliderMachine.symbol.offset;
                    const scale = Config.SlotConfig.SliderMachine.symbol.scale;
                    const py = (scale.y + offset.y) * row + platformY;
                    this._sliderPlatform.playMatchIconAnimation(winSymbol.index, { x: px, y: py }, { r: row, c: column });
                    winSymbol.spine.state.onComplete = function () {
                        winSymbol.spine.playAnimation(Dev.Enum.AnimNames.SymbolIdle);
                        winSymbol.spine.state.onComplete = null;
                        if (i === wins[index].winSymbolMatrix.length - 1) {
                            Core.Managers.TickerManager.instance.addTimeout(
                                'Match',
                                offsetDuration,
                                function () {
                                    if (index < wins.length - 1) {
                                        index++;
                                        this.playMatchAnimation(wins, index, offsetDuration);
                                    } else {
                                        this.emit(Enum.Listeners.OnSpinMachineAction, Enum.SlotAnimState.MatchSymbolWinFinished);
                                    }
                                }.bind(this),
                                false,
                            );
                            this.emit(Enum.Listeners.OnSpinMachineAction, Enum.SlotAnimState.WinLineFinished);
                        }
                    }.bind(this);
                }).call(this, i);
            }
        }

        /**
         * Play loop match animation for the winning symbols.
         * @param wins - Array of winning data.
         * @param index - Index of the current win to play animation.
         * @param offsetDuration - Duration offset for the animation.
         */
        public playLoopMatchAnimation(wins: Interface.IWData[], index: number, offsetDuration: number): void {
            this.emit(Enum.Listeners.OnSpinMachineAction, Enum.SlotAnimState.WinLineStarted, { index: index, loop: true });
            for (let i = 0; i < wins[index].winSymbolMatrix.length; i++) {
                (function (i: number) {
                    const row = wins[index].winSymbolMatrix[i].row;
                    const column = wins[index].winSymbolMatrix[i].column;
                    const winSymbol = this.matrixSymbols[row][column];
                    winSymbol.playMatchAnimation();

                    winSymbol.spine.state.onComplete = function () {
                        winSymbol.spine.playAnimation(Dev.Enum.AnimNames.SymbolIdle);
                        winSymbol.spine.state.onComplete = null;
                        if (i === wins[index].winSymbolMatrix.length - 1) {
                            Core.Managers.TickerManager.instance.addTimeout(
                                'Loop',
                                offsetDuration,
                                function () {
                                    if (index < wins.length - 1) {
                                        index++;
                                        this.playLoopMatchAnimation(wins, index, offsetDuration);
                                    } else {
                                        this.playLoopMatchAnimation(wins, 0, offsetDuration);
                                    }
                                }.bind(this),
                                false,
                            );
                            this.emit(Enum.Listeners.OnSpinMachineAction, Enum.SlotAnimState.WinLineFinished);
                        }
                    }.bind(this);
                }).call(this, i);
            }
        }

        /**
         * Play force stop animation.
         */
        public playForceStopAnimation(): void {
            const sI = Config.SlotConfig;
            const sM = sI.SliderMachine;
            this.removeListener(Enum.SlotAnimState.ReelSpinCompleted);
            this.stopTimeline();
            this.on(
                Enum.SlotAnimState.ReelSpinCompleted,
                function (reelIndex: number) {
                    if (reelIndex === this.reelStoppedIndex) {
                        this._playTimeline[reelIndex].restart();
                        this._playTimeline[reelIndex].kill();
                        TweenMax.to(this.reelContainers[reelIndex].children, sM.duration.forceReelStop, {
                            onStart: function () {
                                this.reelContainers[reelIndex].filters = null;
                                if (reelIndex === this.reelContainers.length - 1) {
                                    this.emit(Enum.Listeners.OnSpinMachineAction, Enum.SlotAnimState.ReelSpinCompleted);
                                }
                            }.bind(this),
                            ease: sM.ease.forceReelStop,
                            y: '+=' + sM.count.forceYoyo,
                            yoyo: true,
                            repeat: 1,
                            onComplete: function () {
                                if (reelIndex === this.reelContainers.length - 1) {
                                    this.emit(Enum.Listeners.OnSpinMachineAction, Enum.SlotAnimState.SpinStopped);
                                    this.removeListener(Enum.SlotAnimState.ReelSpinCompleted);
                                }
                            }.bind(this),
                        });
                        this.reelStoppedIndex++;
                    }
                }.bind(this),
            );
        }

        /**
         * Play stop animation.
         */
        public playStopAnimation(): void {
            const sI = Config.SlotConfig;
            const sM = sI.SliderMachine;
            this.stopTimeline();
            let index = this.reelStoppedIndex;
            this.on(
                Enum.SlotAnimState.ReelSpinCompleted,
                function (reelIndex: number) {
                    if (reelIndex === index) {
                        let reelStopOffsetDuration = sM.duration.reelStopOffset;
                        if (index === 0) reelStopOffsetDuration = 0;
                        this._stopTimeline.call(
                            function () {
                                this._playTimeline[reelIndex].restart();
                                this._playTimeline[reelIndex].kill();
                                const stopTween = TweenMax.to(this.reelContainers[reelIndex].children, sM.duration.reelStop, {
                                    onStart: function () {
                                        this.reelContainers[reelIndex].filters = null;
                                        this.reelStoppedIndex++;
                                        this.emit(Enum.Listeners.OnSpinMachineAction, Enum.SlotAnimState.ReelSpinCompleted);
                                    }.bind(this),
                                    ease: sM.ease.reelStop,
                                    y: '+=' + sM.count.yoyo,
                                    yoyo: true,
                                    repeat: 1,
                                    onComplete: function () {
                                        if (reelIndex === this.reelContainers.length - 1) {
                                            this.emit(Enum.Listeners.OnSpinMachineAction, Enum.SlotAnimState.SpinStopped);
                                            this.removeListener(Enum.SlotAnimState.ReelSpinCompleted);
                                        }
                                    }.bind(this),
                                });
                            }.bind(this),
                            null,
                            '+=' + reelStopOffsetDuration,
                        );
                    }
                    index++;
                }.bind(this),
            );
        }

        /**
         * Stop the timeline animations.
         */
        private stopTimeline(): void {
            if (this._stopTimeline) this._stopTimeline.kill();
            this._stopTimeline = new TimelineMax();
        }

        /**
         * Play spin animation.
         */
        public playSpinAnimation(): void {
            this.emit(Enum.Listeners.OnSpinMachineAction, Enum.SlotAnimState.SpinStarted);
            const sC = this.slotMachineConfig;
            const speed = sC.duration.spin;
            const moveY = sC.symbol.scale.y * sC.machine.reelMatrix.row + sC.symbol.offset.y * (sC.machine.reelMatrix.row - 1);
            this._playTimeline = [];

            for (let i = 0; i < this.reelContainers.length; i++) {
                const timeline = new TimelineMax({ repeat: -1 });
                const blurFilter = new PIXI.filters.BlurFilter();
                blurFilter.blurX = 1;
                blurFilter.blurY = 12;
                blurFilter.autoFit = true;

                this.reelContainers[i].filters = [blurFilter];
                timeline.to(this.reelContainers[i].children, speed, {
                    ease: sC.ease.spin,
                    y: '+=' + (moveY + sC.symbol.scale.y - 5),
                    modifiers: {
                        y: function (y: number) {
                            return y / moveY < 1 ? y : (y % moveY) - sC.symbol.scale.y;
                        },
                    },
                    onComplete: function () {
                        this.emit(Enum.SlotAnimState.ReelSpinCompleted, i);
                    }.bind(this),
                });
                this._playTimeline.push(timeline);
            }
        }

        /**
         * Play quick spin animation.
         */
        public playQuickSpinAnimation(): void {
            // Implement quick spin animation logic here
        }

        /**
         * Play skipped animation for symbols.
         */
        public playSkippedAnimation(): void {
            for (let i = 0; i < this.matrixSymbols.length; i++) {
                for (let j = 0; j < this.matrixSymbols[i].length; j++) {
                    this.matrixSymbols[i][j].spine.state.onComplete = function () {
                        this.matrixSymbols[i][j].spine.playAnimation(Dev.Enum.AnimNames.SymbolIdle);
                    }.bind(this);
                }
            }
            Core.Managers.TickerManager.instance.removeTicker('Loop');
            Core.Managers.TickerManager.instance.removeTicker('Match');
            this.emit(Enum.Listeners.OnSpinMachineAction, Enum.SlotAnimState.SpinSkipped);
        }

        /**
         * Dispose the slider machine and its resources.
         */
        public dispose(): void {
            // Implement disposal logic here
        }

        /**
         * Get the slider bar instance.
         */
        public get SliderBar(): Modules.SliderBar {
            return this._sliderBar;
        }
    }
}
