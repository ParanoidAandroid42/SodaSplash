module Dev.Common.Controller {
    export abstract class SoundController {
        private _soundFXVolume: number;
        private _backgroundSoundVolume: number;

        private _isMuteSound: boolean = true;
        private _isMuteMusic: boolean = false;
        private _isMuteSoundFx: boolean = false;

        /** Constructor for the SoundController class. Initializes the class as a singleton. */
        public constructor() {
            this._soundFXVolume = 0.5;
            this._backgroundSoundVolume = 1;
        }

        /** Mutes background sound. */
        public muteBackgroundSound(): void {
            // Implementation for muting background sound
        }

        /** Mutes special sounds. */
        public muteSpecialsSound(): void {
            // Implementation for muting special sounds
        }

        /**
         * Mutes or unmutes all sounds (specials + background).
         * @param mute Boolean indicating whether to mute or unmute all sounds.
         */
        public muteSound(mute: boolean): void {
            if (mute) {
                this.muteSpecialsSound();
                this.muteBackgroundSound();
            } else {
                this.unMuteSpecialsSound();
                this.unMuteBackgroundSound();
            }
        }

        /** Unmutes special sounds. */
        public unMuteSpecialsSound(): void {
            // Implementation for unmuting special sounds
        }

        /** Unmutes background sound. */
        public unMuteBackgroundSound(): void {
            // Implementation for unmuting background sound
        }

        /**
         * Sets the mute status for background music.
         * @param mute Boolean indicating whether to mute or unmute background music.
         */
        public setMuteMusic(mute: boolean): void {
            if (!mute && this._isMuteSound) {
                this.unMuteBackgroundSound();
            } else {
                this.muteBackgroundSound();
            }
            this._isMuteMusic = mute;
        }

        /**
         * Sets the mute status for sound effects.
         * @param mute Boolean indicating whether to mute or unmute sound effects.
         */
        public setMuteSoundFx(mute: boolean): void {
            if (!mute && this._isMuteSound) {
                this.unMuteSpecialsSound();
            } else {
                this.muteSpecialsSound();
            }
            this._isMuteSoundFx = mute;
        }

        /**
         * Sets the mute status for all sounds (specials + background).
         * @param mute Boolean indicating whether to mute or unmute all sounds.
         */
        public setMuteSound(mute: boolean): void {
            if (mute) {
                this.setMuteSoundFx(this._isMuteSoundFx);
                this.setMuteMusic(mute);
            } else {
                this.muteSound(false);
            }
            this._isMuteSound = mute;
        }
    }
}
