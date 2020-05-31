var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Core;
(function (Core) {
    var Controller;
    (function (Controller) {
        var AnimationController = (function (_super) {
            __extends(AnimationController, _super);
            function AnimationController() {
                var _this = _super.call(this) || this;
                _this.init();
                _this.initEvents();
                return _this;
            }
            return AnimationController;
        }(PIXI.utils.EventEmitter));
        Controller.AnimationController = AnimationController;
    })(Controller = Core.Controller || (Core.Controller = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Controller;
    (function (Controller) {
        var DataController = (function (_super) {
            __extends(DataController, _super);
            function DataController() {
                var _this = _super.call(this) || this;
                _this._currencyPosition = "suffix";
                _this.init();
                _this.initEvents();
                return _this;
            }
            DataController.prototype.resolveFormat = function (amount) {
                var dec = 2;
                var int = 3;
                var d = this._currencyDSeparator;
                var t = this._currencyTSeparator;
                var r = ("\\d(?=(\\d{" + (int || 3) + "})+" + (dec > 0 ? "\\D" : "$") + ")");
                var n = amount.toFixed(Math.max(0, ~~dec));
                var b = (d ? n.replace(".", d) : n).replace(new RegExp(r, "g"), "$&" + (t || ","));
                var p = this._currencyPosition;
                var s = this._currency;
                var sc = s ? String.fromCharCode(s) : this._currencyCode;
                switch (p) {
                    case "suffix":
                        b = (b + " " + sc);
                        break;
                    case "prefix":
                        b = (sc + " " + b);
                        break;
                }
                return b;
            };
            return DataController;
        }(PIXI.utils.EventEmitter));
        Controller.DataController = DataController;
    })(Controller = Core.Controller || (Core.Controller = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Controller;
    (function (Controller) {
        var GameController = (function (_super) {
            __extends(GameController, _super);
            function GameController(data) {
                var _this = _super.call(this) || this;
                Dev.Config.GameConfig.StartConfig = data;
                _this.initProperties();
                return _this;
            }
            GameController.prototype.initProperties = function () {
                this.createManagers();
                this.init();
                this.initResource();
            };
            GameController.prototype.createManagers = function () {
                new Core.Managers.TickerManager();
                if (Dev.Config.GameConfig.StartConfig.fpsMeter)
                    new Core.Modules.StatElement();
                new Core.Managers.AnimationManager();
                new Core.Managers.DisplayManager();
                new Core.Managers.StageManager();
                new Core.Managers.ResourceManager();
            };
            return GameController;
        }(PIXI.utils.EventEmitter));
        Controller.GameController = GameController;
    })(Controller = Core.Controller || (Core.Controller = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Controller;
    (function (Controller) {
        var ResourceController = (function (_super) {
            __extends(ResourceController, _super);
            function ResourceController() {
                var _this = _super.call(this) || this;
                _this.init();
                _this.initEvents();
                return _this;
            }
            return ResourceController;
        }(PIXI.utils.EventEmitter));
        Controller.ResourceController = ResourceController;
    })(Controller = Core.Controller || (Core.Controller = {}));
})(Core || (Core = {}));
var Dev;
(function (Dev) {
    var Common;
    (function (Common) {
        var Controller;
        (function (Controller) {
            var SoundController = (function () {
                function SoundController() {
                    this._isMuteSound = true;
                    this._isMuteMusic = false;
                    this._isMuteSoundFx = false;
                    this._soundFXVolume = .5;
                    this._backgroundSoundVolume = 1;
                }
                SoundController.prototype.muteBackgroundSound = function () {
                };
                SoundController.prototype.muteSpecialsSound = function () {
                };
                SoundController.prototype.muteSound = function (mute) {
                    if (mute) {
                        this.muteSpecialsSound();
                        this.muteBackgroundSound();
                    }
                    else {
                        this.unMuteSpecialsSound();
                        this.unMuteBackgroundSound();
                    }
                };
                SoundController.prototype.unMuteSpecialsSound = function () {
                };
                SoundController.prototype.unMuteBackgroundSound = function () {
                };
                SoundController.prototype.isMuteMusic = function (index) {
                    this._isMuteMusic = index;
                    if (!this._isMuteMusic && this._isMuteSound) {
                        this.unMuteBackgroundSound();
                    }
                    else {
                        this.muteBackgroundSound();
                    }
                };
                SoundController.prototype.isMuteSoundFx = function (index) {
                    this._isMuteSoundFx = index;
                    if (!this._isMuteSoundFx && this._isMuteSound) {
                        this.unMuteSpecialsSound();
                    }
                    else {
                        this.muteSpecialsSound();
                    }
                };
                SoundController.prototype.isMuteSound = function (index) {
                    this._isMuteSound = index;
                    if (this._isMuteSound) {
                        this.isMuteSoundFx(this._isMuteSoundFx);
                        this.isMuteMusic(this._isMuteMusic);
                    }
                    else {
                        this.muteSound(false);
                    }
                };
                return SoundController;
            }());
            Controller.SoundController = SoundController;
        })(Controller = Common.Controller || (Common.Controller = {}));
    })(Common = Dev.Common || (Dev.Common = {}));
})(Dev || (Dev = {}));
var Core;
(function (Core) {
    var Enum;
    (function (Enum) {
        var Anchor;
        (function (Anchor) {
            Anchor[Anchor["MiddleLeft"] = 0] = "MiddleLeft";
            Anchor[Anchor["MiddleRight"] = 1] = "MiddleRight";
            Anchor[Anchor["MiddleCenter"] = 2] = "MiddleCenter";
            Anchor[Anchor["UpLeft"] = 3] = "UpLeft";
            Anchor[Anchor["UpRight"] = 4] = "UpRight";
            Anchor[Anchor["UpCenter"] = 5] = "UpCenter";
            Anchor[Anchor["DownLeft"] = 6] = "DownLeft";
            Anchor[Anchor["DownRight"] = 7] = "DownRight";
            Anchor[Anchor["DownCenter"] = 8] = "DownCenter";
        })(Anchor = Enum.Anchor || (Enum.Anchor = {}));
        var Shape;
        (function (Shape) {
            Shape[Shape["Circle"] = 0] = "Circle";
            Shape[Shape["Rectangle"] = 1] = "Rectangle";
            Shape[Shape["RoundRect"] = 2] = "RoundRect";
            Shape[Shape["Line"] = 3] = "Line";
        })(Shape = Enum.Shape || (Enum.Shape = {}));
    })(Enum = Core.Enum || (Core.Enum = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Managers;
    (function (Managers) {
        var AnimationManager = (function (_super) {
            __extends(AnimationManager, _super);
            function AnimationManager() {
                var _this = _super.call(this) || this;
                AnimationManager.Instance = _this;
                return _this;
            }
            AnimationManager.prototype.playNextAnimations = function () {
                this._animationState = Dev.Enum.AnimationStateType.AnimationPlaying;
                if (this._animations.length == 0) {
                    this._animationState = Dev.Enum.AnimationStateType.AnimationStopped;
                    return;
                }
                else {
                    var animations = Object.keys(Dev.Enum.GameAnimListener);
                    for (var i = 0; i < animations.length; i++) {
                        if (this._animations[0] == Dev.Enum.GameAnimListener[animations[i]]) {
                            this.emit(Dev.Enum.Listeners.OnGameAnimAction, this._animations[0]);
                        }
                    }
                    delete this._animations[0];
                    this._animations.splice(0, 1);
                }
            };
            AnimationManager.prototype.deleteAnimations = function () {
                if (this._animations) {
                    for (var i = 0; i < this._animations.length; i++) {
                        delete this._animations[i];
                    }
                }
            };
            AnimationManager.prototype.sortScenarioAnimation = function (animations) {
                this.deleteAnimations();
                this._animations = animations;
                this.playNextAnimations();
            };
            Object.defineProperty(AnimationManager.prototype, "animationState", {
                get: function () {
                    return this._animationState;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(AnimationManager.prototype, "animations", {
                get: function () {
                    return this._animations;
                },
                enumerable: true,
                configurable: true
            });
            return AnimationManager;
        }(PIXI.utils.EventEmitter));
        Managers.AnimationManager = AnimationManager;
    })(Managers = Core.Managers || (Core.Managers = {}));
})(Core || (Core = {}));
var Dev;
(function (Dev) {
    var Enum;
    (function (Enum) {
        var DisplayListener;
        (function (DisplayListener) {
            DisplayListener["Resize"] = "resize";
            DisplayListener["OrientationChanged"] = "OrientationChanged";
        })(DisplayListener = Enum.DisplayListener || (Enum.DisplayListener = {}));
        ;
        var Orientation;
        (function (Orientation) {
            Orientation[Orientation["Landscape"] = 0] = "Landscape";
            Orientation[Orientation["Portrait"] = 1] = "Portrait";
            Orientation[Orientation["None"] = 2] = "None";
        })(Orientation = Enum.Orientation || (Enum.Orientation = {}));
        var ScaleModeType;
        (function (ScaleModeType) {
            ScaleModeType[ScaleModeType["Full"] = 0] = "Full";
            ScaleModeType[ScaleModeType["MaxHeight"] = 1] = "MaxHeight";
            ScaleModeType[ScaleModeType["SafeArea"] = 2] = "SafeArea";
        })(ScaleModeType = Enum.ScaleModeType || (Enum.ScaleModeType = {}));
    })(Enum = Dev.Enum || (Dev.Enum = {}));
})(Dev || (Dev = {}));
var Dev;
(function (Dev) {
    var Config;
    (function (Config) {
        var ScaleModeType = Dev.Enum.ScaleModeType;
        var GameConfig = (function () {
            function GameConfig() {
            }
            GameConfig.DisplayConfig = {
                width: 1280,
                height: 720,
                resizeMode: ScaleModeType.Full,
                landscape: true,
                portrait: true
            };
            return GameConfig;
        }());
        Config.GameConfig = GameConfig;
    })(Config = Dev.Config || (Dev.Config = {}));
})(Dev || (Dev = {}));
var Core;
(function (Core) {
    var Managers;
    (function (Managers) {
        var GameInformation = Dev.Config.GameConfig;
        var ResizeModeType = Dev.Enum.ScaleModeType;
        var Orientation = Dev.Enum.Orientation;
        var DisplayListener = Dev.Enum.DisplayListener;
        var DisplayManager = (function (_super) {
            __extends(DisplayManager, _super);
            function DisplayManager() {
                var _this = _super.call(this) || this;
                _this.to = 0;
                DisplayManager.instance = _this;
                var w = GameInformation.DisplayConfig.width;
                var h = GameInformation.DisplayConfig.height;
                _this.initProperties(w, h);
                return _this;
            }
            ;
            DisplayManager.prototype.initProperties = function (w, h) {
                var targetCanvasName = GameInformation.StartConfig.targetCanvasName;
                this._targetCanvas = document.getElementById(targetCanvasName);
                this._app = new PIXI.Application({
                    width: w,
                    height: h,
                    backgroundColor: 0x0000,
                    antialias: true
                });
                this._app.renderer.view.id = "videoslot";
                if (this._targetCanvas != undefined)
                    this._targetCanvas.appendChild(this._app.view);
                else
                    document.body.appendChild(this._app.view);
                if (GameInformation.StartConfig.maxHeight != undefined && GameInformation.StartConfig.maxHeight != 0)
                    GameInformation.DisplayConfig.resizeMode = ResizeModeType.MaxHeight;
                this._rendererContainer = this._app.stage;
                this._renderer = this._app.renderer;
                this._width = w;
                this._height = h;
                this._currentOrientation = Dev.Enum.Orientation.None;
                document.getElementById("videoslot");
                this.onResizeHandler();
                this.initEvents();
            };
            DisplayManager.prototype.initEvents = function () {
                if (Dev.Config.GameConfig.StartConfig.fullScreen) {
                    document.body.ontouchend = this.onFullscreenChange.bind(this);
                    document.body.onclick = this.onFullscreenChange.bind(this);
                }
                window.addEventListener(DisplayListener.Resize, this.onResizeHandler.bind(this));
            };
            DisplayManager.prototype.onFullscreenChange = function () {
                var elem = document.documentElement;
                if (elem.requestFullscreen) {
                    elem.requestFullscreen();
                }
                else if (elem["mozRequestFullScreen"]) {
                    elem["mozRequestFullScreen"]();
                }
                else if (elem["webkitRequestFullscreen"]) {
                    elem["webkitRequestFullscreen"]();
                }
                else if (elem["msRequestFullscreen"]) {
                    elem["msRequestFullscreen"]();
                }
            };
            DisplayManager.prototype.onResizeHandler = function () {
                var _this = this;
                this.setResizeMode();
                clearTimeout(this.to);
                this.to = setTimeout(function () {
                    _this.setOrientationMode();
                }, 50);
            };
            DisplayManager.prototype.setOrientationMode = function () {
                var width, height;
                switch (GameInformation.DisplayConfig.resizeMode) {
                    case ResizeModeType.Full:
                        width = window.innerWidth;
                        height = window.innerHeight;
                        if (height >= width && this._currentOrientation != Orientation.Portrait) {
                            this.currentOrientation = Orientation.Portrait;
                        }
                        else if (height < width && this._currentOrientation != Orientation.Landscape) {
                            this.currentOrientation = Orientation.Landscape;
                        }
                        break;
                    case ResizeModeType.MaxHeight:
                        width = this._targetCanvas.clientWidth;
                        height = this._targetCanvas.clientHeight;
                        if (width <= 450 && this._currentOrientation != Orientation.Portrait) {
                            this.currentOrientation = Orientation.Portrait;
                        }
                        else if (width > 450 && this._currentOrientation != Orientation.Landscape) {
                            this.currentOrientation = Orientation.Landscape;
                        }
                        break;
                    case ResizeModeType.SafeArea:
                        break;
                }
            };
            DisplayManager.prototype.setResizeMode = function () {
                var r;
                var w, h;
                switch (GameInformation.DisplayConfig.resizeMode) {
                    case ResizeModeType.Full:
                        h = window.innerHeight;
                        r = Math.min(window.innerWidth / GameInformation.DisplayConfig.width, window.innerHeight / GameInformation.DisplayConfig.height);
                        w = Math.ceil(GameInformation.DisplayConfig.width * r);
                        h = Math.ceil(GameInformation.DisplayConfig.height * r);
                        this._renderer.resize(w, h);
                        this._rendererContainer.scale.y = this._rendererContainer.scale.x = r;
                        break;
                    case ResizeModeType.MaxHeight:
                        var maxHeight = GameInformation.StartConfig.maxHeight;
                        w = this._targetCanvas.clientHeight;
                        r = Math.min(this._targetCanvas.clientWidth / GameInformation.DisplayConfig.width, this._targetCanvas.clientHeight / GameInformation.DisplayConfig.height);
                        w = Math.ceil(GameInformation.DisplayConfig.width * r);
                        h = Math.ceil(GameInformation.DisplayConfig.height * r);
                        if (h < maxHeight)
                            maxHeight = h;
                        this._renderer.resize(this._targetCanvas.clientWidth, maxHeight);
                        this._rendererContainer.scale.y = this._rendererContainer.scale.x = r;
                        var clientW = this._targetCanvas.clientWidth;
                        var displayW = GameInformation.DisplayConfig.width * r;
                        this._rendererContainer.position.x = (clientW - displayW) / 2;
                        break;
                    case ResizeModeType.SafeArea:
                        break;
                }
            };
            Object.defineProperty(DisplayManager.prototype, "renderer", {
                get: function () {
                    return this._renderer;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayManager.prototype, "rendererContainer", {
                get: function () {
                    return this._rendererContainer;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayManager.prototype, "width", {
                get: function () {
                    return this._width;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayManager.prototype, "height", {
                get: function () {
                    return this._height;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DisplayManager.prototype, "currentOrientation", {
                get: function () {
                    return this._currentOrientation;
                },
                set: function (value) {
                    this._currentOrientation = value;
                    this.emit(Dev.Enum.DisplayListener.OrientationChanged, value);
                },
                enumerable: true,
                configurable: true
            });
            return DisplayManager;
        }(PIXI.utils.EventEmitter));
        Managers.DisplayManager = DisplayManager;
    })(Managers = Core.Managers || (Core.Managers = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Managers;
    (function (Managers) {
        var ResourceManager = (function (_super) {
            __extends(ResourceManager, _super);
            function ResourceManager() {
                var _this = _super.call(this) || this;
                ResourceManager.Instance = _this;
                _this._cdnPath = Dev.Config.GameConfig.StartConfig.cdnPath;
                return _this;
            }
            ResourceManager.prototype.assetLoading = function () {
                this._loader = new PIXI.Loader();
                this.addTextures();
                this.addSpines();
                this.addWebFonts();
                this._loader.load();
                this._loader.onProgress.add(this.onProgress.bind(this));
                this._loader.onError.add(this.onError.bind(this));
                this._loader.onLoad.add(this.onLoad.bind(this));
                this._loader.onComplete.add(this.onComplete.bind(this));
            };
            ResourceManager.prototype.assetPreLoading = function () {
                this._loader = new PIXI.Loader();
                this.addPreTextures();
                this._loader.load();
                this._loader.onProgress.add(this.onPreProgress.bind(this));
                this._loader.onError.add(this.onPreError.bind(this));
                this._loader.onLoad.add(this.onPreLoad.bind(this));
                this._loader.onComplete.add(this.onPreComplete.bind(this));
            };
            ResourceManager.prototype.addTextures = function () {
                var textures = Object.keys(Dev.Enum.Texture);
                for (var i = 0; i < textures.length; i++)
                    this._loader.add(this._cdnPath + Dev.Enum.Texture[textures[i]]);
            };
            ResourceManager.prototype.addPreTextures = function () {
                var textures = Object.keys(Dev.Enum.PreTexture);
                for (var i = 0; i < textures.length; i++)
                    this._loader.add(this._cdnPath + Dev.Enum.PreTexture[textures[i]]);
            };
            ResourceManager.prototype.addWebFonts = function () {
                var webFonts = Object.keys(Dev.Enum.WebFont);
                for (var i = 0; i < webFonts.length; i++) {
                    WebFont.load({
                        custom: {
                            families: [Dev.Enum.WebFont[webFonts[i]]],
                            urls: [this._cdnPath + Dev.Enum.WebFont.FontUrl]
                        }
                    });
                }
            };
            ResourceManager.prototype.addSpines = function () {
                var spines = Object.keys(Dev.Enum.SpineAnimation);
                for (var i = 0; i < spines.length; i++)
                    this._loader.add(this._cdnPath + Dev.Enum.SpineAnimation[spines[i]]);
            };
            ResourceManager.prototype.onError = function () {
            };
            ResourceManager.prototype.onLoad = function () {
                this.emit(Dev.Enum.ResourceListener.AssetLoading);
            };
            ResourceManager.prototype.onComplete = function () {
                this.emit(Dev.Enum.ResourceListener.AssetLoadCompleted);
            };
            ResourceManager.prototype.onProgress = function () {
            };
            ResourceManager.prototype.onPreError = function () {
            };
            ResourceManager.prototype.onPreLoad = function () {
            };
            ResourceManager.prototype.onPreComplete = function () {
                this.emit(Dev.Enum.ResourceListener.AssetPreLoadCompleted);
            };
            ResourceManager.prototype.onPreProgress = function () {
            };
            ResourceManager.prototype.getSpineData = function (resourceName) {
                return this._loader.resources[resourceName].spineData;
            };
            return ResourceManager;
        }(PIXI.utils.EventEmitter));
        Managers.ResourceManager = ResourceManager;
    })(Managers = Core.Managers || (Core.Managers = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Managers;
    (function (Managers) {
        var StageManager = (function () {
            function StageManager() {
                this._stages = {};
                this._currentStage = null;
                var dR = Dev.Config.GameConfig.DisplayConfig;
                var aI = Dev.Config.AssetConfig;
                StageManager.Instance = this;
                this._stageContainer = new Core.Modules.Container(0, 0, Managers.DisplayManager.instance.rendererContainer, "StageContainer");
                this._bg = new Core.Modules.Graphic(dR.width / 2, dR.height / 2, dR.width * 3, dR.height * 3, aI.StageRect, this._stageContainer);
            }
            StageManager.prototype.createStage = function (stage, stageName, tween) {
                if (this._stages[stageName] == null) {
                    this._stages[stageName] = new stage();
                    this._stages[stageName].name = stageName;
                    this._stageContainer.addChild(this._stages[stageName]);
                    if (tween) {
                        TweenMax.fromTo(this._bg, 1, { alpha: 1 }, { alpha: 0 });
                        TweenMax.fromTo(this._stages[stageName], 1, { alpha: 0 }, { alpha: 1 });
                    }
                    else {
                        this._bg.alpha = 0;
                        this._stages[stageName].alpha = 1;
                    }
                    this._stageContainer.addChild(this._bg);
                }
                this._currentStage = stage;
            };
            StageManager.prototype.changeStage = function (stage, tween) {
                StageManager.Instance.removeStage(this._currentStage, tween);
                if (tween) {
                    Core.Managers.TickerManager.instance.addTimeout("stageChange", 1, function () {
                        StageManager.Instance.addStage(stage, tween);
                    }, false);
                }
                else {
                    StageManager.Instance.addStage(stage, tween);
                }
            };
            StageManager.prototype.addStage = function (stage, tween) {
                this.createStage(stage, stage.name, tween);
                this._stages[stage.name].init();
                this._stages[stage.name].initEvents();
            };
            StageManager.prototype.getStage = function (stage) {
                return this._stages[stage.name];
            };
            StageManager.prototype.removeStage = function (stage, tween) {
                var _this = this;
                var stageName = stage.name;
                if (tween) {
                    TweenMax.fromTo(this._bg, 1, { alpha: 0 }, { alpha: 1 });
                    TweenMax.fromTo(this._stages[stageName], 1, { alpha: 1 }, { alpha: 0, onComplete: function () {
                            _this._stages[stageName].dispose();
                            _this._stages[stageName].destroy({ children: true, baseTexture: true });
                            delete _this._stages[stageName];
                        } });
                }
                else {
                    this._bg.alpha = 0;
                    this._stages[stageName].alpha = 0;
                    this._stages[stageName].dispose();
                    this._stages[stageName].destroy({ children: true, baseTexture: true });
                    delete this._stages[stageName];
                }
            };
            Object.defineProperty(StageManager.prototype, "stageContainer", {
                get: function () {
                    return this._stageContainer;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(StageManager.prototype, "currentStage", {
                get: function () {
                    return this._currentStage;
                },
                enumerable: true,
                configurable: true
            });
            return StageManager;
        }());
        Managers.StageManager = StageManager;
    })(Managers = Core.Managers || (Core.Managers = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Managers;
    (function (Managers) {
        var TickerManager = (function (_super) {
            __extends(TickerManager, _super);
            function TickerManager() {
                var _this = _super.call(this) || this;
                _this._tickers = {};
                _this._gTimes = {};
                _this._intervals = {};
                TickerManager.instance = _this;
                return _this;
            }
            TickerManager.prototype.addTimeout = function (key, duration, callback, loop) {
                var _this = this;
                if (!this._tickers[key]) {
                    var ticker = new PIXI.Ticker();
                    ticker.autoStart = true;
                    ticker.minFPS = 1;
                    this._tickers[key] = ticker;
                    this._gTimes[key] = performance.now();
                    this._intervals[key] = setInterval(function () {
                        _this.addLoop(key, duration, callback, loop);
                    }, duration);
                }
            };
            TickerManager.prototype.addLoop = function (key, duration, callback, loop) {
                var g_TICK = duration * 1000;
                var timeNow = performance.now();
                var timeDiff = timeNow - this._gTimes[key];
                if (timeDiff < g_TICK) {
                    return;
                }
                callback.call("", this);
                if (loop) {
                    this._gTimes[key] = performance.now();
                }
                else {
                    this.removeTicker(key);
                }
            };
            TickerManager.prototype.removeTicker = function (key) {
                if (this._tickers[key] != null && this._tickers[key] != undefined)
                    this._tickers[key].destroy();
                if (this._intervals[key] != null && this._intervals[key] != undefined)
                    clearInterval(this._intervals[key]);
                delete this._tickers[key];
                delete this._intervals[key];
                delete this._gTimes[key];
            };
            Object.defineProperty(TickerManager.prototype, "tickers", {
                get: function () {
                    return this._tickers;
                },
                enumerable: true,
                configurable: true
            });
            return TickerManager;
        }(PIXI.Ticker));
        Managers.TickerManager = TickerManager;
    })(Managers = Core.Managers || (Core.Managers = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Modules;
    (function (Modules) {
        var ButtonStates;
        (function (ButtonStates) {
            ButtonStates["Disabled"] = "Disabled";
            ButtonStates["Down"] = "Down";
            ButtonStates["Out"] = "Out";
            ButtonStates["Over"] = "Over";
        })(ButtonStates = Modules.ButtonStates || (Modules.ButtonStates = {}));
        var ButtonEvents;
        (function (ButtonEvents) {
            ButtonEvents["pointerdown"] = "pointerdown";
            ButtonEvents["pointerup"] = "pointerup";
            ButtonEvents["pointerover"] = "pointerover";
            ButtonEvents["pointerout"] = "pointerout";
            ButtonEvents["pointertap"] = "pointertap";
        })(ButtonEvents = Modules.ButtonEvents || (Modules.ButtonEvents = {}));
        var Button = (function (_super) {
            __extends(Button, _super);
            function Button(x, y, c, cB, p, w, h) {
                var _this = _super.call(this) || this;
                _this._frames = null;
                _this._state = ButtonStates.Out;
                _this._callback = null;
                _this._isEnabled = true;
                w && (_this.width = w);
                h && (_this.height = h);
                _this.anchor.set(0.5, 0.5);
                _this.position.set(x, y);
                _this.buttonMode = true;
                _this.interactive = true;
                _this._frames = c.frames;
                cB && (_this._callback = cB);
                c.name ? _this.name = c.name : _this.name = "button";
                p && p.addChild(_this);
                _this.state = ButtonStates.Out;
                _this.initEvent();
                return _this;
            }
            Button.prototype.initEvent = function () {
                this.on(ButtonEvents.pointerdown, this.onButtonDown);
                this.on(ButtonEvents.pointerup, this.onButtonUp);
                this.on(ButtonEvents.pointerover, this.onButtonOver);
                this.on(ButtonEvents.pointerout, this.onButtonOut);
                this.on(ButtonEvents.pointerout, this.onButtonOut);
            };
            Button.prototype.onButtonDown = function () {
                this.state = ButtonStates.Down;
            };
            Button.prototype.onButtonUp = function () {
                this._callback.call("", this);
            };
            Button.prototype.onButtonOver = function () {
                this.state = ButtonStates.Over;
            };
            Button.prototype.onButtonOut = function () {
                this.state = ButtonStates.Out;
            };
            Object.defineProperty(Button.prototype, "state", {
                set: function (state) {
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
                },
                enumerable: true,
                configurable: true
            });
            Button.prototype.changeButtonConfig = function (buttonConfig) {
                this._frames = buttonConfig.frames;
                this.state = this._state;
            };
            Button.prototype.changeTexture = function (texture) {
                this.texture = PIXI.Texture.from(texture);
            };
            Object.defineProperty(Button.prototype, "isEnabled", {
                set: function (enable) {
                    this._isEnabled = enable;
                    if (!this._isEnabled) {
                        this.state = ButtonStates.Disabled;
                    }
                    else {
                        this.state = ButtonStates.Out;
                    }
                    this.interactive = enable;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Button.prototype, "zIndex", {
                get: function () {
                    return this._zIndex;
                },
                set: function (zIndex) {
                    this._zIndex = zIndex;
                },
                enumerable: true,
                configurable: true
            });
            return Button;
        }(PIXI.Sprite));
        Modules.Button = Button;
    })(Modules = Core.Modules || (Core.Modules = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Modules;
    (function (Modules) {
        var ButtonText = (function (_super) {
            __extends(ButtonText, _super);
            function ButtonText(x, y, w, h, c, cB, p) {
                var _this = _super.call(this, x, y, c.bConfig, cB, p, w, h) || this;
                _this._text = new Modules.Text(0, 0, c.tConfig, _this, w, h);
                if (c.name)
                    _this.name = c.name;
                return _this;
            }
            Object.defineProperty(ButtonText.prototype, "textAsset", {
                get: function () {
                    return this._text;
                },
                enumerable: true,
                configurable: true
            });
            return ButtonText;
        }(Modules.Button));
        Modules.ButtonText = ButtonText;
    })(Modules = Core.Modules || (Core.Modules = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Modules;
    (function (Modules) {
        var Container = (function (_super) {
            __extends(Container, _super);
            function Container(x, y, p, n) {
                var _this = _super.call(this) || this;
                if (n)
                    _this.name = n;
                if (p)
                    p.addChild(_this);
                if (x)
                    _this.position.x = x;
                if (y)
                    _this.position.y = y;
                return _this;
            }
            return Container;
        }(PIXI.Container));
        Modules.Container = Container;
    })(Modules = Core.Modules || (Core.Modules = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Modules;
    (function (Modules) {
        var Container2d = (function (_super) {
            __extends(Container2d, _super);
            function Container2d(x, y, p, n) {
                var _this = _super.call(this) || this;
                var r = Dev.Config.GameConfig.DisplayConfig;
                if (n)
                    _this.name = n;
                if (p)
                    p.addChild(_this);
                _this.position.x = x;
                _this.position.y = y;
                return _this;
            }
            Container2d.prototype.setAffine = function (affine) {
                this.proj.affine = affine;
            };
            Container2d.prototype.setAxisX = function (pos, factor) {
                this.proj.setAxisX(pos, factor);
            };
            Container2d.prototype.setAxisY = function (pos, factor) {
                this.proj.setAxisY(pos, factor);
            };
            return Container2d;
        }(PIXI.projection.Container2d));
        Modules.Container2d = Container2d;
    })(Modules = Core.Modules || (Core.Modules = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Modules;
    (function (Modules) {
        var Graphic = (function (_super) {
            __extends(Graphic, _super);
            function Graphic(x, y, w, h, c, p, a) {
                var _this = _super.call(this) || this;
                _this._config = c;
                _this._width = w;
                _this._height = h;
                c.name ? _this.name = c.name : _this.name = "mask";
                _this._position = { x: x, y: y };
                _this._config.anchor = a;
                c.alpha ? _this.alpha = c.alpha : _this.alpha = 1;
                p && p.addChild(_this);
                _this.setShape(c);
                _this.setAnchor(a);
                _this.scale.set(1, 1);
                return _this;
            }
            Graphic.prototype.setShape = function (c) {
                switch (c.shape) {
                    case Core.Enum.Shape.Circle:
                        var fill = c.fill ? c.fill : 0x000000;
                        var radius = c.radius ? c.radius : 1000;
                        var alpha = c.alpha ? c.alpha : 1;
                        this.beginFill(fill, alpha).drawCircle(0, 0, radius).endFill();
                        break;
                    case Core.Enum.Shape.Rectangle:
                        fill = c.fill ? c.fill : 0x00000;
                        alpha = c.alpha ? c.alpha : 1;
                        this.beginFill(fill, alpha)
                            .drawRect(0, 0, this._width, this._height)
                            .endFill();
                        break;
                    case Core.Enum.Shape.Line:
                        fill = c.fill ? c.fill : 0x00000;
                        alpha = c.alpha ? c.alpha : 1;
                        this.beginFill(fill, alpha);
                        this.lineStyle(this._width, fill, 1, .5);
                        this.endFill();
                        break;
                    case Core.Enum.Shape.RoundRect:
                        fill = c.fill ? c.fill : 0x00000;
                        alpha = c.alpha ? c.alpha : 1;
                        radius = c.radius ? c.radius : 1000;
                        this.beginFill(fill, alpha);
                        this.drawRoundedRect(0, 0, this._width, this._height, radius);
                        this.endFill();
                        break;
                }
            };
            Graphic.prototype.setAnchor = function (anchor) {
                if (anchor != null) {
                    switch (anchor) {
                        case Core.Enum.Anchor.UpLeft:
                            this.pivot.set(0, 0);
                            break;
                        case Core.Enum.Anchor.UpCenter:
                            this.pivot.set(0.5, 0);
                            break;
                        case Core.Enum.Anchor.UpRight:
                            this.pivot.set(1, 0);
                            break;
                        case Core.Enum.Anchor.MiddleLeft:
                            this.pivot.set(0, 0.5);
                            break;
                        case Core.Enum.Anchor.MiddleCenter:
                            this.position.set(this._position.x - this._width / 2, this._position.y - this.height / 2);
                            break;
                        case Core.Enum.Anchor.MiddleRight:
                            this.pivot.set(1, 0.5);
                            break;
                        case Core.Enum.Anchor.DownLeft:
                            this.pivot.set(0, 1);
                            break;
                        case Core.Enum.Anchor.DownCenter:
                            this.pivot.set(0.5, 1);
                            break;
                        case Core.Enum.Anchor.DownRight:
                            this.pivot.set(1, 1);
                            break;
                    }
                }
                else {
                    this.position.set(this._position.x - this._width / 2, this._position.y - this.height / 2);
                }
            };
            Graphic.prototype.drawLine = function (endPoint, width) {
                this.lineTo(endPoint.x, endPoint.y);
                this.width = width;
            };
            Object.defineProperty(Graphic.prototype, "zIndex", {
                get: function () {
                    return this._zIndex;
                },
                set: function (zIndex) {
                    this._zIndex = zIndex;
                },
                enumerable: true,
                configurable: true
            });
            Graphic.prototype.setPosition = function (x, y) {
                this._position.x = x;
                this._position.y = y;
                this.setAnchor(this._config.anchor);
            };
            return Graphic;
        }(PIXI.Graphics));
        Modules.Graphic = Graphic;
    })(Modules = Core.Modules || (Core.Modules = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Modules;
    (function (Modules) {
        var Plane2d = (function (_super) {
            __extends(Plane2d, _super);
            function Plane2d(x, y, p, aC, n) {
                var _this = _super.call(this) || this;
                var r = Dev.Config.GameConfig.DisplayConfig;
                if (n)
                    _this.name = n;
                if (p)
                    p.addChild(_this);
                _this.position.x = x + r.width / 2;
                _this.position.y = y + r.height / 2;
                if (!aC)
                    aC = { yP: new PIXI.Point(0, r.height / 2), yFactor: -1 };
                if (aC.xP)
                    _this.setAxisX(aC.xP, aC.xFactor);
                if (aC.yP)
                    _this.setAxisY(aC.yP, aC.yFactor);
                return _this;
            }
            Plane2d.prototype.setAxisX = function (pos, factor) {
                this.proj.setAxisX(pos, factor);
            };
            Plane2d.prototype.setAxisY = function (pos, factor) {
                this.proj.setAxisY(pos, factor);
            };
            return Plane2d;
        }(PIXI.projection.Container2d));
        Modules.Plane2d = Plane2d;
    })(Modules = Core.Modules || (Core.Modules = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Modules;
    (function (Modules) {
        var SequenceAnimation = (function (_super) {
            __extends(SequenceAnimation, _super);
            function SequenceAnimation(x, y, c, p, n) {
                var _this = _super.call(this, SequenceAnimation.generateTextures(c.animations[c.defaultAnimName].resource, c.animations[c.defaultAnimName].from, c.animations[c.defaultAnimName].to)) || this;
                _this._config = c;
                _this._animationsConfig = c.animations;
                _this.position.set(x, y);
                _this.name = n;
                p.addChild(_this);
                _this.setAnchor(Core.Enum.Anchor.MiddleCenter);
                return _this;
            }
            SequenceAnimation.generateTextures = function (frame, from, to) {
                var textures = [];
                for (var i = from; i < to; i++) {
                    var index = void 0;
                    if (i < 10) {
                        index = "0000" + i;
                    }
                    else if (i < 100) {
                        index = "000" + i;
                    }
                    else {
                        index = "00" + i;
                    }
                    var texture = PIXI.Texture.from(frame + "/" + index);
                    textures.push(texture);
                }
                return textures;
            };
            SequenceAnimation.prototype.setAnchor = function (anchor) {
                if (anchor != null) {
                    switch (anchor) {
                        case Core.Enum.Anchor.UpLeft:
                            this.anchor.set(0, 0);
                            break;
                        case Core.Enum.Anchor.UpCenter:
                            this.anchor.set(0.5, 0);
                            break;
                        case Core.Enum.Anchor.UpRight:
                            this.anchor.set(1, 0);
                            break;
                        case Core.Enum.Anchor.MiddleLeft:
                            this.anchor.set(0, 0.5);
                            break;
                        case Core.Enum.Anchor.MiddleCenter:
                            this.anchor.set(0.5, 0.5);
                            break;
                        case Core.Enum.Anchor.MiddleRight:
                            this.anchor.set(1, 0.5);
                            break;
                        case Core.Enum.Anchor.DownLeft:
                            this.anchor.set(0, 1);
                            break;
                        case Core.Enum.Anchor.DownCenter:
                            this.anchor.set(0.5, 1);
                            break;
                        case Core.Enum.Anchor.DownRight:
                            this.anchor.set(1, 1);
                            break;
                    }
                }
                else {
                    this.anchor.set(0.5, 0.5);
                }
            };
            SequenceAnimation.prototype.playAnimation = function (animationName) {
                var config = this._animationsConfig[animationName];
                SequenceAnimation.generateTextures(config.resource, config.from, config.to);
                config.speed ? this.animationSpeed = config.speed : this.animationSpeed = 1;
                this.loop = config.loop;
                this.gotoAndPlay(config.from);
            };
            return SequenceAnimation;
        }(PIXI.AnimatedSprite));
        Modules.SequenceAnimation = SequenceAnimation;
    })(Modules = Core.Modules || (Core.Modules = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Modules;
    (function (Modules) {
        var Spine = (function (_super) {
            __extends(Spine, _super);
            function Spine(x, y, c, p, w, h, a, n) {
                var _this = _super.call(this, Core.Managers.ResourceManager.Instance.getSpineData(c.skeletonDataName)) || this;
                _this._animationsConfig = c.animations;
                w && (_this.width = w);
                h && (_this.height = h);
                n ? _this.name = n : _this.name = "spine";
                _this.position.set(x, y);
                _this._spineConfig = c;
                _this._anchor = a;
                _this.setAnchor(a);
                p.addChild(_this);
                return _this;
            }
            Spine.prototype.setPosition = function (x, y) {
                this.position.set(x, y);
                this.setAnchor(this._anchor);
            };
            Spine.prototype.setAnchor = function (anchor) {
                if (anchor != null || anchor != undefined) {
                    switch (anchor) {
                        case Core.Enum.Anchor.UpLeft:
                            this.pivot.set(0, 0);
                            break;
                        case Core.Enum.Anchor.UpCenter:
                            this.pivot.set(0.5, 0);
                            break;
                        case Core.Enum.Anchor.UpRight:
                            this.pivot.set(1, 0);
                            break;
                        case Core.Enum.Anchor.MiddleLeft:
                            this.pivot.set(0, 0.5);
                            break;
                        case Core.Enum.Anchor.MiddleCenter:
                            this.position.set(this.position.x - this.width / 2, this.position.y - this.height / 2);
                            break;
                        case Core.Enum.Anchor.MiddleRight:
                            this.pivot.set(1, 0.5);
                            break;
                        case Core.Enum.Anchor.DownLeft:
                            this.pivot.set(0, 1);
                            break;
                        case Core.Enum.Anchor.DownCenter:
                            this.pivot.set(0.5, 1);
                            break;
                        case Core.Enum.Anchor.DownRight:
                            this.pivot.set(1, 1);
                            break;
                        default:
                            this.position.set(this.position.x - this.width / 2, this.position.y - this.height / 2);
                            break;
                    }
                }
                else {
                    this.position.set(this.position.x - this.width / 2, this.position.y - this.height / 2);
                }
            };
            Spine.prototype.playAnimation = function (animationName) {
                var config = this._animationsConfig[animationName];
                config.speed ? this.state.timeScale = config.speed : this.state.timeScale = 1;
                this.state.setAnimation(0, config.resource, config.loop);
            };
            Spine.prototype.setMix = function (fromName, toName) {
                var fC = this._animationsConfig[fromName];
                var tC = this._animationsConfig[toName];
                var time = 1;
                tC.speed ? time = tC.speed : time = 1;
                this.stateData.setMix(fC.resource, tC.resource, 3);
            };
            Object.defineProperty(Spine.prototype, "zIndex", {
                get: function () {
                    return this._zIndex;
                },
                set: function (zIndex) {
                    this._zIndex = zIndex;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Spine.prototype, "animConfig", {
                get: function () {
                    return this._animationsConfig;
                },
                set: function (value) {
                    this._animationsConfig = value;
                },
                enumerable: true,
                configurable: true
            });
            return Spine;
        }(PIXI.spine.Spine));
        Modules.Spine = Spine;
    })(Modules = Core.Modules || (Core.Modules = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Modules;
    (function (Modules) {
        var Sprite = (function (_super) {
            __extends(Sprite, _super);
            function Sprite(x, y, c, p, w, h, a) {
                var _this = _super.call(this, PIXI.Texture.from(c.frame)) || this;
                w && (_this.width = w);
                h && (_this.height = h);
                c.name ? _this.name = c.name : _this.name = "button";
                _this.setAnchor(a);
                _this.position.set(x, y);
                p && p.addChild(_this);
                return _this;
            }
            Sprite.prototype.changeSprite = function (frameName) {
                this.texture = PIXI.Texture.from(frameName);
            };
            Sprite.prototype.setAnchor = function (anchor) {
                if (anchor != null) {
                    switch (anchor) {
                        case Core.Enum.Anchor.UpLeft:
                            this.anchor.set(0, 0);
                            break;
                        case Core.Enum.Anchor.UpCenter:
                            this.anchor.set(0.5, 0);
                            break;
                        case Core.Enum.Anchor.UpRight:
                            this.anchor.set(1, 0);
                            break;
                        case Core.Enum.Anchor.MiddleLeft:
                            this.anchor.set(0, 0.5);
                            break;
                        case Core.Enum.Anchor.MiddleCenter:
                            this.anchor.set(0.5, 0.5);
                            break;
                        case Core.Enum.Anchor.MiddleRight:
                            this.anchor.set(1, 0.5);
                            break;
                        case Core.Enum.Anchor.DownLeft:
                            this.anchor.set(0, 1);
                            break;
                        case Core.Enum.Anchor.DownCenter:
                            this.anchor.set(0.5, 1);
                            break;
                        case Core.Enum.Anchor.DownRight:
                            this.anchor.set(1, 1);
                            break;
                    }
                }
                else {
                    this.anchor.set(0.5, 0.5);
                }
            };
            Object.defineProperty(Sprite.prototype, "zIndex", {
                get: function () {
                    return this._zIndex;
                },
                set: function (zIndex) {
                    this._zIndex = zIndex;
                },
                enumerable: true,
                configurable: true
            });
            return Sprite;
        }(PIXI.Sprite));
        Modules.Sprite = Sprite;
    })(Modules = Core.Modules || (Core.Modules = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Modules;
    (function (Modules) {
        var Sprite2d = (function (_super) {
            __extends(Sprite2d, _super);
            function Sprite2d(x, y, c, p, a, w, h) {
                var _this = _super.call(this, PIXI.Texture.from(c.frame)) || this;
                var r = Dev.Config.GameConfig.DisplayConfig;
                w && (_this.width = w);
                h && (_this.height = h);
                c.name ? _this.name = c.name : _this.name = "sprite2d";
                _this._config = c;
                _this.setAnchor(a);
                _this.position.set(x, y);
                p && p.addChild(_this);
                return _this;
            }
            Sprite2d.prototype.changeSprite = function (frameName) {
                this.texture = PIXI.Texture.from(frameName);
            };
            Sprite2d.prototype.setAxisX = function (pos, factor) {
                this.proj.setAxisX(pos, factor);
            };
            Sprite2d.prototype.setAxisY = function (pos, factor) {
                this.proj.setAxisY(pos, factor);
            };
            Sprite2d.prototype.setAnchor = function (anchor) {
                if (anchor != null) {
                    switch (anchor) {
                        case Core.Enum.Anchor.UpLeft:
                            this.anchor.set(0, 0);
                            break;
                        case Core.Enum.Anchor.UpCenter:
                            this.anchor.set(0.5, 0);
                            break;
                        case Core.Enum.Anchor.UpRight:
                            this.anchor.set(1, 0);
                            break;
                        case Core.Enum.Anchor.MiddleLeft:
                            this.anchor.set(0, 0.5);
                            break;
                        case Core.Enum.Anchor.MiddleCenter:
                            this.anchor.set(0.5, 0.5);
                            break;
                        case Core.Enum.Anchor.MiddleRight:
                            this.anchor.set(1, 0.5);
                            break;
                        case Core.Enum.Anchor.DownLeft:
                            this.anchor.set(0, 1);
                            break;
                        case Core.Enum.Anchor.DownCenter:
                            this.anchor.set(0.5, 1);
                            break;
                        case Core.Enum.Anchor.DownRight:
                            this.anchor.set(1, 1);
                            break;
                    }
                }
                else {
                    this.anchor.set(0.5, 0.5);
                }
            };
            Object.defineProperty(Sprite2d.prototype, "zIndex", {
                get: function () {
                    return this._zIndex;
                },
                set: function (zIndex) {
                    this._zIndex = zIndex;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Sprite2d.prototype, "config", {
                get: function () {
                    return this._config;
                },
                enumerable: true,
                configurable: true
            });
            return Sprite2d;
        }(PIXI.projection.Sprite2d));
        Modules.Sprite2d = Sprite2d;
    })(Modules = Core.Modules || (Core.Modules = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Modules;
    (function (Modules) {
        var SpriteText = (function (_super) {
            __extends(SpriteText, _super);
            function SpriteText(x, y, w, h, c, p) {
                var _this = _super.call(this, x, y, c.sConfig, p, w, h) || this;
                _this._text = new Modules.Text(0, 0, c.tConfig, _this, w, h);
                if (c.name)
                    _this.name = c.name;
                return _this;
            }
            Object.defineProperty(SpriteText.prototype, "textAsset", {
                get: function () {
                    return this._text;
                },
                enumerable: true,
                configurable: true
            });
            return SpriteText;
        }(Modules.Sprite));
        Modules.SpriteText = SpriteText;
    })(Modules = Core.Modules || (Core.Modules = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Modules;
    (function (Modules) {
        var Stage = (function (_super) {
            __extends(Stage, _super);
            function Stage(x, y, p, n) {
                return _super.call(this, x, y, p, n) || this;
            }
            Stage.prototype.initDisplayEvents = function () {
                var dI = Dev.Enum.DisplayListener;
                this.game.on(dI.OrientationChanged, this.onOrientationChanged.bind(this));
            };
            Stage.prototype.onOrientationChanged = function (value) {
                switch (value) {
                    case Dev.Enum.Orientation.Landscape:
                        this.setVisualLandscape();
                        break;
                    case Dev.Enum.Orientation.Portrait:
                        this.setVisualPortrait();
                        break;
                }
            };
            return Stage;
        }(Modules.Container));
        Modules.Stage = Stage;
    })(Modules = Core.Modules || (Core.Modules = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Modules;
    (function (Modules) {
        var StatElement = (function () {
            function StatElement() {
                var stats = new Stats();
                document.body.appendChild(stats.domElement);
                function animate() {
                    var time = performance.now() / 1000;
                    stats.begin();
                    stats.end();
                    requestAnimationFrame(animate);
                }
                animate();
            }
            return StatElement;
        }());
        Modules.StatElement = StatElement;
    })(Modules = Core.Modules || (Core.Modules = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Modules;
    (function (Modules) {
        var Text = (function (_super) {
            __extends(Text, _super);
            function Text(x, y, c, p, w, h) {
                var _this = _super.call(this, c.text, c.textStyle) || this;
                if (c.name)
                    _this.name = c.name;
                w && (_this.width = w);
                h && (_this.height = h);
                _this.position.set(x, y);
                _this.anchor.set(.5, .5);
                p.addChild(_this);
                _this.setAnchor(c.anchor);
                return _this;
            }
            Text.prototype.setTextConfig = function (config) {
                this.style = new PIXI.TextStyle(config.textStyle);
                this.text = config.text;
            };
            Text.prototype.setAnchor = function (anchor) {
                if (anchor != null) {
                    switch (anchor) {
                        case Core.Enum.Anchor.UpLeft:
                            this.anchor.set(0, 0);
                            break;
                        case Core.Enum.Anchor.UpCenter:
                            this.anchor.set(0.5, 0);
                            break;
                        case Core.Enum.Anchor.UpRight:
                            this.anchor.set(1, 0);
                            break;
                        case Core.Enum.Anchor.MiddleLeft:
                            this.anchor.set(0, 0.5);
                            break;
                        case Core.Enum.Anchor.MiddleCenter:
                            this.anchor.set(0.5, 0.5);
                            break;
                        case Core.Enum.Anchor.MiddleRight:
                            this.anchor.set(1, 0.5);
                            break;
                        case Core.Enum.Anchor.DownLeft:
                            this.anchor.set(0, 1);
                            break;
                        case Core.Enum.Anchor.DownCenter:
                            this.anchor.set(0.5, 1);
                            break;
                        case Core.Enum.Anchor.DownRight:
                            this.anchor.set(1, 1);
                            break;
                    }
                }
                else {
                    this.anchor.set(0.5, 0.5);
                }
            };
            return Text;
        }(PIXI.Text));
        Modules.Text = Text;
    })(Modules = Core.Modules || (Core.Modules = {}));
})(Core || (Core = {}));
var Core;
(function (Core) {
    var Modules;
    (function (Modules) {
        var Text2d = (function (_super) {
            __extends(Text2d, _super);
            function Text2d(x, y, z, w, h, c, p) {
                var _this = _super.call(this, c.text, c.textStyle) || this;
                if (c.name)
                    _this.name = c.name;
                w && (_this.width = w);
                h && (_this.height = h);
                _this.position.set(x, y, z);
                _this.anchor.set(.5, .5);
                p && p.addChild(_this);
                _this.setAnchor(c.anchor);
                return _this;
            }
            Text2d.prototype.setTextConfig = function (config) {
                this.style = new PIXI.TextStyle(config.textStyle);
                this.text = config.text;
            };
            Text2d.prototype.setAnchor = function (anchor) {
                if (anchor != null) {
                    switch (anchor) {
                        case Core.Enum.Anchor.UpLeft:
                            this.anchor.set(0, 0);
                            break;
                        case Core.Enum.Anchor.UpCenter:
                            this.anchor.set(0.5, 0);
                            break;
                        case Core.Enum.Anchor.UpRight:
                            this.anchor.set(1, 0);
                            break;
                        case Core.Enum.Anchor.MiddleLeft:
                            this.anchor.set(0, 0.5);
                            break;
                        case Core.Enum.Anchor.MiddleCenter:
                            this.anchor.set(0.5, 0.5);
                            break;
                        case Core.Enum.Anchor.MiddleRight:
                            this.anchor.set(1, 0.5);
                            break;
                        case Core.Enum.Anchor.DownLeft:
                            this.anchor.set(0, 1);
                            break;
                        case Core.Enum.Anchor.DownCenter:
                            this.anchor.set(0.5, 1);
                            break;
                        case Core.Enum.Anchor.DownRight:
                            this.anchor.set(1, 1);
                            break;
                    }
                }
                else {
                    this.anchor.set(0.5, 0.5);
                }
            };
            return Text2d;
        }(PIXI.projection.Text2d));
        Modules.Text2d = Text2d;
    })(Modules = Core.Modules || (Core.Modules = {}));
})(Core || (Core = {}));
var Dev;
(function (Dev) {
    var Animation;
    (function (Animation) {
        var CoinAnimation = (function () {
            function CoinAnimation(parent) {
                this._container = parent;
            }
            CoinAnimation.prototype.playCoinThrowAnimation = function (amount, coinCount, end) {
                var _this = this;
                var coinsAnimations = [];
                for (var i = 0; i < coinCount; i++) {
                    coinsAnimations.push(new Dev.Animation.CoinsAnimation(this._container, end));
                }
                var _loop_1 = function (i) {
                    CoinAnimation.count++;
                    Core.Managers.TickerManager.instance.addTimeout("CoinTimer" + CoinAnimation.count, .01, function () {
                        coinsAnimations[i].updateWayCoin(_this._container);
                    }, true);
                    coinsAnimations[i].setCoinStartPosition(this_1._container);
                };
                var this_1 = this;
                for (var i = 0; i < coinsAnimations.length; i++) {
                    _loop_1(i);
                }
            };
            CoinAnimation.count = 0;
            return CoinAnimation;
        }());
        Animation.CoinAnimation = CoinAnimation;
        var CoinsAnimation = (function () {
            function CoinsAnimation(parent, end) {
                this.stopBigWin = false;
                var r = Dev.Config.GameConfig.DisplayConfig;
                var aI = Dev.Config.AssetConfig;
                this.end = end;
                this.sequenceAnimation = new Core.Modules.SequenceAnimation(r.width / 2, r.height / 2, aI.Coin, parent);
                this.setCoinStartPosition(parent);
                this.stopBigWin = false;
                if (this.end == 0)
                    this.end = 5;
            }
            CoinsAnimation.prototype.setCoinStartPosition = function (parent) {
                var direction = 0 + Math.random() * 2;
                direction < 1 ? this.randomDirection = -1 : this.randomDirection = 1;
                this.randomSpeed = Math.random() * 3 + 1;
                var randomPositionX = Math.random() * (100) + 640;
                var randomPositionY = 180;
                this.sequenceAnimation.position.set(randomPositionX, randomPositionY);
                this.sequenceAnimation.scale.set(.13, .13);
                this.increase = (-Math.PI / 120) * 2;
                this.counter = 0;
                this.i = 0;
                this.sequenceAnimation.playAnimation(Dev.Enum.AnimNames.Coin);
            };
            CoinsAnimation.prototype.updateWayCoin = function (parent) {
                if (this.i > 3) {
                    parent.visible = true;
                }
                if (this.i <= this.end) {
                    this.sequenceAnimation.position.x += this.i * this.randomDirection * 3;
                    this.sequenceAnimation.position.y += (Math.sin(this.counter) * this.i * 3 + 2) * 2;
                    this.sequenceAnimation.scale.set(this.sequenceAnimation.scale.x + 0.0032, this.sequenceAnimation.scale.x + 0.0032);
                    this.i += Math.sin((0.03 * this.randomSpeed));
                    this.counter += this.increase;
                }
                else {
                    this.sequenceAnimation.stop();
                    this.sequenceAnimation.filters = [new PIXI.filters.BlurFilterPass(false, 3, 1, 0.9)];
                }
            };
            return CoinsAnimation;
        }());
        Animation.CoinsAnimation = CoinsAnimation;
    })(Animation = Dev.Animation || (Dev.Animation = {}));
})(Dev || (Dev = {}));
var Dev;
(function (Dev) {
    var Animation;
    (function (Animation) {
        var GeneralAnimation = (function () {
            function GeneralAnimation() {
            }
            GeneralAnimation.fallAnimation = function (target, duration, positionY, ease) {
                TweenMax.to(target, duration, {
                    ease: "elastic.easeInOut.config(" + ease + ", 0)",
                    y: positionY,
                });
            };
            GeneralAnimation.mexicanWave = function (target, duration, y, delay) {
                var tween = new TimelineMax({ repeat: -1 });
                tween.to(target.scale, duration, { repeat: -1, yoyo: true, delay: delay, y: y, ease: "circ.out" });
                return tween;
            };
            return GeneralAnimation;
        }());
        Animation.GeneralAnimation = GeneralAnimation;
    })(Animation = Dev.Animation || (Dev.Animation = {}));
})(Dev || (Dev = {}));
var Dev;
(function (Dev) {
    var Animation;
    (function (Animation) {
        var TimerAnimation = (function (_super) {
            __extends(TimerAnimation, _super);
            function TimerAnimation(parentContainer) {
                var _this = _super.call(this) || this;
                _this._container = new Core.Modules.Container(0, 0, parentContainer, "TimerAnimation");
                parentContainer.addChild(_this._container);
                _this.init();
                return _this;
            }
            TimerAnimation.prototype.init = function () {
                var dR = Dev.Config.GameConfig.DisplayConfig;
                var aI = Dev.Config.AssetConfig;
                var a = Core.Enum.Anchor;
                this._mask = new Core.Modules.Graphic(300, 1450, 500, 500, aI.TimerCircle, this._container);
                this._timeText = new Core.Modules.Text(0, 0, aI.TimerText, this._container);
                this._container.alpha = 0;
            };
            TimerAnimation.prototype.maskAnimation = function () {
                var _this = this;
                this._mask.alpha = 0.85;
                TweenLite.fromTo(this._mask.scale, 0.25, { x: 0, y: 0 }, {
                    x: 1, y: 1,
                    onComplete: function () {
                        TweenLite.to(_this._mask, 0.25, { alpha: 0 });
                    }
                });
            };
            TimerAnimation.prototype.setVisualPortrait = function () {
                var dR = Dev.Config.GameConfig.DisplayConfig;
                this._container.position.set(dR.width / 2, dR.height / 2);
            };
            TimerAnimation.prototype.setVisualLandscape = function () {
                var dR = Dev.Config.GameConfig.DisplayConfig;
                this._container.position.set(dR.width / 2, dR.height / 2);
            };
            TimerAnimation.prototype.resolveTimer = function (isShow) {
                switch (isShow) {
                    case true:
                        TweenLite.to(this._container, 0.25, { alpha: 0.8 });
                        this.setTimeText(this.setTime);
                        break;
                    case false:
                        TweenLite.to(this._container, 0.25, { alpha: 0 });
                        this.setTimeText(this.setTime);
                        break;
                }
            };
            TimerAnimation.prototype.resolveTiming = function (value) {
                var _this = this;
                TweenLite.fromTo(this._timeText.scale, 0.25, { x: 1.5, y: 1.5 }, {
                    x: 1, y: 1, onStart: function () {
                        TweenLite.to(_this._timeText.scale, 0.25, { x: 1.5, y: 1.5 });
                        if (value == 0) {
                            _this.resolveTimer(false);
                        }
                        else {
                            _this.resolveTimer(true);
                        }
                    }
                });
            };
            TimerAnimation.prototype.setTimeText = function (value) {
                if (value != 0) {
                    this.maskAnimation();
                    this._timeText.text = (value) + "";
                    this.setTime = value;
                }
                else {
                    this._timeText.text = "";
                    this.setTime = value;
                }
            };
            Object.defineProperty(TimerAnimation.prototype, "setTime", {
                get: function () {
                    return this._time;
                },
                set: function (value) {
                    if (value != undefined) {
                        if (this._time != value) {
                            this._time = value;
                            this.resolveTiming(value);
                        }
                    }
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(TimerAnimation.prototype, "container", {
                get: function () {
                    return this._container;
                },
                enumerable: true,
                configurable: true
            });
            return TimerAnimation;
        }(PIXI.utils.EventEmitter));
        Animation.TimerAnimation = TimerAnimation;
    })(Animation = Dev.Animation || (Dev.Animation = {}));
})(Dev || (Dev = {}));
var Dev;
(function (Dev) {
    var Enum;
    (function (Enum) {
        var AnimationStateType;
        (function (AnimationStateType) {
            AnimationStateType["AnimationPlaying"] = "AnimationPlaying";
            AnimationStateType["AnimationStopped"] = "AnimationStopped";
        })(AnimationStateType = Enum.AnimationStateType || (Enum.AnimationStateType = {}));
        var GameAnimListener;
        (function (GameAnimListener) {
            GameAnimListener["MatchSymbolWin"] = "MatchSymbolWin";
            GameAnimListener["LoopMatchSymbolWin"] = "LoopMatchSymbolWin";
            GameAnimListener["BigWin"] = "BigWinAnimation";
            GameAnimListener["MegaWin"] = "MegaWinAnimation";
            GameAnimListener["SuperWin"] = "SuperWinAnimation";
            GameAnimListener["ShowWinAmount"] = "ShowWinAmount";
            GameAnimListener["FreeSpinStart"] = "FreeSpinStart";
            GameAnimListener["BonusStart"] = "BonusStart";
            GameAnimListener["BonusFinished"] = "BonusFinished";
            GameAnimListener["FreeSpinFinished"] = "FreeSpinFinished";
        })(GameAnimListener = Enum.GameAnimListener || (Enum.GameAnimListener = {}));
        ;
        var AnimListener;
        (function (AnimListener) {
            AnimListener["PlayNextAnimation"] = "PlayNextAnimation";
            AnimListener["SortScenarioAnimation"] = "SortScenarioAnimation";
        })(AnimListener = Enum.AnimListener || (Enum.AnimListener = {}));
        var AnimNames;
        (function (AnimNames) {
            AnimNames["CocktailGrape"] = "grape";
            AnimNames["WheelSparkLoop"] = "loop";
            AnimNames["WheelSparkOutre"] = "outre";
            AnimNames["CocktailPlum"] = "plum";
            AnimNames["CocktailMix"] = "mix";
            AnimNames["CocktailStrawberry"] = "strawberry";
            AnimNames["CocktailLemon"] = "lemon";
            AnimNames["Liquid"] = "liquid";
            AnimNames["FruitBarLoop"] = "bar_loop";
            AnimNames["SymbolIdle"] = "idle";
            AnimNames["SymbolMatch"] = "match";
            AnimNames["MatchFrame"] = "matchAnim";
            AnimNames["Coin"] = "coins";
        })(AnimNames = Enum.AnimNames || (Enum.AnimNames = {}));
    })(Enum = Dev.Enum || (Dev.Enum = {}));
})(Dev || (Dev = {}));
var Dev;
(function (Dev) {
    var Config;
    (function (Config) {
        var _a, _b, _c, _d, _e, _f, _g;
        var AnimNames = Dev.Enum.AnimNames;
        var Listener = Dev.Enum.GameAnimListener;
        var AnimConfig = (function () {
            function AnimConfig() {
            }
            AnimConfig.AnimationSort = [
                Listener.MatchSymbolWin,
                Listener.BigWin,
                Listener.SuperWin,
                Listener.ShowWinAmount,
                Listener.LoopMatchSymbolWin
            ];
            AnimConfig.SymbolAnimation = (_a = {},
                _a[AnimNames.SymbolIdle] = { resource: AnimNames.SymbolIdle, loop: true, speed: 1.5 },
                _a[AnimNames.SymbolMatch] = { resource: AnimNames.SymbolMatch, loop: false, speed: 1.5 },
                _a);
            AnimConfig.CocktailAnimation = (_b = {},
                _b[AnimNames.CocktailGrape] = { resource: AnimNames.CocktailGrape, loop: false, speed: 1, tint: 0x06ff6a },
                _b[AnimNames.CocktailLemon] = { resource: AnimNames.CocktailLemon, loop: false, speed: 1, tint: 0xffea00 },
                _b[AnimNames.CocktailStrawberry] = { resource: AnimNames.CocktailStrawberry, loop: false, speed: 1, tint: 0xff1e1e },
                _b[AnimNames.CocktailMix] = { resource: AnimNames.CocktailMix, loop: false, speed: 1 },
                _b[AnimNames.CocktailPlum] = { resource: AnimNames.CocktailPlum, loop: false, speed: 1, tint: 0xb608ff },
                _b);
            AnimConfig.WheelSpark = (_c = {},
                _c[AnimNames.WheelSparkLoop] = { resource: AnimNames.WheelSparkLoop, loop: true, speed: 1, from: 0, to: 18 },
                _c[AnimNames.WheelSparkOutre] = { resource: AnimNames.WheelSparkOutre, loop: false, speed: 1, from: 0, to: 8 },
                _c);
            AnimConfig.MatchFrame = (_d = {},
                _d[AnimNames.MatchFrame] = { resource: AnimNames.MatchFrame, loop: false, speed: 1, from: 0, to: 51 },
                _d);
            AnimConfig.Coin = (_e = {},
                _e[AnimNames.Coin] = { resource: AnimNames.Coin, loop: true, speed: .2, from: 0, to: 5 },
                _e);
            AnimConfig.LiquidAnimation = (_f = {},
                _f[AnimNames.Liquid] = { resource: AnimNames.Liquid, loop: false, speed: 1 },
                _f);
            AnimConfig.FruitBarAnimation = (_g = {},
                _g[AnimNames.FruitBarLoop] = { resource: AnimNames.FruitBarLoop, loop: true, speed: 1, tint: 0x06ff6a },
                _g);
            AnimConfig.Animation = {
                ease: {
                    logoScale: "bounce.out",
                    logoAlpha: "bounce.out",
                    boxFillsAlpha: "power1.inOut",
                    bgCurrentSwitch: "power0",
                    bgNextSwitch: "power0",
                    bgIdle: "sine.inOut",
                    bgIdleBubble: "power0",
                    bgBuzzFallDown: "power0",
                    bgSwitch: "power0",
                    bgChangePosition: "sine.out"
                },
                duration: {
                    logoScale: .75,
                    logoAlpha: .75,
                    boxFillsAlpha: .25,
                    bgCurrentSwitch: .25,
                    bgNextSwitch: .25,
                    bgIdle: 1,
                    bgSwitch: 2,
                    bgBuzzFallDown: .15,
                    bgIdleRandTimeMin: 5,
                    bgIdleRandTimeMax: 10,
                    bgChangePosition: 1.25
                },
                speed: {
                    boxFillsOffset: .35
                },
                count: {
                    bgBuzzFallDown: 10,
                    bgIdleRandMinAlpha: .5,
                    bgIdleRandMaxAlpha: .7,
                }
            };
            return AnimConfig;
        }());
        Config.AnimConfig = AnimConfig;
    })(Config = Dev.Config || (Dev.Config = {}));
})(Dev || (Dev = {}));
var Dev;
(function (Dev) {
    var Enum;
    (function (Enum) {
        var ResourceListener;
        (function (ResourceListener) {
            ResourceListener["AssetLoadCompleted"] = "AssetLoadCompleted";
            ResourceListener["AssetLoading"] = "AssetLoading";
            ResourceListener["AddTextures"] = "AddTextures";
            ResourceListener["AddSounds"] = "AddSounds";
            ResourceListener["AddSpines"] = "AddSpines";
            ResourceListener["AddWebFonts"] = "AddWebFonts";
            ResourceListener["AddPreTextures"] = "AddPreTextures";
            ResourceListener["AssetPreLoadCompleted"] = "AssetPreLoadCompleted";
        })(ResourceListener = Enum.ResourceListener || (Enum.ResourceListener = {}));
        var SpineAnimation;
        (function (SpineAnimation) {
            SpineAnimation["Strawberry"] = "assets/gfx/Symbols/strawberry/cilek.json";
            SpineAnimation["Lemon"] = "assets/gfx/Symbols/lemon/limon.json";
            SpineAnimation["Clover"] = "assets/gfx/Symbols/clover/low_symbols.json";
            SpineAnimation["Diamond"] = "assets/gfx/Symbols/diamond/low_symbols.json";
            SpineAnimation["Hearth"] = "assets/gfx/Symbols/hearth/low_symbols.json";
            SpineAnimation["Spade"] = "assets/gfx/Symbols/spade/low_symbols.json";
            SpineAnimation["Wild"] = "assets/gfx/Symbols/wild/symbol_wild.json";
            SpineAnimation["Plum"] = "assets/gfx/Symbols/plum/erik.json";
            SpineAnimation["Grape"] = "assets/gfx/Symbols/grape/uzum_001.json";
            SpineAnimation["FruitBar"] = "assets/gfx/SlotMachine/Bar/fruit_bar.json";
            SpineAnimation["Scatter"] = "assets/gfx/Symbols/scatter/symbol_scatter.json";
            SpineAnimation["Cocktail"] = "assets/gfx/Bonus/Cocktail/cocktail.json";
            SpineAnimation["Liquid"] = "assets/gfx/Bonus/Liquid/liquid.json";
        })(SpineAnimation = Enum.SpineAnimation || (Enum.SpineAnimation = {}));
        var WebFont;
        (function (WebFont) {
            WebFont["LuckiestGuy"] = "Luckiest Guy";
            WebFont["Modak"] = "Modak";
            WebFont["FontUrl"] = "assets/fonts/stylesheet.css";
        })(WebFont = Enum.WebFont || (Enum.WebFont = {}));
        var PreTexture;
        (function (PreTexture) {
            PreTexture["Logo"] = "assets/gfx/Background/logo.png";
        })(PreTexture = Enum.PreTexture || (Enum.PreTexture = {}));
        var Texture;
        (function (Texture) {
            Texture["Shadow"] = "assets/gfx/Background/shadow.png";
            Texture["WinBg"] = "assets/gfx/Win/bg.png";
            Texture["WinFruit"] = "assets/gfx/Win/fruit.png";
            Texture["FreeSpinWinFruit"] = "assets/gfx/Win/free_spin_fruit.png";
            Texture["Coin"] = "assets/gfx/Win/coin.json";
            Texture["ParticleSpark"] = "assets/gfx/Symbols/particle.png";
            Texture["WinUI"] = "assets/gfx/Win/ui.png";
            Texture["FruitBarBg"] = "assets/gfx/SlotMachine/Bar/back.png";
            Texture["FruitBarFront"] = "assets/gfx/SlotMachine/Bar/front2.png";
            Texture["SymbolMatchAnim"] = "assets/gfx/Symbols/match/matchAnim-0.json";
            Texture["WheelSpark1"] = "assets/gfx/Bonus/Wheel/wheel_spark/wheelSpark-0.json";
            Texture["WheelSpark2"] = "assets/gfx/Bonus/Wheel/wheel_spark/wheelSpark-1.json";
            Texture["PlumIcon"] = "assets/gfx/SlotMachine/SymbolIcon/plum.png";
            Texture["LemonIcon"] = "assets/gfx/SlotMachine/SymbolIcon/lemon.png";
            Texture["StrawberryIcon"] = "assets/gfx/SlotMachine/SymbolIcon/strawberry.png";
            Texture["GrapeIcon"] = "assets/gfx/SlotMachine/SymbolIcon/grape.png";
            Texture["SpinOut"] = "assets/sprites/Buttons/Spin.png";
            Texture["SpinOver"] = "assets/sprites/Buttons/SpinOver.png";
            Texture["SpinDisabled"] = "assets/sprites/Buttons/SpinDisabled.png";
            Texture["StopOut"] = "assets/sprites/Buttons/SpinStop.png";
            Texture["StopOver"] = "assets/sprites/Buttons/SpinStopOver.png";
            Texture["StopDisabled"] = "assets/sprites/Buttons/SpinStopDisabled.png";
            Texture["SlotNormalBg"] = "assets/gfx/Background/bg.jpg";
            Texture["SlotNormalDarkBg"] = "assets/gfx/Background/bg2.jpg";
            Texture["SlotFreeSpinBg"] = "assets/gfx/Background/Free_BG1.jpg";
            Texture["SlotDarkFreeSpinBg"] = "assets/gfx/Background/Free_BG2.jpg";
            Texture["CocktailMask"] = "assets/gfx/Bonus/Cocktail/cocktail_mask.png";
            Texture["Bubble1"] = "assets/gfx/Background/Bubble1.png";
            Texture["PlatformSide"] = "assets/gfx/SlotMachine/Platform/platform_side.png";
            Texture["PlatformTile"] = "assets/gfx/SlotMachine/Platform/platform_tile.png";
            Texture["PlatformCircle"] = "assets/gfx/SlotMachine/Platform/platform_circle.png";
            Texture["UIRefBg"] = "assets/gfx/Menu/ui_ref.png";
            Texture["PlatformLine"] = "assets/gfx/SlotMachine/Platform/platform_line.png";
            Texture["Bubble2"] = "assets/gfx/Background/Bubble2.png";
            Texture["Bubble3"] = "assets/gfx/Background/Bubble3.png";
            Texture["Bubble4"] = "assets/gfx/Background/Bubble4.png";
            Texture["Float1"] = "assets/gfx/Background/float1.png";
            Texture["Float2"] = "assets/gfx/Background/float2.png";
            Texture["Float3"] = "assets/gfx/Background/float3.png";
            Texture["Float4"] = "assets/gfx/Background/float4.png";
            Texture["Float5"] = "assets/gfx/Background/float5.png";
            Texture["Float6"] = "assets/gfx/Background/float6.png";
            Texture["Glass"] = "assets/gfx/Bonus/Cocktail/glass.png";
            Texture["WheelFrame"] = "assets/gfx/Bonus/Wheel/frame.png";
            Texture["WheelBase"] = "assets/gfx/Bonus/Wheel/frameBase.png";
            Texture["GreenLine"] = "assets/gfx/Bonus/Wheel/greenLine.png";
            Texture["GreenBase"] = "assets/gfx/Bonus/Wheel/greenBase.png";
            Texture["YellowLine"] = "assets/gfx/Bonus/Wheel/yellowLine.png";
            Texture["YellowBase"] = "assets/gfx/Bonus/Wheel/yellowBase.png";
            Texture["RedLine"] = "assets/gfx/Bonus/Wheel/redLine.png";
            Texture["RedBase"] = "assets/gfx/Bonus/Wheel/redBAse.png";
            Texture["PurpleLine"] = "assets/gfx/Bonus/Wheel/purpleLine.png";
            Texture["FruitBarHead"] = "assets/gfx/SlotMachine/Bar/head.png";
            Texture["PurpleBase"] = "assets/gfx/Bonus/Wheel/purpleBase.png";
            Texture["WheelIndicator"] = "assets/gfx/Bonus/Wheel/indicator.png";
            Texture["WheelLight"] = "assets/gfx/Bonus/Wheel/light.png";
            Texture["WheelNextIcon"] = "assets/gfx/Bonus/Wheel/nextIcon.png";
            Texture["WheelInner"] = "assets/gfx/Bonus/Wheel/inner.png";
        })(Texture = Enum.Texture || (Enum.Texture = {}));
    })(Enum = Dev.Enum || (Dev.Enum = {}));
})(Dev || (Dev = {}));
var Dev;
(function (Dev) {
    var Config;
    (function (Config) {
        var Shape = Core.Enum.Shape;
        var Texture = Dev.Enum.Texture;
        var PreTexture = Dev.Enum.PreTexture;
        var AssetConfig = (function () {
            function AssetConfig() {
            }
            AssetConfig.ResourceManager = Core.Managers.ResourceManager.Instance;
            AssetConfig.TimerCircle = {
                shape: Shape.Circle,
                name: "TimerCircleMask",
                radius: 1480,
                fill: 0x000000,
                alpha: .75
            };
            AssetConfig.TimerTextStyle = new PIXI.TextStyle({
                fontFamily: "Luckiest Guy",
                fontSize: 300,
                fontWeight: "600",
                fill: "#ffffff",
                align: "center"
            });
            AssetConfig.TimerText = {
                text: "5",
                textStyle: AssetConfig.TimerTextStyle,
                name: "timerText",
                anchor: Core.Enum.Anchor.MiddleCenter
            };
            AssetConfig.StageRect = {
                shape: Shape.Rectangle,
                name: "StageBg",
                fill: 0x00000,
                alpha: 0
            };
            AssetConfig.SpinButton = {
                frames: {
                    out: Texture.SpinOut,
                    over: Texture.SpinOver,
                    down: Texture.SpinOver,
                    disabled: Texture.SpinDisabled
                }
            };
            AssetConfig.StopButton = {
                frames: {
                    out: Texture.StopOut,
                    over: Texture.StopOver,
                    down: Texture.StopOver,
                    disabled: Texture.StopDisabled
                }
            };
            AssetConfig.MenuButton = {
                frames: {
                    out: "home_out",
                    over: "home_over",
                    down: "home_down",
                    disabled: "home_disabled"
                },
                name: "Menu Button"
            };
            AssetConfig.BigWinHeader = new PIXI.TextStyle({
                fontFamily: Dev.Enum.WebFont.Modak,
                fontSize: 200,
                fill: 0xf54782,
                fontWeight: "400",
                lineJoin: "round",
                letterSpacing: 3,
                miterLimit: 5,
                stroke: "#2c00fb",
                strokeThickness: 3
            });
            AssetConfig.FreeSpinWinHeader = new PIXI.TextStyle({
                fontFamily: Dev.Enum.WebFont.Modak,
                fontSize: 200,
                fill: 0xffed00,
                fontWeight: "400",
                lineJoin: "round",
                letterSpacing: 3,
                miterLimit: 5,
                stroke: "#2c00fb",
                strokeThickness: 3
            });
            AssetConfig.SuperWinHeader = new PIXI.TextStyle({
                fontFamily: Dev.Enum.WebFont.Modak,
                fontSize: 200,
                fill: 0x36a9e1,
                fontWeight: "400",
                lineJoin: "round",
                letterSpacing: 3,
                miterLimit: 5,
                stroke: "#2c00fb",
                strokeThickness: 3
            });
            AssetConfig.MegaWinHeader = new PIXI.TextStyle({
                fontFamily: Dev.Enum.WebFont.Modak,
                fontSize: 200,
                fill: 0xffed00,
                fontWeight: "400",
                lineJoin: "round",
                letterSpacing: 3,
                miterLimit: 5,
                stroke: "#2c00fb",
                strokeThickness: 3
            });
            AssetConfig.BigWinText = {
                text: "BIG WIN",
                textStyle: AssetConfig.BigWinHeader,
                name: "BigWinHeader"
            };
            AssetConfig.UIHeaderStyle = new PIXI.TextStyle({
                fontFamily: Dev.Enum.WebFont.Modak,
                fontSize: 200,
                fill: 0xffed00,
                fontWeight: "400",
                lineJoin: "round",
                letterSpacing: 3,
                miterLimit: 5,
                stroke: "#2c00fb",
                strokeThickness: 3
            });
            AssetConfig.SliderBarTextStyle = new PIXI.TextStyle({
                fontSize: 30,
                fontFamily: Dev.Enum.WebFont.LuckiestGuy,
                fill: "white",
                fontWeight: "400",
                lineJoin: "round",
                letterSpacing: 3,
                miterLimit: 5,
                stroke: "#2c00fb",
                strokeThickness: 3
            });
            AssetConfig.UIHeaderText = {
                text: "YOU WON",
                textStyle: AssetConfig.UIHeaderStyle,
                name: "UIHeader"
            };
            AssetConfig.SliderBarHeaderText = {
                text: "%0",
                textStyle: AssetConfig.SliderBarTextStyle,
                name: "SliderBarHeader"
            };
            AssetConfig.GeneralBoldTextStyle = new PIXI.TextStyle({
                fontFamily: "Montserrat, sans-serif",
                fontSize: "22px",
                fontWeight: "bold",
                fill: "#ffffff",
                stroke: 0x000000,
                strokeThickness: 3,
                align: "center"
            });
            AssetConfig.GenericBoldText = {
                text: "Generic Bold Text",
                textStyle: AssetConfig.GeneralBoldTextStyle,
                name: "Generic Text"
            };
            AssetConfig.WinAmountStyle = new PIXI.TextStyle({
                fontFamily: Dev.Enum.WebFont.Modak,
                fontSize: 150,
                fill: "white",
                fontWeight: "400",
                lineJoin: "round",
                letterSpacing: 3,
                miterLimit: 5,
                stroke: "#2c00fb",
                strokeThickness: 3
            });
            AssetConfig.WinLineTextStyle = new PIXI.TextStyle({
                fontFamily: Dev.Enum.WebFont.LuckiestGuy,
                fontSize: 150,
                fill: "white",
                fontWeight: "400",
                lineJoin: "round",
                letterSpacing: 3,
                miterLimit: 5,
                stroke: "#2c00fb",
                strokeThickness: 3
            });
            AssetConfig.WinAmountText = {
                text: "x5",
                textStyle: AssetConfig.WinAmountStyle,
                name: "WinAmountText"
            };
            AssetConfig.WinLineText = {
                text: "",
                textStyle: AssetConfig.WinLineTextStyle,
                name: "WinLineText"
            };
            AssetConfig.MegaWinText = {
                text: "MEGA WIN",
                textStyle: AssetConfig.MegaWinHeader,
                name: "MegaWinHeader"
            };
            AssetConfig.SuperWinText = {
                text: "SUPER WIN",
                textStyle: AssetConfig.SuperWinHeader,
                name: "SuperWinHeader"
            };
            AssetConfig.FreeSpinStartWinText = {
                text: "FREE SPIN",
                textStyle: AssetConfig.FreeSpinWinHeader,
                name: "FreeSpinStartWinHeader"
            };
            AssetConfig.GeneralTextStyle = new PIXI.TextStyle({
                fontFamily: "Montserrat, sans-serif",
                fontSize: "14px",
                fontWeight: "bold",
                fill: "#d08f38",
                stroke: 0x000000,
                strokeThickness: 3,
                align: "center"
            });
            AssetConfig.GenericText = {
                text: "Generic Text",
                textStyle: AssetConfig.GeneralTextStyle,
                name: "Generic Text"
            };
            AssetConfig.MenuText = {
                text: "Menu",
                textStyle: AssetConfig.GeneralTextStyle,
                name: "Menu Text"
            };
            AssetConfig.NormalSpinBg = {
                frame: Texture.SlotNormalBg,
                name: "Background"
            };
            AssetConfig.NormalSpinDarkBg = {
                frame: Texture.SlotNormalDarkBg,
                name: "Background"
            };
            AssetConfig.Logo = {
                frame: PreTexture.Logo,
                name: "Logo"
            };
            AssetConfig.WheelBase = {
                frame: Texture.WheelBase,
                name: "WheelFrameBase"
            };
            AssetConfig.WheelFrame = {
                frame: Texture.WheelFrame,
                name: "WheelFrame"
            };
            AssetConfig.WheelInner = {
                frame: Texture.WheelInner,
                name: "WheelInner"
            };
            AssetConfig.WheelIndicator = {
                frame: Texture.WheelIndicator,
                name: "WheelIndicator"
            };
            AssetConfig.WheelLight = {
                frame: Texture.WheelLight,
                name: "WheelLight"
            };
            AssetConfig.WinBg = {
                frame: Texture.WinBg,
                name: "WinBg"
            };
            AssetConfig.WinFruit = {
                frame: Texture.WinFruit,
                name: "WinFruit"
            };
            AssetConfig.FreeSpinWinFruit = {
                frame: Texture.FreeSpinWinFruit,
                name: "FreeSpinWinFruit"
            };
            AssetConfig.ParticleSpark = {
                frame: Texture.ParticleSpark,
                name: "ParticleSpark"
            };
            AssetConfig.WinUI = {
                frame: Texture.WinUI,
                name: "WinUI"
            };
            AssetConfig.FreeSpinSpinBg = {
                frame: Texture.SlotFreeSpinBg,
                name: "Background"
            };
            AssetConfig.CocktailMask = {
                frame: Texture.CocktailMask,
                name: "CocktailMask"
            };
            AssetConfig.FreeSpinSpinDarkBg = {
                frame: Texture.SlotDarkFreeSpinBg,
                name: "Background"
            };
            AssetConfig.WheelNextIcon = {
                frame: Texture.WheelNextIcon,
                name: "WheelNextIcon"
            };
            AssetConfig.WheelYellowBase = {
                frame: Texture.YellowBase,
                name: "YellowBase",
                tint: 0xffea00
            };
            AssetConfig.WheelYellowLine = {
                frame: Texture.YellowLine,
                name: "YellowLine"
            };
            AssetConfig.WheelRedBase = {
                frame: Texture.RedBase,
                name: "RedBase",
                tint: 0xff1e1e
            };
            AssetConfig.WheelRedLine = {
                frame: Texture.RedLine,
                name: "RedLine"
            };
            AssetConfig.WheelGreenBase = {
                frame: Texture.GreenBase,
                name: "GreenBase",
                tint: 0x06ff6a
            };
            AssetConfig.FruitBarBg = {
                frame: Texture.FruitBarBg,
                name: "FruitBarBg"
            };
            AssetConfig.FruitBarFront = {
                frame: Texture.FruitBarFront,
                name: "FruitBarFront"
            };
            AssetConfig.WheelGreenLine = {
                frame: Texture.GreenLine,
                name: "GreenLine"
            };
            AssetConfig.WheelPurpleBase = {
                frame: Texture.PurpleBase,
                name: "PurpleBase",
                tint: 0xb608ff
            };
            AssetConfig.WheelPurpleLine = {
                frame: Texture.PurpleLine,
                name: "PurpleLine"
            };
            AssetConfig.FruitBarHead = {
                frame: Texture.FruitBarHead,
                name: "FruitBarHead"
            };
            AssetConfig.PlatformSide = {
                frame: Texture.PlatformSide,
                name: "PlatformSide"
            };
            AssetConfig.Glass = {
                frame: Texture.Glass,
                name: "Glass"
            };
            AssetConfig.PlatformLine = {
                frame: Texture.PlatformLine,
                name: "PlatformLine"
            };
            AssetConfig.PlatformTile = {
                frame: Texture.PlatformTile,
                name: "PlatformTile"
            };
            AssetConfig.Floats = [
                {
                    frame: Texture.Float1,
                    name: "Float1"
                },
                {
                    frame: Texture.Float2,
                    name: "Float2"
                }, {
                    frame: Texture.Float3,
                    name: "Float3"
                },
                {
                    frame: Texture.Float4,
                    name: "Float4"
                },
                {
                    frame: Texture.Float5,
                    name: "Float5"
                },
                {
                    frame: Texture.Float6,
                    name: "Float6"
                }
            ];
            AssetConfig.Bubbles = [
                {
                    frame: Texture.Bubble1,
                    name: "Bubble1"
                },
                {
                    frame: Texture.Bubble2,
                    name: "Bubble2"
                }, {
                    frame: Texture.Bubble3,
                    name: "Bubble3"
                },
                {
                    frame: Texture.Bubble4,
                    name: "Bubble4"
                }
            ];
            AssetConfig.PlatformCircle = {
                frame: Texture.PlatformCircle,
                name: "PlatformCircle"
            };
            AssetConfig.UIRefBg = {
                frame: Texture.UIRefBg,
                name: "UıRefBg"
            };
            AssetConfig.LoadingCircleBg = {
                shape: Shape.RoundRect,
                name: "LoadingCircle",
                radius: 10,
                fill: 0xba6329
            };
            AssetConfig.SlotWinLine = {
                shape: Shape.Line,
                name: "SlotWinline",
                fill: 0xffffff
            };
            AssetConfig.LoadingCircleFill = {
                shape: Shape.RoundRect,
                name: "LoadingCircle",
                radius: 10,
                fill: 0xe8cf5b
            };
            AssetConfig.FruitBarMask = {
                shape: Shape.RoundRect,
                name: "FruitBarMask",
                radius: 27,
                fill: 0xffffff
            };
            AssetConfig.SliderFilterMask = {
                shape: Shape.RoundRect,
                name: "SliderFilterMask",
                radius: 15,
                fill: 0xffffff,
                alpha: 0
            };
            AssetConfig.PopupRect = {
                shape: Shape.Rectangle,
                name: "PopupBg",
                fill: 0x00000,
                alpha: 0
            };
            AssetConfig.WheelMask = {
                shape: Shape.Circle,
                name: "WheelMask",
                fill: 0x00000,
                radius: 352,
                alpha: 1
            };
            AssetConfig.GeneralReelMask = {
                shape: Shape.Rectangle,
                name: "GeneralReelMask",
                fill: 0x00000,
                alpha: 0
            };
            AssetConfig.Frame = {
                shape: Shape.RoundRect,
                name: "Frame",
                radius: 30,
                fill: 0x00000,
                alpha: 0.7
            };
            AssetConfig.LoadingBg = {
                shape: Shape.Rectangle,
                name: "LoadingBg",
                fill: 0xf2f4d3,
                alpha: 0
            };
            AssetConfig.Cocktail = {
                skeletonDataName: Dev.Enum.SpineAnimation.Cocktail,
                animations: Config.AnimConfig.CocktailAnimation,
                name: "Cocktail"
            };
            AssetConfig.FruitBar = {
                skeletonDataName: Dev.Enum.SpineAnimation.FruitBar,
                animations: Config.AnimConfig.FruitBarAnimation,
                name: "FruitBar"
            };
            AssetConfig.Liquid = {
                skeletonDataName: Dev.Enum.SpineAnimation.Liquid,
                animations: Config.AnimConfig.LiquidAnimation,
                name: "Liquid"
            };
            AssetConfig.WheelSpark = {
                defaultAnimName: Dev.Enum.AnimNames.WheelSparkLoop,
                animations: Config.AnimConfig.WheelSpark,
                name: "WheelSpark"
            };
            AssetConfig.MatchFrame = {
                defaultAnimName: Dev.Enum.AnimNames.MatchFrame,
                animations: Config.AnimConfig.MatchFrame,
                name: "MatchFrame"
            };
            AssetConfig.Coin = {
                defaultAnimName: Dev.Enum.AnimNames.Coin,
                animations: Config.AnimConfig.Coin,
                name: "Coin"
            };
            AssetConfig.FireSparkEmitter = {
                "alpha": {
                    "start": 0,
                    "end": 1
                },
                "scale": {
                    "start": 0.01,
                    "end": 0.2,
                    "minimumScaleMultiplier": 0.3
                },
                "color": {
                    "start": "#ffffff",
                    "end": "#ffffff"
                },
                "speed": {
                    "start": 85,
                    "end": 10,
                    "minimumSpeedMultiplier": 0.9
                },
                "acceleration": {
                    "x": 0,
                    "y": 0
                },
                "maxSpeed": 0,
                "startRotation": {
                    "min": 0,
                    "max": 360
                },
                "noRotation": false,
                "rotationSpeed": {
                    "min": 0,
                    "max": 0
                },
                "lifetime": {
                    "min": 0.16,
                    "max": 0.85
                },
                "blendMode": "normal",
                "frequency": 0.006,
                "emitterLifetime": -0.66,
                "maxParticles": 6,
                "pos": {
                    "x": 0,
                    "y": 0
                },
                "addAtBack": false,
                "spawnType": "circle",
                "spawnCircle": {
                    "x": 5,
                    "y": 0,
                    "r": 0
                }
            };
            AssetConfig.SliderBarBubble = {
                "alpha": {
                    "start": 1,
                    "end": 1
                },
                "scale": {
                    "start": 0.2,
                    "end": 0.1,
                    "minimumScaleMultiplier": 0.5
                },
                "color": {
                    "start": "#ffffff",
                    "end": "#ffffff"
                },
                "speed": {
                    "start": 150,
                    "end": 50,
                    "minimumSpeedMultiplier": 1
                },
                "acceleration": {
                    "x": 0,
                    "y": 0
                },
                "maxSpeed": 0,
                "startRotation": {
                    "min": -100,
                    "max": -80
                },
                "noRotation": false,
                "rotationSpeed": {
                    "min": 0,
                    "max": 20
                },
                "lifetime": {
                    "min": 1,
                    "max": 1
                },
                "blendMode": "normal",
                "frequency": 0.032,
                "emitterLifetime": 1,
                "maxParticles": 25,
                "pos": {
                    "x": 0,
                    "y": 0
                },
                "addAtBack": false,
                "spawnType": "rect",
                "spawnRect": {
                    "x": 0,
                    "y": 0,
                    "w": 50,
                    "h": 0
                }
            };
            AssetConfig.BubbleVertical = {
                "alpha": {
                    "start": 0.9,
                    "end": 0
                },
                "scale": {
                    "start": 0.51,
                    "end": 1,
                    "minimumScaleMultiplier": 0.5
                },
                "color": {
                    "start": "#ffffff",
                    "end": "#ffffff"
                },
                "speed": {
                    "start": 500,
                    "end": 500,
                    "minimumSpeedMultiplier": 1
                },
                "acceleration": {
                    "x": 0,
                    "y": 0
                },
                "maxSpeed": 0,
                "startRotation": {
                    "min": 260,
                    "max": 280
                },
                "noRotation": false,
                "rotationSpeed": {
                    "min": 0,
                    "max": 50
                },
                "lifetime": {
                    "min": 2,
                    "max": 2
                },
                "blendMode": "normal",
                "frequency": 0.015,
                "emitterLifetime": 1,
                "maxParticles": 30,
                "pos": {
                    "x": 0,
                    "y": 0
                },
                "addAtBack": false,
                "spawnType": "rect",
                "spawnRect": {
                    "x": -500,
                    "y": 500,
                    "w": 900,
                    "h": 0
                }
            };
            return AssetConfig;
        }());
        Config.AssetConfig = AssetConfig;
    })(Config = Dev.Config || (Dev.Config = {}));
})(Dev || (Dev = {}));
var Dev;
(function (Dev) {
    var Enum;
    (function (Enum) {
        var Listeners;
        (function (Listeners) {
            Listeners["OnSpinBarAction"] = "OnSpinBarAction";
            Listeners["OnSpinMachineAction"] = "OnSpinMachineAction";
            Listeners["OnWinLinesAction"] = "OnWinLinesAction";
            Listeners["OnWinAnimAction"] = "OnWinAnimAction";
            Listeners["OnGameAnimAction"] = "OnGameAnimAction";
            Listeners["OnAnimationAction"] = "OnAnimationAction";
            Listeners["OnBonusGameAction"] = "OnBonusGameAction";
        })(Listeners = Enum.Listeners || (Enum.Listeners = {}));
        var SpinAction;
        (function (SpinAction) {
            SpinAction["StartSpin"] = "StartSpin";
            SpinAction["StopSpin"] = "StopSpin";
            SpinAction["SkipSpin"] = "SkipSpin";
            SpinAction["QuickSpin"] = "QuickSpin";
            SpinAction["ForceSpin"] = "ForceSpin";
        })(SpinAction = Enum.SpinAction || (Enum.SpinAction = {}));
        var SlotAnimState;
        (function (SlotAnimState) {
            SlotAnimState["WheelTurnStopped"] = "WheelTurnStopped";
            SlotAnimState["MatchIconFinished"] = "MatchIconAnimFinished";
            SlotAnimState["MatchIconStarted"] = "MatchIconStarted";
            SlotAnimState["MatchSymbolWinFinished"] = "MatchSymbolWinFinished";
            SlotAnimState["WinLineStarted"] = "WinLineStarted";
            SlotAnimState["WinLineFinished"] = "WinLineFinished";
            SlotAnimState["MatchSymbolWinStarted"] = "MatchSymbolWinStarted";
            SlotAnimState["SpinStarted"] = "SpinStarted";
            SlotAnimState["SpinCompleted"] = "SpinCompleted";
            SlotAnimState["SpinStopped"] = "SpinStopped";
            SlotAnimState["SpinSkipped"] = "SpinSkipped";
            SlotAnimState["SpinQuicked"] = "SpinQuicked";
            SlotAnimState["SpinForceStopped"] = "SpinForceStopped";
            SlotAnimState["ReelSpinCompleted"] = "ReelSpinCompleted";
            SlotAnimState["WinUpdated"] = "WinUpdated";
            SlotAnimState["FinishedStartFreeSpinWin"] = "FinishedStartFreeSpinWin";
        })(SlotAnimState = Enum.SlotAnimState || (Enum.SlotAnimState = {}));
        var SpinButtonState;
        (function (SpinButtonState) {
            SpinButtonState["Normal"] = "Normal";
            SpinButtonState["Quick"] = "Quick";
            SpinButtonState["Stop"] = "Stop";
            SpinButtonState["Auto"] = "Auto";
            SpinButtonState["Skip"] = "Skip";
        })(SpinButtonState = Enum.SpinButtonState || (Enum.SpinButtonState = {}));
        var SpinMode;
        (function (SpinMode) {
            SpinMode["FreeSpin"] = "FreeSpin";
            SpinMode["NormalSpin"] = "NormalSpin";
        })(SpinMode = Enum.SpinMode || (Enum.SpinMode = {}));
        var MachineType;
        (function (MachineType) {
            MachineType["Slider"] = "slider";
        })(MachineType = Enum.MachineType || (Enum.MachineType = {}));
        var WinlineType;
        (function (WinlineType) {
            WinlineType["LinearAnimation"] = "LinearAnimation";
            WinlineType["FadeIn"] = "FadeIn";
        })(WinlineType = Enum.WinlineType || (Enum.WinlineType = {}));
        var WinType;
        (function (WinType) {
            WinType["BigWin"] = "bigWin";
            WinType["SuperWin"] = "superWin";
            WinType["MegaWin"] = "megaWin";
            WinType["SymbolWin"] = "symbolWin";
            WinType["FreeSpinStartWin"] = "freeSpinWin";
        })(WinType = Enum.WinType || (Enum.WinType = {}));
    })(Enum = Dev.Enum || (Dev.Enum = {}));
})(Dev || (Dev = {}));
var Dev;
(function (Dev) {
    var Enum;
    (function (Enum) {
        var SlotSymbol;
        (function (SlotSymbol) {
            SlotSymbol[SlotSymbol["Wild"] = 0] = "Wild";
            SlotSymbol[SlotSymbol["Grape"] = 1] = "Grape";
            SlotSymbol[SlotSymbol["Strawberry"] = 2] = "Strawberry";
            SlotSymbol[SlotSymbol["Plum"] = 3] = "Plum";
            SlotSymbol[SlotSymbol["Lemon"] = 4] = "Lemon";
            SlotSymbol[SlotSymbol["Clover"] = 5] = "Clover";
            SlotSymbol[SlotSymbol["Hearth"] = 6] = "Hearth";
            SlotSymbol[SlotSymbol["Diamond"] = 7] = "Diamond";
            SlotSymbol[SlotSymbol["Spade"] = 8] = "Spade";
        })(SlotSymbol = Enum.SlotSymbol || (Enum.SlotSymbol = {}));
        var DataListener;
        (function (DataListener) {
            DataListener["error"] = "error";
            DataListener["freeSpin"] = "freeSpin";
            DataListener["spin"] = "spin";
            DataListener["reSpin"] = "reSpin";
            DataListener["bonus"] = "bonus";
            DataListener["gamble"] = "gamble";
            DataListener["gambleSelected"] = "gambleSelected";
            DataListener["takeWin"] = "takeWin";
            DataListener["jackpot"] = "jackpot";
            DataListener["history"] = "history";
            DataListener["message"] = "message";
        })(DataListener = Enum.DataListener || (Enum.DataListener = {}));
        ;
    })(Enum = Dev.Enum || (Dev.Enum = {}));
})(Dev || (Dev = {}));
var Dev;
(function (Dev) {
    var Config;
    (function (Config) {
        var DataConfig = (function () {
            function DataConfig() {
            }
            DataConfig.PayoutData = [
                {
                    combination: [
                        { count: 3, symbol: Dev.Enum.SlotSymbol.Lemon }
                    ],
                    payout: { coins: 2000, cents: 2000 },
                    lineIndex: 0
                },
                {
                    combination: [
                        { count: 3, symbol: Dev.Enum.SlotSymbol.Wild }
                    ],
                    payout: { coins: 150, cents: 150 },
                    lineIndex: 0
                },
                {
                    combination: [
                        { count: 3, symbol: Dev.Enum.SlotSymbol.Grape }
                    ],
                    payout: { coins: 10, cents: 10 },
                    lineIndex: 0
                },
                {
                    combination: [
                        { count: 3, symbol: Dev.Enum.SlotSymbol.Plum }
                    ],
                    payout: { coins: 50, cents: 50 },
                    lineIndex: 0
                },
                {
                    combination: [
                        { count: 3, symbol: Dev.Enum.SlotSymbol.Strawberry }
                    ],
                    payout: { coins: 20, cents: 20 },
                    lineIndex: 0
                },
                {
                    combination: [
                        { count: 3, symbol: Dev.Enum.SlotSymbol.Lemon }
                    ],
                    payout: { coins: 1000, cents: 1000 },
                    lineIndex: 1
                },
                {
                    combination: [
                        { count: 3, symbol: Dev.Enum.SlotSymbol.Wild }
                    ],
                    payout: { coins: 150, cents: 150 },
                    lineIndex: 1
                }, {
                    combination: [
                        { count: 3, symbol: Dev.Enum.SlotSymbol.Plum }
                    ],
                    payout: { coins: 50, cents: 50 },
                    lineIndex: 1
                }, {
                    combination: [
                        { count: 3, symbol: Dev.Enum.SlotSymbol.Strawberry }
                    ],
                    payout: { coins: 20, cents: 20 },
                    lineIndex: 1
                }, {
                    combination: [
                        { count: 3, symbol: Dev.Enum.SlotSymbol.Grape }
                    ],
                    payout: { coins: 10, cents: 10 },
                    lineIndex: 1
                },
                {
                    combination: [
                        { count: 3, symbol: Dev.Enum.SlotSymbol.Lemon }
                    ],
                    payout: { coins: 4000, cents: 4000 },
                    lineIndex: 2
                },
                {
                    combination: [
                        { count: 3, symbol: Dev.Enum.SlotSymbol.Wild }
                    ],
                    payout: { coins: 150, cents: 150 },
                    lineIndex: 2
                },
                {
                    combination: [
                        { count: 3, symbol: Dev.Enum.SlotSymbol.Plum }
                    ],
                    payout: { coins: 50, cents: 50 },
                    lineIndex: 2
                },
                {
                    combination: [
                        { count: 3, symbol: Dev.Enum.SlotSymbol.Strawberry }
                    ],
                    payout: { coins: 20, cents: 20 },
                    lineIndex: 2
                },
                {
                    combination: [
                        { count: 3, symbol: Dev.Enum.SlotSymbol.Grape }
                    ],
                    payout: { coins: 10, cents: 10 },
                    lineIndex: 2
                },
                {
                    combination: [
                        { count: 2, symbol: Dev.Enum.SlotSymbol.Lemon }
                    ],
                    payout: { coins: 2000, cents: 2000 },
                    lineIndex: 0
                },
                {
                    combination: [
                        { count: 2, symbol: Dev.Enum.SlotSymbol.Wild }
                    ],
                    payout: { coins: 150, cents: 150 },
                    lineIndex: 0
                },
                {
                    combination: [
                        { count: 2, symbol: Dev.Enum.SlotSymbol.Grape }
                    ],
                    payout: { coins: 10, cents: 10 },
                    lineIndex: 0
                },
                {
                    combination: [
                        { count: 2, symbol: Dev.Enum.SlotSymbol.Plum }
                    ],
                    payout: { coins: 50, cents: 50 },
                    lineIndex: 0
                },
                {
                    combination: [
                        { count: 2, symbol: Dev.Enum.SlotSymbol.Strawberry }
                    ],
                    payout: { coins: 20, cents: 20 },
                    lineIndex: 0
                },
                {
                    combination: [
                        { count: 2, symbol: Dev.Enum.SlotSymbol.Lemon }
                    ],
                    payout: { coins: 1000, cents: 1000 },
                    lineIndex: 1
                },
                {
                    combination: [
                        { count: 2, symbol: Dev.Enum.SlotSymbol.Wild }
                    ],
                    payout: { coins: 150, cents: 150 },
                    lineIndex: 1
                }, {
                    combination: [
                        { count: 2, symbol: Dev.Enum.SlotSymbol.Plum }
                    ],
                    payout: { coins: 50, cents: 50 },
                    lineIndex: 1
                }, {
                    combination: [
                        { count: 2, symbol: Dev.Enum.SlotSymbol.Strawberry }
                    ],
                    payout: { coins: 20, cents: 20 },
                    lineIndex: 1
                }, {
                    combination: [
                        { count: 2, symbol: Dev.Enum.SlotSymbol.Grape }
                    ],
                    payout: { coins: 10, cents: 10 },
                    lineIndex: 1
                },
                {
                    combination: [
                        { count: 2, symbol: Dev.Enum.SlotSymbol.Lemon }
                    ],
                    payout: { coins: 4000, cents: 4000 },
                    lineIndex: 2
                },
                {
                    combination: [
                        { count: 2, symbol: Dev.Enum.SlotSymbol.Wild }
                    ],
                    payout: { coins: 150, cents: 150 },
                    lineIndex: 2
                },
                {
                    combination: [
                        { count: 2, symbol: Dev.Enum.SlotSymbol.Plum }
                    ],
                    payout: { coins: 50, cents: 50 },
                    lineIndex: 2
                },
                {
                    combination: [
                        { count: 2, symbol: Dev.Enum.SlotSymbol.Strawberry }
                    ],
                    payout: { coins: 20, cents: 20 },
                    lineIndex: 2
                },
                {
                    combination: [
                        { count: 2, symbol: Dev.Enum.SlotSymbol.Grape }
                    ],
                    payout: { coins: 10, cents: 10 },
                    lineIndex: 2
                }
            ];
            return DataConfig;
        }());
        Config.DataConfig = DataConfig;
    })(Config = Dev.Config || (Dev.Config = {}));
})(Dev || (Dev = {}));
var Dev;
(function (Dev) {
    var Config;
    (function (Config) {
        var SpineAnimation = Dev.Enum.SpineAnimation;
        var SlotConfig = (function () {
            function SlotConfig() {
            }
            SlotConfig.MachineType = Dev.Enum.MachineType.Slider;
            SlotConfig.SliderMachine = {
                reelMask: {
                    normalScale: { x: 890, y: 490, pY: 362, pX: Dev.Config.GameConfig.DisplayConfig.width / 2 },
                    frameScale: { x: 890, y: 490, pY: 362, pX: Dev.Config.GameConfig.DisplayConfig.width / 2 },
                    fallDownScale: { x: 890, y: 500, positionY: 362, positionX: Dev.Config.GameConfig.DisplayConfig.width / 2 },
                    matchScale: { x: 890, y: 500, pY: 362, pX: Dev.Config.GameConfig.DisplayConfig.width / 2 }
                },
                win: {
                    bigWin: {
                        duration: .5,
                        ease: "back.out(2)",
                        coinCount: 20,
                        showTime: 1
                    },
                    superWin: {
                        duration: .5,
                        ease: "back.out(2)",
                        coinCount: 20,
                        showTime: 1
                    },
                    megaWin: {
                        duration: .5,
                        ease: "back.out(2)",
                        coinCount: 20,
                        showTime: 1
                    },
                    freeSpinStartWin: {
                        duration: .5,
                        ease: "back.out(2)",
                        showTime: 1
                    }
                },
                machine: {
                    type: Dev.Enum.MachineType.Slider,
                    reelMatrix: { row: 3, column: 5 }
                },
                symbol: {
                    scale: { x: 160, y: 160 },
                    offset: { x: 0, y: 0 },
                    matchAnimScale: { x: 1, y: 1 },
                    winSpriteScale: { x: 50, y: 50 }
                },
                speed: {},
                duration: {
                    winOffset: .65,
                    loopOffset: .25,
                    spinningDuration: 1,
                    reelStopOffset: .5,
                    fallDown: .5,
                    fallUp: .5,
                    fallDownReelOffset: .1,
                    fallUpReelOffset: .1,
                    spin: .4,
                    reelStop: .25,
                    forceReelStop: .1,
                    slider: .5,
                    matchIconFallDown: 1,
                    matchIconLeftSide: 1,
                    barFill: .8
                },
                count: {
                    yoyo: 25,
                    forceYoyo: 15,
                    fallDown: 25,
                    fallUp: 25,
                    fallDownEndPositionY: 590,
                    matchIconEndPositionY: -460
                },
                ease: {
                    fallDown: "back.out(0.5)",
                    fallUp: "back.out(0.5)",
                    winSymbolMatch: "power0",
                    slider: "power0",
                    barFill: "power0",
                    forceReelStop: "sine.out",
                    reelStop: "sine.out",
                    spin: "power0"
                },
                winLine: {
                    winLinesPath: [
                        [
                            { row: 0, column: 0, thickness: 8 },
                            { row: 0, column: 1, thickness: 8 },
                            { row: 0, column: 2, thickness: 8 },
                            { row: 0, column: 3, thickness: 8 },
                            { row: 0, column: 4, thickness: 8 }
                        ],
                        [
                            { row: 1, column: 0, thickness: 8 },
                            { row: 1, column: 1, thickness: 9.75 },
                            { row: 1, column: 2, thickness: 9.75 },
                            { row: 0, column: 3, thickness: 9.75 },
                            { row: 0, column: 4, thickness: 9.75 }
                        ],
                        [
                            { row: 2, column: 0, thickness: 8 },
                            { row: 2, column: 1, thickness: 8 },
                            { row: 2, column: 2, thickness: 11 },
                            { row: 0, column: 3, thickness: 11 },
                            { row: 0, column: 4, thickness: 8 }
                        ]
                    ],
                    duration: .25,
                    type: Dev.Enum.WinlineType.LinearAnimation
                },
                slotSymbols: [
                    {
                        spineConfig: {
                            skeletonDataName: SpineAnimation.Wild,
                            animations: Config.AnimConfig.SymbolAnimation,
                            name: "Wild"
                        }
                    },
                    {
                        spineConfig: {
                            skeletonDataName: SpineAnimation.Grape,
                            animations: Config.AnimConfig.SymbolAnimation,
                            name: "Grape"
                        },
                        winSprite: {
                            frame: Dev.Enum.Texture.GrapeIcon,
                            name: "Grape",
                            tint: 0x06ff6a
                        }
                    },
                    {
                        spineConfig: {
                            skeletonDataName: SpineAnimation.Strawberry,
                            animations: Config.AnimConfig.SymbolAnimation,
                            name: "Strawberry"
                        },
                        winSprite: {
                            frame: Dev.Enum.Texture.StrawberryIcon,
                            name: "Strawberry",
                            tint: 0xff1e1e
                        }
                    },
                    {
                        spineConfig: {
                            skeletonDataName: SpineAnimation.Plum,
                            animations: Config.AnimConfig.SymbolAnimation,
                            name: "Plum"
                        },
                        winSprite: {
                            frame: Dev.Enum.Texture.PlumIcon,
                            name: "Plum",
                            tint: 0xb608ff
                        }
                    },
                    {
                        spineConfig: {
                            skeletonDataName: SpineAnimation.Lemon,
                            animations: Config.AnimConfig.SymbolAnimation,
                            name: "Lemon"
                        },
                        winSprite: {
                            frame: Dev.Enum.Texture.LemonIcon,
                            name: "Lemon",
                            tint: 0xffea00
                        }
                    },
                    {
                        spineConfig: {
                            skeletonDataName: SpineAnimation.Clover,
                            animations: Config.AnimConfig.SymbolAnimation,
                            name: "Clover"
                        }
                    },
                    {
                        spineConfig: {
                            skeletonDataName: SpineAnimation.Hearth,
                            animations: Config.AnimConfig.SymbolAnimation,
                            name: "Hearth"
                        }
                    },
                    {
                        spineConfig: {
                            skeletonDataName: SpineAnimation.Diamond,
                            animations: Config.AnimConfig.SymbolAnimation,
                            name: "Diamond"
                        }
                    },
                    {
                        spineConfig: {
                            skeletonDataName: SpineAnimation.Spade,
                            animations: Config.AnimConfig.SymbolAnimation,
                            name: "Spade"
                        }
                    }
                ]
            };
            return SlotConfig;
        }());
        Config.SlotConfig = SlotConfig;
    })(Config = Dev.Config || (Dev.Config = {}));
})(Dev || (Dev = {}));
var Dev;
(function (Dev) {
    var Controller;
    (function (Controller) {
        var AnimationType = Dev.Enum.GameAnimListener;
        var AnimationManager = Core.Managers.AnimationManager;
        var AnimationController = (function (_super) {
            __extends(AnimationController, _super);
            function AnimationController() {
                var _this = _super.call(this) || this;
                _this.AnimListener = Dev.Enum.GameAnimListener;
                return _this;
            }
            AnimationController.prototype.init = function () {
            };
            AnimationController.prototype.initEvents = function () {
                this.on(Dev.Enum.Listeners.OnAnimationAction, this.onAnimationAction.bind(this));
                AnimationManager.Instance.on(Dev.Enum.Listeners.OnGameAnimAction, this.onGameAnimationAction.bind(this));
            };
            AnimationController.prototype.onAnimationAction = function (action, data) {
                switch (action) {
                    case Dev.Enum.AnimListener.SortScenarioAnimation:
                        this.sortScenarioAnimation(data);
                        break;
                    case Dev.Enum.AnimListener.PlayNextAnimation:
                        AnimationManager.Instance.playNextAnimations();
                        break;
                }
            };
            AnimationController.prototype.onGameAnimationAction = function (action, data) {
                this.emit(Dev.Enum.Listeners.OnGameAnimAction, action, data);
            };
            AnimationController.prototype.sortScenarioAnimation = function (data) {
                var animations = new Array();
                for (var i = 0; i < Dev.Config.AnimConfig.AnimationSort.length; i++) {
                    switch (Dev.Config.AnimConfig.AnimationSort[i]) {
                        case AnimationType.MatchSymbolWin:
                            if (data.symbolWins != null)
                                animations.push(AnimationType.MatchSymbolWin);
                            break;
                        case AnimationType.LoopMatchSymbolWin:
                            if (data.symbolWins != null)
                                animations.push(AnimationType.LoopMatchSymbolWin);
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
            };
            AnimationController.prototype.deleteAnimations = function () {
                AnimationManager.Instance.deleteAnimations();
            };
            AnimationController.prototype.animations = function () {
                return Dev.Config.AnimConfig.AnimationSort;
            };
            return AnimationController;
        }(Core.Controller.AnimationController));
        Controller.AnimationController = AnimationController;
    })(Controller = Dev.Controller || (Dev.Controller = {}));
})(Dev || (Dev = {}));
var Dev;
(function (Dev) {
    var Controller;
    (function (Controller) {
        var DataController = (function (_super) {
            __extends(DataController, _super);
            function DataController() {
                var _this = _super.call(this) || this;
                _this._data = {
                    balance: { cents: 500, coins: 500 },
                    currencySymbol: "Euro",
                    earn: { coins: 0, cents: 0 },
                    totalEarn: { coins: 0, cents: 0 },
                    bet: { betLines: 10, betLevelValues: null, coinValues: null },
                    symbolWins: null,
                    symbolMatrix: [
                        [_this.randomSymbolIndex(), _this.randomSymbolIndex(), _this.randomSymbolIndex(), _this.randomSymbolIndex(), _this.randomSymbolIndex()],
                        [_this.randomSymbolIndex(), _this.randomSymbolIndex(), _this.randomSymbolIndex(), _this.randomSymbolIndex(), _this.randomSymbolIndex()],
                        [_this.randomSymbolIndex(), _this.randomSymbolIndex(), _this.randomSymbolIndex(), _this.randomSymbolIndex(), _this.randomSymbolIndex()]
                    ]
                };
                _this._developmentMode = false;
                return _this;
            }
            DataController.prototype.init = function () {
            };
            DataController.prototype.fakePayCalculate = function () {
                if (!this._developmentMode) {
                    this._data.symbolMatrix = [
                        [this.randomSymbolIndex(), this.randomSymbolIndex(), this.randomSymbolIndex(), this.randomSymbolIndex(), this.randomSymbolIndex()],
                        [this.randomSymbolIndex(), this.randomSymbolIndex(), this.randomSymbolIndex(), this.randomSymbolIndex(), this.randomSymbolIndex()],
                        [this.randomSymbolIndex(), this.randomSymbolIndex(), this.randomSymbolIndex(), this.randomSymbolIndex(), this.randomSymbolIndex()]
                    ];
                }
                var wins = new Array();
                var symbolCounts = new Array();
                for (var t = 0; t < Object.keys(Dev.Enum.SlotSymbol).length / 2; t++) {
                    var symbolCount = new Array();
                    symbolCounts.push(symbolCount);
                }
                for (var i = 0; i < this._data.symbolMatrix.length; i++) {
                    for (var t = 0; t < Object.keys(Dev.Enum.SlotSymbol).length / 2; t++)
                        symbolCounts[t].push(0);
                    for (var j = 0; j < this._data.symbolMatrix[i].length; j++) {
                        var symbolIndex = this._data.symbolMatrix[i][j];
                        symbolCounts[symbolIndex][i]++;
                    }
                }
                var payoutData = Dev.Config.DataConfig.PayoutData;
                for (var i = 0; i < payoutData.length; i++) {
                    if (this.checkCombination(payoutData, symbolCounts, i)) {
                        var winSymbolMatrix = this.setSymbolMatrix(payoutData[i]);
                        var win = {
                            winType: Dev.Enum.WinType.SymbolWin,
                            lineIndex: payoutData[i].lineIndex,
                            currency: payoutData[i].payout,
                            winSymbolMatrix: winSymbolMatrix
                        };
                        wins.push(win);
                    }
                }
                if (wins.length != 0)
                    this._data.symbolWins = wins;
                else
                    this._data.symbolWins = null;
            };
            DataController.prototype.setSymbolMatrix = function (payoutData) {
                var winline = Dev.Config.SlotConfig.SliderMachine.winLine;
                var path = winline.winLinesPath[payoutData.lineIndex];
                var combination = payoutData.combination;
                var winSymbolMatrix = new Array();
                for (var i = 0; i < path.length; i++) {
                    var row = 0;
                    var column = 0;
                    for (var j = 0; j < combination.length; j++) {
                        row = path[i].row;
                        column = path[i].column;
                        if (this._data.symbolMatrix[row][column] == combination[j].symbol) {
                            winSymbolMatrix.push({ row: row, column: column });
                        }
                    }
                    if (winSymbolMatrix.length == 0)
                        winSymbolMatrix.push({ row: row, column: column });
                }
                return winSymbolMatrix;
            };
            DataController.prototype.checkCombination = function (payoutData, symbolCounts, index) {
                var checks = new Array();
                for (var j = 0; j < payoutData[index].combination.length; j++) {
                    checks.push(false);
                    var symbolCount = symbolCounts[payoutData[index].combination[j].symbol];
                    if (payoutData[index].combination[j].count == symbolCount[payoutData[index].lineIndex]) {
                        checks[j] = true;
                    }
                }
                for (var m = 0; m < checks.length; m++) {
                    if (!checks[m])
                        return false;
                }
                return true;
            };
            DataController.prototype.randomSymbolIndex = function () {
                var random = 0 + Math.floor(Math.random() * Math.floor(5));
                return random;
            };
            DataController.prototype.dataAction = function (data) {
                if (data.currentAction != undefined) {
                    this._data = data;
                    this.fakeFreeSpinData();
                    this.emit(Dev.Enum.DataListener.message, this._data);
                }
            };
            DataController.prototype.fakeFreeSpinData = function () {
                this._data.currentAction = Dev.Enum.DataListener.spin;
                this._data.nextAction = Dev.Enum.DataListener.freeSpin;
                this._data.earn = { cents: 100, coins: 100 };
                this._data.freeSpin.remainingSpinCount = 5;
                this._data.freeSpin.earn = { cents: 100, coins: 100 };
                this._data.reelSetType = Dev.Enum.MachineType.Slider;
                this._data.reelMatrix = { row: 3, column: 5 };
                return this._data;
            };
            DataController.prototype.initEvents = function () {
                var _this = this;
                window.addEventListener(Dev.Enum.DataListener.message, function (data) { _this.dataAction(data.data); });
            };
            Object.defineProperty(DataController.prototype, "data", {
                get: function () {
                    return this._data;
                },
                set: function (value) {
                    this._data = value;
                },
                enumerable: true,
                configurable: true
            });
            return DataController;
        }(Core.Controller.DataController));
        Controller.DataController = DataController;
    })(Controller = Dev.Controller || (Dev.Controller = {}));
})(Dev || (Dev = {}));
var Dev;
(function (Dev) {
    var Controller;
    (function (Controller) {
        var GameController = (function (_super) {
            __extends(GameController, _super);
            function GameController(data) {
                var _this = _super.call(this, data) || this;
                GameController.Instance = _this;
                return _this;
            }
            GameController.prototype.init = function () {
                this.resourceController = new Controller.ResourceController();
            };
            GameController.prototype.initResource = function () {
                var listener = Dev.Enum.ResourceListener;
                this.once(listener.AssetLoadCompleted, this.onAssetLoadedCompleted);
            };
            GameController.prototype.initEventData = function () {
                var _this = this;
                var dataListener = Object.keys(Dev.Enum.DataListener);
                var _loop_2 = function (i) {
                    var dataName = Dev.Enum.DataListener[dataListener[i]];
                    this_2.dataController.on(dataName, function (data) {
                        _this.emit(dataName, data);
                    });
                };
                var this_2 = this;
                for (var i = 0; i < dataListener.length; i++) {
                    _loop_2(i);
                }
            };
            GameController.prototype.initEventAnimation = function () {
                this.animationController.on(Dev.Enum.Listeners.OnGameAnimAction, this.onGameAnimationAction.bind(this));
                this.on(Dev.Enum.Listeners.OnAnimationAction, this.onAnimationAction.bind(this));
            };
            GameController.prototype.onAnimationAction = function (action, data) {
                var onAnimAction = Dev.Enum.Listeners.OnAnimationAction;
                switch (action) {
                    case Dev.Enum.AnimListener.SortScenarioAnimation:
                        this.animationController.emit(onAnimAction, action, data);
                        break;
                    case Dev.Enum.AnimListener.PlayNextAnimation:
                        this.animationController.emit(onAnimAction, action, data);
                        break;
                }
            };
            GameController.prototype.onGameAnimationAction = function (action, data) {
                this.emit(Dev.Enum.Listeners.OnGameAnimAction, action, data);
            };
            GameController.prototype.initEventsDisplay = function () {
                var display = Core.Managers.DisplayManager.instance;
                display.on(Dev.Enum.DisplayListener.OrientationChanged, this.onOrientationChanged.bind(this));
            };
            GameController.prototype.onOrientationChanged = function (value) {
                this.emit(Dev.Enum.DisplayListener.OrientationChanged, value);
            };
            GameController.prototype.onAssetLoadedCompleted = function () {
                this.animationController = new Controller.AnimationController();
                this.dataController = new Controller.DataController();
                this.initEventsDisplay();
                this.initEventData();
                this.initEventAnimation();
            };
            return GameController;
        }(Core.Controller.GameController));
        Controller.GameController = GameController;
    })(Controller = Dev.Controller || (Dev.Controller = {}));
})(Dev || (Dev = {}));
var Dev;
(function (Dev) {
    var Controller;
    (function (Controller) {
        var MachineController = (function (_super) {
            __extends(MachineController, _super);
            function MachineController(container) {
                var _this = _super.call(this) || this;
                _this._slotMachine = {};
                _this._currentSpinAction = Dev.Enum.SpinAction.StartSpin;
                _this._machineType = Dev.Config.SlotConfig.MachineType;
                _this._container = new Core.Modules.Container(0, 0, container, "SlotMachineContainer");
                _this._game = Controller.GameController.Instance;
                _this.initProperties();
                _this._slotMachine[_this._currentMachineType].updateSlotSymbolIndex(_this._game.dataController.data.symbolMatrix);
                return _this;
            }
            MachineController.prototype.initProperties = function () {
                this.initSlotMachine(this._machineType);
                this._controlBar = new Dev.Modules.ControlBar(this._container);
                this._winLines = new Dev.Modules.Winlines(this._container);
                this._controlBar.updateData(this._game.dataController.data, false);
                this.initEvents();
            };
            MachineController.prototype.initEvents = function () {
                this.initSlotBarEvents();
                this.initSlotMachineEvents();
                this.initWinLinesEvents();
            };
            MachineController.prototype.initSlotMachine = function (type) {
                switch (this._machineType) {
                    case Dev.Enum.MachineType.Slider:
                        this._currentMachineType = Dev.Modules.SliderMachine.toString();
                        this._slotMachine[this._currentMachineType] = new Dev.Modules.SliderMachine(this._container);
                        break;
                }
            };
            MachineController.prototype.initSlotBarEvents = function () {
                var mL = Dev.Enum.Listeners;
                this._controlBar.on(mL.OnSpinBarAction, this.checkSlotBarAction.bind(this));
            };
            MachineController.prototype.initSlotMachineEvents = function () {
                var mL = Dev.Enum.Listeners;
                this._slotMachine[this._currentMachineType].on(mL.OnSpinMachineAction, this.checkSlotAnimState.bind(this));
            };
            MachineController.prototype.initWinLinesEvents = function () {
                var mL = Dev.Enum.Listeners;
                this._winLines.on(mL.OnWinLinesAction, this.checkSlotAnimState.bind(this));
            };
            MachineController.prototype.changeSlotMachineType = function (type) {
                this._machineType = type;
                this._slotMachine[this._currentMachineType].destroy();
                this.initSlotMachine(type);
            };
            MachineController.prototype.onDataAction = function (action, data) {
                switch (action) {
                    case Dev.Enum.DataListener.message:
                        this._currentSpinAction = Dev.Enum.SpinAction.StopSpin;
                        this.checkSlotBarAction();
                        break;
                }
            };
            MachineController.prototype.onGameAnimationAction = function (action) {
                var machine = this._slotMachine[this._currentMachineType];
                var data = this._game.dataController.data;
                var matchOffset = this._slotMachine[this._currentMachineType].slotMachineConfig.duration.winOffset;
                var loopOffset = this._slotMachine[this._currentMachineType].slotMachineConfig.duration.loopOffset;
                switch (action) {
                    case Dev.Enum.GameAnimListener.MatchSymbolWin:
                        machine.playMatchAnimation(data.symbolWins, 0, matchOffset);
                        break;
                    case Dev.Enum.GameAnimListener.LoopMatchSymbolWin:
                        machine.playLoopMatchAnimation(data.symbolWins, 0, loopOffset);
                        break;
                }
            };
            MachineController.prototype.onAnimationAction = function (action) {
                var data = this._game.dataController.data;
                switch (action) {
                    case Dev.Enum.AnimListener.PlayNextAnimation:
                        this.emit(Dev.Enum.Listeners.OnAnimationAction, action, data);
                        break;
                    case Dev.Enum.AnimListener.SortScenarioAnimation:
                        this.emit(Dev.Enum.Listeners.OnAnimationAction, action, data);
                        break;
                }
            };
            MachineController.prototype.checkSlotBarAction = function () {
                var _this = this;
                var machine = this._slotMachine[this._currentMachineType];
                switch (this._currentSpinAction) {
                    case Dev.Enum.SpinAction.StartSpin:
                        machine.playSpinAnimation();
                        this._game.dataController.fakePayCalculate();
                        this._controlBar.setButtonState(Dev.Enum.SpinButtonState.Stop, false);
                        this._currentSpinAction = Dev.Enum.SpinAction.ForceSpin;
                        machine.reelStoppedIndex = 0;
                        var spinningDuration = machine.slotMachineConfig.duration.spinningDuration;
                        Core.Managers.TickerManager.instance.addTimeout("fakeData", spinningDuration, function () {
                            _this.onDataAction(Dev.Enum.DataListener.message, null);
                        }, false);
                        break;
                    case Dev.Enum.SpinAction.ForceSpin:
                        machine.updateSlotSymbolIndex(this._game.dataController.data.symbolMatrix);
                        machine.playForceStopAnimation();
                        this._controlBar.setButtonState(Dev.Enum.SpinButtonState.Stop, false);
                        break;
                    case Dev.Enum.SpinAction.SkipSpin:
                        machine.playSkippedAnimation();
                        this.onAnimationAction(Dev.Enum.AnimListener.PlayNextAnimation);
                        break;
                    case Dev.Enum.SpinAction.QuickSpin:
                        break;
                    case Dev.Enum.SpinAction.StopSpin:
                        machine.updateSlotSymbolIndex(this._game.dataController.data.symbolMatrix);
                        this._currentSpinAction = Dev.Enum.SpinAction.ForceSpin;
                        machine.playStopAnimation();
                        this._controlBar.setButtonState(Dev.Enum.SpinButtonState.Stop, true);
                        break;
                }
            };
            MachineController.prototype.checkSlotAnimState = function (animationAction, value) {
                var _this = this;
                var machine = this._slotMachine[this._currentMachineType];
                var data = this._game.dataController.data;
                switch (animationAction) {
                    case Dev.Enum.SlotAnimState.SpinStarted:
                        machine.playSkippedAnimation();
                        this._controlBar.setButtonState(Dev.Enum.SpinButtonState.Stop, true);
                        this._currentSpinAction = Dev.Enum.SpinAction.ForceSpin;
                        this._game.dataController.data.balance.cents--;
                        this._game.dataController.data.balance.coins--;
                        this._controlBar.updateData(this._game.dataController.data, false);
                        break;
                    case Dev.Enum.SlotAnimState.ReelSpinCompleted:
                        this.emit(Dev.Enum.Listeners.OnSpinMachineAction, Dev.Enum.SlotAnimState.ReelSpinCompleted);
                        break;
                    case Dev.Enum.SlotAnimState.SpinCompleted:
                        this._controlBar.setButtonState(Dev.Enum.SpinButtonState.Normal, true);
                        this._currentSpinAction = Dev.Enum.SpinAction.StartSpin;
                        break;
                    case Dev.Enum.SlotAnimState.SpinQuicked:
                        break;
                    case Dev.Enum.SlotAnimState.WinUpdated:
                        this._controlBar.updateWin(value, true);
                        break;
                    case Dev.Enum.SlotAnimState.SpinForceStopped:
                        this._controlBar.setButtonState(Dev.Enum.SpinButtonState.Normal, false);
                        this._currentSpinAction = Dev.Enum.SpinAction.StartSpin;
                        this.onAnimationAction(Dev.Enum.AnimListener.SortScenarioAnimation);
                        break;
                    case Dev.Enum.SlotAnimState.SpinStopped:
                        this._controlBar.setButtonState(Dev.Enum.SpinButtonState.Normal, true);
                        this._currentSpinAction = Dev.Enum.SpinAction.StartSpin;
                        this.onAnimationAction(Dev.Enum.AnimListener.SortScenarioAnimation);
                        break;
                    case Dev.Enum.SlotAnimState.MatchSymbolWinStarted:
                        this._currentSpinAction = Dev.Enum.SpinAction.SkipSpin;
                        this._controlBar.setButtonState(Dev.Enum.SpinButtonState.Skip, true);
                        break;
                    case Dev.Enum.SlotAnimState.MatchSymbolWinFinished:
                        this._currentSpinAction = Dev.Enum.SpinAction.StartSpin;
                        this._controlBar.setButtonState(Dev.Enum.SpinButtonState.Normal, true);
                        Core.Managers.TickerManager.instance.addTimeout("fakelerderya", 3.5, function () {
                            _this.onAnimationAction(Dev.Enum.AnimListener.PlayNextAnimation);
                        }, false);
                        break;
                    case Dev.Enum.SlotAnimState.WinLineStarted:
                        this._winLines.playWinlineAnimation(machine.slotMachineConfig, data.symbolWins, value.index, machine.matrixSymbols, value.loop);
                        break;
                    case Dev.Enum.SlotAnimState.WinLineFinished:
                        this._winLines.playWinLineFadeOutAnimation(machine.winLineInfo);
                        break;
                    case Dev.Enum.SlotAnimState.SpinSkipped:
                        this._currentSpinAction = Dev.Enum.SpinAction.StartSpin;
                        this._winLines.stopWinLineAnimation();
                        break;
                }
            };
            Object.defineProperty(MachineController.prototype, "slotMachine", {
                get: function () {
                    return this._slotMachine[this._currentMachineType];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(MachineController.prototype, "container", {
                get: function () {
                    return this._container;
                },
                enumerable: true,
                configurable: true
            });
            return MachineController;
        }(PIXI.utils.EventEmitter));
        Controller.MachineController = MachineController;
    })(Controller = Dev.Controller || (Dev.Controller = {}));
})(Dev || (Dev = {}));
var Dev;
(function (Dev) {
    var Stages;
    (function (Stages) {
        var GameController = Dev.Controller.GameController;
        var LoaderStage = (function (_super) {
            __extends(LoaderStage, _super);
            function LoaderStage() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._loadingBorders = [];
                _this._loadingFills = [];
                return _this;
            }
            LoaderStage.prototype.init = function () {
                this.game = GameController.Instance;
                this._container = new Core.Modules.Container(0, 0, this, "Container");
                this.playLogoAnimation();
            };
            LoaderStage.prototype.playLogoAnimation = function () {
                var dR = Dev.Config.GameConfig.DisplayConfig;
                var aC = Dev.Config.AssetConfig;
                var aI = Dev.Config.AnimConfig.Animation;
                this._bg = new Core.Modules.Graphic(dR.width / 2, dR.height / 2, dR.width * 2, dR.height * 2, aC.LoadingBg, this._container);
                this._logo = new Core.Modules.Sprite(dR.width / 2, 300, aC.Logo, this._container);
                for (var i = 0; i < 3; i++) {
                    this._loadingBorders.push(new Core.Modules.Graphic(dR.width / 2 - 50 + i * 50, dR.height / 2 + 220, 35, 35, aC.LoadingCircleBg, this._container));
                    this._loadingFills.push(new Core.Modules.Graphic(17.5, 17.5, 35, 35, aC.LoadingCircleFill, this._loadingBorders[i]));
                    this._loadingFills[i].alpha = 0;
                }
                TweenMax.fromTo(this._logo.scale, aI.duration.logoScale, { x: 0, y: 0 }, { x: 1, y: 1, ease: aI.ease.logoScale });
                TweenMax.fromTo(this._logo, aI.duration.logoAlpha, { alpha: 0 }, { alpha: 1, ease: aI.ease.logoAlpha });
                this._sequence = new TimelineMax({ repeat: -1, delay: .75 });
                var offset = aI.speed.boxFillsOffset;
                this._sequence.to(this._loadingFills[0], aI.duration.boxFillsAlpha, { alpha: 1, ease: aI.ease.boxFillsAlpha });
                this._sequence.to(this._loadingFills[0], aI.duration.boxFillsAlpha, { alpha: 0, ease: aI.ease.boxFillsAlpha });
                this._sequence.to(this._loadingFills[1], aI.duration.boxFillsAlpha, { alpha: 1, ease: aI.ease.boxFillsAlpha }, "-=" + offset);
                this._sequence.to(this._loadingFills[1], aI.duration.boxFillsAlpha, { alpha: 0, ease: aI.ease.boxFillsAlpha });
                this._sequence.to(this._loadingFills[2], aI.duration.boxFillsAlpha, { alpha: 1, ease: aI.ease.boxFillsAlpha }, "-=" + offset);
                this._sequence.to(this._loadingFills[2], aI.duration.boxFillsAlpha, { alpha: 0, ease: aI.ease.boxFillsAlpha });
            };
            LoaderStage.prototype.initEvents = function () {
            };
            LoaderStage.prototype.setVisualPortrait = function () {
            };
            LoaderStage.prototype.setVisualLandscape = function () {
            };
            LoaderStage.prototype.dispose = function () {
                this._sequence.kill();
            };
            return LoaderStage;
        }(Core.Modules.Stage));
        Stages.LoaderStage = LoaderStage;
    })(Stages = Dev.Stages || (Dev.Stages = {}));
})(Dev || (Dev = {}));
var Dev;
(function (Dev) {
    var Controller;
    (function (Controller) {
        var ResourceManager = Core.Managers.ResourceManager;
        var StageManager = Core.Managers.StageManager;
        var LoaderStage = Dev.Stages.LoaderStage;
        var ResourceController = (function (_super) {
            __extends(ResourceController, _super);
            function ResourceController() {
                return _super.call(this) || this;
            }
            ResourceController.prototype.init = function () {
            };
            ResourceController.prototype.initEvents = function () {
                var listener = Dev.Enum.ResourceListener;
                var resource = ResourceManager.Instance;
                resource.once(listener.AssetLoading, this.assetLoading.bind(this));
                resource.on(listener.AssetLoadCompleted, this.assetsLoadCompleted.bind(this));
                resource.once(listener.AssetPreLoadCompleted, resource.assetLoading.bind(resource));
                resource.assetPreLoading();
            };
            ResourceController.prototype.assetLoading = function () {
                StageManager.Instance.addStage(LoaderStage, true);
            };
            ResourceController.prototype.assetsLoadCompleted = function () {
                var listener = Dev.Enum.ResourceListener;
                var stage = StageManager.Instance;
                Core.Managers.TickerManager.instance.addTimeout("loaded", 1, function () {
                    stage.changeStage(Dev.Stages.MainStage, true);
                    Controller.GameController.Instance.emit(listener.AssetLoadCompleted);
                }, false);
            };
            return ResourceController;
        }(Core.Controller.ResourceController));
        Controller.ResourceController = ResourceController;
    })(Controller = Dev.Controller || (Dev.Controller = {}));
})(Dev || (Dev = {}));
var Dev;
(function (Dev) {
    var Interface;
    (function (Interface) {
        var MessageType;
        (function (MessageType) {
            MessageType["SpinState"] = "SpinState";
            MessageType["InitValues"] = "InitValues";
            MessageType["UpdateValues"] = "UpdateValues";
        })(MessageType = Interface.MessageType || (Interface.MessageType = {}));
        var SpinButtonState;
        (function (SpinButtonState) {
            SpinButtonState["Normal"] = "Normal";
            SpinButtonState["Quick"] = "Quick";
            SpinButtonState["Stop"] = "Stop";
            SpinButtonState["Auto"] = "Auto";
            SpinButtonState["Skip"] = "Skip";
        })(SpinButtonState = Interface.SpinButtonState || (Interface.SpinButtonState = {}));
    })(Interface = Dev.Interface || (Dev.Interface = {}));
})(Dev || (Dev = {}));
var Dev;
(function (Dev) {
    var Modules;
    (function (Modules) {
        var BubblePaths = [
            { repeatDelay: 8, duration: 20, path: [{ x: 1207, y: 816 }, { x: 1000, y: 534 }, { x: 1180, y: 124 }, { x: 1049, y: -100 }] },
            { repeatDelay: 10, duration: 15, path: [{ x: 800, y: 816 }, { x: 620, y: 534 }, { x: 890, y: 124 }, { x: 620, y: -100 }] },
            { repeatDelay: 12, duration: 12, path: [{ x: 350, y: 816 }, { x: 480, y: 534 }, { x: 320, y: 124 }, { x: 438, y: -100 }] },
            { repeatDelay: 5, duration: 3, path: [{ x: 1107, y: 816 }, { x: 1250, y: 534 }, { x: 1100, y: 124 }, { x: 1189, y: -300 }] }
        ];
        var Background = (function (_super) {
            __extends(Background, _super);
            function Background(container) {
                var _this = _super.call(this) || this;
                _this._floats = [];
                _this._bubbles = [];
                var r = Dev.Config.GameConfig.DisplayConfig;
                var aC = { yP: new PIXI.Point(0, 250), yFactor: -1 };
                _this._planeBackground2d = new Core.Modules.Plane2d(0, -r.height / 2, container, aC, "PlaneBackground");
                _this._container = new Core.Modules.Container(0, 0, container, "BackgroundContainer");
                _this.initProperties();
                return _this;
            }
            Background.prototype.initProperties = function () {
                var r = Dev.Config.GameConfig.DisplayConfig;
                var aI = Dev.Config.AssetConfig;
                var a = Core.Enum.Anchor;
                this._floatContainer = new Core.Modules.Container(0, 0, this._container, "FloatContainer");
                this._bgContainer2d = new Core.Modules.Container2d(-r.width / 2, -r.height / 2, this._planeBackground2d, "BgContainer2d");
                this._bgNext = new Core.Modules.Sprite(r.width / 2, r.height / 2 + 200, aI.FreeSpinSpinBg, this._container);
                this._bgNextClone = new Core.Modules.Sprite(r.width / 2, r.height / 2 + 200, aI.FreeSpinSpinDarkBg, this._container);
                this._bgCurrent = new Core.Modules.Sprite(r.width / 2, r.height / 2 + 200, aI.NormalSpinBg, this._container);
                this._bgCurrentDark = new Core.Modules.Sprite(r.width / 2, r.height / 2 + 200, aI.NormalSpinDarkBg, this._container);
                var float = new Core.Modules.Sprite(966, 314.5, aI.Floats[0], this._floatContainer, null, null);
                this._floats.push(float);
                float = new Core.Modules.Sprite(302, 554, aI.Floats[1], this._floatContainer, null, null);
                this._floats.push(float);
                float = new Core.Modules.Sprite(902, 150, aI.Floats[2], this._floatContainer, null, null);
                this._floats.push(float);
                float = new Core.Modules.Sprite(722, 530, aI.Floats[3], this._floatContainer, null, null);
                this._floats.push(float);
                float = new Core.Modules.Sprite(1100, 630, aI.Floats[4], this._floatContainer, null, null);
                this._floats.push(float);
                float = new Core.Modules.Sprite(252, 358, aI.Floats[5], this._floatContainer, null, null);
                this._floats.push(float);
                var bubble = new Core.Modules.Sprite(1136, 816, aI.Bubbles[0], this._container, null, null);
                this._bubbles.push(bubble);
                bubble = new Core.Modules.Sprite(844, 816, aI.Bubbles[1], this._container, null, null);
                this._bubbles.push(bubble);
                bubble = new Core.Modules.Sprite(994, 816, aI.Bubbles[2], this._container, null, null);
                this._bubbles.push(bubble);
                bubble = new Core.Modules.Sprite(1136, 816, aI.Bubbles[3], this._container, null, null);
                this._bubbles.push(bubble);
                this._currentSpinMode = Dev.Enum.SpinMode.NormalSpin;
                this.playBackgroundPositionAnimation(r.width / 2, r.height / 2);
                this.playIdleBubbles();
                this.playIdleBackground();
            };
            Background.prototype.changeBackgroundType = function (type) {
                this.changeBackgroundSpriteType(this._currentSpinMode, this._bgNext, this._bgNextClone, this._bgCurrentDark.alpha, 0);
                this.changeBackgroundSpriteType(type, this._bgCurrent, this._bgCurrentDark, 0, 1);
            };
            Background.prototype.playBackgroundBuzzAnimation = function () {
                var r = Dev.Config.GameConfig.DisplayConfig;
                var aC = Dev.Config.AnimConfig.Animation;
                var duration = aC.duration.bgBuzzFallDown;
                var ease = aC.ease.bgBuzzFallDown;
                var count = aC.count.bgBuzzFallDown;
                var y = r.height / 2 + count;
                if (this._idleBackground)
                    this._idleBackground.pause();
                TweenMax.to(this._bgCurrent, duration, { y: y, ease: ease, yoyo: true, repeat: 1 });
                TweenMax.to(this._bgCurrentDark, duration, { y: y, ease: ease, yoyo: true, repeat: 1 });
                TweenMax.to(this._bgNext, duration, { y: y, ease: ease, yoyo: true, repeat: 1 });
                TweenMax.to(this._bgNextClone, duration, { y: y, ease: ease, yoyo: true, repeat: 1 });
            };
            Background.prototype.playBackgroundPositionAnimation = function (toX, toY) {
                var _this = this;
                var aC = Dev.Config.AnimConfig.Animation;
                var duration = aC.duration.bgChangePosition;
                var ease = aC.ease.bgChangePosition;
                TweenMax.to(this._bgCurrent, duration, { x: toX, y: toY, ease: ease });
                TweenMax.to(this._bgCurrentDark, duration, { x: toX, y: toY, ease: ease });
                TweenMax.to(this._bgNext, duration, { x: toX, y: toY, ease: ease });
                TweenMax.to(this._bgNextClone, duration, { x: toX, y: toY, ease: ease, onComplete: function () {
                        _this._idleBackground.resume();
                    } });
            };
            Background.prototype.changeBackgroundSpriteType = function (type, cBg, cDBg, from, to) {
                var aC = Dev.Config.AnimConfig.Animation;
                switch (type) {
                    case Dev.Enum.SpinMode.FreeSpin:
                        cBg.changeSprite(Dev.Config.AssetConfig.FreeSpinSpinBg.frame);
                        cDBg.changeSprite(Dev.Config.AssetConfig.FreeSpinSpinDarkBg.frame);
                        this._floatContainer.visible = false;
                        break;
                    case Dev.Enum.SpinMode.NormalSpin:
                        cBg.changeSprite(Dev.Config.AssetConfig.NormalSpinBg.frame);
                        cDBg.changeSprite(Dev.Config.AssetConfig.NormalSpinDarkBg.frame);
                        this._floatContainer.visible = true;
                        break;
                }
                TweenMax.fromTo(cBg, aC.duration.bgSwitch, { alpha: from }, { alpha: to, ease: aC.ease.bgSwitch });
                TweenMax.fromTo(cDBg, aC.duration.bgSwitch, { alpha: from }, { alpha: to, ease: aC.ease.bgSwitch });
                this._currentSpinMode = type;
            };
            Background.prototype.playIdleBackground = function () {
                var aC = Dev.Config.AnimConfig.Animation;
                if (this._idleBackground) {
                    this._idleBackground.resume();
                }
                else {
                    this._idleBackground = new TimelineMax({ repeat: -1 });
                    var randomTime = aC.duration.bgIdleRandTimeMin + Math.floor(Math.random() * Math.floor(aC.duration.bgIdleRandTimeMax));
                    var randAlpha = aC.count.bgIdleRandMinAlpha + Math.floor(Math.random() * Math.floor(aC.count.bgIdleRandMaxAlpha));
                    this._idleBackground.to(this._bgCurrentDark, aC.duration.bgIdle, { alpha: 1, ease: aC.ease.bgIdle });
                    this._idleBackground.to(this._bgCurrentDark, aC.duration.bgIdle, { alpha: randAlpha, ease: aC.ease.bgIdle });
                    this._idleBackground.to(this._bgCurrentDark, aC.duration.bgIdle, { alpha: 1, ease: aC.ease.bgIdle });
                    this._idleBackground.to(this._bgCurrentDark, aC.duration.bgIdle, { alpha: 1, ease: aC.ease.bgIdle }, "+=" + randomTime);
                }
            };
            Background.prototype.playIdleBubbles = function () {
                var aC = Dev.Config.AnimConfig.Animation;
                for (var i = 0; i < this._bubbles.length; i++) {
                    gsap.to(this._bubbles[i], {
                        motionPath: {
                            path: BubblePaths[i].path,
                            align: "self"
                        },
                        repeat: -1,
                        duration: BubblePaths[i].duration,
                        delay: 1,
                        repeatDelay: BubblePaths[i].repeatDelay,
                        ease: aC.ease.bgIdleBubble
                    });
                }
            };
            Object.defineProperty(Background.prototype, "container", {
                get: function () {
                    return this._container;
                },
                enumerable: true,
                configurable: true
            });
            return Background;
        }(PIXI.utils.EventEmitter));
        Modules.Background = Background;
    })(Modules = Dev.Modules || (Dev.Modules = {}));
})(Dev || (Dev = {}));
var Dev;
(function (Dev) {
    var Modules;
    (function (Modules) {
        var ControlBar = (function (_super) {
            __extends(ControlBar, _super);
            function ControlBar(container) {
                var _this = _super.call(this) || this;
                _this._container = new Core.Modules.Container(0, 0, container, "SlotBarContainer");
                _this.initProperties();
                return _this;
            }
            ControlBar.prototype.initProperties = function () {
                var r = Dev.Config.GameConfig.DisplayConfig;
                var aI = Dev.Config.AssetConfig;
                this._refBg = new Core.Modules.Sprite(r.width / 2, r.height / 2, aI.UIRefBg, this._container, r.width, r.height);
                this._win = new Core.Modules.Text(r.width - 160, 668, aI.GenericText, this._container);
                this._winAmount = new Core.Modules.Text(r.width - 160, 700, aI.GenericBoldText, this._container);
                this._total = new Core.Modules.Text(160, 668, aI.GenericText, this._container);
                this._totalAmount = new Core.Modules.Text(160, 700, aI.GenericBoldText, this._container);
                this._balance = new Core.Modules.Text(120, 15, aI.GenericText, this._container);
                this._balanceAmount = new Core.Modules.Text(120, 35, aI.GenericBoldText, this._container);
                this._spinButton = new Core.Modules.Button(r.width / 2, 650, aI.SpinButton, this.onSpinAction.bind(this), this._container);
                this.setButtonState(Dev.Enum.SpinButtonState.Normal, true);
                this._win.text = "WIN";
                this._balance.text = "BALANCE";
                this._total.text = "TOTAL WIN";
                this._winAmount.text = "0";
                this._balanceAmount.text = "5000";
                this._totalAmount.text = "0";
            };
            ControlBar.prototype.updateData = function (data, animation) {
                this.updateCredit(data);
                this._winSum = { cents: 0, coins: 0 };
                this._data = data;
                this._winAmount.text = this.resolveFormat(this._winSum.cents, "suffix", false);
                this._totalAmount.text = this.resolveFormat(data.totalEarn.cents, "suffix", false);
                if (animation) {
                    TweenMax.fromTo(this._winAmount.scale, .35, { x: 1, y: 1 }, { x: 1.5, y: 1.5, yoyo: true, yoyoEase: "back.out(2)", repeat: 1 });
                    TweenMax.fromTo(this._totalAmount.scale, .35, { x: 1, y: 1 }, { x: 1.5, y: 1.5, yoyo: true, yoyoEase: "back.out(2)", repeat: 1 });
                }
            };
            ControlBar.prototype.updateWin = function (win, animation) {
                this._winSum.cents += win.cents;
                this._winSum.coins += win.coins;
                this._data.totalEarn.cents += win.cents;
                this._data.totalEarn.coins += win.coins;
                this._totalAmount.text = this.resolveFormat(this._data.totalEarn.cents, "suffix", false);
                this._winAmount.text = this.resolveFormat(this._winSum.cents, "suffix", false);
                if (animation) {
                    TweenMax.fromTo(this._winAmount.scale, .35, { x: 1, y: 1 }, { x: 1.5, y: 1.5, yoyo: true, yoyoEase: "back.out(2)", repeat: 1 });
                    TweenMax.fromTo(this._totalAmount.scale, .35, { x: 1, y: 1 }, { x: 1.5, y: 1.5, yoyo: true, yoyoEase: "back.out(2)", repeat: 1 });
                }
            };
            ControlBar.prototype.updateCredit = function (data) {
                this._balanceAmount.text = this.resolveFormat(data.balance.coins, "suffix", true);
            };
            ControlBar.prototype.resolveFormat = function (amount, currencyPosition, coin) {
                if (coin) {
                    return amount + " COIN";
                }
                var dec = 2;
                var int = 3;
                var d = ".";
                var t = ",";
                var r = ("\\d(?=(\\d{" + (int || 3) + "})+" + (dec > 0 ? "\\D" : "$") + ")");
                var n = amount.toFixed(Math.max(0, ~~dec));
                var b = (d ? n.replace(".", d) : n).replace(new RegExp(r, "g"), "$&" + (t || ","));
                var p = currencyPosition;
                switch (p) {
                    case "suffix":
                        b = (b + " " + this._data.currencySymbol);
                        break;
                    case "prefix":
                        b = (this._data.currencySymbol + " " + b);
                        break;
                }
                return b;
            };
            ControlBar.prototype.onSpinAction = function () {
                var listener = Dev.Enum.Listeners;
                this.emit(listener.OnSpinBarAction);
            };
            ControlBar.prototype.setButtonState = function (buttonState, enabled) {
                this._spinButton.isEnabled = enabled;
                switch (buttonState) {
                    case Dev.Enum.SpinButtonState.Normal:
                        this._spinButton.changeButtonConfig(Dev.Config.AssetConfig.SpinButton);
                        break;
                    case Dev.Enum.SpinButtonState.Auto:
                        break;
                    case Dev.Enum.SpinButtonState.Quick:
                        break;
                    case Dev.Enum.SpinButtonState.Skip:
                        break;
                    case Dev.Enum.SpinButtonState.Stop:
                        this._spinButton.changeButtonConfig(Dev.Config.AssetConfig.StopButton);
                        break;
                }
            };
            return ControlBar;
        }(PIXI.utils.EventEmitter));
        Modules.ControlBar = ControlBar;
    })(Modules = Dev.Modules || (Dev.Modules = {}));
})(Dev || (Dev = {}));
var Dev;
(function (Dev) {
    var Modules;
    (function (Modules) {
        var SpinDirection;
        (function (SpinDirection) {
            SpinDirection[SpinDirection["up"] = 0] = "up";
            SpinDirection[SpinDirection["down"] = 1] = "down";
            SpinDirection[SpinDirection["left"] = 2] = "left";
            SpinDirection[SpinDirection["right"] = 3] = "right";
            SpinDirection[SpinDirection["none"] = 4] = "none";
        })(SpinDirection = Modules.SpinDirection || (Modules.SpinDirection = {}));
        var Machine = (function (_super) {
            __extends(Machine, _super);
            function Machine(slotMachineConfig, container) {
                var _this = _super.call(this) || this;
                _this.matrixSymbols = [];
                _this.reelStoppedIndex = 0;
                _this.slotMachineConfig = slotMachineConfig;
                _this.container = new Core.Modules.Container(0, -70, container, "MachineContainer");
                _this.baseReelContainer = new Core.Modules.Container(0, 0, _this.container, "ReelContainer");
                _this.initProperties();
                return _this;
            }
            Machine.prototype.initProperties = function () {
                this.createReelContainers();
                this.init();
            };
            Machine.prototype.createReelContainers = function () {
                this.reelContainers = new Array();
                var column = this.slotMachineConfig.machine.reelMatrix.column;
                var dR = Dev.Config.GameConfig.DisplayConfig;
                var row = this.slotMachineConfig.machine.reelMatrix.row;
                for (var i = 0; i < column; i++) {
                    var sS = this.slotMachineConfig.symbol.scale;
                    var sO = this.slotMachineConfig.symbol.offset;
                    var pX = dR.width / 2 - (Math.floor(column / 2) - i) * (sO.x + sS.x);
                    var pY = dR.height / 2 - (Math.floor(row / 2) * (sS.y + sO.y));
                    if (column % 2 == 0) {
                        pX += sS.x / 2;
                    }
                    if (row % 2 == 0) {
                        pY += sS.y / 2;
                    }
                    this.reelContainerPositionY = pY;
                    var container = new Core.Modules.Container(pX, pY, this.baseReelContainer, "ReelContainer");
                    this.reelContainers.push(container);
                    this.createSlotSymbol(container, i);
                }
                this.matrixSymbols = this.transpose(this.matrixSymbols);
            };
            Machine.prototype.updateSlotSymbolIndex = function (symbolMatrix) {
                for (var i = 0; i < this.matrixSymbols.length; i++) {
                    for (var j = 0; j < this.matrixSymbols[i].length; j++) {
                        this.matrixSymbols[i][j].index = symbolMatrix[i][j];
                    }
                }
            };
            Machine.prototype.transpose = function (matrix) {
                var rows = matrix.length, cols = matrix[0].length;
                var grid = [];
                for (var j = 0; j < cols; j++) {
                    grid[j] = Array(rows);
                }
                for (var i = 0; i < rows; i++) {
                    for (var j = 0; j < cols; j++) {
                        grid[j][i] = matrix[i][j];
                    }
                }
                return grid;
            };
            Machine.prototype.createSlotSymbol = function (container, reelIndex) {
                var symbols = new Array();
                for (var i = -1; i < this.slotMachineConfig.machine.reelMatrix.row; i++) {
                    var random = 0 + Math.floor(Math.random() * Math.floor(this.slotMachineConfig.slotSymbols.length));
                    var symbol = new Modules.Symbol(this.slotMachineConfig, random, this.reelContainers[reelIndex], { r: i, c: reelIndex });
                    if (i >= 0)
                        symbols.push(symbol);
                }
                this.matrixSymbols.push(symbols);
            };
            Machine.prototype.playIdleAnimation = function () {
                var rows = this.matrixSymbols.length, cols = this.matrixSymbols[0].length;
                for (var i = 0; i < rows; i++) {
                    for (var j = 0; j < cols; j++) {
                        this.matrixSymbols[i][j].spine.playAnimation(Dev.Enum.AnimNames.SymbolIdle);
                    }
                }
            };
            Machine.prototype.playFallDownContainer = function (reelSpinMask) {
                var _this = this;
                var sC = this.slotMachineConfig;
                var x = sC.reelMask.fallDownScale.x;
                var y = sC.reelMask.fallDownScale.y;
                reelSpinMask.width = x;
                reelSpinMask.height = y;
                var t1 = this.reelContainers[0].position.y;
                var t2 = this.reelContainers[0].position.y + sC.count.fallDown;
                var _loop_3 = function (i) {
                    var timeline = new TimelineMax({ delay: i * sC.duration.fallDownReelOffset });
                    this_3.reelContainers[i].position.y -= sC.count.fallDownEndPositionY;
                    timeline.to(this_3.reelContainers[i], sC.duration.fallDown, { ease: sC.ease.fallDown, y: t2 });
                    timeline.to(this_3.reelContainers[i], sC.duration.fallUp, {
                        ease: sC.ease.fallUp, y: t1, onComplete: function () {
                            if (i == _this.reelContainers.length - 1) {
                                x = Dev.Config.SlotConfig.SliderMachine.reelMask.normalScale.x;
                                y = Dev.Config.SlotConfig.SliderMachine.reelMask.normalScale.y;
                                reelSpinMask.width = x;
                                reelSpinMask.height = y;
                                _this.playIdleAnimation();
                            }
                        }
                    });
                };
                var this_3 = this;
                for (var i = 0; i < this.reelContainers.length; i++) {
                    _loop_3(i);
                }
            };
            Machine.prototype.destroy = function () {
                this.dispose();
                this.container.destroy({ children: true, baseTexture: true });
            };
            return Machine;
        }(PIXI.utils.EventEmitter));
        Modules.Machine = Machine;
    })(Modules = Dev.Modules || (Dev.Modules = {}));
})(Dev || (Dev = {}));
var Dev;
(function (Dev) {
    var Modules;
    (function (Modules) {
        var Menu = (function (_super) {
            __extends(Menu, _super);
            function Menu(container) {
                var _this = _super.call(this) || this;
                _this._container = new Core.Modules.Container(0, 0, container, "BackgroundContainer");
                _this.initProperties();
                return _this;
            }
            Menu.prototype.initProperties = function () {
                var r = Dev.Config.GameConfig.DisplayConfig;
                var aI = Dev.Config.AssetConfig;
            };
            return Menu;
        }(PIXI.utils.EventEmitter));
        Modules.Menu = Menu;
    })(Modules = Dev.Modules || (Dev.Modules = {}));
})(Dev || (Dev = {}));
var Dev;
(function (Dev) {
    var Modules;
    (function (Modules) {
        var SliderBar = (function (_super) {
            __extends(SliderBar, _super);
            function SliderBar(x, y, mI, p) {
                var _this = _super.call(this) || this;
                _this._amountPercent = 0;
                _this._container = new Core.Modules.Container(x, y, p, "SliderBarContainer");
                _this._machineInfo = mI;
                _this.initProperties();
                return _this;
            }
            SliderBar.prototype.initProperties = function () {
                var aI = Dev.Config.AssetConfig;
                var a = Core.Enum.Anchor;
                this._spineBarContainer = new Core.Modules.Container(0, -16, this._container, "spineBarContainer");
                this._spineBarContainer.scale.set(1, .9);
                this._back = new Core.Modules.Sprite(-5, -119, Dev.Config.AssetConfig.FruitBarBg, this._spineBarContainer);
                this._barSpine = new Core.Modules.Spine(-30, 5, Dev.Config.AssetConfig.FruitBar, this._spineBarContainer, a.MiddleCenter);
                this._barSpineFilter = new Core.Modules.Spine(-30, 5, Dev.Config.AssetConfig.FruitBar, this._spineBarContainer, a.MiddleCenter);
                this._barSpine.playAnimation(Dev.Enum.AnimNames.FruitBarLoop);
                this._barSpineMask = new Core.Modules.Graphic(0, 4, 53, 803, Dev.Config.AssetConfig.FruitBarMask, this._spineBarContainer);
                this._head = new Core.Modules.Sprite(-7, 170, Dev.Config.AssetConfig.FruitBarHead, this._spineBarContainer, a.UpCenter);
                this._barSpine.scale.set(.8, .7);
                this._front = new Core.Modules.Sprite(-5, -118, Dev.Config.AssetConfig.FruitBarFront, this._spineBarContainer);
                this._frontFilter = new Core.Modules.Sprite(-5, -118, Dev.Config.AssetConfig.FruitBarFront, this._spineBarContainer);
                this._front.scale.set(1.25, 1.05);
                this._frontFilter.scale = this._front.scale;
                this._frontFilter.name = "frontFilter";
                this._barSpineMask.scale.set(.8, .693);
                this._back.scale.set(.7, .69);
                this._barSpine.mask = this._barSpineMask;
                this._barSpineFilter.mask = this._barSpineMask;
                this._barSpine.position.y += this._barSpineMask.height;
                this._barSpineFilter.scale = this._barSpine.scale;
                this._barSpineFilter.position.y += this._barSpineMask.height;
                this._barSpineFilter.name = "barSpineFilter";
                this._head.mask = this._barSpineMask;
                this._head.scale.set(1.25, 1.5);
                this._frontFilter.alpha = 0;
                this._barMeter = new Core.Modules.Text(-7, -397, aI.SliderBarHeaderText, this._container);
            };
            SliderBar.prototype.onAnimationAction = function (sA, matchIcon) {
                switch (sA) {
                    case Dev.Enum.SlotAnimState.MatchIconFinished:
                        this.playBarFillAnimation(matchIcon);
                        break;
                }
            };
            SliderBar.prototype.playBarFillAnimation = function (matchIcon) {
                var _this = this;
                var up = 15;
                var end = 100;
                var matchIconWin = 5;
                var h = this._barSpine.height + 105;
                up = h * matchIconWin / end;
                var duration = this._machineInfo.duration.barFill;
                var ease = this._machineInfo.ease.barFill;
                this._head.alpha = 1;
                if (this._amountPercent + matchIconWin < end) {
                    if (this._amountPercent + matchIconWin >= end) {
                        up = this._amountPercent + matchIconWin - end;
                        this._amountPercent = end;
                    }
                    else {
                        this._amountPercent += matchIconWin;
                    }
                    var aI = Dev.Config.AssetConfig;
                    var container_1 = new Core.Modules.Container(-20, 0, this._head);
                    var emitter = new PIXI.particles.Emitter(container_1, aI.Bubbles[3].frame, aI.SliderBarBubble);
                    emitter.autoUpdate = true;
                    emitter.playOnceAndDestroy(function () {
                        container_1.destroy();
                    });
                    TweenMax.to(this._barSpine, duration, { y: this._barSpine.position.y - up });
                    TweenMax.to(this._barSpineFilter, duration, { y: this._barSpineFilter.position.y - up });
                    TweenMax.to(this._head, duration, { y: this._head.position.y - up });
                    TweenMax.to(this._barSpineFilter, duration / 2, { alpha: .75, ease: ease,
                        onStart: function () {
                            var colorMatrix = new PIXI.filters.GlowFilter(1, 1, 1, matchIcon.symbolInfo.winSprite.tint);
                            _this._barSpineFilter.filters = [colorMatrix];
                            colorMatrix.blendMode = PIXI.BLEND_MODES.ADD;
                            _this._barMeter.text = "%" + Math.floor(_this._amountPercent);
                        },
                        onComplete: function () {
                            TweenMax.to(_this._barSpineFilter, duration / 2, { alpha: 0, ease: ease, onComplete: function () {
                                    _this._barSpineFilter.filters = null;
                                    _this._barSpineFilter.tint = 0xffffff;
                                } });
                        }
                    });
                    TweenMax.to(this._frontFilter, duration / 2, { alpha: 1, ease: ease,
                        onStart: function () {
                            var colorMatrix = new PIXI.filters.GlowFilter(1, 1, 1, matchIcon.symbolInfo.winSprite.tint);
                            _this._frontFilter.filters = [colorMatrix];
                            colorMatrix.blendMode = PIXI.BLEND_MODES.ADD;
                        },
                        onComplete: function () {
                            TweenMax.to(_this._frontFilter, duration / 2, { alpha: 0, ease: ease, onComplete: function () {
                                    _this._frontFilter.filters = null;
                                    _this._frontFilter.tint = 0xffffff;
                                } });
                        }
                    });
                }
                else {
                    this._head.alpha = 0;
                    this._amountPercent = 100;
                    TweenMax.to(this._barSpineFilter, duration / 2, { alpha: .75,
                        ease: ease,
                        onStart: function () {
                            _this._barSpineFilter.tint = 0xffffff;
                            var colorMatrix = new PIXI.filters.GlowFilter(1, 1, 1, 0xffffff);
                            _this._barSpineFilter.filters = [colorMatrix];
                            colorMatrix.blendMode = PIXI.BLEND_MODES.ADD;
                            _this._barMeter.text = "%" + Math.floor(_this._amountPercent);
                        },
                        onComplete: function () {
                            TweenMax.to(_this._barSpineFilter, duration / 2, { alpha: 0, ease: ease, onComplete: function () {
                                    _this._barSpineFilter.filters = null;
                                    _this._barSpineFilter.tint = 0xffffff;
                                } });
                        }
                    });
                }
            };
            return SliderBar;
        }(PIXI.utils.EventEmitter));
        Modules.SliderBar = SliderBar;
    })(Modules = Dev.Modules || (Dev.Modules = {}));
})(Dev || (Dev = {}));
var Dev;
(function (Dev) {
    var Modules;
    (function (Modules) {
        var SliderMachine = (function (_super) {
            __extends(SliderMachine, _super);
            function SliderMachine(container) {
                return _super.call(this, Dev.Config.SlotConfig.SliderMachine, container) || this;
            }
            SliderMachine.prototype.init = function () {
                var r = Dev.Config.GameConfig.DisplayConfig;
                var aI = Dev.Config.AssetConfig;
                this.winLineInfo = Dev.Config.SlotConfig.SliderMachine.winLine;
                this.winInfo = Dev.Config.SlotConfig.SliderMachine.win;
                var frameScale = Dev.Config.SlotConfig.SliderMachine.reelMask.frameScale;
                this._frame = new Core.Modules.Graphic(frameScale.pX, frameScale.pY, frameScale.x, frameScale.y, aI.Frame, this.container);
                this.container.addChild(this.reelContainers[0].parent);
                this._sliderPlatform = new Modules.SliderPlatform(r.width / 2, 637, 900, Dev.Config.SlotConfig.SliderMachine, this.container);
                this._sliderBar = new Modules.SliderBar(130, 543, Dev.Config.SlotConfig.SliderMachine, this.container);
                this.initMask();
                this.playFallDownContainer(this._reelSpinMask);
                this.initEvents();
            };
            SliderMachine.prototype.initEvents = function () {
                var l = Dev.Enum.Listeners;
                this._sliderPlatform.on(l.OnSpinMachineAction, this._sliderBar.onAnimationAction.bind(this._sliderBar));
            };
            SliderMachine.prototype.initMask = function () {
                var aI = Dev.Config.AssetConfig;
                var maskScale = Dev.Config.SlotConfig.SliderMachine.reelMask.normalScale;
                this._reelSpinMask = new Core.Modules.Graphic(maskScale.pX, maskScale.pY, maskScale.x, maskScale.y, aI.GeneralReelMask, this.reelContainers[0].parent);
                this.reelContainers[0].parent.mask = this._reelSpinMask;
            };
            SliderMachine.prototype.playMatchAnimation = function (wins, index, offsetDuration) {
                var _this = this;
                var r = Dev.Config.GameConfig.DisplayConfig;
                var aI = Dev.Config.AssetConfig;
                var container = new Core.Modules.Container(r.width / 2 + 50, r.height / 2 - 200, this.container);
                var platformY = this.slotMachineConfig.count.matchIconEndPositionY;
                if (index == 0) {
                    this.emit(Dev.Enum.Listeners.OnSpinMachineAction, Dev.Enum.SlotAnimState.MatchSymbolWinStarted);
                    var emitter = new PIXI.particles.Emitter(container, aI.Bubbles[0].frame, aI.BubbleVertical);
                    emitter.autoUpdate = true;
                    var max = 10 * wins.length;
                    if (max > 100)
                        max = 100;
                    emitter.maxParticles = max;
                    emitter.playOnceAndDestroy(function () {
                        container.destroy();
                    });
                }
                this.emit(Dev.Enum.Listeners.OnSpinMachineAction, Dev.Enum.SlotAnimState.WinLineStarted, { index: index, loop: false });
                var _loop_4 = function (i) {
                    var row = wins[index].winSymbolMatrix[i].row;
                    var column = wins[index].winSymbolMatrix[i].column;
                    var winSymbol = this_4.matrixSymbols[row][column];
                    winSymbol.playMatchAnimation();
                    var px = winSymbol.parent.position.x;
                    var offset = Dev.Config.SlotConfig.SliderMachine.symbol.offset;
                    var scale = Dev.Config.SlotConfig.SliderMachine.symbol.scale;
                    var py = (scale.y + offset.y) * (row) + platformY;
                    this_4._sliderPlatform.playMatchIconAnimation(winSymbol.index, { x: px, y: py }, { r: row, c: column });
                    winSymbol.spine.state.onComplete = function () {
                        winSymbol.spine.playAnimation(Dev.Enum.AnimNames.SymbolIdle);
                        winSymbol.spine.state.onComplete = null;
                        if (i == wins[index].winSymbolMatrix.length - 1) {
                            Core.Managers.TickerManager.instance.addTimeout("Match", offsetDuration, function () {
                                if (index < wins.length - 1) {
                                    index++;
                                    _this.playMatchAnimation(wins, index, offsetDuration);
                                }
                                else {
                                    _this.emit(Dev.Enum.Listeners.OnSpinMachineAction, Dev.Enum.SlotAnimState.MatchSymbolWinFinished);
                                }
                            }, false);
                            _this.emit(Dev.Enum.Listeners.OnSpinMachineAction, Dev.Enum.SlotAnimState.WinLineFinished);
                        }
                    };
                };
                var this_4 = this;
                for (var i = 0; i < wins[index].winSymbolMatrix.length; i++) {
                    _loop_4(i);
                }
            };
            SliderMachine.prototype.playLoopMatchAnimation = function (wins, index, offsetDuration) {
                var _this = this;
                this.emit(Dev.Enum.Listeners.OnSpinMachineAction, Dev.Enum.SlotAnimState.WinLineStarted, { index: index, loop: true });
                var _loop_5 = function (i) {
                    var row = wins[index].winSymbolMatrix[i].row;
                    var column = wins[index].winSymbolMatrix[i].column;
                    var winSymbol = this_5.matrixSymbols[row][column];
                    winSymbol.playMatchAnimation();
                    winSymbol.spine.state.onComplete = function () {
                        winSymbol.spine.playAnimation(Dev.Enum.AnimNames.SymbolIdle);
                        winSymbol.spine.state.onComplete = null;
                        if (i == wins[index].winSymbolMatrix.length - 1) {
                            Core.Managers.TickerManager.instance.addTimeout("Loop", offsetDuration, function () {
                                if (index < wins.length - 1) {
                                    index++;
                                    _this.playLoopMatchAnimation(wins, index, offsetDuration);
                                }
                                else {
                                    _this.playLoopMatchAnimation(wins, 0, offsetDuration);
                                }
                            }, false);
                            _this.emit(Dev.Enum.Listeners.OnSpinMachineAction, Dev.Enum.SlotAnimState.WinLineFinished);
                        }
                    };
                };
                var this_5 = this;
                for (var i = 0; i < wins[index].winSymbolMatrix.length; i++) {
                    _loop_5(i);
                }
            };
            SliderMachine.prototype.playForceStopAnimation = function () {
                var _this = this;
                var sI = Dev.Config.SlotConfig;
                var sM = sI.SliderMachine;
                this.removeListener(Dev.Enum.SlotAnimState.ReelSpinCompleted);
                this.stopTimeline();
                this.on(Dev.Enum.SlotAnimState.ReelSpinCompleted, function (reelIndex) {
                    if (reelIndex == _this.reelStoppedIndex) {
                        _this._playTimeline[reelIndex].restart();
                        _this._playTimeline[reelIndex].kill();
                        TweenMax.to(_this.reelContainers[reelIndex].children, sM.duration.forceReelStop, {
                            onStart: function () {
                                _this.reelContainers[reelIndex].filters = null;
                                if (reelIndex == _this.reelContainers.length - 1) {
                                    _this.emit(Dev.Enum.Listeners.OnSpinMachineAction, Dev.Enum.SlotAnimState.ReelSpinCompleted);
                                }
                            },
                            ease: sM.ease.forceReelStop,
                            y: "+=" + (sM.count.forceYoyo),
                            yoyo: true,
                            repeat: 1,
                            onComplete: function () {
                                if (reelIndex == _this.reelContainers.length - 1) {
                                    _this.emit(Dev.Enum.Listeners.OnSpinMachineAction, Dev.Enum.SlotAnimState.SpinStopped);
                                    _this.removeListener(Dev.Enum.SlotAnimState.ReelSpinCompleted);
                                }
                            }
                        });
                        _this.reelStoppedIndex++;
                    }
                });
            };
            SliderMachine.prototype.playStopAnimation = function () {
                var _this = this;
                var sI = Dev.Config.SlotConfig;
                var sM = sI.SliderMachine;
                this.stopTimeline();
                var index = this.reelStoppedIndex;
                this.on(Dev.Enum.SlotAnimState.ReelSpinCompleted, function (reelIndex) {
                    if (reelIndex == index) {
                        var reelStopOffsetDuration = sM.duration.reelStopOffset;
                        if (index == 0)
                            reelStopOffsetDuration = 0;
                        _this._stopTimeline.call(function () {
                            _this._playTimeline[reelIndex].restart();
                            _this._playTimeline[reelIndex].kill();
                            var stopTween = TweenMax.to(_this.reelContainers[reelIndex].children, sM.duration.reelStop, {
                                onStart: function () {
                                    _this.reelContainers[reelIndex].filters = null;
                                    _this.reelStoppedIndex++;
                                    _this.emit(Dev.Enum.Listeners.OnSpinMachineAction, Dev.Enum.SlotAnimState.ReelSpinCompleted);
                                },
                                ease: sM.ease.reelStop,
                                y: "+=" + (sM.count.yoyo),
                                yoyo: true,
                                repeat: 1,
                                onComplete: function () {
                                    if (reelIndex == _this.reelContainers.length - 1) {
                                        _this.emit(Dev.Enum.Listeners.OnSpinMachineAction, Dev.Enum.SlotAnimState.SpinStopped);
                                        _this.removeListener(Dev.Enum.SlotAnimState.ReelSpinCompleted);
                                    }
                                }
                            });
                        }, null, "+=" + (reelStopOffsetDuration));
                    }
                    index++;
                });
            };
            SliderMachine.prototype.stopTimeline = function () {
                if (this._stopTimeline)
                    this._stopTimeline.kill();
                this._stopTimeline = new TimelineMax();
            };
            SliderMachine.prototype.playSpinAnimation = function () {
                var _this = this;
                this.emit(Dev.Enum.Listeners.OnSpinMachineAction, Dev.Enum.SlotAnimState.SpinStarted);
                var sC = this.slotMachineConfig;
                var speed = sC.duration.spin;
                var moveY = sC.symbol.scale.y * (sC.machine.reelMatrix.row) + sC.symbol.offset.y * (sC.machine.reelMatrix.row - 1);
                this._playTimeline = [];
                var _loop_6 = function (i) {
                    var timeline = new TimelineMax({ repeat: -1 });
                    var blurFilter = new PIXI.filters.BlurFilter();
                    blurFilter.blurX = 1;
                    blurFilter.blurY = 12;
                    blurFilter.autoFit = true;
                    this_6.reelContainers[i].filters = [blurFilter];
                    timeline.to(this_6.reelContainers[i].children, speed, {
                        ease: sC.ease.spin,
                        y: "+=" + (moveY + sC.symbol.scale.y - 5),
                        modifiers: {
                            y: function (y) {
                                return y / (moveY) < 1 ? y : y % (moveY) - sC.symbol.scale.y;
                            }
                        },
                        onComplete: function () {
                            _this.emit(Dev.Enum.SlotAnimState.ReelSpinCompleted, i);
                        }
                    });
                    this_6._playTimeline.push(timeline);
                };
                var this_6 = this;
                for (var i = 0; i < this.reelContainers.length; i++) {
                    _loop_6(i);
                }
            };
            Object.defineProperty(SliderMachine.prototype, "SliderBar", {
                get: function () {
                    return this._sliderBar;
                },
                enumerable: true,
                configurable: true
            });
            SliderMachine.prototype.playQuickSpinAnimation = function () {
            };
            SliderMachine.prototype.playSkippedAnimation = function () {
                var _this = this;
                var _loop_7 = function (i) {
                    var _loop_8 = function (j) {
                        this_7.matrixSymbols[i][j].spine.state.onComplete = function () {
                            _this.matrixSymbols[i][j].spine.playAnimation(Dev.Enum.AnimNames.SymbolIdle);
                        };
                    };
                    for (var j = 0; j < this_7.matrixSymbols[i].length; j++) {
                        _loop_8(j);
                    }
                };
                var this_7 = this;
                for (var i = 0; i < this.matrixSymbols.length; i++) {
                    _loop_7(i);
                }
                Core.Managers.TickerManager.instance.removeTicker("Loop");
                Core.Managers.TickerManager.instance.removeTicker("Match");
                this.emit(Dev.Enum.Listeners.OnSpinMachineAction, Dev.Enum.SlotAnimState.SpinSkipped);
            };
            SliderMachine.prototype.dispose = function () {
            };
            return SliderMachine;
        }(Modules.Machine));
        Modules.SliderMachine = SliderMachine;
    })(Modules = Dev.Modules || (Dev.Modules = {}));
})(Dev || (Dev = {}));
var Dev;
(function (Dev) {
    var Modules;
    (function (Modules) {
        var SliderMatchIcon = (function (_super) {
            __extends(SliderMatchIcon, _super);
            function SliderMatchIcon(x, y, mI, sI, p) {
                var _this = _super.call(this, 0, 0, mI.slotSymbols[sI].winSprite, p, mI.symbol.winSpriteScale.x, mI.symbol.winSpriteScale.y) || this;
                _this._container = new Core.Modules.Container(x, y, p, "MatchIcon");
                _this._particleContainer = new Core.Modules.Container(0, 0, _this._container, "MatchIcon");
                var aI = Dev.Config.AssetConfig;
                _this._machineInfo = mI;
                _this._symbolInfo = mI.slotSymbols[sI];
                _this._symbolIndex = sI;
                _this._sEmitter = new PIXI.particles.Emitter(_this._particleContainer, aI.ParticleSpark.frame, aI.FireSparkEmitter);
                _this._container.addChild(_this);
                _this._sEmitter.maxParticles = 10;
                _this._sEmitter.autoUpdate = true;
                return _this;
            }
            SliderMatchIcon.prototype.playWinSymbolAnim = function (tP, rM) {
                var _this = this;
                var l = Dev.Enum.Listeners;
                var sA = Dev.Enum.SlotAnimState;
                TweenMax.to(this._container, this._machineInfo.duration.matchIconFallDown, { y: tP.y,
                    onComplete: function () {
                        var speed = _this._machineInfo.duration.matchIconLeftSide + _this._machineInfo.duration.matchIconLeftSide * rM.c;
                        var ease = _this._machineInfo.ease.winSymbolMatch;
                        TweenMax.to(_this._container, speed, { x: tP.x, ease: ease, onComplete: function () {
                                _this.emit(l.OnSpinMachineAction, sA.MatchIconFinished, _this);
                                _this._container.destroy();
                            } });
                    } });
            };
            Object.defineProperty(SliderMatchIcon.prototype, "symbolInfo", {
                get: function () {
                    return this._symbolInfo;
                },
                enumerable: true,
                configurable: true
            });
            return SliderMatchIcon;
        }(Core.Modules.Sprite));
        Modules.SliderMatchIcon = SliderMatchIcon;
    })(Modules = Dev.Modules || (Dev.Modules = {}));
})(Dev || (Dev = {}));
var Dev;
(function (Dev) {
    var Modules;
    (function (Modules) {
        var tileWidth = 50;
        var SliderPlatform = (function (_super) {
            __extends(SliderPlatform, _super);
            function SliderPlatform(x, y, w, machineInfo, p) {
                var _this = _super.call(this) || this;
                _this._machineInfo = machineInfo;
                _this._container = new Core.Modules.Container(x, y, p, "Platform");
                _this._width = w;
                _this.initProperties();
                return _this;
            }
            SliderPlatform.prototype.initProperties = function () {
                var aI = Dev.Config.AssetConfig;
                var r = Dev.Config.GameConfig.DisplayConfig;
                var a = Core.Enum.Anchor;
                this._tilesContainer = new Core.Modules.Container(0, 0, this._container, "TilesContainer");
                this._tileCirclesContainer = new Core.Modules.Container(0, 0, this._container, "TileCircleContainer");
                this._tileLinesContainer = new Core.Modules.Container(0, 0, this._container, "TileLinesContainer");
                this._leftSide = new Core.Modules.Sprite(-this._width / 2, 0, aI.PlatformSide, this._container, null, null, a.MiddleLeft);
                this._leftSide.scale.set(-1, 1);
                var tile;
                var tileCount = this._width / tileWidth;
                for (var i = 0; i < Math.floor(tileCount); i++) {
                    tile = new Core.Modules.Sprite(this._leftSide.position.x + i * tileWidth, 0, aI.PlatformTile, this._tilesContainer, tileWidth, null, a.MiddleLeft);
                    var tileLines_1 = new Core.Modules.Sprite(tile.position.x, 0, aI.PlatformLine, this._tileLinesContainer, null, null, a.DownLeft);
                    if (i % 4 == 0 && i / 4 > 0) {
                        var tileCircle = new Core.Modules.Sprite(tile.position.x - tileWidth, 0, aI.PlatformCircle, this._tileCirclesContainer);
                    }
                }
                this._rightSide = new Core.Modules.Sprite(tile.position.x + tileWidth, 0, aI.PlatformSide, this._container, null, null, a.MiddleLeft);
                var tileLines = new Core.Modules.Sprite(tile.position.x + tileWidth, 0, aI.PlatformLine, this._tileLinesContainer, null, null, a.DownLeft);
                this._container.addChild(this._tileLinesContainer);
                this._containerFilter = new Core.Modules.Graphic(0, 0, this._container.width, this._container.height, aI.SliderFilterMask, this._container);
                this._containerFilter.alpha = 0;
                this.playSliderAnimation();
            };
            SliderPlatform.prototype.playMatchIconAnimation = function (sI, sP, rM) {
                var slotSymbols = Dev.Config.SlotConfig.SliderMachine.slotSymbols;
                if (slotSymbols[sI].winSprite != null) {
                    var r = Dev.Config.GameConfig.DisplayConfig;
                    var sliderMatchIcon = new Modules.SliderMatchIcon(sP.x - r.width / 2, sP.y, this._machineInfo, sI, this._container);
                    sliderMatchIcon.playWinSymbolAnim({ x: this._leftSide.position.x - 20, y: this._leftSide.position.y - this._leftSide.width }, rM);
                    this.initEvent(sliderMatchIcon);
                }
            };
            SliderPlatform.prototype.playSliderFilterAnimation = function (mIcon) {
                var _this = this;
                var duration = this._machineInfo.duration.barFill;
                var ease = this._machineInfo.ease.barFill;
                this._sliderTween = TweenMax.to(this._containerFilter, duration / 2, { alpha: .2,
                    ease: ease,
                    onStart: function () {
                        var tint = 0xf9fdff;
                        var colorMatrix = new PIXI.filters.GlowFilter(1, 1, 1, tint);
                        _this._containerFilter.filters = [colorMatrix];
                        colorMatrix.blendMode = PIXI.BLEND_MODES.ADD;
                    },
                    onComplete: function () {
                        TweenMax.to(_this._containerFilter, duration, { alpha: 0, ease: ease, onComplete: function () {
                                _this._containerFilter.filters = null;
                                _this._containerFilter.tint = 0xf9fdff;
                            } });
                    }
                });
            };
            SliderPlatform.prototype.initEvent = function (mIcon) {
                var _this = this;
                var l = Dev.Enum.Listeners;
                var sA = Dev.Enum.SlotAnimState;
                mIcon.on(l.OnSpinMachineAction, function (sA, sI) {
                    _this.playSliderFilterAnimation(mIcon);
                    _this.emit(l.OnSpinMachineAction, sA, sI);
                });
            };
            SliderPlatform.prototype.playSliderAnimation = function () {
                var timeline = new TimelineMax({ repeat: -1 });
                var moveX = (this._tileLinesContainer.children.length + 1) * tileWidth / 2;
                var duration = this._machineInfo.duration.slider;
                var ease = this._machineInfo.ease.slider;
                timeline.to(this._tileLinesContainer.children, duration, {
                    ease: ease,
                    x: "-=" + tileWidth,
                    modifiers: {
                        x: function (x) {
                            return x % moveX + tileWidth / 2 + 2;
                        }
                    }
                });
            };
            return SliderPlatform;
        }(PIXI.utils.EventEmitter));
        Modules.SliderPlatform = SliderPlatform;
    })(Modules = Dev.Modules || (Dev.Modules = {}));
})(Dev || (Dev = {}));
var Dev;
(function (Dev) {
    var Modules;
    (function (Modules) {
        var Symbol = (function (_super) {
            __extends(Symbol, _super);
            function Symbol(mI, sI, p, rM) {
                var _this = this;
                var offset = mI.symbol.offset;
                var scale = mI.symbol.scale;
                _this = _super.call(this, 0, (scale.y + offset.y) * (rM.r), p) || this;
                _this._spine = new Core.Modules.Spine(0, 0, mI.slotSymbols[sI].spineConfig, p, scale.x, scale.y);
                _this._index = sI;
                _this._machineInfo = mI;
                _this._symbolInfo = mI.slotSymbols[sI];
                _this._reelMatrix = rM;
                _this.initProperties();
                return _this;
            }
            Symbol.prototype.initProperties = function () {
                var matchFrame = Dev.Config.AssetConfig.MatchFrame;
                this._matchAnim = new Core.Modules.SequenceAnimation(0, 0, matchFrame, this);
                this.addChild(this._spine);
                this._fakeMatchAnim = new Core.Modules.SequenceAnimation(0, 0, matchFrame, this);
                this._fakeMatchAnim.alpha = .2;
                this._matchAnim.alpha = .5;
            };
            Symbol.prototype.playMatchAnimation = function () {
                this._matchAnim.playAnimation(Dev.Enum.AnimNames.MatchFrame);
                this._fakeMatchAnim.playAnimation(Dev.Enum.AnimNames.MatchFrame);
                this._spine.playAnimation(Dev.Enum.AnimNames.SymbolMatch);
            };
            Object.defineProperty(Symbol.prototype, "symbolConfig", {
                set: function (config) {
                    this._symbolConfig = config;
                    var width = this._spine.width;
                    var height = this._spine.height;
                    this._spine.destroy();
                    var spine = new Core.Modules.Spine(0, 0, config.spineConfig, this, width, height);
                    this._spine = spine;
                    this._spine.playAnimation(Dev.Enum.AnimNames.SymbolIdle);
                    this.addChild(this._fakeMatchAnim);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Symbol.prototype, "index", {
                get: function () {
                    return this._index;
                },
                set: function (index) {
                    this._index = index;
                    this.symbolConfig = this._machineInfo.slotSymbols[this._index];
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Symbol.prototype, "spine", {
                get: function () {
                    return this._spine;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(Symbol.prototype, "reelMatrix", {
                get: function () {
                    return this._reelMatrix;
                },
                enumerable: true,
                configurable: true
            });
            return Symbol;
        }(Core.Modules.Container));
        Modules.Symbol = Symbol;
    })(Modules = Dev.Modules || (Dev.Modules = {}));
})(Dev || (Dev = {}));
var Dev;
(function (Dev) {
    var Modules;
    (function (Modules) {
        var WheelPartSort;
        (function (WheelPartSort) {
            WheelPartSort[WheelPartSort["Base"] = 0] = "Base";
            WheelPartSort[WheelPartSort["Red"] = 1] = "Red";
            WheelPartSort[WheelPartSort["Yellow"] = 2] = "Yellow";
            WheelPartSort[WheelPartSort["Purple"] = 3] = "Purple";
            WheelPartSort[WheelPartSort["Green"] = 4] = "Green";
            WheelPartSort[WheelPartSort["Inner"] = 5] = "Inner";
            WheelPartSort[WheelPartSort["Light"] = 6] = "Light";
        })(WheelPartSort = Modules.WheelPartSort || (Modules.WheelPartSort = {}));
        var Wheel = (function (_super) {
            __extends(Wheel, _super);
            function Wheel(container) {
                var _this = _super.call(this) || this;
                _this._frames = {
                    frameBase: Core.Modules.Sprite2d,
                    frame: Core.Modules.Sprite2d,
                    redBase: Core.Modules.Sprite2d,
                    redLine: Core.Modules.Sprite2d,
                    yellowBase: Core.Modules.Sprite2d,
                    yellowLine: Core.Modules.Sprite2d,
                    purpleBase: Core.Modules.Sprite2d,
                    purpleLine: Core.Modules.Sprite2d,
                    greenBase: Core.Modules.Sprite2d,
                    greenLine: Core.Modules.Sprite2d
                };
                _this._plane2d = new Core.Modules.Plane2d(0, 0, container, null, "Plane");
                _this._wheelBackContainer2d = new Core.Modules.Container2d(0, 0, _this._plane2d, "WheelContainer");
                _this._wheelContainer2d = new Core.Modules.Container2d(0, 0, _this._plane2d, "WheelContainer");
                _this.initProperties();
                return _this;
            }
            Wheel.prototype.initProperties = function () {
                var dR = Dev.Config.GameConfig.DisplayConfig;
                var aI = Dev.Config.AssetConfig;
                var aC = Dev.Config.AnimConfig;
                this._plane2d.position.set(225, 477);
                this._wheelBackContainer2d.position.set(-49, -20);
                this._wheelContainer2d.position.set(-61, -2);
                this._plane2d.scale.set(1.3);
                var wheelPart = Object.keys(WheelPartSort);
                for (var i = 0; i < wheelPart.length; i++) {
                    this.setWheelPart(WheelPartSort[wheelPart[i]]);
                }
                var w = this._frames.frameBase.width;
                var h = this._frames.frameBase.height;
                this._mask = new Core.Modules.Graphic(440, 280, w, h, Dev.Config.AssetConfig.WheelMask, this._frames.frameBase);
                this._mask.alpha = 1;
                this._light.mask = this._mask;
                this._wheelSpark = new Core.Modules.SequenceAnimation(710, 500, aI.WheelSpark, this._plane2d.parent);
                this._wheelSpark.scale.set(-1, -1);
                this._wheelSpark.visible = false;
            };
            Wheel.prototype.resetProperties = function () {
                this._frames.redBase.scale.set(1, 1);
                this._frames.yellowBase.scale.set(1, 1);
                this._frames.purpleBase.scale.set(1, 1);
                this._frames.greenBase.scale.set(1, 1);
                this._light.scale.set(1, 1);
                this._inner.scale.set(1, 1);
            };
            Wheel.prototype.setWheelPart = function (part) {
                var aI = Dev.Config.AssetConfig;
                switch (part) {
                    case WheelPartSort.Base:
                        this._frames.frameBase = new Core.Modules.Sprite2d(596, 362, aI.WheelBase, this._wheelBackContainer2d);
                        this._frames.frame = new Core.Modules.Sprite2d(27, 7, aI.WheelFrame, this._frames.frameBase);
                        break;
                    case WheelPartSort.Red:
                        this._frames.redBase = new Core.Modules.Sprite2d(666, 364, aI.WheelRedBase, this._wheelContainer2d);
                        this._frames.redLine = new Core.Modules.Sprite2d(0, 0, aI.WheelRedLine, this._frames.redBase);
                        break;
                    case WheelPartSort.Yellow:
                        this._frames.yellowBase = new Core.Modules.Sprite2d(666, 364, aI.WheelYellowBase, this._wheelContainer2d);
                        this._frames.yellowLine = new Core.Modules.Sprite2d(0, 0, aI.WheelYellowLine, this._frames.yellowBase);
                        break;
                    case WheelPartSort.Purple:
                        this._frames.purpleBase = new Core.Modules.Sprite2d(666, 364, aI.WheelPurpleBase, this._wheelContainer2d);
                        this._frames.purpleLine = new Core.Modules.Sprite2d(0, 0, aI.WheelPurpleLine, this._frames.purpleBase);
                        break;
                    case WheelPartSort.Green:
                        this._frames.greenBase = new Core.Modules.Sprite2d(666, 364, aI.WheelGreenBase, this._wheelContainer2d);
                        this._frames.greenLine = new Core.Modules.Sprite2d(0, 0, aI.WheelGreenLine, this._frames.greenBase);
                        break;
                    case WheelPartSort.Inner:
                        this._inner = new Core.Modules.Sprite2d(666, 364, aI.WheelInner, this._wheelContainer2d);
                        break;
                    case WheelPartSort.Light:
                        this._light = new Core.Modules.Sprite2d(669, 364, aI.WheelLight, this._wheelContainer2d);
                        break;
                }
            };
            Wheel.prototype.playWheelsCircleAnimation = function (partIndex, endIndex) {
                switch (partIndex) {
                    case WheelPartSort.Red: this.playWheelPartCircle(this._frames.redBase, 2.51, partIndex, endIndex);
                    case WheelPartSort.Yellow: this.playWheelPartCircle(this._frames.yellowBase, 2.51, partIndex, endIndex);
                    case WheelPartSort.Purple: this.playWheelPartCircle(this._frames.purpleBase, 2.51, partIndex, endIndex);
                    case WheelPartSort.Green: this.playWheelPartCircle(this._frames.greenBase, 2.51, partIndex, endIndex);
                }
            };
            Wheel.prototype.playWheelsScaleUpAnimation = function (partIndex, endIndex) {
                var scale = 1;
                var part;
                switch (partIndex) {
                    case WheelPartSort.Red:
                        part = this._frames.redBase;
                        scale = 1;
                        break;
                    case WheelPartSort.Yellow:
                        part = this._frames.yellowBase;
                        scale = 1.25;
                        break;
                    case WheelPartSort.Purple:
                        part = this._frames.purpleBase;
                        scale = 1.66;
                        break;
                    case WheelPartSort.Green:
                        part = this._frames.greenBase;
                        scale = 2.5;
                        break;
                }
                switch (partIndex) {
                    case WheelPartSort.Red: this.playWheelScaleUp(this._frames.redBase, part, partIndex, scale, endIndex);
                    case WheelPartSort.Yellow: this.playWheelScaleUp(this._frames.yellowBase, part, partIndex, scale, endIndex);
                    case WheelPartSort.Purple: this.playWheelScaleUp(this._frames.purpleBase, part, partIndex, scale, endIndex);
                    case WheelPartSort.Green: this.playWheelScaleUp(this._frames.greenBase, part, partIndex, scale, endIndex);
                    case WheelPartSort.Inner:
                        var scaleInner = 1;
                        switch (partIndex) {
                            case WheelPartSort.Red:
                                scaleInner = 1;
                                break;
                            case WheelPartSort.Yellow:
                                scaleInner = 1.1;
                                break;
                            case WheelPartSort.Purple:
                                scaleInner = 1.45;
                                break;
                            case WheelPartSort.Green:
                                scaleInner = 1.5;
                                break;
                        }
                        this.playWheelScaleUp(this._inner, part, partIndex, scaleInner, endIndex);
                    case WheelPartSort.Light:
                        this.playWheelScaleUp(this._light, part, partIndex, scale, endIndex);
                        break;
                }
            };
            Wheel.prototype.playWheelPartCircle = function (part, rotation, partIndex, endIndex) {
                var _this = this;
                TweenMax.to(part, 1.2, { rotation: part.rotation - rotation, ease: "sine.out", onComplete: function () {
                        _this._wheelSpark.visible = true;
                        _this._wheelSpark.playAnimation(Dev.Enum.AnimNames.WheelSparkLoop);
                        TweenMax.to(part, 2, { rotation: part.rotation + Math.PI * 4 + Math.PI * 0.125, ease: "power0", onComplete: function () {
                                _this._wheelSpark.playAnimation(Dev.Enum.AnimNames.WheelSparkOutre);
                                _this._wheelSpark.onComplete = function () { _this._wheelSpark.visible = false; };
                                TweenMax.to(part, 1.2, { rotation: part.rotation + rotation, yoyo: true, ease: "back.out(3)", onComplete: function () {
                                        if (partIndex <= endIndex) {
                                            partIndex++;
                                            _this.playWheelsScaleUpAnimation(partIndex, endIndex);
                                        }
                                        else {
                                            _this.emit(Dev.Enum.Listeners.OnBonusGameAction, Dev.Enum.SlotAnimState.WheelTurnStopped, endIndex);
                                        }
                                    } });
                            } });
                    } });
            };
            Wheel.prototype.playWheelScaleUp = function (part, filterPart, partIndex, scale, endIndex) {
                var _this = this;
                TweenMax.to(part.scale, .75, { x: scale, y: scale, delay: 1, ease: "back.out(2)",
                    onStart: function () {
                        var filter = new PIXI.filters.ColorMatrixFilter();
                        filterPart.filters = [filter];
                        filter.saturate(1, false);
                    }, onComplete: function () {
                        Core.Managers.TickerManager.instance.addTimeout("wait", 1, function () {
                            _this.playWheelsCircleAnimation(partIndex, endIndex);
                        }, false);
                        filterPart.filters = null;
                    } });
            };
            Object.defineProperty(Wheel.prototype, "plane2d", {
                get: function () {
                    return this._plane2d;
                },
                enumerable: true,
                configurable: true
            });
            return Wheel;
        }(PIXI.utils.EventEmitter));
        Modules.Wheel = Wheel;
    })(Modules = Dev.Modules || (Dev.Modules = {}));
})(Dev || (Dev = {}));
var Dev;
(function (Dev) {
    var Modules;
    (function (Modules) {
        var WinAnimation = (function (_super) {
            __extends(WinAnimation, _super);
            function WinAnimation(container) {
                var _this = _super.call(this) || this;
                _this._winAmountCount = 0;
                _this._container = new Core.Modules.Container(0, 0, container, "WinContainer");
                _this.initProperties();
                return _this;
            }
            WinAnimation.prototype.initProperties = function () {
                var r = Dev.Config.GameConfig.DisplayConfig;
                var aI = Dev.Config.AssetConfig;
                var a = Core.Enum.Anchor;
                this._background = new Core.Modules.Sprite(r.width / 2, r.height / 2, aI.WinBg, this._container);
                this._backContainer = new Core.Modules.Container(0, 0, this._container, "backContainer");
                this._frontContainer = new Core.Modules.Container(0, 0, this._container, "frontContainer");
                this._container.alpha = 0;
                this._winHeader = new Core.Modules.Text(r.width / 2, r.height / 2, aI.BigWinText, this._frontContainer);
                this._uiHeader = new Core.Modules.Text(r.width / 2, r.height / 2 - 100, aI.UIHeaderText, this._frontContainer);
                this._fruit = new Core.Modules.Sprite(r.width / 2, 432, aI.WinFruit, this._frontContainer);
                this._freeSpinFruit = new Core.Modules.Sprite(r.width / 2, 360, aI.FreeSpinWinFruit, this._frontContainer);
                this._winAmount = new Core.Modules.Text(r.width / 2, r.height / 2 - 100, aI.WinAmountText, this._frontContainer);
                this._coinContainers = new Array();
            };
            WinAnimation.prototype.playWinAnimation = function (animType, winAnimInfo, amount) {
                var _this = this;
                this._winTimeline = new TimelineMax();
                var coinContainer = new Core.Modules.Container(0, 300, this._backContainer, "CoinContainer");
                coinContainer.visible = false;
                this._coinContainers.push(coinContainer);
                switch (animType) {
                    case Dev.Enum.WinType.BigWin:
                        this.playBigWinAnimation(winAnimInfo, amount, 5);
                        this._winHeader.setTextConfig(Dev.Config.AssetConfig.BigWinText);
                        break;
                    case Dev.Enum.WinType.SuperWin:
                        this.playBigWinAnimation(winAnimInfo, amount, 4);
                        this._winHeader.setTextConfig(Dev.Config.AssetConfig.SuperWinText);
                        break;
                    case Dev.Enum.WinType.MegaWin:
                        this.playBigWinAnimation(winAnimInfo, amount, 3);
                        this._winHeader.setTextConfig(Dev.Config.AssetConfig.MegaWinText);
                        break;
                    case Dev.Enum.WinType.FreeSpinStartWin:
                        this._winHeader.setTextConfig(Dev.Config.AssetConfig.FreeSpinStartWinText);
                        this.playFreeSpinStartAnimation(winAnimInfo, 10);
                        this._winTimeline.call(function () {
                            _this.emit(Dev.Enum.Listeners.OnWinAnimAction, Dev.Enum.SlotAnimState.FinishedStartFreeSpinWin);
                        });
                        break;
                }
            };
            WinAnimation.prototype.playFreeSpinStartAnimation = function (winAnimInfo, amount) {
                var r = Dev.Config.GameConfig.DisplayConfig;
                this._winAmount.alpha = 0;
                this._winAmount.text = "x" + amount.toString();
                this._freeSpinFruit.alpha = 0;
                this._freeSpinFruit.visible = true;
                this._fruit.visible = false;
                this._uiHeader.position.y = -500;
                this._uiHeader.visible = true;
                this._uiHeader.alpha = 1;
                this._winHeader.alpha = 1;
                this._winHeader.position.y = r.height + 500;
                this._winAmount.position.set(this._freeSpinFruit.position.x + 200, this._freeSpinFruit.position.y);
                this._winTimeline.fromTo(this._container, winAnimInfo.duration, { alpha: 0 }, { alpha: 1, ease: winAnimInfo.ease });
                this._winTimeline.to(this._uiHeader, winAnimInfo.duration, { y: 133, ease: winAnimInfo.ease });
                this._winTimeline.to(this._winHeader, winAnimInfo.duration, { y: 565, ease: winAnimInfo.ease });
                this._winTimeline.fromTo(this._freeSpinFruit.scale, winAnimInfo.duration, { x: 5, y: 5 }, { x: 1, y: 1, ease: winAnimInfo.ease });
                this._winTimeline.to(this._freeSpinFruit, winAnimInfo.duration, { alpha: 1, ease: winAnimInfo.ease }, "-=" + winAnimInfo.duration);
                this._winTimeline.fromTo(this._winAmount.scale, winAnimInfo.duration, { x: 5, y: 5 }, { x: 1, y: 1, ease: winAnimInfo.ease });
                this._winTimeline.to(this._winAmount, winAnimInfo.duration, { alpha: 1, ease: winAnimInfo.ease }, "-=" + winAnimInfo.duration);
                this._winTimeline.to(this._uiHeader, winAnimInfo.duration * 2, { y: -500, ease: winAnimInfo.ease }, "+=" + winAnimInfo.showTime);
                this._winTimeline.to(this._winHeader, winAnimInfo.duration * 2, { y: r.height + 500, ease: winAnimInfo.ease }, "-=" + winAnimInfo.duration * 2);
                this._winTimeline.to(this._winAmount, winAnimInfo.duration * 2, { alpha: 0, ease: winAnimInfo.ease }, "-=" + winAnimInfo.duration * 2);
                this._winTimeline.fromTo(this._freeSpinFruit.scale, winAnimInfo.duration * 2, { x: 1, y: 1 }, { x: 5, y: 5, ease: winAnimInfo.ease }, "-=" + winAnimInfo.duration);
                this._winTimeline.to(this._freeSpinFruit, winAnimInfo.duration * 2, { alpha: 0, ease: winAnimInfo.ease }, "-=" + winAnimInfo.duration * 2);
                this._winTimeline.to(this._container, winAnimInfo.duration * 2, { alpha: 0, ease: winAnimInfo.ease }, "-=" + winAnimInfo.duration);
            };
            WinAnimation.prototype.playBigWinAnimation = function (winAnimInfo, amount, end) {
                var _this = this;
                var winAmountTween = TweenMax.fromTo(this._winAmount.scale, .25, { x: 1, y: 1 }, { x: 1.2, y: 1.2, ease: "back.out(0.5)", yoyo: true, repeat: -1 });
                var r = Dev.Config.GameConfig.DisplayConfig;
                this._winAmount.text = amount.toString();
                this._winHeader.position.y = -500;
                this._winHeader.alpha = 1;
                this._fruit.visible = false;
                this._uiHeader.visible = false;
                this._freeSpinFruit.visible = false;
                this._winAmount.position.set(r.width / 2, r.height / 2 + 50);
                this._winTimeline.to(this._container, winAnimInfo.duration, { alpha: 1, ease: winAnimInfo.ease });
                this._winTimeline.to(this._winHeader, winAnimInfo.duration, { y: 200, ease: winAnimInfo.ease });
                this._winTimeline.to(this._winAmount, winAnimInfo.duration, { alpha: 1, ease: winAnimInfo.ease }, "-=" + winAnimInfo.duration);
                this._winTimeline.to(this._winHeader, winAnimInfo.duration, { y: r.height / 2 + 50, ease: winAnimInfo.ease }, "+=" + winAnimInfo.showTime);
                this._winTimeline.to(this._winHeader, winAnimInfo.duration, { alpha: 0, ease: winAnimInfo.ease }, "-=" + winAnimInfo.duration);
                this._winTimeline.call(function () {
                    _this.emit(Dev.Enum.Listeners.OnAnimationAction, Dev.Enum.AnimListener.PlayNextAnimation);
                    winAmountTween.restart();
                    winAmountTween.kill();
                });
                var counter = { var: this._winAmountCount };
                TweenMax.to(counter, winAnimInfo.duration * 5, {
                    var: this._winAmountCount + amount,
                    onUpdate: function () {
                        _this._winAmount.text = Math.ceil(counter.var).toString();
                    },
                    ease: "power0"
                });
                this._winAmountCount += amount;
            };
            WinAnimation.prototype.showWinAnimation = function (duration, amount) {
                var _this = this;
                this._winAmountCount = 0;
                TweenMax.fromTo(this._winAmount.scale, .25, { x: 1, y: 1 }, { x: 1.2, y: 1.2, ease: "back.out(0.5)", yoyo: true, repeat: 1 });
                var r = Dev.Config.GameConfig.DisplayConfig;
                TweenMax.to(this._container, duration, { alpha: 0, delay: duration, onComplete: function () {
                        for (var i = 0; i < _this._coinContainers.length; i++)
                            _this._coinContainers[i].destroy({ children: true });
                        _this.emit(Dev.Enum.Listeners.OnAnimationAction, Dev.Enum.AnimListener.PlayNextAnimation);
                    } });
            };
            return WinAnimation;
        }(PIXI.utils.EventEmitter));
        Modules.WinAnimation = WinAnimation;
    })(Modules = Dev.Modules || (Dev.Modules = {}));
})(Dev || (Dev = {}));
var Dev;
(function (Dev) {
    var Modules;
    (function (Modules) {
        var Winlines = (function (_super) {
            __extends(Winlines, _super);
            function Winlines(container) {
                var _this = _super.call(this) || this;
                _this._winLines = new Array();
                _this._baseContainer = container;
                _this.initProperties();
                return _this;
            }
            Winlines.prototype.initProperties = function () {
                this._winLineAnimTimeline = new TimelineMax();
            };
            Winlines.prototype.playWinlineAnimation = function (sC, wS, index, mS, loop) {
                var r = Dev.Config.GameConfig.DisplayConfig;
                var aI = Dev.Config.AssetConfig;
                var lineIndex = wS[index].lineIndex;
                var path = sC.winLine.winLinesPath[lineIndex];
                var duration = sC.winLine.duration;
                var offset = sC.symbol.offset;
                var scale = sC.symbol.scale;
                var line;
                if (this._container) {
                    this._container.destroy({ children: true, baseTexture: false, texture: false });
                }
                this._container = new Core.Modules.Container(0, 0, this._baseContainer, "WinLinesContainer");
                this._winLines = new Array();
                for (var j = 0; j < path.length - 1; j++) {
                    var currentRow = path[j].row;
                    var currentColumn = path[j].column;
                    var nextRow = path[j + 1].row;
                    var nextColumn = path[j + 1].column;
                    var width = mS[currentRow][currentColumn].parent.position.x;
                    var x = mS[currentRow][currentColumn].parent.position.x;
                    var y = (scale.y + offset.y) * (currentRow) + mS[currentRow][currentColumn].parent.position.y / 2 + 30;
                    line = new Core.Modules.Graphic(x, y, path[j].thickness, null, Dev.Config.AssetConfig.SlotWinLine, this._container);
                    width -= mS[nextRow][nextColumn].parent.position.x;
                    width = Math.abs(width);
                    x = mS[nextRow][nextColumn].parent.position.x;
                    y = (scale.y + offset.y) * (nextRow) - ((scale.y + offset.y) * (currentRow));
                    y = currentRow == nextRow ? 0 : y;
                    line.drawLine(new PIXI.Point(x, y), width + path[j].thickness / 3.2);
                    this._winLines.push(line);
                }
                this._amount = new Core.Modules.Text(r.width / 2, r.height / 2, aI.WinLineText, this._container);
                this._winLineAnimTimeline.fromTo(this._container, duration, { alpha: 0 }, { alpha: 1 });
                this._amount.text = wS[index].currency.cents.toString();
                this._amount.position.y = 130 + lineIndex * 150;
                if (!loop)
                    this.emit(Dev.Enum.Listeners.OnWinLinesAction, Dev.Enum.SlotAnimState.WinUpdated, wS[index].currency);
            };
            Winlines.prototype.playWinLineFadeOutAnimation = function (wI) {
                var duration = wI.duration;
                this._winLineAnimTimeline.fromTo(this._container, duration, { alpha: 1 }, { alpha: 0 });
            };
            Winlines.prototype.stopWinLineAnimation = function () {
                if (this._winLineAnimTimeline) {
                    this._winLineAnimTimeline.restart();
                    this._winLineAnimTimeline.kill();
                    if (this._container) {
                        this._container.destroy({ children: true, baseTexture: false, texture: false });
                        this._container.alpha = 0;
                    }
                    this._winLineAnimTimeline = new TimelineMax();
                }
            };
            return Winlines;
        }(PIXI.utils.EventEmitter));
        Modules.Winlines = Winlines;
    })(Modules = Dev.Modules || (Dev.Modules = {}));
})(Dev || (Dev = {}));
var Dev;
(function (Dev) {
    var Stages;
    (function (Stages) {
        var GameController = Dev.Controller.GameController;
        var BonusStage = (function (_super) {
            __extends(BonusStage, _super);
            function BonusStage() {
                var _this = _super !== null && _super.apply(this, arguments) || this;
                _this._cocktailLiquid = new Array();
                _this._cocktailLiquidMask = new Array();
                return _this;
            }
            BonusStage.prototype.init = function () {
                this.game = GameController.Instance;
                var a = Core.Enum.Anchor;
                this._container = new Core.Modules.Container(0, 200, this, "Container");
                this._cocktailContainer = new Core.Modules.Container(0, 0, this._container, "cocktailContainer");
                this._cocktailContainer.scale.set(.5, .5);
                this._wheel = new Dev.Modules.Wheel(this._container);
                this._glassBg = new Core.Modules.Sprite(1029, 161, Dev.Config.AssetConfig.Glass, this._cocktailContainer, a.MiddleLeft);
                this._liquid = new Core.Modules.Spine(-this._glassBg.width - 10, -this._glassBg.height / 2 - 25, Dev.Config.AssetConfig.Liquid, this._glassBg);
                for (var i = 0; i < 4; i++) {
                    var liquid = new Core.Modules.Spine(-this._glassBg.width - 10, -this._glassBg.height / 2 - 25, Dev.Config.AssetConfig.Liquid, this._glassBg);
                    this._cocktailLiquid.push(liquid);
                    liquid.tint = 0x06ff6a;
                    liquid.alpha = 0;
                    var blur = new PIXI.filters.BlurFilter(10);
                    var mask = new Core.Modules.Graphic(250, 310 + 45 * i, 500, 500, Dev.Config.AssetConfig.PopupRect, liquid);
                    mask.alpha = 1;
                    liquid.mask = mask;
                    liquid.alpha = 0;
                    if (i == 0)
                        liquid.tint = 0x06ff6a;
                    if (i == 1)
                        liquid.tint = 0xb608ff;
                    if (i == 2)
                        liquid.tint = 0xffea00;
                    if (i == 3)
                        liquid.tint = 0xff1e1e;
                }
                this._cocktail = new Core.Modules.Spine(1029, 210, Dev.Config.AssetConfig.Cocktail, this._cocktailContainer);
            };
            BonusStage.prototype.startBonusScreen = function () {
                var _this = this;
                this._cocktailContainer.visible = false;
                this._wheel.resetProperties();
                this.ChangeCocktail(Dev.Enum.AnimNames.CocktailStrawberry);
                this._cocktail.state.timeScale = 0;
                this._liquid.state.timeScale = 0;
                var aC = Dev.Config.AnimConfig.Animation;
                var duration = aC.duration.bgChangePosition;
                var ease = aC.ease.bgChangePosition;
                TweenMax.fromTo(this._container, duration, { alpha: 0 }, { ease: ease, alpha: 1 });
                TweenMax.fromTo(this._container, duration, { y: 200 }, { ease: ease, y: 0 });
                this._wheel.playWheelsCircleAnimation(1, 3);
                var xx = 1011;
                var xy = -1137;
                var yy = 1472;
                var yx = 1992;
                Core.Managers.TickerManager.instance.addTimeout("bonusStart", .01, function () {
                    yy -= 5;
                    yx += 5;
                    xx -= 10;
                    xy = +10;
                    if (yy <= 1148) {
                        Core.Managers.TickerManager.instance.removeTicker("bonusStart");
                        yy = 1148;
                    }
                    if (yx >= 2316)
                        yx = 2316;
                    if (xx <= 363)
                        xx = 363;
                    if (xy >= -489)
                        xy = -489;
                    _this._wheel.plane2d.setAxisY(new PIXI.Point(yx, yy), 1);
                    _this._wheel.plane2d.setAxisX(new PIXI.Point(xx, xy), 1);
                }, true);
            };
            BonusStage.prototype.playCocktailAnimation = function (value) {
                var _this = this;
                this._cocktailContainer.visible = true;
                TweenMax.fromTo(this._cocktailContainer, .35, { x: 500, y: -300 }, { y: 150, ease: "back.out(.5)", onComplete: function () {
                        switch (value) {
                            case 0:
                                _this.ChangeCocktail(Dev.Enum.AnimNames.CocktailStrawberry);
                                break;
                            case 1:
                                _this.ChangeCocktail(Dev.Enum.AnimNames.CocktailMix);
                                break;
                            case 2:
                                _this.ChangeCocktail(Dev.Enum.AnimNames.CocktailPlum);
                                break;
                            case 3:
                                _this.ChangeCocktail(Dev.Enum.AnimNames.CocktailGrape);
                                break;
                            case 4:
                                _this.ChangeCocktail(Dev.Enum.AnimNames.CocktailMix);
                                break;
                        }
                    } });
            };
            BonusStage.prototype.ChangeCocktail = function (cocktailName) {
                var _this = this;
                switch (cocktailName) {
                    case Dev.Enum.AnimNames.CocktailStrawberry:
                    case Dev.Enum.AnimNames.CocktailLemon:
                    case Dev.Enum.AnimNames.CocktailPlum:
                    case Dev.Enum.AnimNames.CocktailGrape:
                        this._liquid.tint = this._cocktail.animConfig[cocktailName].tint;
                        this._cocktail.playAnimation(cocktailName);
                        this._liquid.playAnimation(Dev.Enum.AnimNames.Liquid);
                        break;
                    case Dev.Enum.AnimNames.CocktailMix:
                        var _loop_9 = function (index) {
                            this_8._cocktailLiquid[index].playAnimation(Dev.Enum.AnimNames.Liquid);
                            Core.Managers.TickerManager.instance.addTimeout("count" + index, .8 + .4 * (this_8._cocktailLiquid.length - 1 - index), function () {
                                _this._liquid.tint = _this._cocktailLiquid[index].tint;
                                _this._cocktailLiquid[index].alpha = 1;
                                var colorMatrix = new PIXI.filters.GlowFilter(1, 1, 1, _this._cocktailLiquid[index].tint);
                                _this._cocktailLiquid[index].filters = [colorMatrix];
                                colorMatrix.blendMode = PIXI.BLEND_MODES.ADD;
                                if (index != 0) {
                                    _this._cocktailLiquid[index].filters = null;
                                }
                            }, false);
                        };
                        var this_8 = this;
                        for (var index = this._cocktailLiquid.length - 1; index >= 0; index--) {
                            _loop_9(index);
                        }
                        this._liquid.playAnimation(Dev.Enum.AnimNames.Liquid);
                        this._cocktail.playAnimation(cocktailName);
                        break;
                }
                this._cocktail.state.onComplete = function () {
                    var aC = Dev.Config.AnimConfig.Animation;
                    var duration = aC.duration.bgChangePosition;
                    var ease = aC.ease.bgChangePosition;
                    _this._cocktail.state.onComplete = null;
                    TweenMax.fromTo(_this._container, duration, { alpha: 1 }, { ease: ease, alpha: 0 });
                    TweenMax.fromTo(_this._container, duration, { y: 0 }, { ease: ease, y: 200 });
                    _this.emit(Dev.Enum.Listeners.OnGameAnimAction, Dev.Enum.GameAnimListener.BonusFinished);
                };
            };
            BonusStage.prototype.initEvents = function () {
                this.initDisplayEvents();
                this.initWheelEvent();
            };
            BonusStage.prototype.initWheelEvent = function () {
                var _this = this;
                this._wheel.on(Dev.Enum.Listeners.OnBonusGameAction, function (action, value) {
                    if (action == Dev.Enum.SlotAnimState.WheelTurnStopped) {
                        _this.playCocktailAnimation(value);
                    }
                });
            };
            BonusStage.prototype.setVisualPortrait = function () {
            };
            BonusStage.prototype.setVisualLandscape = function () {
            };
            BonusStage.prototype.dispose = function () {
                this._cocktail.destroy();
                this._liquid.destroy();
                this._wheel.off(Dev.Enum.Listeners.OnBonusGameAction);
                this.off(Dev.Enum.Listeners.OnBonusGameAction);
            };
            return BonusStage;
        }(Core.Modules.Stage));
        Stages.BonusStage = BonusStage;
    })(Stages = Dev.Stages || (Dev.Stages = {}));
})(Dev || (Dev = {}));
var Dev;
(function (Dev) {
    var Stages;
    (function (Stages) {
        var GameController = Dev.Controller.GameController;
        var DisplayManager = Core.Managers.DisplayManager;
        var MainStage = (function (_super) {
            __extends(MainStage, _super);
            function MainStage() {
                return _super !== null && _super.apply(this, arguments) || this;
            }
            MainStage.prototype.init = function () {
                this.game = GameController.Instance;
                this._background = new Dev.Modules.Background(this);
                this._slotMachineController = new Dev.Controller.MachineController(this);
                this._menuBar = new Dev.Modules.Menu(this);
                this._winAnimation = new Dev.Modules.WinAnimation(this);
                this.onOrientationChanged(DisplayManager.instance.currentOrientation);
            };
            MainStage.prototype.initEvents = function () {
                this.initDisplayEvents();
                this.initGameEvents();
                this.initSlotMachineEvents();
                this.initWinAnimationEvents();
                this.initBackgroundEvents();
                this.initMenuBarEvents();
            };
            MainStage.prototype.initBonusStage = function () {
                var bonusState = Core.Managers.StageManager.Instance.getStage(Dev.Stages.BonusStage);
                bonusState.once(Dev.Enum.Listeners.OnGameAnimAction, this.onGameAnimationAction.bind(this));
            };
            MainStage.prototype.onGameDataAction = function (action, data) {
                switch (action) {
                    case Dev.Enum.DataListener.message:
                        this.game.emit(Dev.Enum.AnimListener.SortScenarioAnimation, data);
                        break;
                }
                this._slotMachineController.onDataAction(action, data);
                var gameUIData = {
                    action: Dev.Interface.MessageType.SpinState,
                    spinButtonState: {
                        skin: Dev.Interface.SpinButtonState.Normal,
                        enabled: true,
                        visible: true
                    }
                };
            };
            MainStage.prototype.onAnimationAction = function (action, data) {
                switch (action) {
                    case Dev.Enum.AnimListener.SortScenarioAnimation:
                        this.game.emit(Dev.Enum.Listeners.OnAnimationAction, Dev.Enum.AnimListener.SortScenarioAnimation, data);
                        break;
                    case Dev.Enum.AnimListener.PlayNextAnimation:
                        this.game.emit(Dev.Enum.Listeners.OnAnimationAction, Dev.Enum.AnimListener.PlayNextAnimation, data);
                        break;
                }
            };
            MainStage.prototype.onGameAnimationAction = function (action, data) {
                var _this = this;
                console.log(action);
                var wI;
                var r = Dev.Config.GameConfig.DisplayConfig;
                switch (action) {
                    case Dev.Enum.GameAnimListener.BigWin:
                        wI = this._slotMachineController.slotMachine.winInfo.bigWin;
                        this._winAnimation.playWinAnimation(Dev.Enum.WinType.BigWin, wI, 100);
                        break;
                    case Dev.Enum.GameAnimListener.MegaWin:
                        wI = this._slotMachineController.slotMachine.winInfo.megaWin;
                        this._winAnimation.playWinAnimation(Dev.Enum.WinType.MegaWin, wI, 100);
                        break;
                    case Dev.Enum.GameAnimListener.SuperWin:
                        wI = this._slotMachineController.slotMachine.winInfo.superWin;
                        this._winAnimation.playWinAnimation(Dev.Enum.WinType.SuperWin, wI, 100);
                        break;
                    case Dev.Enum.GameAnimListener.MatchSymbolWin:
                        this._slotMachineController.onGameAnimationAction(action);
                        break;
                    case Dev.Enum.GameAnimListener.LoopMatchSymbolWin:
                        this._slotMachineController.onGameAnimationAction(action);
                        break;
                    case Dev.Enum.GameAnimListener.ShowWinAmount:
                        wI = this._slotMachineController.slotMachine.winInfo.freeSpinStartWin;
                        this._winAnimation.showWinAnimation(1, 300);
                        break;
                    case Dev.Enum.GameAnimListener.FreeSpinStart:
                        wI = this._slotMachineController.slotMachine.winInfo.freeSpinStartWin;
                        this._winAnimation.playWinAnimation(Dev.Enum.WinType.FreeSpinStartWin, wI, 100);
                        break;
                    case Dev.Enum.GameAnimListener.FreeSpinFinished:
                        this._background.changeBackgroundType(Dev.Enum.SpinMode.NormalSpin);
                        Core.Managers.TickerManager.instance.addTimeout("fake2", 1.5, function () {
                            _this.onAnimationAction(Dev.Enum.AnimListener.PlayNextAnimation);
                        }, false);
                        break;
                    case Dev.Enum.GameAnimListener.BonusStart:
                        var aC = Dev.Config.AnimConfig.Animation;
                        var duration = aC.duration.bgChangePosition;
                        var ease = aC.ease.bgChangePosition;
                        TweenMax.fromTo(this._slotMachineController.container.scale, duration, { x: 1, y: 1 }, { ease: ease, x: 2, y: 2 });
                        TweenMax.fromTo(this._slotMachineController.container, duration, { x: 0, y: 0 }, { ease: ease, x: -r.width / 2, y: -r.height / 2 });
                        TweenMax.fromTo(this._slotMachineController.container, 1, { alpha: 1 }, { alpha: 0, ease: ease, onComplete: function () {
                                _this._slotMachineController.container.visible = false;
                            } });
                        var bonusStage = Core.Managers.StageManager.Instance.getStage(Stages.BonusStage);
                        if (!bonusStage) {
                            Core.Managers.StageManager.Instance.addStage(Stages.BonusStage, false);
                            bonusStage = Core.Managers.StageManager.Instance.getStage(Stages.BonusStage);
                        }
                        this._background.playBackgroundPositionAnimation(r.width / 2, r.height / 2 - 200);
                        bonusStage.startBonusScreen();
                        this.initBonusStage();
                        break;
                    case Dev.Enum.GameAnimListener.BonusFinished:
                        aC = Dev.Config.AnimConfig.Animation;
                        duration = aC.duration.bgChangePosition;
                        ease = aC.ease.bgChangePosition;
                        var bonusState = Core.Managers.StageManager.Instance.getStage(Dev.Stages.BonusStage);
                        bonusState.off(Dev.Enum.Listeners.OnGameAnimAction);
                        this._slotMachineController.container.visible = true;
                        TweenMax.fromTo(this._slotMachineController.container.scale, duration, { x: 2, y: 2 }, { x: 1, y: 1, ease: ease });
                        TweenMax.fromTo(this._slotMachineController.container, duration, { x: -r.width / 2, y: -r.height / 2 }, { x: 0, y: 0, ease: ease });
                        TweenMax.fromTo(this._slotMachineController.container, 1, { alpha: 0 }, { alpha: 1, ease: ease, onComplete: function () {
                                Core.Managers.TickerManager.instance.addTimeout("fake3", .5, function () {
                                    _this.onAnimationAction(Dev.Enum.AnimListener.PlayNextAnimation);
                                }, false);
                            } });
                        this._background.playBackgroundPositionAnimation(r.width / 2, r.height / 2);
                        break;
                }
            };
            MainStage.prototype.initSlotMachineEvents = function () {
                this._slotMachineController.on(Dev.Enum.Listeners.OnGameAnimAction, this.onGameAnimationAction.bind(this));
                this._slotMachineController.on(Dev.Enum.Listeners.OnAnimationAction, this.onAnimationAction.bind(this));
                this._slotMachineController.on(Dev.Enum.Listeners.OnSpinMachineAction, this.checkSlotAnimState.bind(this));
            };
            MainStage.prototype.initMenuBarEvents = function () {
            };
            MainStage.prototype.initBackgroundEvents = function () {
            };
            MainStage.prototype.initWinAnimationEvents = function () {
                this._winAnimation.on(Dev.Enum.Listeners.OnWinAnimAction, this.checkSlotAnimState.bind(this));
                this._winAnimation.on(Dev.Enum.Listeners.OnAnimationAction, this.onAnimationAction.bind(this));
            };
            MainStage.prototype.checkSlotAnimState = function (animationAction, value) {
                var _this = this;
                switch (animationAction) {
                    case Dev.Enum.SlotAnimState.FinishedStartFreeSpinWin:
                        this._background.changeBackgroundType(Dev.Enum.SpinMode.FreeSpin);
                        Core.Managers.TickerManager.instance.addTimeout("fake", 1.5, function () {
                            _this.onAnimationAction(Dev.Enum.AnimListener.PlayNextAnimation);
                        }, false);
                        break;
                    case Dev.Enum.SlotAnimState.ReelSpinCompleted:
                        this._background.playBackgroundBuzzAnimation();
                        break;
                }
            };
            MainStage.prototype.initGameEvents = function () {
                var _this = this;
                var dataListener = Object.keys(Dev.Enum.DataListener);
                var _loop_10 = function (i) {
                    var dataName = Dev.Enum.DataListener[dataListener[i]];
                    this_9.game.on(dataName, function (data) {
                        _this.onGameDataAction(dataName, data);
                    });
                };
                var this_9 = this;
                for (var i = 0; i < dataListener.length; i++) {
                    _loop_10(i);
                }
                this.game.on(Dev.Enum.Listeners.OnGameAnimAction, this.onGameAnimationAction.bind(this));
            };
            MainStage.prototype.setVisualPortrait = function () {
            };
            MainStage.prototype.setVisualLandscape = function () {
            };
            MainStage.prototype.dispose = function () {
            };
            return MainStage;
        }(Core.Modules.Stage));
        Stages.MainStage = MainStage;
    })(Stages = Dev.Stages || (Dev.Stages = {}));
})(Dev || (Dev = {}));
