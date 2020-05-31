
module Dev.Animation {

    export class GeneralAnimation{
        
        constructor(){
        }

        public static fallAnimation(target:any,duration:number,positionY:number,ease:number):void{
            TweenMax.to(target, duration, {
                ease: "elastic.easeInOut.config("+ease+", 0)",
                y: positionY,
            });
        }

        public static mexicanWave(target:any,duration:number,y:number,delay:number):any{
            let tween = new TimelineMax({repeat:-1});
            tween.to(target.scale, duration, {repeat:-1, yoyo:true,delay:delay, y: y, ease: "circ.out"});
            return tween;
        }
    }
}