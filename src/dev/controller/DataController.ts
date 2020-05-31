module Dev.Controller {
    /**
     * DataController handles the game's data, including the player's balance, bets, and game symbols.
     * It calculates fake payout data for development mode, handles data actions, and manages free spin data.
     */
    export class DataController extends Core.Controller.DataController {
        private _developmentMode: boolean;
        private _data: Interface.IResponseData;

        private static readonly ROWS = 3;
        private static readonly COLUMNS = 5;
        private static readonly SYMBOL_COUNT = 5;

        /**
         * DataController class's constructor
         * Initializes the data controller and sets the development mode.
         */
        public constructor() {
            super();
            this._developmentMode = false;
            this._data = this.initializeData();
        }

        /**
         * Initializes the data object with default values and a random symbol matrix.
         * @returns Initialized data object
         */
        private initializeData(): Interface.IResponseData {
            const symbolMatrix = this.generateRandomSymbolMatrix();

            return {
                balance: { cents: 500, coins: 500 },
                currencySymbol: 'Euro',
                earn: { coins: 0, cents: 0 },
                totalEarn: { coins: 0, cents: 0 },
                bet: { betLines: 10, betLevelValues: null, coinValues: null },
                symbolWins: null,
                symbolMatrix: symbolMatrix,
            };
        }

        /** Initializes the DataController */
        public init(): void {
            // Initialization logic can be added here
        }

        /**
         * Calculates fake payout data for development mode.
         * Updates the symbol matrix and calculates wins based on the payout data.
         */
        public fakePayCalculate(): void {
            if (!this._developmentMode) {
                this._data.symbolMatrix = this.generateRandomSymbolMatrix();
            }

            const symbolCounts = this.countSymbolsInMatrix(this._data.symbolMatrix);
            const wins = this.calculateWins(symbolCounts);

            this._data.symbolWins = wins.length > 0 ? wins : null;
        }

        /**
         * Generates a random symbol matrix.
         * @returns A 2D array representing the symbol matrix
         */
        private generateRandomSymbolMatrix(): number[][] {
            const matrix = [];
            for (let i = 0; i < DataController.ROWS; i++) {
                matrix.push(this.generateRandomRow());
            }
            return matrix;
        }

        /**
         * Generates a random row of symbols.
         * @returns An array representing a row of symbols
         */
        private generateRandomRow(): number[] {
            const row = [];
            for (let i = 0; i < DataController.COLUMNS; i++) {
                row.push(this.randomSymbolIndex());
            }
            return row;
        }

        /**
         * Counts the occurrences of each symbol in the matrix.
         * @param symbolMatrix - The symbol matrix
         * @returns An array of symbol counts
         */
        private countSymbolsInMatrix(symbolMatrix: number[][]): number[][] {
            const symbolCounts = this.initializeSymbolCounts();
            for (let i = 0; i < symbolMatrix.length; i++) {
                this.updateSymbolCounts(symbolMatrix[i], symbolCounts, i);
            }
            return symbolCounts;
        }

        /**
         * Initializes the symbol counts array.
         * @returns An initialized array of symbol counts
         */
        private initializeSymbolCounts(): number[][] {
            const symbolLength = Object.keys(Enum.SlotSymbol).length / 2;
            const symbolCounts = [];
            for (let t = 0; t < symbolLength; t++) {
                const symbolCount = [];
                for (let i = 0; i < DataController.ROWS; i++) {
                    symbolCount.push(0);
                }
                symbolCounts.push(symbolCount);
            }
            return symbolCounts;
        }

        /**
         * Updates the symbol counts based on a row of symbols.
         * @param row - A row of symbols
         * @param symbolCounts - The symbol counts array
         * @param rowIndex - The index of the row in the matrix
         */
        private updateSymbolCounts(row: number[], symbolCounts: number[][], rowIndex: number): void {
            for (let j = 0; j < row.length; j++) {
                const symbolIndex = row[j];
                symbolCounts[symbolIndex][rowIndex]++;
            }
        }

        /**
         * Calculates wins based on symbol counts.
         * @param symbolCounts - The symbol counts
         * @returns An array of win data
         */
        private calculateWins(symbolCounts: number[][]): Interface.IWData[] {
            const wins = [];
            const payoutData = Config.DataConfig.PayoutData;

            for (let i = 0; i < payoutData.length; i++) {
                if (this.checkCombination(payoutData[i], symbolCounts)) {
                    const winSymbolMatrix = this.setSymbolMatrix(payoutData[i]);
                    const win: Interface.IWData = {
                        winType: Enum.WinType.SymbolWin,
                        lineIndex: payoutData[i].lineIndex,
                        currency: payoutData[i].payout,
                        winSymbolMatrix: winSymbolMatrix,
                    };
                    wins.push(win);
                }
            }

            return wins;
        }

        /**
         * Sets the symbol matrix based on payout data.
         * @param payoutData - Payout data
         * @returns Win symbol matrix
         */
        private setSymbolMatrix(payoutData: Interface.IPayout): Interface.IMatrix[] {
            const winline = Config.SlotConfig.SliderMachine.winLine;
            const path = winline.winLinesPath[payoutData.lineIndex];
            const combination = payoutData.combination;
            const winSymbolMatrix = [];

            for (let i = 0; i < path.length; i++) {
                const row = path[i].row;
                const column = path[i].column;
                const match = combination.some((combo) => this._data.symbolMatrix[row][column] === combo.symbol);

                if (match) {
                    winSymbolMatrix.push({ row: row, column: column });
                }
            }

            if (winSymbolMatrix.length === 0) {
                const lastPos = path[path.length - 1];
                winSymbolMatrix.push({ row: lastPos.row, column: lastPos.column });
            }

            return winSymbolMatrix;
        }

        /**
         * Checks if the combination is valid based on payout data.
         * @param payoutData - Payout data
         * @param symbolCounts - Symbol counts
         * @returns Boolean indicating if combination is valid
         */
        private checkCombination(payoutData: Interface.IPayout, symbolCounts: number[][]): boolean {
            return payoutData.combination.every((combo) => combo.count === symbolCounts[combo.symbol][payoutData.lineIndex]);
        }

        /**
         * Generates a random symbol index.
         * @returns Random symbol index
         */
        private randomSymbolIndex(): number {
            return Math.floor(Math.random() * DataController.SYMBOL_COUNT);
        }

        /**
         * Handles data action based on response data.
         * Updates the internal data and triggers free spin data if necessary.
         * @param data - Response data
         */
        public dataAction(data: Interface.IResponseData): void {
            if (data.currentAction !== undefined) {
                this._data = data;
                this.fakeFreeSpinData();
                this.emit(Dev.Enum.DataListener.message, this._data);
            }
        }

        /**
         * Sets fake data for a free spin.
         */
        private fakeFreeSpinData(): void {
            this._data.currentAction = Dev.Enum.DataListener.spin;
            this._data.nextAction = Dev.Enum.DataListener.freeSpin;
            this._data.earn = { cents: 100, coins: 100 };
            this._data.freeSpin = { 
                remainingSpinCount: 5, 
                remainingExtraFreeSpinCount: 0, 
                earn: { cents: 100, coins: 100 },
                totalEarn: { cents: 100, coins: 100 }
            };
            this._data.reelSetType = Enum.MachineType.Slider;
            this._data.reelMatrix = { row: DataController.ROWS, column: DataController.COLUMNS };
        }

        /** Initializes the events for DataController */
        public initEvents(): void {
            window.addEventListener(Dev.Enum.DataListener.message, (data: any) => {
                this.dataAction(data.data);
            });
        }

        get data(): Interface.IResponseData {
            return this._data;
        }
    }
}
