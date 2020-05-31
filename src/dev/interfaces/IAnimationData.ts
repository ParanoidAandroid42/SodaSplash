namespace Dev.Interface {
    /**
     * Interface representing the configuration for animations.
     */
    export interface IAnimation {
        /**
         * Configuration for easing functions used in animations.
         */
        ease: {
            logoScale: string;
            logoAlpha: string;
            boxFillsAlpha: string;
            bgCurrentSwitch?: string;
            bgNextSwitch?: string;
            bgSwitch?: string;
            bgIdle?: string;
            bgIdleBubble?: string;
            bgBuzzFallDown?: string;
            bgChangePosition?: string;
        };
        /**
         * Configuration for animation durations.
         */
        duration: {
            logoScale: number;
            logoAlpha: number;
            boxFillsAlpha: number;
            bgCurrentSwitch?: number;
            bgNextSwitch?: number;
            bgSwitch?: number;
            bgIdle?: number;
            bgIdleRandTimeMin?: number;
            bgIdleRandTimeMax?: number;
            bgBuzzFallDown?: number;
            bgChangePosition?: number;
        };
        /**
         * Optional configuration for animation counts.
         */
        count?: {
            /** Optional count for background buzz fall down animation. */
            bgBuzzFallDown?: number;
            /** Optional minimum alpha value for background idle animation. */
            bgIdleRandMinAlpha?: number;
            /** Optional maximum alpha value for background idle animation. */
            bgIdleRandMaxAlpha?: number;
        };
        /**
         * Configuration for animation speeds.
         */
        speed: {
            /** Speed offset for box fills animation. */
            boxFillsOffset: number;
        };
    }
}
