namespace Core.Modules {
    
    export class Plane2d extends PIXI.projection.Container2d{
          /**
         * Container constructor
         * @param {number} x - Container's positionX
         * @param {number} y - Container's positionY
         * @param {number} p - Container's parent* 
         * @param {number} aC - Container's axisConfig
         * @param {number} n - Container's name
          */
        constructor(x:number,y:number,p: PIXI.Container|PIXI.projection.Container2d,aC?:Interface.IAxisConfig,n?: string) {
            super();
            let r = Dev.Config.GameConfig.DisplayConfig;
            if (n) this.name = n;
            if (p) p.addChild(this);
            this.position.x = x + r.width/2;
            this.position.y = y + r.height/2;
            if(!aC)
                aC = {yP:new PIXI.Point(0,r.height/2),yFactor:-1};
            if(aC.xP) this.setAxisX(aC.xP,aC.xFactor);
            if(aC.yP) this.setAxisY(aC.yP,aC.yFactor);
        }

        public setAxisX(pos:PIXI.Point,factor:number){
            this.proj.setAxisX(pos,factor);
        }

        public setAxisY(pos:PIXI.Point,factor:number){
            this.proj.setAxisY(pos,factor);
        }
    }
}