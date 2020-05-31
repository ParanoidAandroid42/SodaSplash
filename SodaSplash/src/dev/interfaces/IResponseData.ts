namespace Dev.Interface {

    export interface IResponseData {
        autoPlayValues?:Array<number>;  
        gameHistoryUrl?: string;
        bet ?: {
            coinValues:{ default: number, values: Array<number> };
            betLevelValues:{ default: number, values: Array<number> };
            betLines: number;
        },
        currencySymbol?: string; //euro symbol etc.
        symbolMatrix?: Array<Array<number>>,
        reelSetType?:Enum.MachineType;  //slider
        reelMatrix ?: {row:number,column:number},  //3x5
        currentAction?:Dev.Enum.DataListener,
        nextAction?:Dev.Enum.DataListener,
        gamble?: { 
            enabled:boolean,
            history: Array<number>,  //last 5 choices
            totalEarn: ICurrency ,
            earn: ICurrency,
            gambleBetAmount: ICurrency,
            gambleChoices: Array<number>;
        }; 
        freeSpin?: {
            remainingSpinCount:number,
            remainingExtraFreeSpinCount: number,
            earn: ICurrency,
            totalEarn: ICurrency
        },
        reSpin?: {
            remainingSpinCount:number,
            earn: ICurrency,
            totalEarn: ICurrency
        },
        bonus?: {
            bonusCount:number,
            earn: ICurrency,
            totalEarn: ICurrency
        },
        symbolWins?:Array<IWData>;
        wins?:Array<IWData>;
        balance?:ICurrency;
        earn ?: ICurrency;
        totalEarn?: ICurrency;
    } 

    export interface IHistoryData {
        action: Dev.Enum.DataListener;
        history: { lastFive: Array<IHistoryData>, topFive: Array<IHistoryData> };
    } 

    export interface IGambleData {
        action: Dev.Enum.DataListener;
        selectedGambleChoice:number;
        wonGambleChoice:number;
        won:boolean;
        wonCount:number;
        remainingGambleCount:number;
    } 

    export interface IHistoryData {
        action: Dev.Enum.DataListener;
        win: number;
        created_at: string;
    }

    export interface IWData {
        lineIndex: number;
        currency : ICurrency;
        winType: Enum.WinType;
        winSymbolMatrix:Array<IMatrix>;
    }

    export interface ICurrency {
        cents: number;
        coins: number;
    }

    export interface IMatrix {
        row:number,
        column:number
    }


    export interface IPayout {
        combination: {
            count:number,
            symbol:Enum.SlotSymbol
        }[],
        payout:ICurrency,
        lineIndex:number
    }   
}