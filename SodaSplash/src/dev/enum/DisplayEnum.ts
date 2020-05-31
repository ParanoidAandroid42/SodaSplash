namespace Dev.Enum {

    /**
     * listeners actions
     */
    export enum DisplayListener {
        Resize = "resize",
        OrientationChanged = "OrientationChanged"
    };

    /**
     * Orientation
     */
    export enum Orientation {
        Landscape,
        Portrait,
        None
    }
    
    /**
     * Scale mode type
     */
    export enum ScaleModeType {
        Full,
        MaxHeight,
        SafeArea
    }
}