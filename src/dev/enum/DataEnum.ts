namespace Dev.Enum {
    /**
     * Enum representing the slot symbols with their corresponding numerical values.
     */
    export enum SlotSymbol {
        Wild = 0,
        Grape = 1,
        Strawberry = 2,
        Plum = 3,
        Lemon = 4,
        Clover = 5,
        Hearth = 6,
        Diamond = 7,
        Spade = 8,
    }

    /**
     * listeners actions
     */
    export enum DataListener {
        error = 'error',
        freeSpin = 'freeSpin',
        spin = 'spin',
        reSpin = 'reSpin',
        bonus = 'bonus',
        gamble = 'gamble',
        gambleSelected = 'gambleSelected',
        takeWin = 'takeWin',
        jackpot = 'jackpot',
        history = 'history',
        message = 'message',
    }
}
