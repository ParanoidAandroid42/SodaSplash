namespace Core.Interface {

    export interface IStartConfig {
        cdnPath : string;
        targetCanvasName : string;
        maxHeight ?:number;
        fpsMeter?:boolean;
        fullScreen?:boolean;
    }
}