/// <reference path= '../enum/AnimEnum.ts'/>
namespace Dev.Config {
    import AnimNames = Enum.AnimNames;
    import Listener = Enum.GameAnimListener;

    /**
     * AnimConfig class provides configuration for different animations used in the game.
     * It includes sorted animations according to scenarios and specific animation configurations.
     */
    export class AnimConfig {
        /**
         * Sorting animation according to Scenario.
         */
        static readonly AnimationSort: Array<Dev.Enum.GameAnimListener> = [
            Listener.MatchSymbolWin,
            Listener.BigWin,
            Listener.SuperWin,
            Listener.ShowWinAmount,
            Listener.LoopMatchSymbolWin,
        ];

        /**
         * Configuration for symbol animations.
         */
        static readonly SymbolAnimation: { [animName: string]: Core.Interface.IAnimation } = {
            [AnimNames.SymbolIdle]: { resource: AnimNames.SymbolIdle, loop: true, speed: 1.5 },
            [AnimNames.SymbolMatch]: { resource: AnimNames.SymbolMatch, loop: false, speed: 1.5 },
        };

        /**
         * Configuration for cocktail animations.
         */
        static readonly CocktailAnimation: { [animName: string]: Core.Interface.IAnimation } = {
            [AnimNames.CocktailGrape]: { resource: AnimNames.CocktailGrape, loop: false, speed: 1, tint: 0x06ff6a },
            [AnimNames.CocktailLemon]: { resource: AnimNames.CocktailLemon, loop: false, speed: 1, tint: 0xffea00 },
            [AnimNames.CocktailStrawberry]: { resource: AnimNames.CocktailStrawberry, loop: false, speed: 1, tint: 0xff1e1e },
            [AnimNames.CocktailMix]: { resource: AnimNames.CocktailMix, loop: false, speed: 1 },
            [AnimNames.CocktailPlum]: { resource: AnimNames.CocktailPlum, loop: false, speed: 1, tint: 0xb608ff },
        };

        /**
         * Configuration for wheel spark animations.
         */
        static readonly WheelSpark: { [animName: string]: Core.Interface.IAnimation } = {
            [AnimNames.WheelSparkLoop]: { resource: AnimNames.WheelSparkLoop, loop: true, speed: 1, from: 0, to: 18 },
            [AnimNames.WheelSparkOutre]: { resource: AnimNames.WheelSparkOutre, loop: false, speed: 1, from: 0, to: 8 },
        };

        /**
         * Configuration for match frame animations.
         */
        static readonly MatchFrame: { [animName: string]: Core.Interface.IAnimation } = {
            [AnimNames.MatchFrame]: { resource: AnimNames.MatchFrame, loop: false, speed: 1, from: 0, to: 51 },
        };

        /**
         * Configuration for coin animations.
         */
        static readonly Coin: { [animName: string]: Core.Interface.IAnimation } = {
            [AnimNames.Coin]: { resource: AnimNames.Coin, loop: true, speed: 0.2, from: 0, to: 5 },
        };

        /**
         * Configuration for liquid animations.
         */
        static readonly LiquidAnimation: { [animName: string]: Core.Interface.IAnimation } = {
            [AnimNames.Liquid]: { resource: AnimNames.Liquid, loop: false, speed: 1 },
        };

        /**
         * Configuration for fruit bar animations.
         */
        static readonly FruitBarAnimation: { [animName: string]: Core.Interface.IAnimation } = {
            [AnimNames.FruitBarLoop]: { resource: AnimNames.FruitBarLoop, loop: true, speed: 1, tint: 0x06ff6a },
        };

        /**
         * General animation configuration for various animations in the game.
         */
        static readonly Animation: Interface.IAnimation = {
            ease: {
                logoScale: 'bounce.out',
                logoAlpha: 'bounce.out',
                boxFillsAlpha: 'power1.inOut',
                bgCurrentSwitch: 'power0',
                bgNextSwitch: 'power0',
                bgIdle: 'sine.inOut',
                bgIdleBubble: 'power0',
                bgBuzzFallDown: 'power0',
                bgSwitch: 'power0',
                bgChangePosition: 'sine.out',
            },
            duration: {
                logoScale: 0.75,
                logoAlpha: 0.75,
                boxFillsAlpha: 0.25,
                bgCurrentSwitch: 0.25,
                bgNextSwitch: 0.25,
                bgIdle: 1,
                bgSwitch: 2,
                bgBuzzFallDown: 0.15,
                bgIdleRandTimeMin: 5,
                bgIdleRandTimeMax: 10,
                bgChangePosition: 1.25,
            },
            speed: {
                boxFillsOffset: 0.35,
            },
            count: {
                bgBuzzFallDown: 10,
                bgIdleRandMinAlpha: 0.5,
                bgIdleRandMaxAlpha: 0.7,
            },
        };
    }
}
