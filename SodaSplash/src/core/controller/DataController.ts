module Core.Controller {

     export abstract class DataController extends PIXI.utils.EventEmitter{

        private _currencyDSeparator: string;
        private _currencyTSeparator: string;
        private _currency: any;
        private _currencyCode: any;
        private _currencyPosition: string = "suffix";

        /** DataController class's init function. */
        public constructor() {
            super();
            this.init();
            this.initEvents();
        }

        abstract init():void;
        abstract dataAction(data:any):void;
        abstract initEvents():void;

        /** resolveFormat amount*/
        public resolveFormat(amount: number): string {
            let dec = 2;
            let int = 3;
            let d: string = this._currencyDSeparator;
            let t: string = this._currencyTSeparator;

            let r: string = ("\\d(?=(\\d{" + (int || 3) + "})+" + (dec > 0 ? "\\D" : "$") + ")");
            let n: string = amount.toFixed(Math.max(0, ~~dec));
            let b: string = (d ? n.replace(".", d) : n).replace(new RegExp(r, "g"), "$&" + (t || ","));

            let p: string = this._currencyPosition;
            let s: number = this._currency;

            let sc: number = s ? String.fromCharCode(s) : this._currencyCode;

            switch (p) {
                case "suffix":
                    b = (b + " " + sc);
                    break;
                case "prefix":
                    b = (sc + " " + b);
                    break;
            }
            return b;
        }
    }
}