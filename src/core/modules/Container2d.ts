namespace Core.Modules {
    /**
     * Container2d class extends PIXI.projection.Container2d to add additional functionality.
     * It allows setting initial position, parent, and name for the container and provides methods
     * to configure affine transformations and axis settings.
     */
    export class Container2d extends PIXI.projection.Container2d {
        /**
         * Container2d constructor
         * @param x - Container's positionX
         * @param y - Container's positionY
         * @param p - Container's parent
         * @param n - Container's name
         */
        constructor(x: number, y: number, p: PIXI.Container | PIXI.projection.Container2d, n?: string) {
            super();
            if (n) this.name = n;
            if (p) p.addChild(this);
            this.position.x = x;
            this.position.y = y;
        }

        /**
         * Sets the affine transformation for the container.
         * @param affine - The affine transformation to set
         */
        public setAffine(affine: PIXI.projection.AFFINE): void {
            this.proj.affine = affine;
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
