namespace Dev.Interface {
    /**
     * Interface representing the slot machine configuration.
     */
    export interface ISlotConfig {
        /**
         * Machine settings including type and reel matrix dimensions.
         */
        machine: {
            type: Enum.MachineType;
            reelMatrix: { row: number; column: number };
        };

        /**
         * Symbol settings including scale and optional offsets.
         */
        symbol: {
            scale: { x: number; y: number };
            offset?: { x: number; y: number };
            matchAnimScale?: { x: number; y: number };
            winSpriteScale?: { x: number; y: number };
        };

        /**
         * Win information for different win types.
         */
        win: IWinsInfo;

        /**
         * Reel mask settings including normal scale and optional fall down, match, and frame scales.
         */
        reelMask: {
            normalScale: { x: number; y: number; pX: number; pY: number };
            fallDownScale?: { x: number; y: number; positionX: number; positionY: number };
            matchScale?: { x: number; y: number; pX: number; pY: number };
            frameScale?: { x: number; y: number; pX: number; pY: number };
        };

        /**
         * Speed settings for various animations (currently empty).
         */
        speed: {};

        /**
         * Count settings for various properties.
         */
        count: {
            yoyo?: number;
            forceYoyo?: number;
            fallUp?: number;
            fallDown?: number;
            fallDownEndPositionY?: number;
            matchIconEndPositionY?: number;
        };

        /**
         * Easing functions for various animations.
         */
        ease: {
            fallDown?: string;
            fallUp?: string;
            winSymbolMatch?: string;
            slider?: string;
            barFill?: string;
            forceReelStop?: string;
            reelStop?: string;
            spin?: string;
        };

        /**
         * Duration settings for various animations.
         */
        duration: {
            winOffset?: number;
            loopOffset?: number;
            spinningDuration?: number;
            reelStopOffset?: number;
            fallDown?: number;
            fallDownReelOffset?: number;
            fallUpReelOffset?: number;
            fallUp?: number;
            spin?: number;
            reelStop?: number;
            forceReelStop?: number;
            slider?: number;
            matchIconFallDown?: number;
            matchIconLeftSide?: number;
            barFill?: number;
        };

        /**
         * Win line settings.
         */
        winLine: IMatchWinLineInfo;

        /**
         * Configuration for slot symbols.
         */
        slotSymbols: ISymbolConfig[];
    }

    /**
     * Interface representing the configuration for slot symbols.
     */
    export interface ISymbolConfig {
        /**
         * Spine configuration for the symbol.
         */
        spineConfig: Core.Interface.ISpineConfig;

        /**
         * Optional sprite configuration for the winning symbol.
         */
        winSprite?: Core.Interface.ISpriteConfig;
    }

    /**
     * Interface representing information for different types of wins.
     */
    export interface IWinsInfo {
        /**
         * Configuration for a big win.
         */
        bigWin?: IWinInfo;

        /**
         * Configuration for a mega win.
         */
        megaWin?: IWinInfo;

        /**
         * Configuration for a super win.
         */
        superWin?: IWinInfo;

        /**
         * Configuration for a free spin start win.
         */
        freeSpinStartWin?: IWinInfo;
    }

    /**
     * Interface representing the configuration for a specific win type.
     */
    export interface IWinInfo {
        /**
         * Duration of the win animation.
         */
        duration: number;

        /**
         * Optional show time for the win.
         */
        showTime?: number;

        /**
         * Easing function for the win animation.
         */
        ease: string;

        /**
         * Optional coin count for the win.
         */
        coinCount?: number;
    }

    /**
     * Interface representing win line settings.
     */
    export interface IMatchWinLineInfo {
        /**
         * Type of win line animation.
         */
        type: Enum.WinlineType;

        /**
         * Paths for the win lines.
         */
        winLinesPath: Array<Array<{ row: number; column: number; thickness: number }>>;

        /**
         * Duration of the win line animation.
         */
        duration: number;
    }
}
