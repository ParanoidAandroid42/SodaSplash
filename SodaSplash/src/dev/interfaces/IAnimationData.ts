namespace Dev.Interface {

    export interface IAnimation {
        ease : {
            logoScale:string;
            logoAlpha:string;
            boxFillsAlpha:string;
            bgCurrentSwitch?:string;
            bgNextSwitch?:string;
            bgSwitch?:string;
            bgIdle?:string;
            bgIdleBubble?:string;
            bgBuzzFallDown?:string;
            bgChangePosition?:string;
        },
        duration : {
            logoScale:number,
            logoAlpha:number;
            boxFillsAlpha:number;
            bgCurrentSwitch?:number,
            bgNextSwitch?:number;
            bgSwitch?:number;
            bgIdle?:number;
            bgIdleRandTimeMin?:number;
            bgIdleRandTimeMax?:number;
            bgBuzzFallDown?:number;
            bgChangePosition?:number;
        },
        count?:{
            bgBuzzFallDown?:number
            bgIdleRandMinAlpha?:number,
            bgIdleRandMaxAlpha?:number
        },
        speed:{
            boxFillsOffset:number
        }
    }
}