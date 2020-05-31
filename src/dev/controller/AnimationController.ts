module Dev.Controller {
    import AnimationType = Dev.Enum.GameAnimListener;
    import AnimationManager = Core.Managers.AnimationManager;

    /**
     * AnimationController handles the initialization, event binding, and sorting of scenario animations.
     * It extends the Core.Controller.AnimationController.
     */
    export class AnimationController extends Core.Controller.AnimationController {
        public AnimListener = Dev.Enum.GameAnimListener;

        /** AnimationController class's constructor */
        public constructor() {
            super();
        }

        /** Initializes the AnimationController */
        public init(): void {
            // Initialization logic can be added here
        }

        /** Binds necessary events for AnimationController */
        public initEvents(): void {
            this.on(Enum.Listeners.OnAnimationAction, this.onAnimationAction.bind(this));
            AnimationManager.Instance.on(Enum.Listeners.OnGameAnimAction, this.onGameAnimationAction.bind(this));
        }

        /**
         * Handles different animation actions
         * @param action - The animation listener action
         * @param data - Additional data for the action
         */
        private onAnimationAction(action: Dev.Enum.AnimListener, data: Interface.IResponseData): void {
            switch (action) {
                case Dev.Enum.AnimListener.SortScenarioAnimation:
                    this.sortScenarioAnimation(data);
                    break;
                case Dev.Enum.AnimListener.PlayNextAnimation:
                    AnimationManager.Instance.playNextAnimation();
                    break;
            }
        }

        /**
         * Handles game animation actions
         * @param action - The game animation listener action
         * @param data - Additional data for the action
         */
        private onGameAnimationAction(action: Dev.Enum.GameAnimListener, data: any): void {
            this.emit(Enum.Listeners.OnGameAnimAction, action, data);
        }

        /**
         * Sorts scenario animations based on the response data
         * @param data - The response data containing symbol wins
         */
        public sortScenarioAnimation(data: Interface.IResponseData): void {
            const animations: AnimationType[] = [];
            for (const animation of Config.AnimConfig.AnimationSort) {
                switch (animation) {
                    case AnimationType.MatchSymbolWin:
                        if (data.symbolWins) {
                            animations.push(AnimationType.MatchSymbolWin);
                        }
                        break;
                    case AnimationType.LoopMatchSymbolWin:
                        if (data.symbolWins) {
                            animations.push(AnimationType.LoopMatchSymbolWin);
                        }
                        break;
                    case AnimationType.BigWin:
                        animations.push(AnimationType.BigWin);
                        break;
                    case AnimationType.SuperWin:
                        animations.push(AnimationType.SuperWin);
                        break;
                    case AnimationType.ShowWinAmount:
                        animations.push(AnimationType.ShowWinAmount);
                        break;
                }
            }
            AnimationManager.Instance.sortScenarioAnimation(animations);
        }

        /** Deletes all animations */
        public deleteAnimations(): void {
            AnimationManager.Instance.deleteAnimations();
        }

        /**
         * Returns the sorted animations
         * @returns An array of game animation listeners
         */
        public animations(): AnimationType[] {
            return Config.AnimConfig.AnimationSort;
        }
    }
}
