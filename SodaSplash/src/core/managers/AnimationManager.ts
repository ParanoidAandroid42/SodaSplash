

module Core.Managers {

    export class AnimationManager extends PIXI.utils.EventEmitter{

        public static Instance: AnimationManager;
        private _animations: Array<Dev.Enum.GameAnimListener>;
        private _animationState: Dev.Enum.AnimationStateType;

        /** AnimationsController class's init function. AnimationsController is a singleton class */
        public constructor() {
            super();
            AnimationManager.Instance = this;
        }

        /** Play next animation for scenario*/
        public playNextAnimations(): void {
            this._animationState = Dev.Enum.AnimationStateType.AnimationPlaying;
            if (this._animations.length == 0) {
                this._animationState = Dev.Enum.AnimationStateType.AnimationStopped;
                return;
            } else {
                let animations = Object.keys(Dev.Enum.GameAnimListener);
                for(let i = 0; i<animations.length; i++){
                    if(this._animations[0] == Dev.Enum.GameAnimListener[animations[i]]){
                        this.emit(Dev.Enum.Listeners.OnGameAnimAction,this._animations[0]);
                    }
                }
                delete this._animations[0];
                this._animations.splice(0, 1);
            }
        }

        public deleteAnimations(){
            if(this._animations){
                for(let i = 0; i<this._animations.length; i++){
                    delete this._animations[i];
                }
            }
        }

        /**setup animation for scenario's animation sort*/
        public sortScenarioAnimation(animations:Array<Dev.Enum.GameAnimListener>): void {
            this.deleteAnimations();
            this._animations = animations;
            this.playNextAnimations();
        }

        public get animationState() {
            return this._animationState;
        }

        public get animations(){
            return this._animations;
        }
    }
}