module Dev.Animation {
    /**
     * CoinAnimation class manages the creation and playing of coin throw animations.
     */
    export class CoinAnimation {
        private _container: Core.Modules.Container;
        public static count: number = 0;

        /**
         * CoinAnimation constructor
         * @param parent - Parent container
         */
        public constructor(parent: Core.Modules.Container) {
            this._container = parent;
        }

        /**
         * Plays the coin throw animation.
         * @param amount - Amount of coins
         * @param coinCount - Number of coins to animate
         * @param end - End value for the animation
         */
        public playCoinThrowAnimation(amount: number, coinCount: number, end: number): void {
            /** Create Coins (this game's coin counter = 100) */
            let coinsAnimations: Dev.Animation.CoinsAnimation[] = [];
            for (let i = 0; i < coinCount; i++) {
                coinsAnimations.push(new Dev.Animation.CoinsAnimation(this._container, end));
            }
            for (let i = 0; i < coinsAnimations.length; i++) {
                CoinAnimation.count++;
                Core.Managers.TickerManager.instance.addTimeout(
                    'CoinTimer' + CoinAnimation.count,
                    0.01,
                    () => {
                        coinsAnimations[i].updateWayCoin(this._container);
                    },
                    true,
                );
                coinsAnimations[i].setCoinStartPosition(this._container);
            }
        }
    }

    /**
     * CoinsAnimation class manages the animation of individual coins.
     */
    export class CoinsAnimation {
        public randomSpeed: number;
        public randomDirection: number; // -1 , +1
        public increase: number;
        public counter: number;
        public sequenceAnimation: Core.Modules.SequenceAnimation;
        public i: number;
        public coinTimer: PIXI.Ticker;
        public stopBigWin: boolean = false;
        public end: number;

        /**
         * CoinsAnimation constructor
         * @param parent - Parent container
         * @param end - End value for the animation
         */
        public constructor(parent: Core.Modules.Container, end: number) {
            let r = Dev.Config.GameConfig.DisplayConfig;
            let aI = Dev.Config.AssetConfig;
            this.end = end;
            this.sequenceAnimation = new Core.Modules.SequenceAnimation(r.width / 2, r.height / 2, aI.Coin, parent);
            this.setCoinStartPosition(parent);
            this.stopBigWin = false;
            if (this.end == 0) this.end = 5;
        }

        /**
         * Sets a random start position for the coin.
         * @param parent - Parent container
         */
        public setCoinStartPosition(parent: Core.Modules.Container): void {
            var direction = 0 + Math.random() * 2;
            direction < 1 ? (this.randomDirection = -1) : (this.randomDirection = 1);
            this.randomSpeed = Math.random() * 3 + 1;
            var randomPositionX = Math.random() * 100 + 640;
            var randomPositionY = 180;
            this.sequenceAnimation.position.set(randomPositionX, randomPositionY);
            this.sequenceAnimation.scale.set(0.13, 0.13);
            this.increase = (-Math.PI / 120) * 2;
            this.counter = 0;
            this.i = 0;
            this.sequenceAnimation.playAnimation(Enum.AnimNames.Coin);
        }

        /**
         * Updates the coin's position using a sine wave pattern.
         * @param parent - Parent container
         */
        public updateWayCoin(parent: Core.Modules.Container): void {
            if (this.i > 3) {
                parent.visible = true;
            }

            if (this.i <= this.end) {
                this.sequenceAnimation.position.x += this.i * this.randomDirection * 3;
                this.sequenceAnimation.position.y += (Math.sin(this.counter) * this.i * 3 + 2) * 2;
                this.sequenceAnimation.scale.set(this.sequenceAnimation.scale.x + 0.0032, this.sequenceAnimation.scale.x + 0.0032);
                this.i += Math.sin(0.03 * this.randomSpeed);
                this.counter += this.increase;
            } else {
                this.sequenceAnimation.stop();
                this.sequenceAnimation.filters = [new PIXI.filters.BlurFilterPass(false, 3, 1, 0.9)];
            }
        }
    }
}
