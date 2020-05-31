/// <reference path= '../enum/ResourceEnum.ts'/>
module Dev.Config {
    
    import Shape = Core.Enum.Shape;
    import Texture = Enum.Texture;
    import PreTexture = Enum.PreTexture;
    
    export class AssetConfig {

        static ResourceManager = Core.Managers.ResourceManager.Instance;

        static TimerCircle : Core.Interface.IMaskConfig = {
            shape : Shape.Circle,
            name : "TimerCircleMask",
            radius : 1480,
            fill : 0x000000,
            alpha: .75
        }

        static TimerTextStyle = new PIXI.TextStyle({
            fontFamily: "Luckiest Guy",
            fontSize: 300,
            fontWeight: "600",
            fill: "#ffffff",
            align: "center"
        });

        /** Timer text's config*/
        static TimerText: Core.Interface.ITextConfig = {
            text: "5",
            textStyle: AssetConfig.TimerTextStyle,
            name: "timerText",
            anchor:  Core.Enum.Anchor.MiddleCenter
        };

        static StageRect: Core.Interface.IMaskConfig = {
            shape : Shape.Rectangle,
            name : "StageBg",
            fill : 0x00000,
            alpha:0
        }
        
        //
        // ─── Button Config ────────────────────────────────────────────────────────────
        //
            
         /**spin button's config*/
         static SpinButton: Core.Interface.IButtonConfig = {
            frames: {
                out: Texture.SpinOut,
                over: Texture.SpinOver,
                down: Texture.SpinOver,
                disabled: Texture.SpinDisabled
            }
        };

         /**stop button's config*/
         static StopButton: Core.Interface.IButtonConfig = {
            frames: {
                out: Texture.StopOut,
                over: Texture.StopOver,
                down: Texture.StopOver,
                disabled: Texture.StopDisabled
            }
        };

        /**menu button text's config*/
        static MenuButton: Core.Interface.IButtonConfig = {
            frames: {
                out: "home_out",
                over: "home_over",
                down: "home_down",
                disabled: "home_disabled"
            },
            name: "Menu Button"
        }

        //
        // ────────────────────────────────────────────────────────── Button Config ─────
        //


        //
        // ─── Text Config ────────────────────────────────────────────────────────────
        //
            
        /**
         * bigWin header of asset config
         */
        static BigWinHeader = new PIXI.TextStyle({
            fontFamily: Dev.Enum.WebFont.Modak,
            fontSize: 200,
            fill: 0xf54782,
            fontWeight: "400",
            lineJoin: "round",
            letterSpacing: 3,
            miterLimit: 5,
            stroke: "#2c00fb",
            strokeThickness: 3
        });

        /**
         * free spin Win header of asset config
         */
        static FreeSpinWinHeader = new PIXI.TextStyle({
            fontFamily: Dev.Enum.WebFont.Modak,
            fontSize: 200,
            fill: 0xffed00,
            fontWeight: "400",
            lineJoin: "round",
            letterSpacing: 3,
            miterLimit: 5,
            stroke: "#2c00fb",
            strokeThickness: 3
        });

         /**
         * Super win header of asset config
         */
        static SuperWinHeader = new PIXI.TextStyle({
            fontFamily: Dev.Enum.WebFont.Modak,
            fontSize: 200,
            fill: 0x36a9e1,
            fontWeight: "400",
            lineJoin: "round",
            letterSpacing: 3,
            miterLimit: 5,
            stroke: "#2c00fb",
            strokeThickness: 3
        });

         /**
         * Super win header of asset config
         */
        static MegaWinHeader = new PIXI.TextStyle({
            fontFamily: Dev.Enum.WebFont.Modak,
            fontSize: 200,
            fill: 0xffed00,
            fontWeight: "400",
            lineJoin: "round",
            letterSpacing: 3,
            miterLimit: 5,
            stroke: "#2c00fb",
            strokeThickness: 3
        });

        /**
         * Big win text of asset config
         */
        static BigWinText: Core.Interface.ITextConfig = {
            text: "BIG WIN",
            textStyle: AssetConfig.BigWinHeader,
            name: "BigWinHeader"
        };

         /**
         * Win header of asset config
         */
        static UIHeaderStyle = new PIXI.TextStyle({
            fontFamily: Dev.Enum.WebFont.Modak,
            fontSize: 200,
            fill: 0xffed00,
            fontWeight: "400",
            lineJoin: "round",
            letterSpacing: 3,
            miterLimit: 5,
            stroke: "#2c00fb",
            strokeThickness: 3
        });

        static SliderBarTextStyle = new PIXI.TextStyle({
            fontSize: 30,
            fontFamily: Dev.Enum.WebFont.LuckiestGuy,
            fill: "white",
            fontWeight: "400",
            lineJoin: "round",
            letterSpacing: 3,
            miterLimit: 5,
            stroke: "#2c00fb",
            strokeThickness: 3
        });

        static UIHeaderText: Core.Interface.ITextConfig = {
            text: "YOU WON",
            textStyle: AssetConfig.UIHeaderStyle,
            name: "UIHeader"
        };  

        static SliderBarHeaderText: Core.Interface.ITextConfig = {
            text: "%0",
            textStyle: AssetConfig.SliderBarTextStyle,
            name: "SliderBarHeader"
        };  
        
        /** general bold text's style*/
        static GeneralBoldTextStyle = new PIXI.TextStyle({
            fontFamily: "Montserrat, sans-serif",
            fontSize: "22px",
            fontWeight: "bold",
            fill: "#ffffff",
            stroke: 0x000000,
            strokeThickness: 3,
            align: "center"
        });
        
        /** generic bold text's config*/
        static GenericBoldText: Core.Interface.ITextConfig = {
            text: "Generic Bold Text",
            textStyle: AssetConfig.GeneralBoldTextStyle,
            name: "Generic Text"
        };

        static WinAmountStyle = new PIXI.TextStyle({
            fontFamily: Dev.Enum.WebFont.Modak,
            fontSize: 150,
            fill: "white",
            fontWeight: "400",
            lineJoin: "round",
            letterSpacing: 3,
            miterLimit: 5,
            stroke: "#2c00fb",
            strokeThickness: 3
        });

        static WinLineTextStyle = new PIXI.TextStyle({
            fontFamily: Dev.Enum.WebFont.LuckiestGuy,
            fontSize: 150,
            fill: "white",
            fontWeight: "400",
            lineJoin: "round",
            letterSpacing: 3,
            miterLimit: 5,
            stroke: "#2c00fb",
            strokeThickness: 3
        });

        static WinAmountText: Core.Interface.ITextConfig = {
            text: "x5",
            textStyle: AssetConfig.WinAmountStyle,
            name: "WinAmountText"
        };

        static WinLineText: Core.Interface.ITextConfig = {
            text: "",
            textStyle: AssetConfig.WinLineTextStyle,
            name: "WinLineText"
        };

        /**
         * Mega win text of asset config
         */
        static MegaWinText: Core.Interface.ITextConfig = {
            text: "MEGA WIN",
            textStyle: AssetConfig.MegaWinHeader,
            name: "MegaWinHeader"
        };

        /**
         * Super win text of asset config
         */
        static SuperWinText: Core.Interface.ITextConfig = {
            text: "SUPER WIN",
            textStyle: AssetConfig.SuperWinHeader,
            name: "SuperWinHeader"
        };

        
        /**
         * free spin start win text of asset config
         */
        static FreeSpinStartWinText: Core.Interface.ITextConfig = {
            text: "FREE SPIN",
            textStyle: AssetConfig.FreeSpinWinHeader,
            name: "FreeSpinStartWinHeader"
        };

        /** general text's style*/
        static GeneralTextStyle = new PIXI.TextStyle({
            fontFamily: "Montserrat, sans-serif",
            fontSize: "14px",
            fontWeight: "bold",
            fill: "#d08f38",
            stroke: 0x000000,
            strokeThickness: 3,
            align: "center"
        });

        /** generic text's config*/
        static GenericText: Core.Interface.ITextConfig = {
            text: "Generic Text",
            textStyle: AssetConfig.GeneralTextStyle,
            name: "Generic Text"
        };


        /** menu text's config*/
        static MenuText: Core.Interface.ITextConfig = {
            text: "Menu",
            textStyle: AssetConfig.GeneralTextStyle,
            name: "Menu Text"
        };

        //
        // ────────────────────────────────────────────────────────── Text Config ─────
        //

        //
        // ─── Sprite Config ────────────────────────────────────────────────────────────
        //

        /**
         * Normal spin bg of asset config
         */
        static NormalSpinBg : Core.Interface.ISpriteConfig = {
            frame : Texture.SlotNormalBg,
            name : "Background"
        }

        /**
         * Normal spin clone bg of asset config
         */
        static NormalSpinDarkBg : Core.Interface.ISpriteConfig = {
            frame : Texture.SlotNormalDarkBg,
            name : "Background"
        }

        /**
         * Logo  of asset config
         */
        static Logo : Core.Interface.ISpriteConfig = {
            frame : PreTexture.Logo,
            name : "Logo"
        }

        static WheelBase : Core.Interface.ISpriteConfig = {
            frame : Texture.WheelBase,
            name : "WheelFrameBase"
        }

        static WheelFrame : Core.Interface.ISpriteConfig = {
            frame : Texture.WheelFrame,
            name : "WheelFrame"
        }

        static WheelInner : Core.Interface.ISpriteConfig = {
            frame : Texture.WheelInner,
            name : "WheelInner"
        }

        static WheelIndicator : Core.Interface.ISpriteConfig = {
            frame : Texture.WheelIndicator,
            name : "WheelIndicator"
        }

        static WheelLight : Core.Interface.ISpriteConfig = {
            frame : Texture.WheelLight,
            name : "WheelLight"
        }

        static WinBg : Core.Interface.ISpriteConfig = {
            frame : Texture.WinBg,
            name : "WinBg"
        }

        static WinFruit : Core.Interface.ISpriteConfig = {
            frame : Texture.WinFruit,
            name : "WinFruit"
        }

        static FreeSpinWinFruit : Core.Interface.ISpriteConfig = {
            frame : Texture.FreeSpinWinFruit,
            name : "FreeSpinWinFruit"
        }

        static ParticleSpark : Core.Interface.ISpriteConfig = {
            frame : Texture.ParticleSpark,
            name : "ParticleSpark"
        }


        static WinUI : Core.Interface.ISpriteConfig = {
            frame : Texture.WinUI,
            name : "WinUI"
        }

        static FreeSpinSpinBg : Core.Interface.ISpriteConfig = {
            frame : Texture.SlotFreeSpinBg,
            name : "Background"
        }

        static CocktailMask : Core.Interface.ISpriteConfig = {
            frame : Texture.CocktailMask,
            name : "CocktailMask"
        }

        static FreeSpinSpinDarkBg : Core.Interface.ISpriteConfig = {
            frame : Texture.SlotDarkFreeSpinBg,
            name : "Background"
        }

        static WheelNextIcon : Core.Interface.ISpriteConfig = {
            frame : Texture.WheelNextIcon,
            name : "WheelNextIcon"
        }

        static WheelYellowBase : Core.Interface.ISpriteConfig = {
            frame : Texture.YellowBase,
            name : "YellowBase",
            tint : 0xffea00
        }

        static WheelYellowLine : Core.Interface.ISpriteConfig = {
            frame : Texture.YellowLine,
            name : "YellowLine"
        }

        static WheelRedBase : Core.Interface.ISpriteConfig = {
            frame : Texture.RedBase,
            name : "RedBase",
            tint : 0xff1e1e 
        }

        static WheelRedLine : Core.Interface.ISpriteConfig = {
            frame : Texture.RedLine,
            name : "RedLine"
        }

        static WheelGreenBase : Core.Interface.ISpriteConfig = {
            frame : Texture.GreenBase,
            name : "GreenBase",
            tint : 0x06ff6a 
        }

        static FruitBarBg : Core.Interface.ISpriteConfig = {
            frame : Texture.FruitBarBg,
            name : "FruitBarBg"
        }

        static FruitBarFront : Core.Interface.ISpriteConfig = {
            frame : Texture.FruitBarFront,
            name : "FruitBarFront"
        }

        static WheelGreenLine : Core.Interface.ISpriteConfig = {
            frame : Texture.GreenLine,
            name : "GreenLine"
        }
        
        static WheelPurpleBase : Core.Interface.ISpriteConfig = {
            frame : Texture.PurpleBase,
            name : "PurpleBase",
            tint : 0xb608ff 
        }

        static WheelPurpleLine : Core.Interface.ISpriteConfig = {
            frame : Texture.PurpleLine,
            name : "PurpleLine"
        }

        static FruitBarHead : Core.Interface.ISpriteConfig = {
            frame : Texture.FruitBarHead,
            name : "FruitBarHead"
        }

        static PlatformSide : Core.Interface.ISpriteConfig = 
        {
            frame : Texture.PlatformSide,
            name : "PlatformSide"
        }

        static Glass : Core.Interface.ISpriteConfig = 
        {
            frame : Texture.Glass,
            name : "Glass"
        }

        static PlatformLine : Core.Interface.ISpriteConfig = 
        {
            frame : Texture.PlatformLine,
            name : "PlatformLine"
        }

        static PlatformTile : Core.Interface.ISpriteConfig = 
        {
            frame : Texture.PlatformTile,
            name : "PlatformTile"
        }

        static Floats : Core.Interface.ISpriteConfig[] = [
            {
                frame : Texture.Float1,
                name : "Float1"
            },
            {
                frame : Texture.Float2,
                name : "Float2"
            },  {
                frame : Texture.Float3,
                name : "Float3"
            },
            {
                frame : Texture.Float4,
                name : "Float4"
            },
            {
                frame : Texture.Float5,
                name : "Float5"
            },
            {
                frame : Texture.Float6,
                name : "Float6"
            }
        ]

        static Bubbles : Core.Interface.ISpriteConfig[] = [
            {
                frame : Texture.Bubble1,
                name : "Bubble1"
            },
            {
                frame : Texture.Bubble2,
                name : "Bubble2"
            },  {
                frame : Texture.Bubble3,
                name : "Bubble3"
            },
            {
                frame : Texture.Bubble4,
                name : "Bubble4"
            }
        ]
        
        /**
         * Platform circle of asset config
         */
        static PlatformCircle : Core.Interface.ISpriteConfig = 
        {
            frame : Texture.PlatformCircle,
            name : "PlatformCircle"
        }

        static UIRefBg : Core.Interface.ISpriteConfig = {
            frame : Texture.UIRefBg,
            name : "UıRefBg"
        }

        //
        // ────────────────────────────────────────────────────────── Sprite Config ─────
        //

        //
        // ─── Mask Config ────────────────────────────────────────────────────────────
        //

        static LoadingCircleBg : Core.Interface.IMaskConfig = {
            shape : Shape.RoundRect,
            name : "LoadingCircle",
            radius : 10,
            fill : 0xba6329
        }

        static SlotWinLine : Core.Interface.IMaskConfig = {
            shape : Shape.Line,
            name : "SlotWinline",
            fill : 0xffffff
        }

        static LoadingCircleFill : Core.Interface.IMaskConfig = {
            shape : Shape.RoundRect,
            name : "LoadingCircle",
            radius : 10,
            fill : 0xe8cf5b
        }

        static FruitBarMask : Core.Interface.IMaskConfig = {
            shape : Shape.RoundRect,
            name : "FruitBarMask",
            radius : 27,
            fill : 0xffffff
        }

        static SliderFilterMask : Core.Interface.IMaskConfig = {
            shape : Shape.RoundRect,
            name : "SliderFilterMask",
            radius : 15,
            fill : 0xffffff,
            alpha:0
        }

        static PopupRect: Core.Interface.IMaskConfig = {
            shape : Shape.Rectangle,
            name : "PopupBg",
            fill : 0x00000,
            alpha:0
        }

        static WheelMask: Core.Interface.IMaskConfig = {
            shape : Shape.Circle,
            name : "WheelMask",
            fill : 0x00000,
            radius:352,
            alpha:1
        }

        static GeneralReelMask: Core.Interface.IMaskConfig = {
            shape : Shape.Rectangle,
            name : "GeneralReelMask",
            fill : 0x00000,
            alpha:0
        }

        static Frame: Core.Interface.IMaskConfig = {
            shape : Shape.RoundRect,
            name : "Frame",
            radius:30,
            fill : 0x00000,
            alpha:0.7
        }

        static LoadingBg: Core.Interface.IMaskConfig = {
            shape : Shape.Rectangle,
            name : "LoadingBg",
            fill : 0xf2f4d3,
            alpha:0
        }

        //
        // ────────────────────────────────────────────────────────── Mask Config ─────
        //

        //
        // ─── Spine Config ────────────────────────────────────────────────────────────
        //
            
        static Cocktail: Core.Interface.ISpineConfig = {
            skeletonDataName : Dev.Enum.SpineAnimation.Cocktail,
            animations : AnimConfig.CocktailAnimation,
            name : "Cocktail"
        }

        static FruitBar: Core.Interface.ISpineConfig = {
            skeletonDataName : Dev.Enum.SpineAnimation.FruitBar,
            animations : AnimConfig.FruitBarAnimation,
            name : "FruitBar"
        }

        static Liquid: Core.Interface.ISpineConfig = {
            skeletonDataName : Dev.Enum.SpineAnimation.Liquid,
            animations : AnimConfig.LiquidAnimation,
            name : "Liquid"
        }

        //
        // ────────────────────────────────────────────────────────── Spine Config ─────
        //

         //
        // ─── Sequence Animation Config ────────────────────────────────────────────────────────────
        //

        static WheelSpark: Core.Interface.ISequenceConfig = {
            defaultAnimName:Enum.AnimNames.WheelSparkLoop,
            animations : AnimConfig.WheelSpark,
            name : "WheelSpark"
        }

        static MatchFrame: Core.Interface.ISequenceConfig = {
            defaultAnimName:Enum.AnimNames.MatchFrame,
            animations : AnimConfig.MatchFrame,
            name : "MatchFrame"
        }

        static Coin: Core.Interface.ISequenceConfig = {
            defaultAnimName:Enum.AnimNames.Coin,
            animations : AnimConfig.Coin,
            name : "Coin"
        }

         //
        // ────────────────────────────────────────────────────────── Sequence Animation Config ─────
        //
            

         //
        // ─── Particles Config ────────────────────────────────────────────────────────────
        //

          /**fire spark emitter */
          static FireSparkEmitter = {
            "alpha": {
                "start": 0,
                "end": 1
            },
            "scale": {
                "start": 0.01,
                "end": 0.2,
                "minimumScaleMultiplier": 0.3
            },
            "color": {
                "start": "#ffffff",
                "end": "#ffffff"
            },
            "speed": {
                "start": 85,
                "end": 10,
                "minimumSpeedMultiplier": 0.9
            },
            "acceleration": {
                "x": 0,
                "y": 0
            },
            "maxSpeed": 0,
            "startRotation": {
                "min": 0,
                "max": 360
            },
            "noRotation": false,
            "rotationSpeed": {
                "min": 0,
                "max": 0
            },
            "lifetime": {
                "min": 0.16,
                "max": 0.85
            },
            "blendMode": "normal",
            "frequency": 0.006,
            "emitterLifetime": -0.66,
            "maxParticles": 6,
            "pos": {
                "x": 0,
                "y": 0
            },
            "addAtBack": false,
            "spawnType": "circle",
            "spawnCircle": {
                "x": 5,
                "y": 0,
                "r": 0
            }
        }

        static SliderBarBubble = {
            "alpha": {
                "start": 1,
                "end": 1
            },
            "scale": {
                "start": 0.2,
                "end": 0.1,
                "minimumScaleMultiplier": 0.5
            },
            "color": {
                "start": "#ffffff",
                "end": "#ffffff"
            },
            "speed": {
                "start": 150,
                "end": 50,
                "minimumSpeedMultiplier": 1
            },
            "acceleration": {
                "x": 0,
                "y": 0
            },
            "maxSpeed": 0,
            "startRotation": {
                "min": -100,
                "max": -80
            },
            "noRotation": false,
            "rotationSpeed": {
                "min": 0,
                "max": 20
            },
            "lifetime": {
                "min": 1,
                "max": 1
            },
            "blendMode": "normal",
            "frequency": 0.032,
            "emitterLifetime": 1,
            "maxParticles": 25,
            "pos": {
                "x": 0,
                "y": 0
            },
            "addAtBack": false,
            "spawnType": "rect",
            "spawnRect": {
                "x": 0,
                "y": 0,
                "w": 50,
                "h": 0
            }
        }

        //bubble emitter 
        static BubbleVertical = {
            "alpha": {
                "start": 0.9,
                "end": 0
            },
            "scale": {
                "start": 0.51,
                "end": 1,
                "minimumScaleMultiplier": 0.5
            },
            "color": {
                "start": "#ffffff",
                "end": "#ffffff"
            },
            "speed": {
                "start": 500,
                "end": 500,
                "minimumSpeedMultiplier": 1
            },
            "acceleration": {
                "x": 0,
                "y": 0
            },
            "maxSpeed": 0,
            "startRotation": {
                "min": 260,
                "max": 280
            },
            "noRotation": false,
            "rotationSpeed": {
                "min": 0,
                "max": 50
            },
            "lifetime": {
                "min": 2,
                "max": 2
            },
            "blendMode": "normal",
            "frequency": 0.015,
            "emitterLifetime": 1,
            "maxParticles": 30,
            "pos": {
                "x": 0,
                "y": 0
            },
            "addAtBack": false,
            "spawnType": "rect",
            "spawnRect": {
                "x": -500,
                "y": 500,
                "w": 900,
                "h": 0
            }
        }
         //
        // ────────────────────────────────────────────────────────── Particles Config ─────
        //
    }
}