module Core.Controller {
    export abstract class DataController extends PIXI.utils.EventEmitter {
        // Private properties for currency formatting
        private _currencyDSeparator: string; // Decimal separator for currency
        private _currencyTSeparator: string; // Thousands separator for currency
        private _currency: number | null; // Currency symbol as char code or null
        private _currencyCode: string; // Currency code
        private _currencyPosition: string = Core.Enum.CurrencyPosition.Prefix; // Position of the currency symbol (prefix or suffix)

        /** Constructor for the DataController class. Initializes the class. */
        public constructor() {
            super();
            this.init();
            this.initEvents();
        }

        /** Abstract method to initialize the class. Must be implemented by subclasses. */
        abstract init(): void;

        /** Abstract method to handle data actions. Must be implemented by subclasses. */
        abstract dataAction(data: unknown): void;

        /** Abstract method to initialize events. Must be implemented by subclasses. */
        abstract initEvents(): void;

        /**
         * Resolves and formats the given amount according to currency settings.
         * @param amount The amount to format.
         * @returns The formatted currency string.
         */
        public resolveFormat(amount: number): string {
            const decimalPlaces = 2; // Number of decimal places
            const integerPlaces = 3; // Number of integer places before adding a separator
            const decimalSeparator: string = this._currencyDSeparator; // Decimal separator
            const thousandSeparator: string = this._currencyTSeparator; // Thousands separator

            // Regular expression for formatting the number
            const regexPattern: string = '\\d(?=(\\d{' + (integerPlaces || 3) + '})+' + (decimalPlaces > 0 ? '\\D' : '$') + ')';
            const formattedNumber: string = amount.toFixed(Math.max(0, ~~decimalPlaces)); // Fix to the specified decimal places
            const formattedString: string = (decimalSeparator ? formattedNumber.replace('.', decimalSeparator) : formattedNumber).replace(
                new RegExp(regexPattern, 'g'),
                '$&' + (thousandSeparator || ','),
            );

            const position: string = this._currencyPosition; // Position of the currency symbol
            const symbol: number | null = this._currency; // Currency symbol as char code or null

            // Get the currency character
            const currencyCharacter: string = symbol !== null ? String.fromCharCode(symbol) : this._currencyCode;

            // Add the currency symbol based on its position
            switch (position) {
                case Core.Enum.CurrencyPosition.Suffix:
                    return formattedString + ' ' + currencyCharacter;
                case Core.Enum.CurrencyPosition.Prefix:
                    return currencyCharacter + ' ' + formattedString;
                default:
                    return formattedString;
            }
        }
    }
}
