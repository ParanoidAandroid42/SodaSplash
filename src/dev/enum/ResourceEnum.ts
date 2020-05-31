namespace Dev.Enum {
    /**
     * Enum representing the different resource listener actions.
     */
    export enum ResourceListener {
        /** Event triggered when asset loading is completed. */
        AssetLoadCompleted = 'AssetLoadCompleted',
        /** Event triggered during asset loading. */
        AssetLoading = 'AssetLoading',
        /** Event triggered for adding textures. */
        AddTextures = 'AddTextures',
        /** Event triggered for adding sounds. */
        AddSounds = 'AddSounds',
        /** Event triggered for adding spine animations. */
        AddSpines = 'AddSpines',
        /** Event triggered for adding web fonts. */
        AddWebFonts = 'AddWebFonts',
        /** Event triggered for adding preloaded textures. */
        AddPreTextures = 'AddPreTextures',
        /** Event triggered when asset preloading is completed. */
        AssetPreLoadCompleted = 'AssetPreLoadCompleted',
    }

    /**
     * Enum representing the different spine animations with their respective file paths.
     */
    export enum SpineAnimation {
        Strawberry = 'assets/gfx/Symbols/strawberry/cilek.json',
        Lemon = 'assets/gfx/Symbols/lemon/limon.json',
        Clover = 'assets/gfx/Symbols/clover/low_symbols.json',
        Diamond = 'assets/gfx/Symbols/diamond/low_symbols.json',
        Hearth = 'assets/gfx/Symbols/hearth/low_symbols.json',
        Spade = 'assets/gfx/Symbols/spade/low_symbols.json',
        Wild = 'assets/gfx/Symbols/wild/symbol_wild.json',
        Plum = 'assets/gfx/Symbols/plum/erik.json',
        Grape = 'assets/gfx/Symbols/grape/uzum_001.json',
        FruitBar = 'assets/gfx/SlotMachine/Bar/fruit_bar.json',
        Scatter = 'assets/gfx/Symbols/scatter/symbol_scatter.json',
        Cocktail = 'assets/gfx/Bonus/Cocktail/cocktail.json',
        Liquid = 'assets/gfx/Bonus/Liquid/liquid.json',
    }

    /**
     * Enum representing the different web fonts and their respective URLs.
     */
    export enum WebFont {
        LuckiestGuy = 'Luckiest Guy',
        Modak = 'Modak',
        FontUrl = 'assets/fonts/stylesheet.css',
    }

    /**
     * Enum representing the preloaded texture file paths.
     */
    export enum PreTexture {
        Logo = 'assets/gfx/Background/logo.png',
    }

    /**
     * Enum representing the texture file paths.
     */
    export enum Texture {
        Shadow = 'assets/gfx/Background/shadow.png',
        WinBg = 'assets/gfx/Win/bg.png',
        WinFruit = 'assets/gfx/Win/fruit.png',
        FreeSpinWinFruit = 'assets/gfx/Win/free_spin_fruit.png',
        Coin = 'assets/gfx/Win/coin.json',
        ParticleSpark = 'assets/gfx/Symbols/particle.png',
        WinUI = 'assets/gfx/Win/ui.png',
        FruitBarBg = 'assets/gfx/SlotMachine/Bar/back.png',
        FruitBarFront = 'assets/gfx/SlotMachine/Bar/front2.png',
        SymbolMatchAnim = 'assets/gfx/Symbols/match/matchAnim-0.json',
        WheelSpark1 = 'assets/gfx/Bonus/Wheel/wheel_spark/wheelSpark-0.json',
        WheelSpark2 = 'assets/gfx/Bonus/Wheel/wheel_spark/wheelSpark-1.json',
        PlumIcon = 'assets/gfx/SlotMachine/SymbolIcon/plum.png',
        LemonIcon = 'assets/gfx/SlotMachine/SymbolIcon/lemon.png',
        StrawberryIcon = 'assets/gfx/SlotMachine/SymbolIcon/strawberry.png',
        GrapeIcon = 'assets/gfx/SlotMachine/SymbolIcon/grape.png',
        SpinOut = 'assets/sprites/Buttons/Spin.png',
        SpinOver = 'assets/sprites/Buttons/SpinOver.png',
        SpinDisabled = 'assets/sprites/Buttons/SpinDisabled.png',
        StopOut = 'assets/sprites/Buttons/SpinStop.png',
        StopOver = 'assets/sprites/Buttons/SpinStopOver.png',
        StopDisabled = 'assets/sprites/Buttons/SpinStopDisabled.png',
        SlotNormalBg = 'assets/gfx/Background/bg.jpg',
        SlotNormalDarkBg = 'assets/gfx/Background/bg2.jpg',
        SlotFreeSpinBg = 'assets/gfx/Background/Free_BG1.jpg',
        SlotDarkFreeSpinBg = 'assets/gfx/Background/Free_BG2.jpg',
        CocktailMask = 'assets/gfx/Bonus/Cocktail/cocktail_mask.png',
        Bubble1 = 'assets/gfx/Background/Bubble1.png',
        PlatformSide = 'assets/gfx/SlotMachine/Platform/platform_side.png',
        PlatformTile = 'assets/gfx/SlotMachine/Platform/platform_tile.png',
        PlatformCircle = 'assets/gfx/SlotMachine/Platform/platform_circle.png',
        UIRefBg = 'assets/gfx/Menu/ui_ref.png',
        PlatformLine = 'assets/gfx/SlotMachine/Platform/platform_line.png',
        Bubble2 = 'assets/gfx/Background/Bubble2.png',
        Bubble3 = 'assets/gfx/Background/Bubble3.png',
        Bubble4 = 'assets/gfx/Background/Bubble4.png',
        Float1 = 'assets/gfx/Background/float1.png',
        Float2 = 'assets/gfx/Background/float2.png',
        Float3 = 'assets/gfx/Background/float3.png',
        Float4 = 'assets/gfx/Background/float4.png',
        Float5 = 'assets/gfx/Background/float5.png',
        Float6 = 'assets/gfx/Background/float6.png',
        Glass = 'assets/gfx/Bonus/Cocktail/glass.png',
        WheelFrame = 'assets/gfx/Bonus/Wheel/frame.png',
        WheelBase = 'assets/gfx/Bonus/Wheel/frameBase.png',
        GreenLine = 'assets/gfx/Bonus/Wheel/greenLine.png',
        GreenBase = 'assets/gfx/Bonus/Wheel/greenBase.png',
        YellowLine = 'assets/gfx/Bonus/Wheel/yellowLine.png',
        YellowBase = 'assets/gfx/Bonus/Wheel/yellowBase.png',
        RedLine = 'assets/gfx/Bonus/Wheel/redLine.png',
        RedBase = 'assets/gfx/Bonus/Wheel/redBAse.png',
        PurpleLine = 'assets/gfx/Bonus/Wheel/purpleLine.png',
        FruitBarHead = 'assets/gfx/SlotMachine/Bar/head.png',
        PurpleBase = 'assets/gfx/Bonus/Wheel/purpleBase.png',
        WheelIndicator = 'assets/gfx/Bonus/Wheel/indicator.png',
        WheelLight = 'assets/gfx/Bonus/Wheel/light.png',
        WheelNextIcon = 'assets/gfx/Bonus/Wheel/nextIcon.png',
        WheelInner = 'assets/gfx/Bonus/Wheel/inner.png',
    }
}
