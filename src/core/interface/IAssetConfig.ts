namespace Core.Interface {
    export interface IShape {
        shape: Enum.Shape;
    }

    export interface ISpriteConfig {
        /** Sprite's texture path. */
        frame: string;
        name?: string;
        tint?: number;
    }

    export interface IAxisConfig {
        xP?: PIXI.Point;
        yP?: PIXI.Point;
        xFactor?: number;
        yFactor?: number;
        affine?: PIXI.projection.AFFINE;
    }

    export interface IMaskConfig {
        shape: Enum.Shape;
        radius?: number;
        fill?: number;
        name?: string;
        alpha?: number;
        anchor?: Enum.Anchor;
    }

    export interface IAnimation {
        resource: string;
        loop: boolean;
        speed: number;
        from?: number;
        to?: number;
        tint?: number;
    }

    export interface ISpineConfig {
        skeletonDataName: string;
        animations: { [animName: string]: Core.Interface.IAnimation };
        name?: string;
    }

    export interface ISequenceConfig {
        defaultAnimName: string;
        animations: { [animName: string]: Core.Interface.IAnimation };
        name?: string;
    }

    export interface IButtonFrames {
        out: string;
        over: string;
        down: string;
        disabled: string;
    }

    export interface IButtonConfig {
        frames: IButtonFrames;
        name?: string;
        anchor?: Enum.Anchor;
    }

    export interface ITextConfig {
        text: string;
        textStyle: PIXI.TextStyle;
        name?: string;
        anchor?: Enum.Anchor;
    }

    export interface IButtonTextConfig {
        /** Button configuration */
        bConfig: IButtonConfig;
        /** Text configuration */
        tConfig: ITextConfig;
        name?: string;
    }

    export interface ISpriteTextConfig {
        /** Sprite configuration */
        sConfig: ISpriteConfig;
        /** Text configuration */
        tConfig: ITextConfig;
        name?: string;
    }
}
