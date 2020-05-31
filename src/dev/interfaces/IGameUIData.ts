namespace Dev.Interface {
    /**
     * Interface representing the game UI data.
     */
    export interface IGameUIData {
        /**
         * Action type for the game UI data.
         */
        action: MessageType;

        /**
         * Optional bet details.
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
         * Optional total bet amount.
         */
        totalBet?: string;

        /**
         * Optional balance amount.
         */
        balance?: string;

        /**
         * Optional win amount.
         */
        win?: string;

        /**
         * Optional state of the spin button.
         */
        spinButtonState?: IState;

        /**
         * Optional state of the gamble button.
         */
        gambleButtonState?: IState;

        /**
         * Optional states for total bet and its related components.
         */
        totalBetState?: {
            state: IState;
            coinValueState: IState;
            levelValueState: IState;
        };

        /**
         * Optional state of the auto play button.
         */
        autoPlayState?: IState;

        /**
         * Optional state of the max bet button.
         */
        maxBetState?: IState;

        /**
         * Optional menu states.
         */
        menuState?: {
            state?: IState;
            soundState?: IState;
            settingsState?: IState;
            statisticsState?: IState;
            autoPlayState?: IState;
            payTableState?: IState;
            infoState?: IState;
        };

        /**
         * Optional statistics values.
         */
        statisticsValues?: {
            spinResult: string;
            sessionTime: string;
            spinPerHour: string;
            HighestWins: {
                first: string;
                second: string;
                third: string;
            };
        };
    }

    /**
     * Enum representing message types for game UI data.
     */
    export enum MessageType {
        /** Spin state message type. */
        SpinState = 'SpinState',
        /** Initial values message type. */
        InitValues = 'InitValues',
        /** Update values message type. */
        UpdateValues = 'UpdateValues',
    }

    /**
     * Enum representing the state of the spin button.
     */
    export enum SpinButtonState {
        /** Normal state. */
        Normal = 'Normal',
        /** Quick spin state. */
        Quick = 'Quick',
        /** Stop spin state. */
        Stop = 'Stop',
        /** Auto spin state. */
        Auto = 'Auto',
        /** Skip spin state. */
        Skip = 'Skip',
    }

    /**
     * Interface representing the state of a UI element.
     */
    export interface IState {
        /** Skin or appearance of the UI element. */
        skin: SpinButtonState;
        /** Whether the UI element is enabled. */
        enabled: boolean;
        /** Whether the UI element is visible. */
        visible: boolean;
    }
}
