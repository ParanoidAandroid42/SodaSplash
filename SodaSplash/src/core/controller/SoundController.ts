module Dev.Common.Controller {

    export abstract class SoundController {
        private _soundFXVolume: number;
        private _backgroundSoundVolume: number;

        private _isMuteSound: boolean = true;
        private _isMuteMusic: boolean = false;
        private _isMuteSoundFx: boolean = false;

        /** SoundController class's init function. SoundController is a singleton class */
        public constructor() {
            this._soundFXVolume = .5;
            this._backgroundSoundVolume = 1;
        }

        /** mute background sound  */
        public muteBackgroundSound(): void {
        }

        /** mute specials sound */
        public muteSpecialsSound() {
        }

        /** mute sound(specials + background)*/
        public muteSound(mute: boolean) {
            if (mute) {
                this.muteSpecialsSound();
                this.muteBackgroundSound();
            } else {
                this.unMuteSpecialsSound();
                this.unMuteBackgroundSound();
            }
        }

        /** unmute specials sound */
        public unMuteSpecialsSound(): void {
        }

        /** unmute background sound  */
        public unMuteBackgroundSound(): void {
        }

        /** is mute music(background sounds)? */
        public isMuteMusic(index: boolean) {
            this._isMuteMusic = index;
            if (!this._isMuteMusic && this._isMuteSound) {
                this.unMuteBackgroundSound();
            } else {
                this.muteBackgroundSound();
            }
        }

        /** is mute soundFx(special sounds)? */
        public isMuteSoundFx(index: boolean) {
            this._isMuteSoundFx = index;
            if (!this._isMuteSoundFx && this._isMuteSound) {
                this.unMuteSpecialsSound();
            } else {
                this.muteSpecialsSound();
            }
        }

        /** is mute sounds(specials + background)*/
        public isMuteSound(index: boolean) {
            this._isMuteSound = index;
            if (this._isMuteSound) {
                this.isMuteSoundFx(this._isMuteSoundFx);
                this.isMuteMusic(this._isMuteMusic);
            } else {
                this.muteSound(false);
            }
        }
    }
}