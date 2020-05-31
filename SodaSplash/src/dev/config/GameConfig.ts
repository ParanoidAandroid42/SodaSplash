
/// <reference path="../enum/DisplayEnum.ts"/>
namespace Dev.Config {

    import ScaleModeType = Enum.ScaleModeType;

    export class GameConfig {

       /**
        * Display config of game info
        */
       static DisplayConfig:Core.Interface.IDisplayConfig = {
           width:1280,
           height:720,
           resizeMode:ScaleModeType.Full,
           landscape:true,
           portrait:true
       }
       
       /**
        * Start config of game info
        */
       static StartConfig:Core.Interface.IStartConfig;
    }
}