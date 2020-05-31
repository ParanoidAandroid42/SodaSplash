namespace Core.Interface {

    export interface IShape {
        shape: Enum.Shape;
    }

    /**
    * Properties for Sprite Asset
    */
    export interface ISpriteConfig {
        /* Sprite's texture path.*/
        frame: string;
        name ?: string;
        tint ?:number;
    }

   export interface IAxisConfig {
        xP?:PIXI.Point,
        yP?:PIXI.Point,
        xFactor?:number,
        yFactor?:number,
        affine?:PIXI.projection.AFFINE
   }

   export interface IMaskConfig {
        shape: Enum.Shape;
        radius?:number
        fill ?: number;
        name ?: string;
        alpha?: number;
        anchor?:Enum.Anchor;
    }

    export interface IAnimation {
        resource:string;
        loop:boolean;
        speed:number;
        from?:number;
        to?:number;
        tint?:number;
    }

     /**
    * Properties for Sprite Asset
    */
   export interface ISpineConfig {
        skeletonDataName: string;
        animations :  { [animName: string]: Core.Interface.IAnimation; };
        name ?: string;
    }

      /**
    * Properties for Sprite Asset
    */
   export interface ISequenceConfig {
    defaultAnimName : string;
    animations :  { [animName: string]: Core.Interface.IAnimation; };
    name ?: string;
}
     /**
    * Properties for Button frames 
    */
    export interface IButtonFrames {
        out: string;
        over: string;
        down: string;
        disabled: string;
    }

    /**
    * Properties for Button Asset
    */
    export interface IButtonConfig {
        /* Sprite's texture path.*/
        frames: IButtonFrames;
        name ?: string;
        anchor ?:Enum.Anchor;
    }

    /**
    * Properties for Text Asset
    */
    export interface ITextConfig {
        text: string;
        textStyle: PIXI.TextStyle;
        name ?: string;
        anchor ?:Enum.Anchor;
    }

    /**
    * Properties for button text Asset
    */
    export interface IButtonTextConfig {
        /** button config */
        bConfig: IButtonConfig;
        /** text config */
        tConfig: ITextConfig;
        name ?: string;
    }

    /**
    * Properties for sprite text Asset
    */
    export interface ISpriteTextConfig {
        /** sprite config */
        sConfig: ISpriteConfig;
        /** text config */
        tConfig: ITextConfig;
        name?: string;
    }
}