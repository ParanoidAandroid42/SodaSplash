/// <reference path='../enum/ResourceEnum.ts'/>
module Dev.Config {
    import Shape = Core.Enum.Shape;
    import Texture = Enum.Texture;
    import PreTexture = Enum.PreTexture;

    /**
     * AssetConfig class provides configuration for various assets used in the game.
     */
    export class AssetConfig {
        static readonly ResourceManager = Core.Managers.ResourceManager.Instance;

        static readonly TimerCircle: Core.Interface.IMaskConfig = {
            shape: Shape.Circle,
            name: 'TimerCircleMask',
            radius: 1480,
            fill: 0x000000,
            alpha: 0.75,
        };

        static readonly TimerTextStyle = new PIXI.TextStyle({
            fontFamily: 'Luckiest Guy',
            fontSize: 300,
            fontWeight: '600',
            fill: '#ffffff',
            align: 'center',
        });

        /** Timer text's config */
        static readonly TimerText: Core.Interface.ITextConfig = {
            text: '5',
            textStyle: AssetConfig.TimerTextStyle,
            name: 'timerText',
            anchor: Core.Enum.Anchor.MiddleCenter,
        };

        static readonly StageRect: Core.Interface.IMaskConfig = {
            shape: Shape.Rectangle,
            name: 'StageBg',
            fill: 0x000000,
            alpha: 0,
        };

        // ─── Button Config ────────────────────────────────────────────────────────────

        /** Spin button's config */
        static readonly SpinButton: Core.Interface.IButtonConfig = {
            frames: {
                out: Texture.SpinOut,
                over: Texture.SpinOver,
                down: Texture.SpinOver,
                disabled: Texture.SpinDisabled,
            },
        };

        /** Stop button's config */
        static readonly StopButton: Core.Interface.IButtonConfig = {
            frames: {
                out: Texture.StopOut,
                over: Texture.StopOver,
                down: Texture.StopOver,
                disabled: Texture.StopDisabled,
            },
        };

        /** Menu button text's config */
        static readonly MenuButton: Core.Interface.IButtonConfig = {
            frames: {
                out: 'home_out',
                over: 'home_over',
                down: 'home_down',
                disabled: 'home_disabled',
            },
            name: 'Menu Button',
        };

        // ────────────────────────────────────────────────────────── Button Config ─────

        // ─── Text Config ────────────────────────────────────────────────────────────

        /** BigWin header of asset config */
        static readonly BigWinHeader = new PIXI.TextStyle({
            fontFamily: Dev.Enum.WebFont.Modak,
            fontSize: 200,
            fill: 0xf54782,
            fontWeight: '400',
            lineJoin: 'round',
            letterSpacing: 3,
            miterLimit: 5,
            stroke: '#2c00fb',
            strokeThickness: 3,
        });

        /** Free spin win header of asset config */
        static readonly FreeSpinWinHeader = new PIXI.TextStyle({
            fontFamily: Dev.Enum.WebFont.Modak,
            fontSize: 200,
            fill: 0xffed00,
            fontWeight: '400',
            lineJoin: 'round',
            letterSpacing: 3,
            miterLimit: 5,
            stroke: '#2c00fb',
            strokeThickness: 3,
        });

        /** Super win header of asset config */
        static readonly SuperWinHeader = new PIXI.TextStyle({
            fontFamily: Dev.Enum.WebFont.Modak,
            fontSize: 200,
            fill: 0x36a9e1,
            fontWeight: '400',
            lineJoin: 'round',
            letterSpacing: 3,
            miterLimit: 5,
            stroke: '#2c00fb',
            strokeThickness: 3,
        });

        /** Mega win header of asset config */
        static readonly MegaWinHeader = new PIXI.TextStyle({
            fontFamily: Dev.Enum.WebFont.Modak,
            fontSize: 200,
            fill: 0xffed00,
            fontWeight: '400',
            lineJoin: 'round',
            letterSpacing: 3,
            miterLimit: 5,
            stroke: '#2c00fb',
            strokeThickness: 3,
        });

        /** Big win text of asset config */
        static readonly BigWinText: Core.Interface.ITextConfig = {
            text: 'BIG WIN',
            textStyle: AssetConfig.BigWinHeader,
            name: 'BigWinHeader',
        };

        /** UI header style of asset config */
        static readonly UIHeaderStyle = new PIXI.TextStyle({
            fontFamily: Dev.Enum.WebFont.Modak,
            fontSize: 200,
            fill: 0xffed00,
            fontWeight: '400',
            lineJoin: 'round',
            letterSpacing: 3,
            miterLimit: 5,
            stroke: '#2c00fb',
            strokeThickness: 3,
        });

        /** Slider bar text style */
        static readonly SliderBarTextStyle = new PIXI.TextStyle({
            fontSize: 30,
            fontFamily: Dev.Enum.WebFont.LuckiestGuy,
            fill: 'white',
            fontWeight: '400',
            lineJoin: 'round',
            letterSpacing: 3,
            miterLimit: 5,
            stroke: '#2c00fb',
            strokeThickness: 3,
        });

        /** UI header text of asset config */
        static readonly UIHeaderText: Core.Interface.ITextConfig = {
            text: 'YOU WON',
            textStyle: AssetConfig.UIHeaderStyle,
            name: 'UIHeader',
        };

        /** Slider bar header text */
        static readonly SliderBarHeaderText: Core.Interface.ITextConfig = {
            text: '%0',
            textStyle: AssetConfig.SliderBarTextStyle,
            name: 'SliderBarHeader',
        };

        /** General bold text style */
        static readonly GeneralBoldTextStyle = new PIXI.TextStyle({
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '22px',
            fontWeight: 'bold',
            fill: '#ffffff',
            stroke: 0x000000,
            strokeThickness: 3,
            align: 'center',
        });

        /** Generic bold text's config */
        static readonly GenericBoldText: Core.Interface.ITextConfig = {
            text: 'Generic Bold Text',
            textStyle: AssetConfig.GeneralBoldTextStyle,
            name: 'Generic Text',
        };

        /** Win amount style */
        static readonly WinAmountStyle = new PIXI.TextStyle({
            fontFamily: Dev.Enum.WebFont.Modak,
            fontSize: 150,
            fill: 'white',
            fontWeight: '400',
            lineJoin: 'round',
            letterSpacing: 3,
            miterLimit: 5,
            stroke: '#2c00fb',
            strokeThickness: 3,
        });

        /** Win line text style */
        static readonly WinLineTextStyle = new PIXI.TextStyle({
            fontFamily: Dev.Enum.WebFont.LuckiestGuy,
            fontSize: 150,
            fill: 'white',
            fontWeight: '400',
            lineJoin: 'round',
            letterSpacing: 3,
            miterLimit: 5,
            stroke: '#2c00fb',
            strokeThickness: 3,
        });

        /** Win amount text of asset config */
        static readonly WinAmountText: Core.Interface.ITextConfig = {
            text: 'x5',
            textStyle: AssetConfig.WinAmountStyle,
            name: 'WinAmountText',
        };

        /** Win line text of asset config */
        static readonly WinLineText: Core.Interface.ITextConfig = {
            text: '',
            textStyle: AssetConfig.WinLineTextStyle,
            name: 'WinLineText',
        };

        /** Mega win text of asset config */
        static readonly MegaWinText: Core.Interface.ITextConfig = {
            text: 'MEGA WIN',
            textStyle: AssetConfig.MegaWinHeader,
            name: 'MegaWinHeader',
        };

        /** Super win text of asset config */
        static readonly SuperWinText: Core.Interface.ITextConfig = {
            text: 'SUPER WIN',
            textStyle: AssetConfig.SuperWinHeader,
            name: 'SuperWinHeader',
        };

        /** Free spin start win text of asset config */
        static readonly FreeSpinStartWinText: Core.Interface.ITextConfig = {
            text: 'FREE SPIN',
            textStyle: AssetConfig.FreeSpinWinHeader,
            name: 'FreeSpinStartWinHeader',
        };

        /** General text style */
        static readonly GeneralTextStyle = new PIXI.TextStyle({
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '14px',
            fontWeight: 'bold',
            fill: '#d08f38',
            stroke: 0x000000,
            strokeThickness: 3,
            align: 'center',
        });

        /** Generic text's config */
        static readonly GenericText: Core.Interface.ITextConfig = {
            text: 'Generic Text',
            textStyle: AssetConfig.GeneralTextStyle,
            name: 'Generic Text',
        };

        /** Menu text's config */
        static readonly MenuText: Core.Interface.ITextConfig = {
            text: 'Menu',
            textStyle: AssetConfig.GeneralTextStyle,
            name: 'Menu Text',
        };

        // ────────────────────────────────────────────────────────── Text Config ─────

        // ─── Sprite Config ────────────────────────────────────────────────────────────

        /** Normal spin background */
        static readonly NormalSpinBg: Core.Interface.ISpriteConfig = {
            frame: Texture.SlotNormalBg,
            name: 'Background',
        };

        /** Normal spin dark background */
        static readonly NormalSpinDarkBg: Core.Interface.ISpriteConfig = {
            frame: Texture.SlotNormalDarkBg,
            name: 'Background',
        };

        /** Logo */
        static readonly Logo: Core.Interface.ISpriteConfig = {
            frame: PreTexture.Logo,
            name: 'Logo',
        };

        static readonly WheelBase: Core.Interface.ISpriteConfig = {
            frame: Texture.WheelBase,
            name: 'WheelFrameBase',
        };

        static readonly WheelFrame: Core.Interface.ISpriteConfig = {
            frame: Texture.WheelFrame,
            name: 'WheelFrame',
        };

        static readonly WheelInner: Core.Interface.ISpriteConfig = {
            frame: Texture.WheelInner,
            name: 'WheelInner',
        };

        static readonly WheelIndicator: Core.Interface.ISpriteConfig = {
            frame: Texture.WheelIndicator,
            name: 'WheelIndicator',
        };

        static readonly WheelLight: Core.Interface.ISpriteConfig = {
            frame: Texture.WheelLight,
            name: 'WheelLight',
        };

        static readonly WinBg: Core.Interface.ISpriteConfig = {
            frame: Texture.WinBg,
            name: 'WinBg',
        };

        static readonly WinFruit: Core.Interface.ISpriteConfig = {
            frame: Texture.WinFruit,
            name: 'WinFruit',
        };

        static readonly FreeSpinWinFruit: Core.Interface.ISpriteConfig = {
            frame: Texture.FreeSpinWinFruit,
            name: 'FreeSpinWinFruit',
        };

        static readonly ParticleSpark: Core.Interface.ISpriteConfig = {
            frame: Texture.ParticleSpark,
            name: 'ParticleSpark',
        };

        static readonly WinUI: Core.Interface.ISpriteConfig = {
            frame: Texture.WinUI,
            name: 'WinUI',
        };

        static readonly FreeSpinSpinBg: Core.Interface.ISpriteConfig = {
            frame: Texture.SlotFreeSpinBg,
            name: 'Background',
        };

        static readonly CocktailMask: Core.Interface.ISpriteConfig = {
            frame: Texture.CocktailMask,
            name: 'CocktailMask',
        };

        static readonly FreeSpinSpinDarkBg: Core.Interface.ISpriteConfig = {
            frame: Texture.SlotDarkFreeSpinBg,
            name: 'Background',
        };

        static readonly WheelNextIcon: Core.Interface.ISpriteConfig = {
            frame: Texture.WheelNextIcon,
            name: 'WheelNextIcon',
        };

        static readonly WheelYellowBase: Core.Interface.ISpriteConfig = {
            frame: Texture.YellowBase,
            name: 'YellowBase',
            tint: 0xffea00,
        };

        static readonly WheelYellowLine: Core.Interface.ISpriteConfig = {
            frame: Texture.YellowLine,
            name: 'YellowLine',
        };

        static readonly WheelRedBase: Core.Interface.ISpriteConfig = {
            frame: Texture.RedBase,
            name: 'RedBase',
            tint: 0xff1e1e,
        };

        static readonly WheelRedLine: Core.Interface.ISpriteConfig = {
            frame: Texture.RedLine,
            name: 'RedLine',
        };

        static readonly WheelGreenBase: Core.Interface.ISpriteConfig = {
            frame: Texture.GreenBase,
            name: 'GreenBase',
            tint: 0x06ff6a,
        };

        static readonly FruitBarBg: Core.Interface.ISpriteConfig = {
            frame: Texture.FruitBarBg,
            name: 'FruitBarBg',
        };

        static readonly FruitBarFront: Core.Interface.ISpriteConfig = {
            frame: Texture.FruitBarFront,
            name: 'FruitBarFront',
        };

        static readonly WheelGreenLine: Core.Interface.ISpriteConfig = {
            frame: Texture.GreenLine,
            name: 'GreenLine',
        };

        static readonly WheelPurpleBase: Core.Interface.ISpriteConfig = {
            frame: Texture.PurpleBase,
            name: 'PurpleBase',
            tint: 0xb608ff,
        };

        static readonly WheelPurpleLine: Core.Interface.ISpriteConfig = {
            frame: Texture.PurpleLine,
            name: 'PurpleLine',
        };

        static readonly FruitBarHead: Core.Interface.ISpriteConfig = {
            frame: Texture.FruitBarHead,
            name: 'FruitBarHead',
        };

        static readonly PlatformSide: Core.Interface.ISpriteConfig = {
            frame: Texture.PlatformSide,
            name: 'PlatformSide',
        };

        static readonly Glass: Core.Interface.ISpriteConfig = {
            frame: Texture.Glass,
            name: 'Glass',
        };

        static readonly PlatformLine: Core.Interface.ISpriteConfig = {
            frame: Texture.PlatformLine,
            name: 'PlatformLine',
        };

        static readonly PlatformTile: Core.Interface.ISpriteConfig = {
            frame: Texture.PlatformTile,
            name: 'PlatformTile',
        };

        static readonly Floats: Core.Interface.ISpriteConfig[] = [
            { frame: Texture.Float1, name: 'Float1' },
            { frame: Texture.Float2, name: 'Float2' },
            { frame: Texture.Float3, name: 'Float3' },
            { frame: Texture.Float4, name: 'Float4' },
            { frame: Texture.Float5, name: 'Float5' },
            { frame: Texture.Float6, name: 'Float6' },
        ];

        static readonly Bubbles: Core.Interface.ISpriteConfig[] = [
            { frame: Texture.Bubble1, name: 'Bubble1' },
            { frame: Texture.Bubble2, name: 'Bubble2' },
            { frame: Texture.Bubble3, name: 'Bubble3' },
            { frame: Texture.Bubble4, name: 'Bubble4' },
        ];

        /** Platform circle of asset config */
        static readonly PlatformCircle: Core.Interface.ISpriteConfig = {
            frame: Texture.PlatformCircle,
            name: 'PlatformCircle',
        };

        static readonly UIRefBg: Core.Interface.ISpriteConfig = {
            frame: Texture.UIRefBg,
            name: 'UıRefBg',
        };

        // ────────────────────────────────────────────────────────── Sprite Config ─────

        // ─── Mask Config ────────────────────────────────────────────────────────────

        static readonly LoadingCircleBg: Core.Interface.IMaskConfig = {
            shape: Shape.RoundRect,
            name: 'LoadingCircle',
            radius: 10,
            fill: 0xba6329,
        };

        static readonly SlotWinLine: Core.Interface.IMaskConfig = {
            shape: Shape.Line,
            name: 'SlotWinline',
            fill: 0xffffff,
        };

        static readonly LoadingCircleFill: Core.Interface.IMaskConfig = {
            shape: Shape.RoundRect,
            name: 'LoadingCircle',
            radius: 10,
            fill: 0xe8cf5b,
        };

        static readonly FruitBarMask: Core.Interface.IMaskConfig = {
            shape: Shape.RoundRect,
            name: 'FruitBarMask',
            radius: 27,
            fill: 0xffffff,
        };

        static readonly SliderFilterMask: Core.Interface.IMaskConfig = {
            shape: Shape.RoundRect,
            name: 'SliderFilterMask',
            radius: 15,
            fill: 0xffffff,
            alpha: 0,
        };

        static readonly PopupRect: Core.Interface.IMaskConfig = {
            shape: Shape.Rectangle,
            name: 'PopupBg',
            fill: 0x000000,
            alpha: 0,
        };

        static readonly WheelMask: Core.Interface.IMaskConfig = {
            shape: Shape.Circle,
            name: 'WheelMask',
            fill: 0x000000,
            radius: 352,
            alpha: 1,
        };

        static readonly GeneralReelMask: Core.Interface.IMaskConfig = {
            shape: Shape.Rectangle,
            name: 'GeneralReelMask',
            fill: 0x000000,
            alpha: 0,
        };

        static readonly Frame: Core.Interface.IMaskConfig = {
            shape: Shape.RoundRect,
            name: 'Frame',
            radius: 30,
            fill: 0x000000,
            alpha: 0.7,
        };

        static readonly LoadingBg: Core.Interface.IMaskConfig = {
            shape: Shape.Rectangle,
            name: 'LoadingBg',
            fill: 0xf2f4d3,
            alpha: 0,
        };

        // ────────────────────────────────────────────────────────── Mask Config ─────

        // ─── Spine Config ────────────────────────────────────────────────────────────

        static readonly Cocktail: Core.Interface.ISpineConfig = {
            skeletonDataName: Dev.Enum.SpineAnimation.Cocktail,
            animations: AnimConfig.CocktailAnimation,
            name: 'Cocktail',
        };

        static readonly FruitBar: Core.Interface.ISpineConfig = {
            skeletonDataName: Dev.Enum.SpineAnimation.FruitBar,
            animations: AnimConfig.FruitBarAnimation,
            name: 'FruitBar',
        };

        static readonly Liquid: Core.Interface.ISpineConfig = {
            skeletonDataName: Dev.Enum.SpineAnimation.Liquid,
            animations: AnimConfig.LiquidAnimation,
            name: 'Liquid',
        };

        // ────────────────────────────────────────────────────────── Spine Config ─────

        // ─── Sequence Animation Config ─────────────────────────────────────────────────

        static readonly WheelSpark: Core.Interface.ISequenceConfig = {
            defaultAnimName: Enum.AnimNames.WheelSparkLoop,
            animations: AnimConfig.WheelSpark,
            name: 'WheelSpark',
        };

        static readonly MatchFrame: Core.Interface.ISequenceConfig = {
            defaultAnimName: Enum.AnimNames.MatchFrame,
            animations: AnimConfig.MatchFrame,
            name: 'MatchFrame',
        };

        static readonly Coin: Core.Interface.ISequenceConfig = {
            defaultAnimName: Enum.AnimNames.Coin,
            animations: AnimConfig.Coin,
            name: 'Coin',
        };

        // ────────────────────────────────────────────────────────── Sequence Animation Config ─────

        // ─── Particles Config ─────────────────────────────────────────────────────────

        /** Fire spark emitter */
        static readonly FireSparkEmitter = {
            alpha: { start: 0, end: 1 },
            scale: { start: 0.01, end: 0.2, minimumScaleMultiplier: 0.3 },
            color: { start: '#ffffff', end: '#ffffff' },
            speed: { start: 85, end: 10, minimumSpeedMultiplier: 0.9 },
            acceleration: { x: 0, y: 0 },
            maxSpeed: 0,
            startRotation: { min: 0, max: 360 },
            noRotation: false,
            rotationSpeed: { min: 0, max: 0 },
            lifetime: { min: 0.16, max: 0.85 },
            blendMode: 'normal',
            frequency: 0.006,
            emitterLifetime: -0.66,
            maxParticles: 6,
            pos: { x: 0, y: 0 },
            addAtBack: false,
            spawnType: 'circle',
            spawnCircle: { x: 5, y: 0, r: 0 },
        };

        static readonly SliderBarBubble = {
            alpha: { start: 1, end: 1 },
            scale: { start: 0.2, end: 0.1, minimumScaleMultiplier: 0.5 },
            color: { start: '#ffffff', end: '#ffffff' },
            speed: { start: 150, end: 50, minimumSpeedMultiplier: 1 },
            acceleration: { x: 0, y: 0 },
            maxSpeed: 0,
            startRotation: { min: -100, max: -80 },
            noRotation: false,
            rotationSpeed: { min: 0, max: 20 },
            lifetime: { min: 1, max: 1 },
            blendMode: 'normal',
            frequency: 0.032,
            emitterLifetime: 1,
            maxParticles: 25,
            pos: { x: 0, y: 0 },
            addAtBack: false,
            spawnType: 'rect',
            spawnRect: { x: 0, y: 0, w: 50, h: 0 },
        };

        /** Bubble emitter */
        static readonly BubbleVertical = {
            alpha: { start: 0.9, end: 0 },
            scale: { start: 0.51, end: 1, minimumScaleMultiplier: 0.5 },
            color: { start: '#ffffff', end: '#ffffff' },
            speed: { start: 500, end: 500, minimumSpeedMultiplier: 1 },
            acceleration: { x: 0, y: 0 },
            maxSpeed: 0,
            startRotation: { min: 260, max: 280 },
            noRotation: false,
            rotationSpeed: { min: 0, max: 50 },
            lifetime: { min: 2, max: 2 },
            blendMode: 'normal',
            frequency: 0.015,
            emitterLifetime: 1,
            maxParticles: 30,
            pos: { x: 0, y: 0 },
            addAtBack: false,
            spawnType: 'rect',
            spawnRect: { x: -500, y: 500, w: 900, h: 0 },
        };

        // ────────────────────────────────────────────────────────── Particles Config ─────
    }
}
