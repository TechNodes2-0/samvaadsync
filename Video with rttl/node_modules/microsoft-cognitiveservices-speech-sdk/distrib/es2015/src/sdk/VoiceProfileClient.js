// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { RecognizerConfig, VoiceProfileConnectionFactory, VoiceServiceRecognizer } from "../common.speech/Exports";
import { AudioConfig } from "./Audio/AudioConfig";
import { Contracts } from "./Contracts";
import { AudioInputStream, PropertyId, Recognizer, ResultReason, VoiceProfile, VoiceProfileResult } from "./Exports";
/**
 * Defines VoiceProfileClient class for Speaker Recognition
 * Handles operations from user for Voice Profile operations (e.g. createProfile, deleteProfile)
 * @class VoiceProfileClient
 */
export class VoiceProfileClient extends Recognizer {
    /**
     * VoiceProfileClient constructor.
     * @constructor
     * @param {SpeechConfig} speechConfig - An set of initial properties for this synthesizer (authentication key, region, &c)
     */
    constructor(speechConfig) {
        Contracts.throwIfNullOrUndefined(speechConfig, "speechConfig");
        const speechConfigImpl = speechConfig;
        Contracts.throwIfNull(speechConfigImpl, "speechConfig");
        super(AudioConfig.fromStreamInput(AudioInputStream.createPushStream()), speechConfigImpl.properties, new VoiceProfileConnectionFactory());
        this.privProperties = speechConfigImpl.properties.clone();
        this.privVoiceAdapter = this.privReco;
        this.privDisposedVoiceAdapter = false;
    }
    /**
     * The collection of properties and their values defined for this VoiceProfileClient.
     * @member VoiceProfileClient.prototype.properties
     * @function
     * @public
     * @returns {PropertyCollection} The collection of properties and their values defined for this VoiceProfileClient.
     */
    get properties() {
        return this.privProperties;
    }
    /**
     * Gets the authorization token used to communicate with the service.
     * @member VoiceProfileClient.prototype.authorizationToken
     * @function
     * @public
     * @returns {string} Authorization token.
     */
    get authorizationToken() {
        return this.properties.getProperty(PropertyId.SpeechServiceAuthorization_Token);
    }
    /**
     * Gets/Sets the authorization token used to communicate with the service.
     * @member VoiceProfileClient.prototype.authorizationToken
     * @function
     * @public
     * @param {string} token - Authorization token.
     */
    set authorizationToken(token) {
        Contracts.throwIfNullOrWhitespace(token, "token");
        this.properties.setProperty(PropertyId.SpeechServiceAuthorization_Token, token);
    }
    /**
     * Create a speaker recognition voice profile
     * @member VoiceProfileClient.prototype.createProfileAsync
     * @function
     * @public
     * @async
     * @param {VoiceProfileType} profileType Type of Voice Profile to be created
     * @param {string} lang Language string (locale) for Voice Profile
     * @return {Promise<VoiceProfile>} - Promise of a VoiceProfile.
     */
    createProfileAsync(profileType, lang) {
        return __awaiter(this, void 0, void 0, function* () {
            const profileIds = yield this.privVoiceAdapter.createProfile(profileType, lang);
            return new VoiceProfile(profileIds[0], profileType);
        });
    }
    /**
     * Get current information of a voice profile
     * @member VoiceProfileClient.prototype.retrieveEnrollmentResultAsync
     * @function
     * @public
     * @async
     * @param {VoiceProfile} profile Voice Profile to retrieve info for
     * @return {Promise<VoiceProfileEnrollmentResult>} - Promise of a VoiceProfileEnrollmentResult.
     */
    retrieveEnrollmentResultAsync(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.privVoiceAdapter.retrieveEnrollmentResult(profile);
        });
    }
    /**
     * Get all voice profiles on account with given voice profile type
     * @member VoiceProfileClient.prototype.getAllProfilesAsync
     * @function
     * @public
     * @async
     * @param {VoiceProfileType} profileType profile type (identification/verification) for which to list profiles
     * @return {Promise<VoiceProfileEnrollmentResult[]>} - Promise of an array of VoiceProfileEnrollmentResults.
     */
    getAllProfilesAsync(profileType) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.privVoiceAdapter.getAllProfiles(profileType);
            /*
            const result: { json: { value: EnrollmentResultJSON[] } } = await this.privAdapter.getProfiles(profileType);
            if (profileType === VoiceProfileType.TextIndependentIdentification) {
                return VoiceProfileEnrollmentResult.FromIdentificationProfileList(result.json);
            }
            return VoiceProfileEnrollmentResult.FromVerificationProfileList(result.json);
            */
        });
    }
    /**
     * Get valid authorization phrases for voice profile enrollment
     * @member VoiceProfileClient.prototype.getActivationPhrasesAsync
     * @function
     * @public
     * @async
     * @param {VoiceProfileType} profileType Profile Type to get activation phrases for
     * @param {string} lang Language string (locale) for Voice Profile
     */
    getActivationPhrasesAsync(profileType, lang) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.privVoiceAdapter.getActivationPhrases(profileType, lang);
        });
    }
    /**
     * Create a speaker recognition voice profile
     * @member VoiceProfileClient.prototype.enrollProfileAsync
     * @function
     * @public
     * @async
     * @param {VoiceProfile} profile Voice Profile to create enrollment for
     * @param {AudioConfig} audioConfig source info from which to create enrollment
     * @return {Promise<VoiceProfileEnrollmentResult>} - Promise of a VoiceProfileEnrollmentResult.
     */
    enrollProfileAsync(profile, audioConfig) {
        return __awaiter(this, void 0, void 0, function* () {
            const configImpl = audioConfig;
            Contracts.throwIfNullOrUndefined(configImpl, "audioConfig");
            this.audioConfig = audioConfig;
            this.privVoiceAdapter.SpeakerAudioSource = configImpl;
            return this.privVoiceAdapter.enrollProfile(profile);
        });
    }
    /**
     * Delete a speaker recognition voice profile
     * @member VoiceProfileClient.prototype.deleteProfileAsync
     * @function
     * @public
     * @async
     * @param {VoiceProfile} profile Voice Profile to be deleted
     * @return {Promise<VoiceProfileResult>} - Promise of a VoiceProfileResult.
     */
    deleteProfileAsync(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.privVoiceAdapter.deleteProfile(profile);
        });
    }
    /**
     * Remove all enrollments for a speaker recognition voice profile
     * @member VoiceProfileClient.prototype.resetProfileAsync
     * @function
     * @public
     * @async
     * @param {VoiceProfile} profile Voice Profile to be reset
     * @return {Promise<VoiceProfileResult>} - Promise of a VoiceProfileResult.
     */
    resetProfileAsync(profile) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.privVoiceAdapter.resetProfile(profile);
        });
    }
    /**
     * Clean up object and close underlying connection
     * @member VoiceProfileClient.prototype.close
     * @function
     * @async
     * @public
     */
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dispose(true);
        });
    }
    createServiceRecognizer(authentication, connectionFactory, audioConfig, recognizerConfig) {
        const audioImpl = audioConfig;
        return new VoiceServiceRecognizer(authentication, connectionFactory, audioImpl, recognizerConfig, this);
    }
    dispose(disposing) {
        const _super = Object.create(null, {
            dispose: { get: () => super.dispose }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (this.privDisposedVoiceAdapter) {
                return;
            }
            this.privDisposedVoiceAdapter = true;
            if (disposing) {
                yield _super.dispose.call(this, disposing);
            }
        });
    }
    createRecognizerConfig(speechConfig) {
        return new RecognizerConfig(speechConfig, this.properties);
    }
    getResult(result, successReason) {
        const response = new VoiceProfileResult(result.ok ? successReason : ResultReason.Canceled, result.statusText);
        return (response);
    }
}

//# sourceMappingURL=VoiceProfileClient.js.map
