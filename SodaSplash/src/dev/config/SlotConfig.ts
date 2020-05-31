/// <reference path= '../enum/SlotEnum.ts'/>
namespace Dev.Config {
    
    import SpineAnimation = Enum.SpineAnimation;

    export class SlotConfig {

        /**
         * Machine type of slot config
         */
        static MachineType = Enum.MachineType.Slider;

        /**
         * Slider machine of slot config
         */
        static SliderMachine: Interface.ISlotConfig = {
            reelMask : {
                normalScale : {x:890,y:490,pY:362,pX:Dev.Config.GameConfig.DisplayConfig.width/2},
                frameScale : {x:890,y:490,pY:362,pX:Dev.Config.GameConfig.DisplayConfig.width/2},
                fallDownScale : {x:890,y:500,positionY:362,positionX:Dev.Config.GameConfig.DisplayConfig.width/2},
                matchScale : {x:890,y:500,pY:362,pX:Dev.Config.GameConfig.DisplayConfig.width/2}
            },
            win:{
                bigWin: {
                    duration:.5,
                    ease:"back.out(2)",
                    coinCount:20,
                    showTime:1
                },
                superWin: {
                    duration:.5,
                    ease:"back.out(2)",
                    coinCount:20,
                    showTime:1
                },
                megaWin: {
                    duration:.5,
                    ease:"back.out(2)",
                    coinCount:20,
                    showTime:1
                },
                freeSpinStartWin: {
                    duration:.5,
                    ease:"back.out(2)",
                    showTime:1
                }
            },
            machine : {
                type:Enum.MachineType.Slider,
                reelMatrix : {row:3,column:5}
            },
            symbol : {
                scale : {x:160,y:160},
                offset : {x:0,y:0},
                matchAnimScale : {x:1,y:1},
                winSpriteScale : {x:50,y:50}
            },
            speed : {
            },
            duration : {
                winOffset:.65,
                loopOffset:.25,
                spinningDuration: 1,
                reelStopOffset:.5,
                fallDown:.5,
                fallUp:.5,
                fallDownReelOffset:.1,
                fallUpReelOffset:.1,
                spin: .4,
                reelStop:.25,
                forceReelStop:.1,
                slider:.5,
                matchIconFallDown:1,
                matchIconLeftSide : 1,
                barFill:.8
            },
            count:{
                yoyo:25,
                forceYoyo:15,
                fallDown:25,
                fallUp:25,
                fallDownEndPositionY:590,
                matchIconEndPositionY:-460
            },
            ease:{
                fallDown:"back.out(0.5)",
                fallUp:"back.out(0.5)",
                winSymbolMatch:"power0",
                slider:"power0",
                barFill:"power0",
                forceReelStop:"sine.out",
                reelStop:"sine.out",
                spin:"power0"
            },
            winLine : {
                winLinesPath:[
                    [
                        
                        {row:0,column:0,thickness:8},
                        {row:0,column:1,thickness:8},
                        {row:0,column:2,thickness:8},
                        {row:0,column:3,thickness:8},
                        {row:0,column:4,thickness:8}
                    ],
                    [
                        {row:1,column:0,thickness:8},
                        {row:1,column:1,thickness:9.75},
                        {row:1,column:2,thickness:9.75},
                        {row:0,column:3,thickness:9.75},
                        {row:0,column:4,thickness:9.75}
                    ],
                    [
                        {row:2,column:0,thickness:8},
                        {row:2,column:1,thickness:8},
                        {row:2,column:2,thickness:11},
                        {row:0,column:3,thickness:11},
                        {row:0,column:4,thickness:8}
                    ]
                ],
                duration:.25,
                type: Enum.WinlineType.LinearAnimation
            },
            slotSymbols : [
                {
                    spineConfig:{
                        skeletonDataName : SpineAnimation.Wild,
                        animations : AnimConfig.SymbolAnimation,
                        name : "Wild"
                    }
                },
                {
                    spineConfig:{
                        skeletonDataName : SpineAnimation.Grape,
                        animations : AnimConfig.SymbolAnimation,
                        name : "Grape"
                    },
                    winSprite:{
                        frame : Dev.Enum.Texture.GrapeIcon,
                        name : "Grape",
                        tint : 0x06ff6a 
                    }
                },
                {
                    spineConfig: {
                        skeletonDataName : SpineAnimation.Strawberry,
                        animations : AnimConfig.SymbolAnimation,
                        name : "Strawberry"
                    },
                    winSprite:{
                        frame : Dev.Enum.Texture.StrawberryIcon,
                        name : "Strawberry",
                        tint : 0xff1e1e
                    }
                },
                {
                    spineConfig: {
                        skeletonDataName : SpineAnimation.Plum,
                        animations : AnimConfig.SymbolAnimation,
                        name : "Plum"
                    },
                    winSprite:{
                        frame : Dev.Enum.Texture.PlumIcon,
                        name : "Plum",
                        tint : 0xb608ff 
                    }
                },
                {
                    spineConfig:   {
                        skeletonDataName : SpineAnimation.Lemon,
                        animations : AnimConfig.SymbolAnimation,
                        name : "Lemon"
                    },
                    winSprite:{
                        frame : Dev.Enum.Texture.LemonIcon,
                        name : "Lemon",
                        tint : 0xffea00
                    }
                },
                {
                    spineConfig: {
                        skeletonDataName : SpineAnimation.Clover,
                        animations : AnimConfig.SymbolAnimation,
                        name : "Clover"
                    }
                },
                {
                    spineConfig:{
                        skeletonDataName : SpineAnimation.Hearth,
                        animations : AnimConfig.SymbolAnimation,
                        name : "Hearth"
                    }
                },
                {
                    spineConfig: {
                        skeletonDataName : SpineAnimation.Diamond,
                        animations : AnimConfig.SymbolAnimation,
                        name : "Diamond"
                    }
                },
                {
                    spineConfig: {
                        skeletonDataName : SpineAnimation.Spade,
                        animations : AnimConfig.SymbolAnimation,
                        name : "Spade"
                    }
                }
            ]
        }
    }
}