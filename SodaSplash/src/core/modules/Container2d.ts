namespace Core.Modules {
    
    export class Container2d extends PIXI.projection.Container2d{
          /**
         * Container constructor
         * @param {number} x - Container's positionX
         * @param {number} y - Container's positionY
         * @param {number} p - Container's parent* 
         * @param {number} aC - Container's axisConfig
         * @param {number} n - Container's name
          */
        constructor(x:number,y:number,p: PIXI.Container|PIXI.projection.Container2d,n?: string) {
            super();
            let r = Dev.Config.GameConfig.DisplayConfig;
            if (n) this.name = n;
            if (p) p.addChild(this);
            this.position.x = x;
            this.position.y = y;
        }

        public setAffine(affine:PIXI.projection.AFFINE){
            this.proj.affine = affine;
        }

        public setAxisX(pos:PIXI.Point,factor:number){
            this.proj.setAxisX(pos,factor);
        }

        public setAxisY(pos:PIXI.Point,factor:number){
            this.proj.setAxisY(pos,factor);
        }
    }
}