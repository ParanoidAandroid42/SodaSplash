namespace Core.Modules {

    /** buttonState enum*/
    export enum ButtonStates {
        Disabled = "Disabled",
        Down = "Down",
        Out = "Out",
        Over = "Over"
    }

    export enum ButtonEvents {
        pointerdown = "pointerdown",
        pointerup = "pointerup",
        pointerover = "pointerover",
        pointerout = "pointerout",
        pointertap = "pointertap"
    }

     /**  running when loading class */
    export class Button extends PIXI.Sprite {
        private _frames: Core.Interface.IButtonFrames = null;
        private _state: ButtonStates = ButtonStates.Out;
        private _callback: Function = null;
        private _isEnabled: boolean = true;

        /**
         * running when loading class
         * @param x - position x
         * @param y - position y
         * @param w - width
         * @param h - height
         * @param c - ButtonConfig
         * @param p - parent
         * @param cB - callback function - when button up
         */
        constructor(x: number, y: number,c: Interface.IButtonConfig, cB?: Function, p?: PIXI.Container, w?: number, h?: number) {
            super();
            w && (this.width = w);
            h && (this.height = h);
            this.anchor.set(0.5, 0.5);
            this.position.set(x, y);
            this.buttonMode = true;
            this.interactive = true;
            this._frames = c.frames;
            cB && (this._callback = cB);
            c.name ? this.name = c.name : this.name = "button";
            p && p.addChild(this);
            this.state = ButtonStates.Out;
            this.initEvent();
        }

        /**
         * set events
         */
        private initEvent() {
            /** Mouse & touch events are normalized into the pointer* events for handling different button events. */
            this.on(ButtonEvents.pointerdown, this.onButtonDown)
            this.on(ButtonEvents.pointerup, this.onButtonUp)
            this.on(ButtonEvents.pointerover, this.onButtonOver)
            this.on(ButtonEvents.pointerout, this.onButtonOut);
            this.on(ButtonEvents.pointerout, this.onButtonOut);
        }

        /**
         * running when button down
         */
        private onButtonDown() {
            this.state = ButtonStates.Down;
        }

        /**
         * running when button up
         */
        private onButtonUp() {
            this._callback.call("", this);
        }

        /**
         * running when button over
         */
        private onButtonOver() {
            this.state = ButtonStates.Over;
        }

        /**
         * running when button out
         */
        private onButtonOut() {
            this.state = ButtonStates.Out;
        }

         /**
         * change textures according to button states
         * @param state - buttonStates
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
         * Changes buttonConfig according to IButtonConfig
         * @param buttonConfig IButtonConfig
         */
        public changeButtonConfig(buttonConfig:Interface.IButtonConfig){
            this._frames = buttonConfig.frames;
            this.state = this._state;
        }

        public changeTexture(texture:string){
            this.texture = PIXI.Texture.from(texture);
        }

        public set isEnabled(enable: boolean) {
            this._isEnabled = enable;
            if (!this._isEnabled) {
                this.state = ButtonStates.Disabled;
            } else {
                this.state = ButtonStates.Out;
            }
            this.interactive = enable;
        }

        public get zIndex() {
            return this._zIndex;
        }

        public set zIndex(zIndex) {
            this._zIndex = zIndex;
        }
    }
}