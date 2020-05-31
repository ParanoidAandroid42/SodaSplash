namespace Core.Interface {
    /**
     * IDisplayConfig for creating display manager
     */
    export interface IDisplayConfig {
        width: number; // Width of the display
        height: number; // Height of the display
        resizeMode: Dev.Enum.ScaleModeType; // Scale mode type for resizing
        landscape: boolean; // Flag for landscape orientation support
        portrait: boolean; // Flag for portrait orientation support
        safeAreaX?: number; // Optional safe area X margin
        safeAreaY?: number; // Optional safe area Y margin
    }
}
