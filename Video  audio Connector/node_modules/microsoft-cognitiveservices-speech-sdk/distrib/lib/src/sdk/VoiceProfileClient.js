"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoiceProfileClient = void 0;
var Exports_1 = require("../common.speech/Exports");
var AudioConfig_1 = require("./Audio/AudioConfig");
var Contracts_1 = require("./Contracts");
var Exports_2 = require("./Exports");
/**
 * Defines VoiceProfileClient class for Speaker Recognition
 * Handles operations from user for Voice Profile operations (e.g. createProfile, deleteProfile)
 * @class VoiceProfileClient
 */
var VoiceProfileClient = /** @class */ (function (_super) {
    __extends(VoiceProfileClient, _super);
    /**
     * VoiceProfileClient constructor.
     * @constructor
     * @param {SpeechConfig} speechConfig - An set of initial properties for this synthesizer (authentication key, region, &c)
     */
    function VoiceProfileClient(speechConfig) {
        var _this = this;
        Contracts_1.Contracts.throwIfNullOrUndefined(speechConfig, "speechConfig");
        var speechConfigImpl = speechConfig;
        Contracts_1.Contracts.throwIfNull(speechConfigImpl, "speechConfig");
        _this = _super.call(this, AudioConfig_1.AudioConfig.fromStreamInput(Exports_2.AudioInputStream.createPushStream()), speechConfigImpl.properties, new Exports_1.VoiceProfileConnectionFactory()) || this;
        _this.privProperties = speechConfigImpl.properties.clone();
        _this.privVoiceAdapter = _this.privReco;
        _this.privDisposedVoiceAdapter = false;
        return _this;
    }
    Object.defineProperty(VoiceProfileClient.prototype, "properties", {
        /**
         * The collection of properties and their values defined for this VoiceProfileClient.
         * @member VoiceProfileClient.prototype.properties
         * @function
         * @public
         * @returns {PropertyCollection} The collection of properties and their values defined for this VoiceProfileClient.
         */
        get: function () {
            return this.privProperties;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VoiceProfileClient.prototype, "authorizationToken", {
        /**
         * Gets the authorization token used to communicate with the service.
         * @member VoiceProfileClient.prototype.authorizationToken
         * @function
         * @public
         * @returns {string} Authorization token.
         */
        get: function () {
            return this.properties.getProperty(Exports_2.PropertyId.SpeechServiceAuthorization_Token);
        },
        /**
         * Gets/Sets the authorization token used to communicate with the service.
         * @member VoiceProfileClient.prototype.authorizationToken
         * @function
         * @public
         * @param {string} token - Authorization token.
         */
        set: function (token) {
            Contracts_1.Contracts.throwIfNullOrWhitespace(token, "token");
            this.properties.setProperty(Exports_2.PropertyId.SpeechServiceAuthorization_Token, token);
        },
        enumerable: false,
        configurable: true
    });
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
    VoiceProfileClient.prototype.createProfileAsync = function (profileType, lang) {
        return __awaiter(this, void 0, void 0, function () {
            var profileIds;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.privVoiceAdapter.createProfile(profileType, lang)];
                    case 1:
                        profileIds = _a.sent();
                        return [2 /*return*/, new Exports_2.VoiceProfile(profileIds[0], profileType)];
                }
            });
        });
    };
    /**
     * Get current information of a voice profile
     * @member VoiceProfileClient.prototype.retrieveEnrollmentResultAsync
     * @function
     * @public
     * @async
     * @param {VoiceProfile} profile Voice Profile to retrieve info for
     * @return {Promise<VoiceProfileEnrollmentResult>} - Promise of a VoiceProfileEnrollmentResult.
     */
    VoiceProfileClient.prototype.retrieveEnrollmentResultAsync = function (profile) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.privVoiceAdapter.retrieveEnrollmentResult(profile)];
            });
        });
    };
    /**
     * Get all voice profiles on account with given voice profile type
     * @member VoiceProfileClient.prototype.getAllProfilesAsync
     * @function
     * @public
     * @async
     * @param {VoiceProfileType} profileType profile type (identification/verification) for which to list profiles
     * @return {Promise<VoiceProfileEnrollmentResult[]>} - Promise of an array of VoiceProfileEnrollmentResults.
     */
    VoiceProfileClient.prototype.getAllProfilesAsync = function (profileType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.privVoiceAdapter.getAllProfiles(profileType)];
            });
        });
    };
    /**
     * Get valid authorization phrases for voice profile enrollment
     * @member VoiceProfileClient.prototype.getActivationPhrasesAsync
     * @function
     * @public
     * @async
     * @param {VoiceProfileType} profileType Profile Type to get activation phrases for
     * @param {string} lang Language string (locale) for Voice Profile
     */
    VoiceProfileClient.prototype.getActivationPhrasesAsync = function (profileType, lang) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.privVoiceAdapter.getActivationPhrases(profileType, lang)];
            });
        });
    };
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
    VoiceProfileClient.prototype.enrollProfileAsync = function (profile, audioConfig) {
        return __awaiter(this, void 0, void 0, function () {
            var configImpl;
            return __generator(this, function (_a) {
                configImpl = audioConfig;
                Contracts_1.Contracts.throwIfNullOrUndefined(configImpl, "audioConfig");
                this.audioConfig = audioConfig;
                this.privVoiceAdapter.SpeakerAudioSource = configImpl;
                return [2 /*return*/, this.privVoiceAdapter.enrollProfile(profile)];
            });
        });
    };
    /**
     * Delete a speaker recognition voice profile
     * @member VoiceProfileClient.prototype.deleteProfileAsync
     * @function
     * @public
     * @async
     * @param {VoiceProfile} profile Voice Profile to be deleted
     * @return {Promise<VoiceProfileResult>} - Promise of a VoiceProfileResult.
     */
    VoiceProfileClient.prototype.deleteProfileAsync = function (profile) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.privVoiceAdapter.deleteProfile(profile)];
            });
        });
    };
    /**
     * Remove all enrollments for a speaker recognition voice profile
     * @member VoiceProfileClient.prototype.resetProfileAsync
     * @function
     * @public
     * @async
     * @param {VoiceProfile} profile Voice Profile to be reset
     * @return {Promise<VoiceProfileResult>} - Promise of a VoiceProfileResult.
     */
    VoiceProfileClient.prototype.resetProfileAsync = function (profile) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.privVoiceAdapter.resetProfile(profile)];
            });
        });
    };
    /**
     * Clean up object and close underlying connection
     * @member VoiceProfileClient.prototype.close
     * @function
     * @async
     * @public
     */
    VoiceProfileClient.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dispose(true)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    VoiceProfileClient.prototype.createServiceRecognizer = function (authentication, connectionFactory, audioConfig, recognizerConfig) {
        var audioImpl = audioConfig;
        return new Exports_1.VoiceServiceRecognizer(authentication, connectionFactory, audioImpl, recognizerConfig, this);
    };
    VoiceProfileClient.prototype.dispose = function (disposing) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.privDisposedVoiceAdapter) {
                            return [2 /*return*/];
                        }
                        this.privDisposedVoiceAdapter = true;
                        if (!disposing) return [3 /*break*/, 2];
                        return [4 /*yield*/, _super.prototype.dispose.call(this, disposing)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    VoiceProfileClient.prototype.createRecognizerConfig = function (speechConfig) {
        return new Exports_1.RecognizerConfig(speechConfig, this.properties);
    };
    VoiceProfileClient.prototype.getResult = function (result, successReason) {
        var response = new Exports_2.VoiceProfileResult(result.ok ? successReason : Exports_2.ResultReason.Canceled, result.statusText);
        return (response);
    };
    return VoiceProfileClient;
}(Exports_2.Recognizer));
exports.VoiceProfileClient = VoiceProfileClient;

//# sourceMappingURL=VoiceProfileClient.js.map
