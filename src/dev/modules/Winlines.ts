namespace Dev.Modules {
    export class Winlines extends PIXI.utils.EventEmitter {
        private _container: Core.Modules.Container;
        private _winLines: Array<Core.Modules.Graphic> = [];
        private _winLineAnimTimeline: any;
        private _amount: Core.Modules.Text;
        private _baseContainer: Core.Modules.Container;

        /**
         * Creates an instance of Winlines.
         * @param container - Parent container.
         */
        public constructor(container: Core.Modules.Container) {
            super();
            this._baseContainer = container;
            this.initProperties();
        }

        /**
         * Initializes the properties of the Winlines.
         */
        private initProperties() {
            this._winLineAnimTimeline = new TimelineMax();
        }

        /**
         * Plays the winline animation.
         * @param sC - Slot configuration.
         * @param wS - Array of win data.
         * @param index - Index of the winline.
         * @param mS - Matrix symbols.
         * @param loop - Whether the animation should loop.
         */
        public playWinlineAnimation(
            sC: Interface.ISlotConfig,
            wS: Array<Interface.IWData>,
            index: number,
            mS: Array<Symbol>[],
            loop: boolean,
        ): void {
            var r = Dev.Config.GameConfig.DisplayConfig;
            var aI = Config.AssetConfig;
            var lineIndex = wS[index].lineIndex;
            var path = sC.winLine.winLinesPath[lineIndex];
            var duration = sC.winLine.duration;
            var offset = sC.symbol.offset;
            var scale = sC.symbol.scale;
            var line: Core.Modules.Graphic;
            if (this._container) {
                this._container.destroy({ children: true, baseTexture: false, texture: false });
            }
            this._container = new Core.Modules.Container(0, 0, this._baseContainer, 'WinLinesContainer');
            this._winLines = [];

            for (var j = 0; j < path.length - 1; j++) {
                var currentRow = path[j].row;
                var currentColumn = path[j].column;
                var nextRow = path[j + 1].row;
                var nextColumn = path[j + 1].column;
                var width = mS[currentRow][currentColumn].parent.position.x;
                var x = mS[currentRow][currentColumn].parent.position.x;
                var y = (scale.y + offset.y) * currentRow + mS[currentRow][currentColumn].parent.position.y / 2 + 30;
                line = new Core.Modules.Graphic(x, y, path[j].thickness, null, Config.AssetConfig.SlotWinLine, this._container);
                width -= mS[nextRow][nextColumn].parent.position.x;
                width = Math.abs(width);
                x = mS[nextRow][nextColumn].parent.position.x;
                y = (scale.y + offset.y) * nextRow - (scale.y + offset.y) * currentRow;
                y = currentRow == nextRow ? 0 : y;
                line.drawLine(new PIXI.Point(x, y), width + path[j].thickness / 3.2);
                this._winLines.push(line);
            }

            this._amount = new Core.Modules.Text(r.width / 2, r.height / 2, aI.WinLineText, this._container);
            this._winLineAnimTimeline.fromTo(this._container, duration, { alpha: 0 }, { alpha: 1 });
            this._amount.text = wS[index].currency.cents.toString();
            this._amount.position.y = 130 + lineIndex * 150;
            if (!loop) this.emit(Enum.Listeners.OnWinLinesAction, Enum.SlotAnimState.WinUpdated, wS[index].currency);
        }

        /**
         * Plays the fade out animation for winlines.
         * @param wI - Winline information.
         */
        public playWinLineFadeOutAnimation(wI: Interface.IMatchWinLineInfo) {
            var duration = wI.duration;
            this._winLineAnimTimeline.fromTo(this._container, duration, { alpha: 1 }, { alpha: 0 });
        }

        /**
         * Stops the winline animation.
         */
        public stopWinLineAnimation(): void {
            if (this._winLineAnimTimeline) {
                this._winLineAnimTimeline.restart();
                this._winLineAnimTimeline.kill();
                if (this._container) {
                    this._container.destroy({ children: true, baseTexture: false, texture: false });
                    this._container.alpha = 0;
                }
                this._winLineAnimTimeline = new TimelineMax();
            }
        }
    }
}
