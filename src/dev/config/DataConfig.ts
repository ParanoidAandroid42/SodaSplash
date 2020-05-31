/// <reference path='../enum/SlotEnum.ts'/>
/// <reference path='../enum/DataEnum.ts'/>
namespace Dev.Config {
    /**
     * DataConfig class provides configuration for payout data used in the game.
     * It includes combinations of slot symbols and their respective payouts.
     */
    export class DataConfig {
        static readonly PayoutData: Array<Interface.IPayout> = [
            // Payout data for 3 symbols
            { combination: [{ count: 3, symbol: Enum.SlotSymbol.Lemon }], payout: { coins: 2000, cents: 2000 }, lineIndex: 0 },
            { combination: [{ count: 3, symbol: Enum.SlotSymbol.Wild }], payout: { coins: 150, cents: 150 }, lineIndex: 0 },
            { combination: [{ count: 3, symbol: Enum.SlotSymbol.Grape }], payout: { coins: 10, cents: 10 }, lineIndex: 0 },
            { combination: [{ count: 3, symbol: Enum.SlotSymbol.Plum }], payout: { coins: 50, cents: 50 }, lineIndex: 0 },
            { combination: [{ count: 3, symbol: Enum.SlotSymbol.Strawberry }], payout: { coins: 20, cents: 20 }, lineIndex: 0 },
            { combination: [{ count: 3, symbol: Enum.SlotSymbol.Lemon }], payout: { coins: 1000, cents: 1000 }, lineIndex: 1 },
            { combination: [{ count: 3, symbol: Enum.SlotSymbol.Wild }], payout: { coins: 150, cents: 150 }, lineIndex: 1 },
            { combination: [{ count: 3, symbol: Enum.SlotSymbol.Plum }], payout: { coins: 50, cents: 50 }, lineIndex: 1 },
            { combination: [{ count: 3, symbol: Enum.SlotSymbol.Strawberry }], payout: { coins: 20, cents: 20 }, lineIndex: 1 },
            { combination: [{ count: 3, symbol: Enum.SlotSymbol.Grape }], payout: { coins: 10, cents: 10 }, lineIndex: 1 },
            { combination: [{ count: 3, symbol: Enum.SlotSymbol.Lemon }], payout: { coins: 4000, cents: 4000 }, lineIndex: 2 },
            { combination: [{ count: 3, symbol: Enum.SlotSymbol.Wild }], payout: { coins: 150, cents: 150 }, lineIndex: 2 },
            { combination: [{ count: 3, symbol: Enum.SlotSymbol.Plum }], payout: { coins: 50, cents: 50 }, lineIndex: 2 },
            { combination: [{ count: 3, symbol: Enum.SlotSymbol.Strawberry }], payout: { coins: 20, cents: 20 }, lineIndex: 2 },
            { combination: [{ count: 3, symbol: Enum.SlotSymbol.Grape }], payout: { coins: 10, cents: 10 }, lineIndex: 2 },

            // Payout data for 2 symbols
            { combination: [{ count: 2, symbol: Enum.SlotSymbol.Lemon }], payout: { coins: 2000, cents: 2000 }, lineIndex: 0 },
            { combination: [{ count: 2, symbol: Enum.SlotSymbol.Wild }], payout: { coins: 150, cents: 150 }, lineIndex: 0 },
            { combination: [{ count: 2, symbol: Enum.SlotSymbol.Grape }], payout: { coins: 10, cents: 10 }, lineIndex: 0 },
            { combination: [{ count: 2, symbol: Enum.SlotSymbol.Plum }], payout: { coins: 50, cents: 50 }, lineIndex: 0 },
            { combination: [{ count: 2, symbol: Enum.SlotSymbol.Strawberry }], payout: { coins: 20, cents: 20 }, lineIndex: 0 },
            { combination: [{ count: 2, symbol: Enum.SlotSymbol.Lemon }], payout: { coins: 1000, cents: 1000 }, lineIndex: 1 },
            { combination: [{ count: 2, symbol: Enum.SlotSymbol.Wild }], payout: { coins: 150, cents: 150 }, lineIndex: 1 },
            { combination: [{ count: 2, symbol: Enum.SlotSymbol.Plum }], payout: { coins: 50, cents: 50 }, lineIndex: 1 },
            { combination: [{ count: 2, symbol: Enum.SlotSymbol.Strawberry }], payout: { coins: 20, cents: 20 }, lineIndex: 1 },
            { combination: [{ count: 2, symbol: Enum.SlotSymbol.Grape }], payout: { coins: 10, cents: 10 }, lineIndex: 1 },
            { combination: [{ count: 2, symbol: Enum.SlotSymbol.Lemon }], payout: { coins: 4000, cents: 4000 }, lineIndex: 2 },
            { combination: [{ count: 2, symbol: Enum.SlotSymbol.Wild }], payout: { coins: 150, cents: 150 }, lineIndex: 2 },
            { combination: [{ count: 2, symbol: Enum.SlotSymbol.Plum }], payout: { coins: 50, cents: 50 }, lineIndex: 2 },
            { combination: [{ count: 2, symbol: Enum.SlotSymbol.Strawberry }], payout: { coins: 20, cents: 20 }, lineIndex: 2 },
            { combination: [{ count: 2, symbol: Enum.SlotSymbol.Grape }], payout: { coins: 10, cents: 10 }, lineIndex: 2 },
        ];
    }
}
