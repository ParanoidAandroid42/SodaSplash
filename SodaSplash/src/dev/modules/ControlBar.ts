namespace Dev.Modules {

    export class ControlBar extends PIXI.utils.EventEmitter {

        private _spinButton : Core.Modules.Button;

        private _winAmount:Core.Modules.Text;
        private _win:Core.Modules.Text;
        private _totalAmount:Core.Modules.Text;
        private _total:Core.Modules.Text;
        private _balance:Core.Modules.Text;
        private _balanceAmount:Core.Modules.Text;

        private _container : Core.Modules.Container;
        private _data:Interface.IResponseData;
        private _winSum:Interface.ICurrency;

        private _refBg:Core.Modules.Sprite;

        public constructor(container:Core.Modules.Container) {
            super();
            this._container = new Core.Modules.Container(0,0,container,"SlotBarContainer");
            this.initProperties();
        }

        private initProperties(){
            let r = Dev.Config.GameConfig.DisplayConfig;
            let aI = Config.AssetConfig;

            this._refBg = new Core.Modules.Sprite(r.width/2,r.height/2,aI.UIRefBg,this._container,r.width,r.height);
            this._win = new Core.Modules.Text(r.width-160,668,aI.GenericText,this._container);
            this._winAmount = new Core.Modules.Text(r.width-160,700,aI.GenericBoldText,this._container);
            this._total = new Core.Modules.Text(160,668,aI.GenericText,this._container);
            this._totalAmount = new Core.Modules.Text(160,700,aI.GenericBoldText,this._container);
            this._balance = new Core.Modules.Text(120,15,aI.GenericText,this._container);
            this._balanceAmount = new Core.Modules.Text(120,35,aI.GenericBoldText,this._container);
            this._spinButton = new Core.Modules.Button(r.width/2,650,aI.SpinButton,this.onSpinAction.bind(this),this._container);
            this.setButtonState(Enum.SpinButtonState.Normal,true);

            this._win.text = "WIN"; //NOTE  this must be update according to language.json
            this._balance.text = "BALANCE"; 
            this._total.text = "TOTAL WIN";
            this._winAmount.text = "0"; //NOTE 
            this._balanceAmount.text = "5000"; 
            this._totalAmount.text = "0";
        }

        public updateData(data:Interface.IResponseData,animation:boolean):void {
            this.updateCredit(data);
            this._winSum = {cents:0,coins:0};
            this._data = data;
            this._winAmount.text = this.resolveFormat(this._winSum.cents,"suffix",false);
            this._totalAmount.text = this.resolveFormat(data.totalEarn.cents,"suffix",false);
            if(animation){
                TweenMax.fromTo(this._winAmount.scale,.35,{x:1,y:1},{x:1.5,y:1.5,yoyo:true,yoyoEase:"back.out(2)",repeat:1});
                TweenMax.fromTo(this._totalAmount.scale,.35,{x:1,y:1},{x:1.5,y:1.5,yoyo:true,yoyoEase:"back.out(2)",repeat:1});
            }
        }

        public updateWin(win:Interface.ICurrency,animation:boolean){
            this._winSum.cents +=win.cents;
            this._winSum.coins +=win.coins;
            this._data.totalEarn.cents +=win.cents;
            this._data.totalEarn.coins +=win.coins;
            this._totalAmount.text = this.resolveFormat(this._data.totalEarn.cents,"suffix",false);
            this._winAmount.text = this.resolveFormat(this._winSum.cents,"suffix",false);
            if(animation){
                TweenMax.fromTo(this._winAmount.scale,.35,{x:1,y:1},{x:1.5,y:1.5,yoyo:true,yoyoEase:"back.out(2)",repeat:1});
                TweenMax.fromTo(this._totalAmount.scale,.35,{x:1,y:1},{x:1.5,y:1.5,yoyo:true,yoyoEase:"back.out(2)",repeat:1});
            }
        }

        public updateCredit(data:Interface.IResponseData){
            this._balanceAmount.text = this.resolveFormat(data.balance.coins,"suffix",true);
        }

        /** resolveFormat amount*/
        public resolveFormat(amount: number,currencyPosition:string,coin:boolean): string {
            if(coin){
                return amount + " COIN";
            }
            let dec = 2;
            let int = 3;
            let d: string = ".";
            let t: string = ",";

            let r: string = ("\\d(?=(\\d{" + (int || 3) + "})+" + (dec > 0 ? "\\D" : "$") + ")");
            let n: string = amount.toFixed(Math.max(0, ~~dec));
            let b: string = (d ? n.replace(".", d) : n).replace(new RegExp(r, "g"), "$&" + (t || ","));

            let p: string = currencyPosition;

            switch (p) {
                case "suffix":
                    b = (b + " " + this._data.currencySymbol);
                    break;
                case "prefix":
                    b = (this._data.currencySymbol + " " + b);
                    break;
            }
            return b;
        }

        private onSpinAction():void{
            let listener = Enum.Listeners; 
            this.emit(listener.OnSpinBarAction);
        }

        public setButtonState(buttonState:Enum.SpinButtonState,enabled:boolean):void{
            this._spinButton.isEnabled = enabled;
            switch(buttonState){
                case Enum.SpinButtonState.Normal:
                    this._spinButton.changeButtonConfig(Config.AssetConfig.SpinButton);
                    break;
                case Enum.SpinButtonState.Auto:
                    break;
                case Enum.SpinButtonState.Quick:
                    break;
                case Enum.SpinButtonState.Skip:
                    break;
                case Enum.SpinButtonState.Stop:
                    this._spinButton.changeButtonConfig(Config.AssetConfig.StopButton);
                    break;
            }
        }
    }
}