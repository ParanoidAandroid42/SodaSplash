/// <reference path= '../enum/AnimEnum.ts'/>
namespace Dev.Config {

    import AnimNames = Enum.AnimNames;
    import Listener = Enum.GameAnimListener;
    export class AnimConfig {

        /** Sorting animation according to Scenario */
        static AnimationSort: Array<Dev.Enum.GameAnimListener> = [
            Listener.MatchSymbolWin,
            Listener.BigWin,
            Listener.SuperWin,
            Listener.ShowWinAmount,
            Listener.LoopMatchSymbolWin
        ];

        static SymbolAnimation : { [animName: string]: Core.Interface.IAnimation; } = { 
            [AnimNames.SymbolIdle] : {resource: AnimNames.SymbolIdle, loop: true,speed:1.5 },
            [AnimNames.SymbolMatch]: { resource:AnimNames.SymbolMatch, loop: false,speed:1.5 }
        };

        static CocktailAnimation : { [animName: string]: Core.Interface.IAnimation; } = { 
            [AnimNames.CocktailGrape] : {resource: AnimNames.CocktailGrape, loop: false,speed:1,tint:0x06ff6a},
            [AnimNames.CocktailLemon]: { resource: AnimNames.CocktailLemon, loop: false,speed:1,tint:0xffea00 },
            [AnimNames.CocktailStrawberry]: { resource: AnimNames.CocktailStrawberry, loop: false,speed:1,tint:0xff1e1e},
            [AnimNames.CocktailMix]: { resource: AnimNames.CocktailMix, loop: false,speed:1},
            [AnimNames.CocktailPlum]: { resource: AnimNames.CocktailPlum, loop: false,speed:1,tint:0xb608ff}
        };

        static WheelSpark : { [animName: string]: Core.Interface.IAnimation; } = { 
            [AnimNames.WheelSparkLoop] :  {resource: AnimNames.WheelSparkLoop, loop: true,speed:1,from:0,to:18},
            [AnimNames.WheelSparkOutre] :  {resource: AnimNames.WheelSparkOutre, loop: false,speed:1,from:0,to:8}
        }

        static MatchFrame : { [animName: string]: Core.Interface.IAnimation; } = { 
            [AnimNames.MatchFrame]: { resource: AnimNames.MatchFrame, loop: false,speed:1, from:0,to:51}
        }

        static Coin : { [animName: string]: Core.Interface.IAnimation; } = { 
            [AnimNames.Coin]: { resource: AnimNames.Coin, loop: true,speed:.2, from:0,to:5}
        }

        static LiquidAnimation : { [animName: string]: Core.Interface.IAnimation; } = { 
            [AnimNames.Liquid] : {resource: AnimNames.Liquid, loop: false,speed:1 }
        };

        static FruitBarAnimation : { [animName: string]: Core.Interface.IAnimation; } = { 
            [AnimNames.FruitBarLoop] : {resource: AnimNames.FruitBarLoop, loop: true,speed:1,tint:0x06ff6a}
        };

        /**
         * Animation  of animation config for general animation
         */
        static Animation : Interface.IAnimation = {
            ease : {
                logoScale:"bounce.out",
                logoAlpha:"bounce.out",
                boxFillsAlpha:"power1.inOut",
                bgCurrentSwitch : "power0",
                bgNextSwitch: "power0",
                bgIdle:"sine.inOut",
                bgIdleBubble:"power0",
                bgBuzzFallDown:"power0",
                bgSwitch:"power0",
                bgChangePosition:"sine.out"
            },
            duration : {
                logoScale:.75,
                logoAlpha:.75,
                boxFillsAlpha:.25,
                bgCurrentSwitch:.25,
                bgNextSwitch:.25,
                bgIdle:1,
                bgSwitch:2,
                bgBuzzFallDown:.15,
                bgIdleRandTimeMin: 5,
                bgIdleRandTimeMax:10,
                bgChangePosition:1.25
            },
            speed:{
                boxFillsOffset:.35
            },
            count:{
                bgBuzzFallDown:10,
                bgIdleRandMinAlpha: .5,
                bgIdleRandMaxAlpha:.7,
            }
        }
    }
}