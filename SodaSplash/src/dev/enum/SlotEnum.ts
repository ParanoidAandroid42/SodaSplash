namespace Dev.Enum {

    /**
     * Listeners
     */
    export enum Listeners{
        OnSpinBarAction = "OnSpinBarAction",
        OnSpinMachineAction = "OnSpinMachineAction",
        OnWinLinesAction = "OnWinLinesAction",
        OnWinAnimAction = "OnWinAnimAction",
        OnGameAnimAction = "OnGameAnimAction",
        OnAnimationAction = "OnAnimationAction",
        OnBonusGameAction = "OnBonusGameAction"
    }

    /**
     * Spin action
     */
    export enum SpinAction{
        StartSpin = "StartSpin",
        StopSpin = "StopSpin",
        SkipSpin = "SkipSpin",
        QuickSpin = "QuickSpin",
        ForceSpin = "ForceSpin"
    }

    /**
     * Slot anim state
     */
    export enum SlotAnimState{
        WheelTurnStopped = "WheelTurnStopped",
        MatchIconFinished = "MatchIconAnimFinished",
        MatchIconStarted = "MatchIconStarted",
        MatchSymbolWinFinished = "MatchSymbolWinFinished",
        WinLineStarted = "WinLineStarted",
        WinLineFinished = "WinLineFinished",
        MatchSymbolWinStarted = "MatchSymbolWinStarted",
        SpinStarted = "SpinStarted",
        SpinCompleted = "SpinCompleted",
        SpinStopped = "SpinStopped",
        SpinSkipped = "SpinSkipped",
        SpinQuicked = "SpinQuicked",
        SpinForceStopped = "SpinForceStopped",
        ReelSpinCompleted = "ReelSpinCompleted",
        WinUpdated = "WinUpdated",
        FinishedStartFreeSpinWin = "FinishedStartFreeSpinWin"
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

    /**
     * Spin mode
     */
    export enum SpinMode {
        FreeSpin = "FreeSpin",
        NormalSpin = "NormalSpin"
    }

    /**
     * Machine type
     */
    export enum MachineType{
        Slider = "slider"
    }

    /**
     * Winline type
     */
    export enum WinlineType{
        LinearAnimation = "LinearAnimation",
        FadeIn = "FadeIn"
    }

    /**
     * Win type
     */
    export enum WinType {
        BigWin = "bigWin",
        SuperWin = "superWin",
        MegaWin = "megaWin",
        SymbolWin = "symbolWin",
        FreeSpinStartWin = "freeSpinWin"
    }
}