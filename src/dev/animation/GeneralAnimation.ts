module Dev.Animation {
    /**
     * GeneralAnimation class provides static methods for various animations using TweenMax.
     */
    export class GeneralAnimation {
        /**
         * GeneralAnimation constructor
         */
        constructor() {
            // Empty constructor for GeneralAnimation class
        }

        /**
         * Applies a fall animation to the target object.
         * @param target - The target object to animate
         * @param duration - The duration of the animation
         * @param positionY - The final Y position of the target
         * @param ease - The ease value for the animation
         */
        public static fallAnimation(target: any, duration: number, positionY: number, ease: number): void {
            TweenMax.to(target, duration, {
                ease: 'elastic.easeInOut.config(' + ease + ', 0)',
                y: positionY,
            });
        }

        /**
         * Applies a Mexican wave animation to the target object.
         * @param target - The target object to animate
         * @param duration - The duration of the animation
         * @param y - The Y scale value to animate to
         * @param delay - The delay before the animation starts
         * @returns The TweenMax timeline for the animation
         */
        public static mexicanWave(target: any, duration: number, y: number, delay: number): any {
            let tween = new TimelineMax({ repeat: -1 });
            tween.to(target.scale, duration, { repeat: -1, yoyo: true, delay: delay, y: y, ease: 'circ.out' });
            return tween;
        }
    }
}
