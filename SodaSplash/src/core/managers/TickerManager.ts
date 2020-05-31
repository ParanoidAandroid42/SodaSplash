namespace Core.Managers {
    /** running like dictionary*/
    interface Tickers<T> {
        [K: string]: T;
    }

     /** running like dictionary*/
     interface Timer<T> {
        [K: string]: T;
    }

     /** running like dictionary*/
     interface Intervals<T> {
        [K: string]: T;
    }

    export class TickerManager extends PIXI.Ticker {

        private _tickers: Tickers<PIXI.Ticker> = {};
        private _gTimes: Timer<number> = {};
        private _intervals: Intervals<any> = {};
        public static instance: TickerManager;

        /** Ticker constructor*/
        constructor() {
            super();
            TickerManager.instance = this;
        }

        /**
         * add timeout function
         * @param key -unique key for ticker
         * @param duration - duration of function
         * @param callback - callback function
         * @param loop - loop : boolean
         */
        public addTimeout(key: string, duration: number, callback: Function, loop: boolean) {
            if (!this._tickers[key]) {
                let ticker = new PIXI.Ticker();
                ticker.autoStart = true;
                ticker.minFPS = 1;
                this._tickers[key] = ticker;
                this._gTimes[key] = performance.now();
                this._intervals[key] = setInterval(()=>{
                    this.addLoop(key, duration, callback, loop);
                },  duration);
            }
        }

        /**
         * update game
         * @param key - unique key for ticker
         * @param duration - duration of function
         * @param callback - callback function
         * @param loop - loop : boolean
         */
        private addLoop(key: string, duration: number, callback: Function, loop: boolean) {
            var g_TICK = duration * 1000; // convert to sn  - 1000msn = 1 sn
            var timeNow = performance.now();
            var timeDiff = timeNow - this._gTimes[key];
            if (timeDiff < g_TICK) {
                return;
            }
            callback.call("", this);
            if (loop) {
                this._gTimes[key]= performance.now();
            } else {
                this.removeTicker(key);
            }
        }

        /**
         * remove ticker
         * @param key - ticker's key
         */
        public removeTicker(key:string) {
            if(this._tickers[key] != null && this._tickers[key]!=undefined)
                this._tickers[key].destroy();
            if(this._intervals[key] != null && this._intervals[key]!=undefined)
                clearInterval(this._intervals[key]);
            delete this._tickers[key];
            delete this._intervals[key];
            delete this._gTimes[key];
        }

        public get tickers() {
            return this._tickers;
        }
    }
}