namespace Dev.Interface {
    /**
     * Interface representing response data from the game.
     */
    export interface IResponseData {
        /**
         * Values for auto play settings.
         */
        autoPlayValues?: number[];

        /**
         * URL for game history.
         */
        gameHistoryUrl?: string;

        /**
         * Bet details.
         */
        bet?: {
            /**
             * Coin values with default and available values.
             */
            coinValues: {
                default: number;
                values: number[];
            };

            /**
             * Bet level values with default and available values.
             */
            betLevelValues: {
                default: number;
                values: number[];
            };

            /**
             * Number of bet lines.
             */
            betLines: number;
        };

        /**
         * Currency symbol (e.g., euro symbol).
         */
        currencySymbol?: string;

        /**
         * Matrix of symbols representing the game board.
         */
        symbolMatrix?: number[][];

        /**
         * Type of reel set (e.g., slider).
         */
        reelSetType?: Enum.MachineType;

        /**
         * Dimensions of the reel matrix (rows and columns).
         */
        reelMatrix?: { row: number; column: number };

        /**
         * Current action being performed in the game.
         */
        currentAction?: Dev.Enum.DataListener;

        /**
         * Next action to be performed in the game.
         */
        nextAction?: Dev.Enum.DataListener;

        /**
         * Gamble details.
         */
        gamble?: {
            /**
             * Indicates if gambling is enabled.
             */
            enabled: boolean;

            /**
             * History of the last 5 gamble choices.
             */
            history: number[];

            /**
             * Total earnings from gambling.
             */
            totalEarn: ICurrency;

            /**
             * Earnings from the current gamble.
             */
            earn: ICurrency;

            /**
             * Amount bet on the gamble.
             */
            gambleBetAmount: ICurrency;

            /**
             * Available gamble choices.
             */
            gambleChoices: number[];
        };

        /**
         * Free spin details.
         */
        freeSpin?: {
            /**
             * Number of remaining free spins.
             */
            remainingSpinCount: number;

            /**
             * Number of remaining extra free spins.
             */
            remainingExtraFreeSpinCount: number;

            /**
             * Earnings from the current free spin.
             */
            earn: ICurrency;

            /**
             * Total earnings from free spins.
             */
            totalEarn: ICurrency;
        };

        /**
         * Re-spin details.
         */
        reSpin?: {
            /**
             * Number of remaining re-spins.
             */
            remainingSpinCount: number;

            /**
             * Earnings from the current re-spin.
             */
            earn: ICurrency;

            /**
             * Total earnings from re-spins.
             */
            totalEarn: ICurrency;
        };

        /**
         * Bonus details.
         */
        bonus?: {
            /**
             * Number of bonuses earned.
             */
            bonusCount: number;

            /**
             * Earnings from the current bonus.
             */
            earn: ICurrency;

            /**
             * Total earnings from bonuses.
             */
            totalEarn: ICurrency;
        };

        /**
         * Details of symbol wins.
         */
        symbolWins?: IWData[];

        /**
         * General win details.
         */
        wins?: IWData[];

        /**
         * Current balance.
         */
        balance?: ICurrency;

        /**
         * Current earnings.
         */
        earn?: ICurrency;

        /**
         * Total earnings.
         */
        totalEarn?: ICurrency;
    }

    /**
     * Interface representing history data.
     */
    export interface IHistoryData {
        /**
         * Action performed.
         */
        action: Dev.Enum.DataListener;

        /**
         * History details.
         */
        history: {
            lastFive: IHistoryData[];
            topFive: IHistoryData[];
        };
    }

    /**
     * Interface representing gamble data.
     */
    export interface IGambleData {
        /**
         * Action performed.
         */
        action: Dev.Enum.DataListener;

        /**
         * Selected gamble choice.
         */
        selectedGambleChoice: number;

        /**
         * Winning gamble choice.
         */
        wonGambleChoice: number;

        /**
         * Indicates if the gamble was won.
         */
        won: boolean;

        /**
         * Number of consecutive wins.
         */
        wonCount: number;

        /**
         * Number of remaining gamble attempts.
         */
        remainingGambleCount: number;
    }

    /**
     * Interface representing history data.
     */
    export interface IHistoryData {
        /**
         * Action performed.
         */
        action: Dev.Enum.DataListener;

        /**
         * Win amount.
         */
        win: number;

        /**
         * Timestamp of the action.
         */
        created_at: string;
    }

    /**
     * Interface representing win data.
     */
    export interface IWData {
        /**
         * Index of the win line.
         */
        lineIndex: number;

        /**
         * Currency details of the win.
         */
        currency: ICurrency;

        /**
         * Type of win.
         */
        winType: Enum.WinType;

        /**
         * Matrix of winning symbols.
         */
        winSymbolMatrix: IMatrix[];
    }

    /**
     * Interface representing currency details.
     */
    export interface ICurrency {
        /**
         * Amount in cents.
         */
        cents: number;

        /**
         * Amount in coins.
         */
        coins: number;
    }

    /**
     * Interface representing a matrix cell.
     */
    export interface IMatrix {
        /**
         * Row index of the cell.
         */
        row: number;

        /**
         * Column index of the cell.
         */
        column: number;
    }

    /**
     * Interface representing payout details.
     */
    export interface IPayout {
        /**
         * Combination of symbols required for the payout.
         */
        combination: {
            count: number;
            symbol: Enum.SlotSymbol;
        }[];

        /**
         * Payout amount.
         */
        payout: ICurrency;

        /**
         * Index of the win line for the payout.
         */
        lineIndex: number;
    }
}
