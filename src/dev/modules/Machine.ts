namespace Dev.Modules {
    /**
     * Enum for spin directions.
     */
    export enum SpinDirection {
        up,
        down,
        left,
        right,
        none,
    }

    /**
     * Abstract class for a slot machine.
     */
    export abstract class Machine extends PIXI.utils.EventEmitter {
        public slotMachineConfig: Interface.ISlotConfig;
        public reelContainers: Core.Modules.Container[];
        public baseReelContainer: Core.Modules.Container;
        public container: Core.Modules.Container;
        public reelContainerPositionY: number;
        public matrixSymbols: Symbol[][] = [];
        public winLineInfo: Interface.IMatchWinLineInfo;
        public winInfo: Interface.IWinsInfo;
        public reelStoppedIndex: number = 0;

        /**
         * Constructor for the Machine class.
         * @param slotMachineConfig - The configuration for the slot machine.
         * @param container - The parent container.
         */
        public constructor(slotMachineConfig: Interface.ISlotConfig, container: Core.Modules.Container) {
            super();
            this.slotMachineConfig = slotMachineConfig;
            this.container = new Core.Modules.Container(0, -70, container, 'MachineContainer');
            this.baseReelContainer = new Core.Modules.Container(0, 0, this.container, 'ReelContainer');
            this.initProperties();
        }

        /**
         * Initializes the properties of the machine.
         */
        private initProperties(): void {
            this.createReelContainers();
            this.init();
        }

        /**
         * Creates the reel containers based on the configuration.
         */
        private createReelContainers(): void {
            this.reelContainers = [];
            const column = this.slotMachineConfig.machine.reelMatrix.column;
            const row = this.slotMachineConfig.machine.reelMatrix.row;
            const displayConfig = Dev.Config.GameConfig.DisplayConfig;
            const symbolScale = this.slotMachineConfig.symbol.scale;
            const symbolOffset = this.slotMachineConfig.symbol.offset;

            for (let i = 0; i < column; i++) {
                let posX = displayConfig.width / 2 - (Math.floor(column / 2) - i) * (symbolOffset.x + symbolScale.x);
                let posY = displayConfig.height / 2 - Math.floor(row / 2) * (symbolScale.y + symbolOffset.y);

                if (column % 2 === 0) {
                    posX += symbolScale.x / 2;
                }
                if (row % 2 === 0) {
                    posY += symbolScale.y / 2;
                }

                this.reelContainerPositionY = posY;
                const container = new Core.Modules.Container(posX, posY, this.baseReelContainer, 'ReelContainer');
                this.reelContainers.push(container);
                this.createSlotSymbol(container, i);
            }

            this.matrixSymbols = this.transpose(this.matrixSymbols);
        }

        /**
         * Updates the symbol index for the slot symbols.
         * @param symbolMatrix - The symbol matrix to update.
         */
        public updateSlotSymbolIndex(symbolMatrix: number[][]): void {
            for (let i = 0; i < this.matrixSymbols.length; i++) {
                for (let j = 0; j < this.matrixSymbols[i].length; j++) {
                    this.matrixSymbols[i][j].index = symbolMatrix[i][j];
                }
            }
        }

        /**
         * Transposes the given matrix.
         * @param matrix - The matrix to transpose.
         * @returns The transposed matrix.
         */
        private transpose(matrix: Symbol[][]): Symbol[][] {
            const rows = matrix.length;
            const cols = matrix[0].length;
            const grid = [];

            for (let j = 0; j < cols; j++) {
                grid[j] = [];
            }

            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    grid[j][i] = matrix[i][j];
                }
            }

            return grid;
        }

        /**
         * Creates slot symbols and adds them to the given container.
         * @param container - The container to add the symbols to.
         * @param reelIndex - The index of the reel.
         */
        private createSlotSymbol(container: Core.Modules.Container, reelIndex: number): void {
            const symbols = [];

            for (let i = -1; i < this.slotMachineConfig.machine.reelMatrix.row; i++) {
                const randomIndex = Math.floor(Math.random() * this.slotMachineConfig.slotSymbols.length);
                const symbol = new Symbol(this.slotMachineConfig, randomIndex, this.reelContainers[reelIndex], { r: i, c: reelIndex });

                if (i >= 0) {
                    symbols.push(symbol);
                }
            }

            this.matrixSymbols.push(symbols);
        }

        /**
         * Plays the idle animation for the slot symbols.
         */
        private playIdleAnimation(): void {
            const rows = this.matrixSymbols.length;
            const cols = this.matrixSymbols[0].length;

            for (let i = 0; i < rows; i++) {
                for (let j = 0; j < cols; j++) {
                    this.matrixSymbols[i][j].spine.playAnimation(Dev.Enum.AnimNames.SymbolIdle);
                }
            }
        }

        /**
         * Plays the fall down animation for the reel containers.
         * @param reelSpinMask - The graphic mask for the reel spin.
         */
        public playFallDownContainer(reelSpinMask: Core.Modules.Graphic): void {
            const slotConfig = this.slotMachineConfig;
            const fallDownScale = slotConfig.reelMask.fallDownScale;
            const fallDownCount = slotConfig.count.fallDownEndPositionY;
            const fallDownDuration = slotConfig.duration.fallDown;
            const fallUpDuration = slotConfig.duration.fallUp;
            const fallDownEase = slotConfig.ease.fallDown;
            const fallUpEase = slotConfig.ease.fallUp;
            const normalScale = slotConfig.reelMask.normalScale;

            reelSpinMask.width = fallDownScale.x;
            reelSpinMask.height = fallDownScale.y;

            const initialY = this.reelContainers[0].position.y;
            const targetY = initialY + fallDownCount;

            for (let i = 0; i < this.reelContainers.length; i++) {
                const timeline = new TimelineMax({ delay: i * slotConfig.duration.fallDownReelOffset });
                this.reelContainers[i].position.y -= fallDownCount;

                timeline.to(this.reelContainers[i], fallDownDuration, { ease: fallDownEase, y: targetY });
                timeline.to(this.reelContainers[i], fallUpDuration, {
                    ease: fallUpEase,
                    y: initialY,
                    onComplete: () => {
                        if (i === this.reelContainers.length - 1) {
                            reelSpinMask.width = normalScale.x;
                            reelSpinMask.height = normalScale.y;
                            this.playIdleAnimation();
                        }
                    },
                });
            }
        }

        /**
         * Destroys the machine and cleans up resources.
         */
        public destroy(): void {
            this.dispose();
            this.container.destroy({ children: true, baseTexture: true });
        }

        public abstract init(): void;
        public abstract playMatchAnimation(wins: Interface.IWData[], index: number, offsetDuration: number): void;
        public abstract playLoopMatchAnimation(wins: Interface.IWData[], index: number, offsetDuration: number): void;
        public abstract playForceStopAnimation(): void;
        public abstract playSpinAnimation(): void;
        public abstract playStopAnimation(): void;
        public abstract playQuickSpinAnimation(): void;
        public abstract playSkippedAnimation(): void;
        public abstract dispose(): void;
    }
}
