namespace Core.Interface {   
    /**
    * IDisplay config for created display manager
    */

    export interface IDisplayConfig {
        width : number;
        height : number;
        resizeMode:Dev.Enum.ScaleModeType;
        landscape:boolean;
        portrait:boolean;
        safeAreaX ?:number;
        safeAreaY ?:number;
    }
}