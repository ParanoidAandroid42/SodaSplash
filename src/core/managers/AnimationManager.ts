module Core.Managers {
    export class AnimationManager extends PIXI.utils.EventEmitter {
        public static Instance: AnimationManager;
        private _animations: Dev.Enum.GameAnimListener[] = [];
        private _animationState: Dev.Enum.AnimationStateType;

        /** AnimationManager class's init function. AnimationManager is a singleton class */
        public constructor() {
            super();
            AnimationManager.Instance = this;
        }

        /** Play the next animation for the scenario */
        public playNextAnimation(): void {
            if (this._animations.length === 0) {
                this._animationState = Dev.Enum.AnimationStateType.AnimationStopped;
                return;
            }

            this._animationState = Dev.Enum.AnimationStateType.AnimationPlaying;
            const currentAnimation = this._animations.shift();
            if (currentAnimation) {
                this.emit(Dev.Enum.Listeners.OnGameAnimAction, currentAnimation);
            }
        }

        /** Delete all animations */
        public deleteAnimations(): void {
            this._animations.length = 0;
        }

        /** Setup animations for scenario's animation sort */
        public sortScenarioAnimation(animations: Dev.Enum.GameAnimListener[]): void {
            this.deleteAnimations();
            this._animations = animations;
            this.playNextAnimation();
        }

        /** Get the current animation state */
        public get animationState(): Dev.Enum.AnimationStateType {
            return this._animationState;
        }

        /** Get the list of animations */
        public get animations(): Dev.Enum.GameAnimListener[] {
            return this._animations;
        }
    }
}
