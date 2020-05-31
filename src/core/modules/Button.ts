namespace Core.Modules {
    /** Enum for button states */
    export enum ButtonStates {
        Disabled = 'Disabled',
        Down = 'Down',
        Out = 'Out',
        Over = 'Over',
    }

    /** Enum for button events */
    export enum ButtonEvents {
        pointerdown = 'pointerdown',
        pointerup = 'pointerup',
        pointerover = 'pointerover',
        pointerout = 'pointerout',
        pointertap = 'pointertap',
    }

    /**
     * Button class extends PIXI.Sprite to create interactive buttons with various states.
     * Handles button interactions such as pointer down, up, over, and out events.
     */
    export class Button extends PIXI.Sprite {
        private _frames: Core.Interface.IButtonFrames = null;
        private _state: ButtonStates = ButtonStates.Out;
        private _callback: Function = null;
        private _isEnabled: boolean = true;

        /**
         * Button constructor
         * @param x - Position x
         * @param y - Position y
         * @param c - Button configuration
         * @param cB - Callback function when button is released
         * @param p - Parent container
         * @param w - Width
         * @param h - Height
         */
        constructor(x: number, y: number, c: Interface.IButtonConfig, cB?: Function, p?: PIXI.Container, w?: number, h?: number) {
            super();
            if (w) this.width = w;
            if (h) this.height = h;
            this.anchor.set(0.5, 0.5);
            this.position.set(x, y);
            this.buttonMode = true;
            this.interactive = true;
            this._frames = c.frames;
            if (cB) this._callback = cB;
            this.name = c.name ? c.name : 'button';
            if (p) p.addChild(this);
            this.state = ButtonStates.Out;
            this.initEvent();
        }

        /** Initializes button events */
        private initEvent(): void {
            this.on(ButtonEvents.pointerdown, this.onButtonDown);
            this.on(ButtonEvents.pointerup, this.onButtonUp);
            this.on(ButtonEvents.pointerover, this.onButtonOver);
            this.on(ButtonEvents.pointerout, this.onButtonOut);
        }

        /** Handler for button down event */
        private onButtonDown(): void {
            this.state = ButtonStates.Down;
        }

        /** Handler for button up event */
        private onButtonUp(): void {
            this._callback.call(null, this);
        }

        /** Handler for button over event */
        private onButtonOver(): void {
            this.state = ButtonStates.Over;
        }

        /** Handler for button out event */
        private onButtonOut(): void {
            this.state = ButtonStates.Out;
        }

        /**
         * Sets the button state and updates the texture accordingly.
         * @param state - The new button state
         */
        private set state(state: ButtonStates) {
            this._state = state;
            switch (state) {
                case ButtonStates.Out:
                    this.texture = PIXI.Texture.from(this._frames.out);
                    break;
                case ButtonStates.Over:
                    this.texture = PIXI.Texture.from(this._frames.over);
                    break;
                case ButtonStates.Down:
                    this.texture = PIXI.Texture.from(this._frames.down);
                    break;
                case ButtonStates.Disabled:
                    this.texture = PIXI.Texture.from(this._frames.disabled);
                    break;
            }
        }

        /**
         * Changes the button configuration.
         * @param buttonConfig - New button configuration
         */
        public changeButtonConfig(buttonConfig: Interface.IButtonConfig): void {
            this._frames = buttonConfig.frames;
            this.state = this._state;
        }

        /**
         * Changes the button texture.
         * @param texture - New texture
         */
        public changeTexture(texture: string): void {
            this.texture = PIXI.Texture.from(texture);
        }

        /**
         * Sets the button's enabled state.
         * @param enable - Whether the button is enabled
         */
        public set isEnabled(enable: boolean) {
            this._isEnabled = enable;
            this.state = enable ? ButtonStates.Out : ButtonStates.Disabled;
            this.interactive = enable;
        }
    }
}
