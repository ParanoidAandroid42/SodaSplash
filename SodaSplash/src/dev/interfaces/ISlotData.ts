namespace Dev.Interface {

    export interface ISlotConfig {
        machine : {
            type : Enum.MachineType,
            reelMatrix : {row:number,column:number}
        },
        symbol : {
            scale : {x:number,y:number},
            offset ?: {x:number,y:number},
            matchAnimScale ?: {x:number,y:number},
            winSpriteScale ?: {x:number,y:number}
        },
        win: IWinsInfo,
        reelMask : {
            normalScale : {x:number,y:number,pX:number,pY:number},
            fallDownScale?:{x:number,y:number,positionX:number,positionY:number},
            matchScale?:{x:number,y:number,pX:number,pY:number},
            frameScale?:{x:number,y:number,pX:number,pY:number}
        },
        speed : {
        },
        count:{
            yoyo ?:number,
            forceYoyo ?:number,
            fallUp?:number,
            fallDown?:number;
            fallDownEndPositionY?:number;
            matchIconEndPositionY?:number;
        }
        ease : {
            fallDown?:string;
            fallUp?:string;
            winSymbolMatch?:string;
            slider?:string;
            barFill?:string;
            forceReelStop?:string;
            reelStop?:string;
            spin?:string;
        },
        duration : {
            winOffset?:number,
            loopOffset?:number,
            spinningDuration?:number
            reelStopOffset ?:number,
            fallDown?:number;
            fallDownReelOffset?:number;
            fallUpReelOffset?:number;
            fallUp?:number;
            spin ?: number,
            reelStop ?:number,
            forceReelStop ?:number,
            slider ?:number,
            matchIconFallDown ?:number,
            matchIconLeftSide ?:number,
            barFill?:number
        },
        winLine : IMatchWinLineInfo,
        slotSymbols : ISymbolConfig[] 
    }

    export interface ISymbolConfig {
        spineConfig : Core.Interface.ISpineConfig;
        winSprite ?: Core.Interface.ISpriteConfig;
    }

    export interface IWinsInfo {
        bigWin?: IWinInfo,
        megaWin?: IWinInfo,
        superWin?: IWinInfo
        freeSpinStartWin?: IWinInfo
    }

    export interface IWinInfo {
        duration:number,
        showTime?:number,
        ease:string,
        coinCount?:number;
    }

    export interface IMatchWinLineInfo {
        type : Enum.WinlineType,
        winLinesPath : Array<Array<{row:number,column:number,thickness : number}>>;
        duration:number
    }
}