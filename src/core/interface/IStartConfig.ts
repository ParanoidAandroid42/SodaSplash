namespace Core.Interface {
    export interface IStartConfig {
        cdnPath: string; // Path to the content delivery network
        targetCanvasName: string; // Name of the target canvas element
        maxHeight?: number; // Optional maximum height for the canvas
        fpsMeter?: boolean; // Optional flag to enable FPS meter
        fullScreen?: boolean; // Optional flag to enable full-screen mode
    }
}
