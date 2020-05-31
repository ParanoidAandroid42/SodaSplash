namespace Dev.Modules {

    export class WinAnimation extends PIXI.utils.EventEmitter {

        private _container:Core.Modules.Container;
        private _backContainer:Core.Modules.Container;
        private _frontContainer:Core.Modules.Container;
        private _coinContainers:Array<Core.Modules.Container>;
        private _background:Core.Modules.Sprite;
        private _fruit:Core.Modules.Sprite;
        private _freeSpinFruit:Core.Modules.Sprite;
        private _ui:Core.Modules.Sprite;
        private _winHeader:Core.Modules.Text;
        private _uiHeader:Core.Modules.Text;
        private _winTotalAmount:Core.Modules.Text;
        private _winAmount:Core.Modules.Text;
        private _winTimeline:any;
        private _winAmountCount:number = 0;

        public constructor(container:Core.Modules.Container) {
            super();
            this._container = new Core.Modules.Container(0,0,container,"WinContainer");
            this.initProperties();
        }

        private initProperties(){
            let r = Dev.Config.GameConfig.DisplayConfig;
            let aI = Config.AssetConfig;
            let a = Core.Enum.Anchor;
            this._background = new Core.Modules.Sprite(r.width/2,r.height/2,aI.WinBg,this._container);
            this._backContainer = new Core.Modules.Container(0,0,this._container,"backContainer");
            this._frontContainer = new Core.Modules.Container(0,0,this._container,"frontContainer");
            this._container.alpha = 0;

            this._winHeader = new Core.Modules.Text(r.width/2,r.height/2,aI.BigWinText,this._frontContainer);
            this._uiHeader = new Core.Modules.Text(r.width/2,r.height/2-100,aI.UIHeaderText,this._frontContainer);
            this._fruit = new Core.Modules.Sprite(r.width/2,432,aI.WinFruit,this._frontContainer);
            this._freeSpinFruit = new Core.Modules.Sprite(r.width/2,360,aI.FreeSpinWinFruit,this._frontContainer);
            this._winAmount = new Core.Modules.Text(r.width/2,r.height/2-100,aI.WinAmountText,this._frontContainer);
            this._coinContainers = new Array<Core.Modules.Container>();
        }

        public playWinAnimation(animType:Enum.WinType,winAnimInfo:Interface.IWinInfo,amount:number){
            this._winTimeline = new TimelineMax();
            let coinContainer = new Core.Modules.Container(0,300,this._backContainer,"CoinContainer");
            coinContainer.visible = false;
            this._coinContainers.push(coinContainer);
            switch(animType){
                case Enum.WinType.BigWin:
                    this.playBigWinAnimation(winAnimInfo,amount,5);
                    this._winHeader.setTextConfig(Config.AssetConfig.BigWinText);
                    break;
                case Enum.WinType.SuperWin:
                    this.playBigWinAnimation(winAnimInfo,amount,4);
                    this._winHeader.setTextConfig(Config.AssetConfig.SuperWinText);
                    break;
                case Enum.WinType.MegaWin: 
                    this.playBigWinAnimation(winAnimInfo,amount,3);
                    this._winHeader.setTextConfig(Config.AssetConfig.MegaWinText);
                    break;
                case Enum.WinType.FreeSpinStartWin:
                    this._winHeader.setTextConfig(Config.AssetConfig.FreeSpinStartWinText);
                    this.playFreeSpinStartAnimation(winAnimInfo,10);
                    this._winTimeline.call(()=>{
                        this.emit(Enum.Listeners.OnWinAnimAction,Enum.SlotAnimState.FinishedStartFreeSpinWin);
                    })
                    break;
            }
        }

        private playFreeSpinStartAnimation(winAnimInfo:Interface.IWinInfo,amount:number){
            let r = Dev.Config.GameConfig.DisplayConfig;
            this._winAmount.alpha = 0;
            this._winAmount.text = "x"+amount.toString();
            this._freeSpinFruit.alpha = 0;
            this._freeSpinFruit.visible = true;
            this._fruit.visible = false;
            this._uiHeader.position.y = -500;
            this._uiHeader.visible = true;
            this._uiHeader.alpha = 1;
            this._winHeader.alpha = 1;
            this._winHeader.position.y = r.height+500;
            this._winAmount.position.set(this._freeSpinFruit.position.x + 200, this._freeSpinFruit.position.y);
            this._winTimeline.fromTo(this._container,winAnimInfo.duration,{alpha:0},{alpha:1,ease:winAnimInfo.ease});
            this._winTimeline.to(this._uiHeader,winAnimInfo.duration,{y:133,ease:winAnimInfo.ease});
            this._winTimeline.to(this._winHeader,winAnimInfo.duration,{y:565,ease:winAnimInfo.ease});
            this._winTimeline.fromTo(this._freeSpinFruit.scale,winAnimInfo.duration,{x:5,y:5},{x:1,y:1,ease:winAnimInfo.ease});
            this._winTimeline.to(this._freeSpinFruit,winAnimInfo.duration,{alpha:1,ease:winAnimInfo.ease},"-="+winAnimInfo.duration);
            this._winTimeline.fromTo(this._winAmount.scale,winAnimInfo.duration,{x:5,y:5},{x:1,y:1,ease:winAnimInfo.ease});
            this._winTimeline.to(this._winAmount,winAnimInfo.duration,{alpha:1,ease:winAnimInfo.ease},"-="+winAnimInfo.duration);
            this._winTimeline.to(this._uiHeader,winAnimInfo.duration*2,{y:-500,ease:winAnimInfo.ease},"+="+winAnimInfo.showTime);
            this._winTimeline.to(this._winHeader,winAnimInfo.duration*2,{y:r.height+500,ease:winAnimInfo.ease},"-="+winAnimInfo.duration*2);
            this._winTimeline.to(this._winAmount,winAnimInfo.duration*2,{alpha:0,ease:winAnimInfo.ease},"-="+winAnimInfo.duration*2);
            this._winTimeline.fromTo(this._freeSpinFruit.scale,winAnimInfo.duration*2,{x:1,y:1},{x:5,y:5,ease:winAnimInfo.ease},"-="+winAnimInfo.duration);
            this._winTimeline.to(this._freeSpinFruit,winAnimInfo.duration*2,{alpha:0,ease:winAnimInfo.ease},"-="+winAnimInfo.duration*2);
            this._winTimeline.to(this._container,winAnimInfo.duration*2,{alpha:0,ease:winAnimInfo.ease},"-="+winAnimInfo.duration);
        }

        private playBigWinAnimation(winAnimInfo:Interface.IWinInfo,amount:number,end:number){
            let winAmountTween = TweenMax.fromTo(this._winAmount.scale,.25,{x:1,y:1},{x:1.2,y:1.2,ease:"back.out(0.5)",yoyo:true,repeat:-1})
            let r = Dev.Config.GameConfig.DisplayConfig;
            this._winAmount.text = amount.toString();
            this._winHeader.position.y = -500;
            this._winHeader.alpha = 1;
            this._fruit.visible = false;
            this._uiHeader.visible = false;
            this._freeSpinFruit.visible = false;
            this._winAmount.position.set(r.width/2, r.height/2+50);
            this._winTimeline.to(this._container,winAnimInfo.duration,{alpha:1,ease:winAnimInfo.ease});
            this._winTimeline.to(this._winHeader,winAnimInfo.duration,{y:200,ease:winAnimInfo.ease});
            this._winTimeline.to(this._winAmount,winAnimInfo.duration,{alpha:1,ease:winAnimInfo.ease},"-="+winAnimInfo.duration);
            this._winTimeline.to(this._winHeader,winAnimInfo.duration,{y:r.height/2+50,ease:winAnimInfo.ease},"+="+winAnimInfo.showTime);
            this._winTimeline.to(this._winHeader,winAnimInfo.duration,{alpha:0,ease:winAnimInfo.ease},"-="+winAnimInfo.duration);
            this._winTimeline.call(()=>{
                this.emit(Enum.Listeners.OnAnimationAction,Enum.AnimListener.PlayNextAnimation);
                winAmountTween.restart();
                winAmountTween.kill();
            })
            var counter = { var: this._winAmountCount };                
            TweenMax.to(counter, winAnimInfo.duration*5, {
                var: this._winAmountCount + amount, 
                onUpdate: ()=>{
                    this._winAmount.text = Math.ceil(counter.var).toString();
                },
                ease:"power0"
            });
            this._winAmountCount+= amount;
        }

        public showWinAnimation(duration:number,amount:number){
            this._winAmountCount = 0;
            TweenMax.fromTo(this._winAmount.scale,.25,{x:1,y:1},{x:1.2,y:1.2,ease:"back.out(0.5)",yoyo:true,repeat:1})
            let r = Dev.Config.GameConfig.DisplayConfig;
            TweenMax.to(this._container,duration,{alpha:0,delay:duration,onComplete:()=>{
                for(let i = 0; i<this._coinContainers.length; i++)
                this._coinContainers[i].destroy({children:true})
                this.emit(Enum.Listeners.OnAnimationAction,Enum.AnimListener.PlayNextAnimation);
            }});
        }
    }
}