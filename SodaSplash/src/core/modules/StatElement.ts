module Core.Modules {
    export class StatElement {

        /** for fps container */
        public constructor() {
            let stats: Stats = new Stats();
            document.body.appendChild(stats.domElement);
            function animate() {
                var time = performance.now() / 1000;
                stats.begin();
                stats.end();
                requestAnimationFrame(animate);
            }
            animate();
        }
    }
}