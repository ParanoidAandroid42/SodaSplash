/// <reference path="../enum/DisplayEnum.ts"/>
namespace Dev.Config {
    import ScaleModeType = Enum.ScaleModeType;

    /**
     * GameConfig class provides configuration for the game settings.
     * It includes display configuration and start configuration.
     */
    export class GameConfig {
        /**
         * Display configuration of game info.
         * Defines the game's width, height, resize mode, and orientation settings.
         */
        static readonly DisplayConfig: Core.Interface.IDisplayConfig = {
            width: 1280,
            height: 720,
            resizeMode: ScaleModeType.Full,
            landscape: true,
            portrait: true,
        };

        /**
         * Start configuration of game info.
         * This will be initialized with the necessary start parameters for the game.
         */
        static StartConfig: Core.Interface.IStartConfig;
    }
}
