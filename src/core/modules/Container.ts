namespace Core.Modules {
    /**
     * Container class extends PIXI.Container to add additional functionality.
     * It allows setting initial position, parent, and name for the container.
     */
    export class Container extends PIXI.Container {
        /**
         * Container constructor
         * @param x - Container's positionX
         * @param y - Container's positionY
         * @param p - Container's parent
         * @param n - Container's name
         */
        constructor(x?: number, y?: number, p?: PIXI.Container, n?: string) {
            super();
            if (n) this.name = n;
            if (p) p.addChild(this);
            if (x) this.position.x = x;
            if (y) this.position.y = y;
        }
    }
}
