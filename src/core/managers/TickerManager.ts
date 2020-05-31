namespace Core.Managers {
    /** Dictionary-like interface for managing tickers */
    interface Tickers<T> {
        [key: string]: T;
    }

    /** Dictionary-like interface for managing timers */
    interface Timer<T> {
        [key: string]: T;
    }

    /** Dictionary-like interface for managing intervals */
    interface Intervals<T> {
        [key: string]: T;
    }

    /**
     * TickerManager is responsible for managing timed events in the game,
     * including setting timeouts and intervals for various actions.
     */
    export class TickerManager extends PIXI.Ticker {
        private _tickers: Tickers<PIXI.Ticker> = {};
        private _gTimes: Timer<number> = {};
        private _intervals: Intervals<any> = {};
        public static instance: TickerManager;

        /**
         * TickerManager constructor
         */
        constructor() {
            super();
            TickerManager.instance = this;
        }

        /**
         * Adds a timeout function that will be executed after a specified duration.
         * @param key - Unique key for the ticker
         * @param duration - Duration before the callback is executed (in seconds)
         * @param callback - Callback function to be executed
         * @param loop - Whether the timeout should repeat
         */
        public addTimeout(key: string, duration: number, callback: Function, loop: boolean): void {
            if (!this._tickers[key]) {
                const ticker = new PIXI.Ticker();
                ticker.autoStart = true;
                ticker.minFPS = 1;
                this._tickers[key] = ticker;
                this._gTimes[key] = performance.now();
                this._intervals[key] = setInterval(() => {
                    this.addLoop(key, duration, callback, loop);
                }, duration * 1000); // Convert duration to milliseconds
            }
        }

        /**
         * Internal method to update the game logic at each interval.
         * @param key - Unique key for the ticker
         * @param duration - Duration before the callback is executed (in seconds)
         * @param callback - Callback function to be executed
         * @param loop - Whether the timeout should repeat
         */
        private addLoop(key: string, duration: number, callback: Function, loop: boolean): void {
            const g_TICK = duration * 1000; // Convert duration to milliseconds
            const timeNow = performance.now();
            const timeDiff = timeNow - this._gTimes[key];

            if (timeDiff < g_TICK) {
                return;
            }

            callback.call(null, this);

            if (loop) {
                this._gTimes[key] = performance.now();
            } else {
                this.removeTicker(key);
            }
        }

        /**
         * Removes a ticker based on its key.
         * @param key - Unique key for the ticker to be removed
         */
        public removeTicker(key: string): void {
            if (this._tickers[key]) {
                this._tickers[key].destroy();
            }
            if (this._intervals[key]) {
                clearInterval(this._intervals[key]);
            }
            delete this._tickers[key];
            delete this._intervals[key];
            delete this._gTimes[key];
        }

        /**
         * Returns the current tickers.
         */
        public get tickers(): Tickers<PIXI.Ticker> {
            return this._tickers;
        }
    }
}
