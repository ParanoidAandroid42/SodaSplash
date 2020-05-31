namespace Dev.Interface {
    export interface IGameUIData {
        action : MessageType,
        bet ?: {
            coinValues:{ default: number, values: Array<number> };
            betLevelValues:{ default: number, values: Array<number> };
            betLines: number;
        },
        totalBet?:string,
        balance?:string,
        win?:string,
        spinButtonState?: IState,
        gambleButtonState?:IState,
        totalBetState?: {
            state:IState,
            coinValueState:IState,
            levelValueState:IState
        },
        autoPlayState?: IState,
        maxBetState?:IState,
        menuState?: {
            state?: IState,
            soundState?: IState,
            settingsState?: IState,
            statisticsState?:IState,
            autoPlayState?:IState,
            payTableState?:IState,
            infoState?:IState
        },
        statisticsValues?: {
            spinResult:string,
            sessionTime:string,
            spinPerHour:string,
            HighestWins : {
                first:string,
                second:string,
                third:string
            }
        }
    }

    export enum MessageType {
        SpinState = "SpinState",
        InitValues = "InitValues",
        UpdateValues = "UpdateValues"
    }
    
    /**
     * Spin button state
     */
    export enum SpinButtonState {
        Normal = "Normal",
        Quick = "Quick",
        Stop = "Stop",
        Auto = "Auto",
        Skip = "Skip"
    }

    export interface IState {
        skin: SpinButtonState,
        enabled: boolean,
        visible : boolean
    }
}