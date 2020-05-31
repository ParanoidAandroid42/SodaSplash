namespace Core.Enum {

    /**
     * Enum for anchor positions.
     * Used to define various anchor points for positioning elements.
     */
    export enum Anchor {
        MiddleLeft,   // Anchor at the middle left
        MiddleRight,  // Anchor at the middle right
        MiddleCenter, // Anchor at the center
        UpLeft,       // Anchor at the upper left
        UpRight,      // Anchor at the upper right
        UpCenter,     // Anchor at the upper center
        DownLeft,     // Anchor at the lower left
        DownRight,    // Anchor at the lower right
        DownCenter    // Anchor at the lower center
    }

    /**
     * Enum for shape types.
     * Used to define various shapes.
     */
    export enum Shape {
        Circle,      // Circular shape
        Rectangle,   // Rectangular shape
        RoundRect,   // Rounded rectangle shape
        Line         // Line shape
    }
}
