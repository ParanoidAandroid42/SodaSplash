namespace Dev.Modules {

    /**
     * ControlBar class to manage the control bar UI elements.
     */
    export class ControlBar extends PIXI.utils.EventEmitter {

        private _spinButton: Core.Modules.Button;
        private _winAmount: Core.Modules.Text;
        private _win: Core.Modules.Text;
        private _totalAmount: Core.Modules.Text;
        private _total: Core.Modules.Text;
        private _balance: Core.Modules.Text;
        private _balanceAmount: Core.Modules.Text;
        private _container: Core.Modules.Container;
        private _data: Interface.IResponseData;
        private _winSum: Interface.ICurrency;
        private _refBg: Core.Modules.Sprite;

        /**
         * Creates an instance of ControlBar.
         * @param container - The parent container.
         */
        public constructor(container: Core.Modules.Container) {
            super();
            this._container = new Core.Modules.Container(0, 0, container, "SlotBarContainer");
            this.initProperties();
        }

        /**
         * Initializes the properties and UI elements of the control bar.
         */
        private initProperties() {
            const r = Dev.Config.GameConfig.DisplayConfig;
            const aI = Config.AssetConfig;

            const winTextX = r.width - 160;
            const winTextY = 668;
            const winAmountY = 700;
            const totalTextX = 160;
            const balanceTextX = 120;
            const balanceTextY = 15;
            const balanceAmountY = 35;
            const spinButtonY = 650;
            const defaultText = "0";
            const defaultBalance = "5000";

            this._refBg = new Core.Modules.Sprite(r.width / 2, r.height / 2, aI.UIRefBg, this._container, r.width, r.height);
            this._win = new Core.Modules.Text(winTextX, winTextY, aI.GenericText, this._container);
            this._winAmount = new Core.Modules.Text(winTextX, winAmountY, aI.GenericBoldText, this._container);
            this._total = new Core.Modules.Text(totalTextX, winTextY, aI.GenericText, this._container);
            this._totalAmount = new Core.Modules.Text(totalTextX, winAmountY, aI.GenericBoldText, this._container);
            this._balance = new Core.Modules.Text(balanceTextX, balanceTextY, aI.GenericText, this._container);
            this._balanceAmount = new Core.Modules.Text(balanceTextX, balanceAmountY, aI.GenericBoldText, this._container);
            this._spinButton = new Core.Modules.Button(r.width / 2, spinButtonY, aI.SpinButton, this.onSpinAction.bind(this), this._container);

            this.setButtonState(Enum.SpinButtonState.Normal, true);

            // Setting default texts
            this._win.text = "WIN";
            this._balance.text = "BALANCE";
            this._total.text = "TOTAL WIN";
            this._winAmount.text = defaultText;
            this._balanceAmount.text = defaultBalance;
            this._totalAmount.text = defaultText;
        }

        /**
         * Updates the UI with the provided data.
         * @param data - The response data to update the UI with.
         * @param animation - Whether to animate the updates or not.
         */
        public updateData(data: Interface.IResponseData, animation: boolean): void {
            this.updateCredit(data);
            this._winSum = { cents: 0, coins: 0 };
            this._data = data;
            this._winAmount.text = this.resolveFormat(this._winSum.cents, "suffix", false);
            this._totalAmount.text = this.resolveFormat(data.totalEarn.cents, "suffix", false);

            if (animation) {
                this.playAmountAnimation(this._winAmount);
                this.playAmountAnimation(this._totalAmount);
            }
        }

        /**
         * Updates the win amount in the UI.
         * @param win - The win amount to update.
         * @param animation - Whether to animate the update or not.
         */
        public updateWin(win: Interface.ICurrency, animation: boolean) {
            this._winSum.cents += win.cents;
            this._winSum.coins += win.coins;
            this._data.totalEarn.cents += win.cents;
            this._data.totalEarn.coins += win.coins;
            this._totalAmount.text = this.resolveFormat(this._data.totalEarn.cents, "suffix", false);
            this._winAmount.text = this.resolveFormat(this._winSum.cents, "suffix", false);

            if (animation) {
                this.playAmountAnimation(this._winAmount);
                this.playAmountAnimation(this._totalAmount);
            }
        }

        /**
         * Updates the balance in the UI.
         * @param data - The response data to update the balance with.
         */
        public updateCredit(data: Interface.IResponseData) {
            this._balanceAmount.text = this.resolveFormat(data.balance.coins, "suffix", true);
        }

        /**
         * Formats the given amount based on the currency position and type.
         * @param amount - The amount to format.
         * @param currencyPosition - The position of the currency symbol ("prefix" or "suffix").
         * @param coin - Whether the amount is in coins or not.
         * @returns The formatted amount as a string.
         */
        public resolveFormat(amount: number, currencyPosition: string, coin: boolean): string {
            if (coin) {
                return amount + " COIN";
            }
            const dec = 2;
            const int = 3;
            const d: string = ".";
            const t: string = ",";

            const r: string = ("\\d(?=(\\d{" + int + "})+" + (dec > 0 ? "\\D" : "$") + ")");
            const n: string = amount.toFixed(Math.max(0, ~~dec));
            const b: string = (d ? n.replace(".", d) : n).replace(new RegExp(r, "g"), "$&" + (t || ","));

            let formattedAmount: string = b;

            switch (currencyPosition) {
                case Core.Enum.CurrencyPosition.Suffix:
                    formattedAmount = (b + " " + this._data.currencySymbol);
                    break;
                case Core.Enum.CurrencyPosition.Prefix:
                    formattedAmount = (this._data.currencySymbol + " " + b);
                    break;
            }
            return formattedAmount;
        }

        /**
         * Handles the spin button action.
         */
        private onSpinAction(): void {
            const listener = Enum.Listeners;
            this.emit(listener.OnSpinBarAction);
        }

        /**
         * Sets the state of the spin button.
         * @param buttonState - The state to set the spin button to.
         * @param enabled - Whether the spin button should be enabled or not.
         */
        public setButtonState(buttonState: Enum.SpinButtonState, enabled: boolean): void {
            this._spinButton.isEnabled = enabled;
            switch (buttonState) {
                case Enum.SpinButtonState.Normal:
                    this._spinButton.changeButtonConfig(Config.AssetConfig.SpinButton);
                    break;
                case Enum.SpinButtonState.Stop:
                    this._spinButton.changeButtonConfig(Config.AssetConfig.StopButton);
                    break;
                case Enum.SpinButtonState.Auto:
                case Enum.SpinButtonState.Quick:
                case Enum.SpinButtonState.Skip:
                    // Additional cases can be handled as needed
                    break;
            }
        }

        /**
         * Plays animation on the given text element.
         * @param textElement - The text element to animate.
         */
        private playAmountAnimation(textElement: Core.Modules.Text) {
            TweenMax.fromTo(textElement.scale, .35, { x: 1, y: 1 }, { x: 1.5, y: 1.5, yoyo: true, yoyoEase: "back.out(2)", repeat: 1 });
        }
    }
}
