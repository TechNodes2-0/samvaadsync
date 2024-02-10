import { SpeakerRecognitionModel } from "./SpeakerRecognitionModel";
import { VoiceProfile } from "./Exports";
/**
 * Defines SpeakerVerificationModel class for Speaker Recognition
 * Model contains a profile against which to verify a speaker
 * @class SpeakerVerificationModel
 */
export declare class SpeakerVerificationModel implements SpeakerRecognitionModel {
    private privVoiceProfile;
    private constructor();
    static fromProfile(profile: VoiceProfile): SpeakerVerificationModel;
    get voiceProfile(): VoiceProfile;
    get profileIds(): string[];
    get scenario(): string;
}
