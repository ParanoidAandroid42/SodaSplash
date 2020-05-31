module Core.Modules {
    /**
     * StatElement class is responsible for displaying FPS (frames per second) statistics
     * on the screen. It uses the Stats.js library to create and manage the stats display.
     */
    export class StatElement {
        /**
         * StatElement constructor
         */
        public constructor() {
            const stats: Stats = new Stats();
            document.body.appendChild(stats.domElement);

            /**
             * Function to animate the stats display by continuously updating it.
             */
            function animate() {
                stats.begin();
                stats.end();
                requestAnimationFrame(animate);
            }

            animate();
        }
    }
}
