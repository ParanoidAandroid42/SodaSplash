namespace Core.Modules {
    /**
     * Plane2d class extends PIXI.projection.Container2d to provide additional functionality.
     * It allows setting initial position, parent, name, and axis configuration for the container.
     */
    export class Plane2d extends PIXI.projection.Container2d {
        /**
         * Plane2d constructor
         * @param x - Container's positionX
         * @param y - Container's positionY
         * @param p - Container's parent
         * @param aC - Container's axis configuration
         * @param n - Container's name
         */
        constructor(x: number, y: number, p: PIXI.Container | PIXI.projection.Container2d, aC?: Interface.IAxisConfig, n?: string) {
            super();
            const r = Dev.Config.GameConfig.DisplayConfig;
            if (n) this.name = n;
            if (p) p.addChild(this);
            this.position.x = x + r.width / 2;
            this.position.y = y + r.height / 2;

            if (!aC) {
                aC = { yP: new PIXI.Point(0, r.height / 2), yFactor: -1 };
            }
            if (aC.xP) this.setAxisX(aC.xP, aC.xFactor);
            if (aC.yP) this.setAxisY(aC.yP, aC.yFactor);
        }

        /**
         * Sets the X axis position and factor for the container's projection.
         * @param pos - The position point to set for the X axis
         * @param factor - The factor to apply to the X axis
         */
        public setAxisX(pos: PIXI.Point, factor: number): void {
            this.proj.setAxisX(pos, factor);
        }

        /**
         * Sets the Y axis position and factor for the container's projection.
         * @param pos - The position point to set for the Y axis
         * @param factor - The factor to apply to the Y axis
         */
        public setAxisY(pos: PIXI.Point, factor: number): void {
            this.proj.setAxisY(pos, factor);
        }
    }
}
