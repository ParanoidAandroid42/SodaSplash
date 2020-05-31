namespace Core.Managers {
    /**
     * Interface representing a dictionary of stages.
     */
    interface Stage<T> {
        [key: string]: T;
    }

    /**
     * StageManager is responsible for managing different stages in the game,
     * including creating, adding, removing, and changing stages. It also handles
     * transitions between stages with optional tween animations.
     */
    export class StageManager {
        private _stages: Stage<Core.Modules.Stage> = {};
        private readonly _stageContainer: Modules.Container;
        private _currentStage: Modules.Stage = null;
        private _bg: Core.Modules.Graphic;
        public static Instance: StageManager;

        /**
         * StageManager constructor
         */
        constructor() {
            const dR = Dev.Config.GameConfig.DisplayConfig;
            const aI = Dev.Config.AssetConfig;
            StageManager.Instance = this;
            this._stageContainer = new Modules.Container(0, 0, DisplayManager.instance.rendererContainer, 'StageContainer');
            this._bg = new Core.Modules.Graphic(
                dR.width / 2,
                dR.height / 2,
                dR.width * 3,
                dR.height * 3,
                aI.StageRect,
                this._stageContainer,
            );
        }

        /**
         * Creates a stage and adds it to the stage container.
         * @param stage - The stage to be created.
         * @param stageName - The name of the stage.
         * @param tween - Whether to use tween animation for transitions.
         */
        private createStage(stage: any, stageName: string, tween: boolean): void {
            if (this._stages[stageName] == null) {
                this._stages[stageName] = new stage();
                this._stages[stageName].name = stageName;
                this._stageContainer.addChild(this._stages[stageName]);
                if (tween) {
                    TweenMax.fromTo(this._bg, 1, { alpha: 1 }, { alpha: 0 });
                    TweenMax.fromTo(this._stages[stageName], 1, { alpha: 0 }, { alpha: 1 });
                } else {
                    this._bg.alpha = 0;
                    this._stages[stageName].alpha = 1;
                }
                this._stageContainer.addChild(this._bg);
            }
            this._currentStage = stage;
        }

        /**
         * Changes the current stage to a new stage.
         * @param stage - The new stage to switch to.
         * @param tween - Whether to use tween animation for transitions.
         */
        public changeStage(stage: any, tween: boolean): void {
            StageManager.Instance.removeStage(this._currentStage, tween);
            if (tween) {
                Core.Managers.TickerManager.instance.addTimeout(
                    'stageChange',
                    1,
                    () => {
                        StageManager.Instance.addStage(stage, tween);
                    },
                    false,
                );
            } else {
                StageManager.Instance.addStage(stage, tween);
            }
        }

        /**
         * Adds and initializes a new stage without removing the current stage.
         * @param stage - The stage to be added.
         * @param tween - Whether to use tween animation for transitions.
         */
        public addStage(stage: any, tween: boolean): void {
            this.createStage(stage, stage.name, tween);
            this._stages[stage.name].init();
            this._stages[stage.name].initEvents();
        }

        /**
         * Gets a stage by its name if it was created before.
         * @param stage - The stage to get.
         * @returns The stage instance.
         */
        public getStage(stage: any): Core.Modules.Stage {
            return this._stages[stage.name];
        }

        /**
         * Removes a stage by its name if it was created before.
         * @param stage - The stage to remove.
         * @param tween - Whether to use tween animation for transitions.
         */
        public removeStage(stage: any, tween: boolean): void {
            const stageName = stage.name;
            if (tween) {
                TweenMax.fromTo(this._bg, 1, { alpha: 0 }, { alpha: 1 });
                TweenMax.fromTo(
                    this._stages[stageName],
                    1,
                    { alpha: 1 },
                    {
                        alpha: 0,
                        onComplete: () => {
                            this._stages[stageName].dispose();
                            this._stages[stageName].destroy({ children: true, baseTexture: true });
                            delete this._stages[stageName];
                        },
                    },
                );
            } else {
                this._bg.alpha = 0;
                this._stages[stageName].alpha = 0;
                this._stages[stageName].dispose();
                this._stages[stageName].destroy({ children: true, baseTexture: true });
                delete this._stages[stageName];
            }
        }

        /**
         * Gets the main container for stages.
         * @returns The stage container.
         */
        public get stageContainer(): Modules.Container {
            return this._stageContainer;
        }

        /**
         * Gets the current stage.
         * @returns The current stage.
         */
        public get currentStage(): Modules.Stage {
            return this._currentStage;
        }
    }
}
