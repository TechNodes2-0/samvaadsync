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
import { RecognizerConfig, SpeakerRecognitionConnectionFactory, SpeakerServiceRecognizer } from "../common.speech/Exports";
import { Contracts } from "./Contracts";
import { PropertyId, Recognizer, } from "./Exports";
/**
 * Defines SpeakerRecognizer class for Speaker Recognition
 * Handles operations from user for Voice Profile operations (e.g. createProfile, deleteProfile)
 * @class SpeakerRecognizer
 */
export class SpeakerRecognizer extends Recognizer {
    /**
     * Initializes an instance of the SpeakerRecognizer.
     * @constructor
     * @param {SpeechConfig} speechConfig - The set of configuration properties.
     * @param {AudioConfig} audioConfig - An optional audio input config associated with the recognizer
     */
    constructor(speechConfig, audioConfig) {
        Contracts.throwIfNullOrUndefined(speechConfig, "speechConfig");
        const configImpl = speechConfig;
        Contracts.throwIfNullOrUndefined(configImpl, "speechConfig");
        super(audioConfig, configImpl.properties, new SpeakerRecognitionConnectionFactory());
        this.privAudioConfigImpl = audioConfig;
        Contracts.throwIfNull(this.privAudioConfigImpl, "audioConfig");
        this.privDisposedSpeakerRecognizer = false;
        this.privProperties = configImpl.properties;
    }
    /**
     * Gets the authorization token used to communicate with the service.
     * @member SpeakerRecognizer.prototype.authorizationToken
     * @function
     * @public
     * @returns {string} Authorization token.
     */
    get authorizationToken() {
        return this.properties.getProperty(PropertyId.SpeechServiceAuthorization_Token);
    }
    /**
     * Gets/Sets the authorization token used to communicate with the service.
     * @member SpeakerRecognizer.prototype.authorizationToken
     * @function
     * @public
     * @param {string} token - Authorization token.
     */
    set authorizationToken(token) {
        Contracts.throwIfNullOrWhitespace(token, "token");
        this.properties.setProperty(PropertyId.SpeechServiceAuthorization_Token, token);
    }
    /**
     * The collection of properties and their values defined for this SpeakerRecognizer.
     * @member SpeakerRecognizer.prototype.properties
     * @function
     * @public
     * @returns {PropertyCollection} The collection of properties and their values defined for this SpeakerRecognizer.
     */
    get properties() {
        return this.privProperties;
    }
    /**
     * Get recognition result for model using given audio
     * @member SpeakerRecognizer.prototype.recognizeOnceAsync
     * @function
     * @public
     * @async
     * @param {SpeakerIdentificationModel | SpeakerVerificationModel} model Model containing Voice Profiles to be identified
     * @param cb - Callback invoked once result is returned.
     * @param err - Callback invoked in case of an error.
     */
    recognizeOnceAsync(model) {
        return __awaiter(this, void 0, void 0, function* () {
            Contracts.throwIfDisposed(this.privDisposedSpeakerRecognizer);
            return this.recognizeSpeakerOnceAsyncImpl(model);
        });
    }
    /**
     * Included for compatibility
     * @member SpeakerRecognizer.prototype.close
     * @function
     * @public
     * @async
     */
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            Contracts.throwIfDisposed(this.privDisposedSpeakerRecognizer);
            yield this.dispose(true);
        });
    }
    recognizeSpeakerOnceAsyncImpl(model) {
        return __awaiter(this, void 0, void 0, function* () {
            Contracts.throwIfDisposed(this.privDisposedSpeakerRecognizer);
            yield this.implRecognizerStop();
            const result = yield this.privReco.recognizeSpeaker(model);
            yield this.implRecognizerStop();
            return result;
        });
    }
    implRecognizerStop() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.privReco) {
                yield this.privReco.stopRecognizing();
            }
            return;
        });
    }
    createRecognizerConfig(speechConfig) {
        return new RecognizerConfig(speechConfig, this.privProperties);
    }
    createServiceRecognizer(authentication, connectionFactory, audioConfig, recognizerConfig) {
        const audioImpl = audioConfig;
        return new SpeakerServiceRecognizer(authentication, connectionFactory, audioImpl, recognizerConfig, this);
    }
    dispose(disposing) {
        const _super = Object.create(null, {
            dispose: { get: () => super.dispose }
        });
        return __awaiter(this, void 0, void 0, function* () {
            if (this.privDisposedSpeakerRecognizer) {
                return;
            }
            if (disposing) {
                this.privDisposedSpeakerRecognizer = true;
                yield _super.dispose.call(this, disposing);
            }
        });
    }
}

//# sourceMappingURL=SpeakerRecognizer.js.map
