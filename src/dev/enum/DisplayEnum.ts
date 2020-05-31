namespace Dev.Enum {

    /**
     * Enum representing the different display listener actions.
     */
    export enum DisplayListener {
        /** Action for handling window resize events. */
        Resize = "resize",
        /** Action for handling orientation changes (e.g., landscape to portrait). */
        OrientationChanged = "OrientationChanged"
    };

    /**
     * Enum representing the different orientations of the display.
     */
    export enum Orientation {
        /** Landscape orientation. */
        Landscape,
        /** Portrait orientation. */
        Portrait,
        /** No specific orientation. */
        None
    }

    /**
     * Enum representing the different types of scale modes for the display.
     */
    export enum ScaleModeType {
        /** Full screen mode. */
        Full,
        /** Mode that maintains maximum height. */
        MaxHeight,
        /** Safe area mode to account for areas that shouldn't be obscured. */
        SafeArea
    }
}
