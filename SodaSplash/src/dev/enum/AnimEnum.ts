namespace Dev.Enum {
    
    /** Animation State Type*/
    export enum AnimationStateType {
        /** Playing Animation*/
        AnimationPlaying = "AnimationPlaying",
        /** Stopped Animation */
        AnimationStopped = "AnimationStopped"
    }

    /**
     * GameAnimListener actions
     */
    export enum GameAnimListener {
        MatchSymbolWin = "MatchSymbolWin",
        LoopMatchSymbolWin = "LoopMatchSymbolWin",
        BigWin = "BigWinAnimation",
        MegaWin = "MegaWinAnimation",
        SuperWin = "SuperWinAnimation",
        ShowWinAmount = "ShowWinAmount",
        FreeSpinStart = "FreeSpinStart",
        BonusStart = "BonusStart",
        BonusFinished = "BonusFinished",
        FreeSpinFinished = "FreeSpinFinished"
    };

    export enum AnimListener {
        PlayNextAnimation = "PlayNextAnimation",
        SortScenarioAnimation = "SortScenarioAnimation"
    }

    /**
     * Anim names
     */
    export enum AnimNames {
        CocktailGrape = "grape",
        WheelSparkLoop = "loop",
        WheelSparkOutre = "outre",
        CocktailPlum = "plum",
        CocktailMix = "mix",
        CocktailStrawberry = "strawberry",
        CocktailLemon = "lemon",
        Liquid = "liquid",
        FruitBarLoop = "bar_loop",
        SymbolIdle = "idle",
        SymbolMatch = "match",
        MatchFrame = "matchAnim",
        Coin = "coins"
    }
}