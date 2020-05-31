namespace Dev.Enum {
    /**
     * Enum representing different types of listeners.
     */
    export enum Listeners {
        /** Event triggered for spin bar actions. */
        OnSpinBarAction = 'OnSpinBarAction',
        /** Event triggered for spin machine actions. */
        OnSpinMachineAction = 'OnSpinMachineAction',
        /** Event triggered for win lines actions. */
        OnWinLinesAction = 'OnWinLinesAction',
        /** Event triggered for win animation actions. */
        OnWinAnimAction = 'OnWinAnimAction',
        /** Event triggered for game animation actions. */
        OnGameAnimAction = 'OnGameAnimAction',
        /** Event triggered for general animation actions. */
        OnAnimationAction = 'OnAnimationAction',
        /** Event triggered for bonus game actions. */
        OnBonusGameAction = 'OnBonusGameAction',
    }

    /**
     * Enum representing different spin actions.
     */
    export enum SpinAction {
        /** Action to start spinning. */
        StartSpin = 'StartSpin',
        /** Action to stop spinning. */
        StopSpin = 'StopSpin',
        /** Action to skip spinning. */
        SkipSpin = 'SkipSpin',
        /** Action to perform a quick spin. */
        QuickSpin = 'QuickSpin',
        /** Action to force stop spinning. */
        ForceSpin = 'ForceSpin',
    }

    /**
     * Enum representing different states of slot animations.
     */
    export enum SlotAnimState {
        /** State when the wheel turn is stopped. */
        WheelTurnStopped = 'WheelTurnStopped',
        /** State when the match icon animation is finished. */
        MatchIconFinished = 'MatchIconAnimFinished',
        /** State when the match icon animation is started. */
        MatchIconStarted = 'MatchIconStarted',
        /** State when the match symbol win animation is finished. */
        MatchSymbolWinFinished = 'MatchSymbolWinFinished',
        /** State when the win line animation is started. */
        WinLineStarted = 'WinLineStarted',
        /** State when the win line animation is finished. */
        WinLineFinished = 'WinLineFinished',
        /** State when the match symbol win animation is started. */
        MatchSymbolWinStarted = 'MatchSymbolWinStarted',
        /** State when the spinning is started. */
        SpinStarted = 'SpinStarted',
        /** State when the spinning is completed. */
        SpinCompleted = 'SpinCompleted',
        /** State when the spinning is stopped. */
        SpinStopped = 'SpinStopped',
        /** State when the spinning is skipped. */
        SpinSkipped = 'SpinSkipped',
        /** State when the spinning is quickened. */
        SpinQuicked = 'SpinQuicked',
        /** State when the spinning is forcefully stopped. */
        SpinForceStopped = 'SpinForceStopped',
        /** State when the reel spin is completed. */
        ReelSpinCompleted = 'ReelSpinCompleted',
        /** State when the win is updated. */
        WinUpdated = 'WinUpdated',
        /** State when the start free spin win animation is finished. */
        FinishedStartFreeSpinWin = 'FinishedStartFreeSpinWin',
    }

    /**
     * Enum representing different states of spin buttons.
     */
    export enum SpinButtonState {
        /** Normal spin button state. */
        Normal = 'Normal',
        /** Quick spin button state. */
        Quick = 'Quick',
        /** Stop spin button state. */
        Stop = 'Stop',
        /** Auto spin button state. */
        Auto = 'Auto',
        /** Skip spin button state. */
        Skip = 'Skip',
    }

    /**
     * Enum representing different spin modes.
     */
    export enum SpinMode {
        /** Free spin mode. */
        FreeSpin = 'FreeSpin',
        /** Normal spin mode. */
        NormalSpin = 'NormalSpin',
    }

    /**
     * Enum representing different types of slot machines.
     */
    export enum MachineType {
        /** Slider machine type. */
        Slider = 'slider',
    }

    /**
     * Enum representing different types of win lines.
     */
    export enum WinlineType {
        /** Linear animation win line type. */
        LinearAnimation = 'LinearAnimation',
        /** Fade-in animation win line type. */
        FadeIn = 'FadeIn',
    }

    /**
     * Enum representing different types of wins.
     */
    export enum WinType {
        /** Big win type. */
        BigWin = 'bigWin',
        /** Super win type. */
        SuperWin = 'superWin',
        /** Mega win type. */
        MegaWin = 'megaWin',
        /** Symbol win type. */
        SymbolWin = 'symbolWin',
        /** Free spin start win type. */
        FreeSpinStartWin = 'freeSpinWin',
    }
}
