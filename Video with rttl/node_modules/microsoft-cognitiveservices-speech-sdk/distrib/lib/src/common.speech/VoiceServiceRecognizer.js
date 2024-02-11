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
exports.VoiceServiceRecognizer = void 0;
var Exports_1 = require("../common.browser/Exports");
var Exports_2 = require("../common/Exports");
var Exports_3 = require("../sdk/Exports");
var Exports_4 = require("./Exports");
var SpeechConnectionMessage_Internal_1 = require("./SpeechConnectionMessage.Internal");
// eslint-disable-next-line max-classes-per-file
var VoiceServiceRecognizer = /** @class */ (function (_super) {
    __extends(VoiceServiceRecognizer, _super);
    function VoiceServiceRecognizer(authentication, connectionFactory, audioSource, recognizerConfig, recognizer) {
        var _this = _super.call(this, authentication, connectionFactory, audioSource, recognizerConfig, recognizer) || this;
        _this.privDeferralMap = new Exports_2.DeferralMap();
        _this.privSpeakerAudioSource = audioSource;
        _this.sendPrePayloadJSONOverride = function () { return _this.noOp(); };
        return _this;
    }
    Object.defineProperty(VoiceServiceRecognizer.prototype, "SpeakerAudioSource", {
        set: function (audioSource) {
            this.privSpeakerAudioSource = audioSource;
        },
        enumerable: false,
        configurable: true
    });
    VoiceServiceRecognizer.prototype.processTypeSpecificMessages = function (connectionMessage) {
        var processed = false;
        var resultProps = new Exports_3.PropertyCollection();
        if (connectionMessage.messageType === Exports_2.MessageType.Text) {
            resultProps.setProperty(Exports_3.PropertyId.SpeechServiceResponse_JsonResult, connectionMessage.textBody);
        }
        switch (connectionMessage.path.toLowerCase()) {
            // Profile management response for create, fetch, delete, reset
            case "speaker.profiles":
                var response = JSON.parse(connectionMessage.textBody);
                switch (response.operation.toLowerCase()) {
                    case "create":
                        this.handleCreateResponse(response, connectionMessage.requestId);
                        break;
                    case "delete":
                    case "reset":
                        this.handleResultResponse(response, connectionMessage.requestId);
                        break;
                    case "fetch":
                        var enrollmentResponse_1 = JSON.parse(connectionMessage.textBody);
                        this.handleFetchResponse(enrollmentResponse_1, connectionMessage.requestId);
                        break;
                    default:
                        break;
                }
                processed = true;
                break;
            // Activation and authorization phrase response
            case "speaker.phrases":
                var phraseResponse = JSON.parse(connectionMessage.textBody);
                this.handlePhrasesResponse(phraseResponse, connectionMessage.requestId);
                processed = true;
                break;
            // Enrollment response
            case "speaker.profile.enrollment":
                var enrollmentResponse = JSON.parse(connectionMessage.textBody);
                var result = new Exports_3.VoiceProfileEnrollmentResult(this.enrollmentReasonFrom(!!enrollmentResponse.enrollment ? enrollmentResponse.enrollment.enrollmentStatus : enrollmentResponse.status.statusCode), !!enrollmentResponse.enrollment ? JSON.stringify(enrollmentResponse.enrollment) : undefined, enrollmentResponse.status.reason);
                if (!!this.privDeferralMap.getId(connectionMessage.requestId)) {
                    this.privDeferralMap.complete(connectionMessage.requestId, result);
                }
                this.privRequestSession.onSpeechEnded();
                processed = true;
                break;
            default:
                break;
        }
        var defferal = new Exports_2.Deferred();
        defferal.resolve(processed);
        return defferal.promise;
    };
    // Cancels recognition.
    VoiceServiceRecognizer.prototype.cancelRecognition = function (sessionId, requestId, cancellationReason, errorCode, error) {
        var properties = new Exports_3.PropertyCollection();
        // const enrollmentResponse: EnrollmentResponse = JSON.parse(connectionMessage.textBody) as EnrollmentResponse;
        properties.setProperty(Exports_4.CancellationErrorCodePropertyName, Exports_3.CancellationErrorCode[errorCode]);
        var result = new Exports_3.VoiceProfileEnrollmentResult(Exports_3.ResultReason.Canceled, error, error);
        if (!!this.privDeferralMap.getId(requestId)) {
            this.privDeferralMap.complete(requestId, result);
        }
    };
    VoiceServiceRecognizer.prototype.createProfile = function (profileType, locale) {
        return __awaiter(this, void 0, void 0, function () {
            var conPromise, createProfileDeferral, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        // Start the connection to the service. The promise this will create is stored and will be used by configureConnection().
                        this.voiceProfileType = profileType.toString();
                        conPromise = this.connectImpl();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        createProfileDeferral = new Exports_2.Deferred();
                        return [4 /*yield*/, conPromise];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.sendCreateProfile(createProfileDeferral, profileType, locale)];
                    case 3:
                        _a.sent();
                        void this.receiveMessage();
                        return [2 /*return*/, createProfileDeferral.promise];
                    case 4:
                        err_1 = _a.sent();
                        throw err_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    VoiceServiceRecognizer.prototype.resetProfile = function (profile) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.voiceProfileType = profile.profileType.toString();
                return [2 /*return*/, this.sendCommonRequest("reset", profile.profileType, profile)];
            });
        });
    };
    VoiceServiceRecognizer.prototype.deleteProfile = function (profile) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.voiceProfileType = profile.profileType.toString();
                return [2 /*return*/, this.sendCommonRequest("delete", profile.profileType, profile)];
            });
        });
    };
    VoiceServiceRecognizer.prototype.retrieveEnrollmentResult = function (profile) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.voiceProfileType = profile.profileType.toString();
                this.privExpectedProfileId = profile.profileId;
                return [2 /*return*/, this.sendCommonRequest("fetch", profile.profileType, profile)];
            });
        });
    };
    VoiceServiceRecognizer.prototype.getAllProfiles = function (profileType) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.voiceProfileType = profileType.toString();
                return [2 /*return*/, this.sendCommonRequest("fetch", profileType)];
            });
        });
    };
    VoiceServiceRecognizer.prototype.getActivationPhrases = function (profileType, lang) {
        return __awaiter(this, void 0, void 0, function () {
            var conPromise, getPhrasesDeferral, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.voiceProfileType = profileType.toString();
                        conPromise = this.connectImpl();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        getPhrasesDeferral = new Exports_2.Deferred();
                        return [4 /*yield*/, conPromise];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.sendPhrasesRequest(getPhrasesDeferral, profileType, lang)];
                    case 3:
                        _a.sent();
                        void this.receiveMessage();
                        return [2 /*return*/, getPhrasesDeferral.promise];
                    case 4:
                        err_2 = _a.sent();
                        throw err_2;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    VoiceServiceRecognizer.prototype.enrollProfile = function (profile) {
        return __awaiter(this, void 0, void 0, function () {
            var enrollmentDeferral, conPromise, preAudioPromise, node, format, deviceInfo, audioNode, err_3, sessionStartEventArgs, audioSendPromise;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.voiceProfileType = profile.profileType.toString();
                        enrollmentDeferral = new Exports_2.Deferred();
                        this.privRequestSession.startNewRecognition();
                        this.privRequestSession.listenForServiceTelemetry(this.privSpeakerAudioSource.events);
                        this.privRecognizerConfig.parameters.setProperty(Exports_3.PropertyId.Speech_SessionId, this.privRequestSession.sessionId);
                        conPromise = this.connectImpl();
                        preAudioPromise = this.sendPreAudioMessages(profile, enrollmentDeferral);
                        return [4 /*yield*/, this.privSpeakerAudioSource.attach(this.privRequestSession.audioNodeId)];
                    case 1:
                        node = _a.sent();
                        return [4 /*yield*/, this.privSpeakerAudioSource.format];
                    case 2:
                        format = _a.sent();
                        return [4 /*yield*/, this.privSpeakerAudioSource.deviceInfo];
                    case 3:
                        deviceInfo = _a.sent();
                        audioNode = new Exports_1.ReplayableAudioNode(node, format.avgBytesPerSec);
                        return [4 /*yield*/, this.privRequestSession.onAudioSourceAttachCompleted(audioNode, false)];
                    case 4:
                        _a.sent();
                        this.privRecognizerConfig.SpeechServiceConfig.Context.audio = { source: deviceInfo };
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 8, , 9]);
                        return [4 /*yield*/, conPromise];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, preAudioPromise];
                    case 7:
                        _a.sent();
                        return [3 /*break*/, 9];
                    case 8:
                        err_3 = _a.sent();
                        this.cancelRecognition(this.privRequestSession.sessionId, this.privRequestSession.requestId, Exports_3.CancellationReason.Error, Exports_3.CancellationErrorCode.ConnectionFailure, err_3);
                        return [3 /*break*/, 9];
                    case 9:
                        sessionStartEventArgs = new Exports_3.SessionEventArgs(this.privRequestSession.sessionId);
                        if (!!this.privRecognizer.sessionStarted) {
                            this.privRecognizer.sessionStarted(this.privRecognizer, sessionStartEventArgs);
                        }
                        void this.receiveMessage();
                        audioSendPromise = this.sendAudio(audioNode);
                        // /* eslint-disable no-empty */
                        audioSendPromise.then(function () { }, function (error) {
                            _this.cancelRecognition(_this.privRequestSession.sessionId, _this.privRequestSession.requestId, Exports_3.CancellationReason.Error, Exports_3.CancellationErrorCode.RuntimeError, error);
                        });
                        return [2 /*return*/, enrollmentDeferral.promise];
                }
            });
        });
    };
    VoiceServiceRecognizer.prototype.sendPreAudioMessages = function (profile, enrollmentDeferral) {
        return __awaiter(this, void 0, void 0, function () {
            var connection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchConnection()];
                    case 1:
                        connection = _a.sent();
                        this.privRequestSession.onSpeechContext();
                        this.privDeferralMap.add(this.privRequestSession.requestId, enrollmentDeferral);
                        return [4 /*yield*/, this.sendBaseRequest(connection, "enroll", this.scenarioFrom(profile.profileType), profile)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    VoiceServiceRecognizer.prototype.sendPhrasesRequest = function (getPhrasesDeferral, profileType, locale) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, scenario, profileCreateRequest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchConnection()];
                    case 1:
                        connection = _a.sent();
                        this.privRequestSession.onSpeechContext();
                        this.privDeferralMap.add(this.privRequestSession.requestId, getPhrasesDeferral);
                        scenario = this.scenarioFrom(profileType);
                        profileCreateRequest = {
                            locale: locale,
                            scenario: scenario,
                        };
                        return [2 /*return*/, connection.send(new SpeechConnectionMessage_Internal_1.SpeechConnectionMessage(Exports_2.MessageType.Text, "speaker.profile.phrases", this.privRequestSession.requestId, "application/json; charset=utf-8", JSON.stringify(profileCreateRequest)))];
                }
            });
        });
    };
    VoiceServiceRecognizer.prototype.sendCreateProfile = function (createProfileDeferral, profileType, locale) {
        return __awaiter(this, void 0, void 0, function () {
            var connection, scenario, profileCreateRequest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchConnection()];
                    case 1:
                        connection = _a.sent();
                        this.privRequestSession.onSpeechContext();
                        this.privDeferralMap.add(this.privRequestSession.requestId, createProfileDeferral);
                        scenario = profileType === Exports_3.VoiceProfileType.TextIndependentIdentification ? "TextIndependentIdentification" :
                            profileType === Exports_3.VoiceProfileType.TextIndependentVerification ? "TextIndependentVerification" : "TextDependentVerification";
                        profileCreateRequest = {
                            locale: locale,
                            number: "1",
                            scenario: scenario,
                        };
                        return [2 /*return*/, connection.send(new SpeechConnectionMessage_Internal_1.SpeechConnectionMessage(Exports_2.MessageType.Text, "speaker.profile.create", this.privRequestSession.requestId, "application/json; charset=utf-8", JSON.stringify(profileCreateRequest)))];
                }
            });
        });
    };
    VoiceServiceRecognizer.prototype.sendCommonRequest = function (operation, profileType, profile) {
        if (profile === void 0) { profile = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            var conPromise, deferral, connection, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        conPromise = this.connectImpl();
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        deferral = new Exports_2.Deferred();
                        this.privRequestSession.onSpeechContext();
                        return [4 /*yield*/, conPromise];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.fetchConnection()];
                    case 3:
                        connection = _a.sent();
                        this.privDeferralMap.add(this.privRequestSession.requestId, deferral);
                        return [4 /*yield*/, this.sendBaseRequest(connection, operation, this.scenarioFrom(profileType), profile)];
                    case 4:
                        _a.sent();
                        void this.receiveMessage();
                        return [2 /*return*/, deferral.promise];
                    case 5:
                        err_4 = _a.sent();
                        throw err_4;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    VoiceServiceRecognizer.prototype.sendBaseRequest = function (connection, operation, scenario, profile) {
        return __awaiter(this, void 0, void 0, function () {
            var profileRequest;
            return __generator(this, function (_a) {
                profileRequest = {
                    scenario: scenario
                };
                if (!!profile) {
                    profileRequest.profileIds = [profile.profileId];
                }
                else {
                    profileRequest.maxPageSize = -1;
                }
                return [2 /*return*/, connection.send(new SpeechConnectionMessage_Internal_1.SpeechConnectionMessage(Exports_2.MessageType.Text, "speaker.profile." + operation, this.privRequestSession.requestId, "application/json; charset=utf-8", JSON.stringify(profileRequest)))];
            });
        });
    };
    VoiceServiceRecognizer.prototype.extractSpeakerContext = function (model) {
        return {
            features: {
                interimResult: "enabled",
                progressiveDetection: "disabled",
            },
            profileIds: model.profileIds,
            scenario: model.scenario,
        };
    };
    VoiceServiceRecognizer.prototype.handlePhrasesResponse = function (response, requestId) {
        if (!!this.privDeferralMap.getId(requestId)) {
            if (response.status.statusCode.toLowerCase() !== "success") {
                var reason = Exports_3.ResultReason.Canceled;
                var result = new Exports_3.VoiceProfilePhraseResult(reason, response.status.statusCode, response.passPhraseType, []);
                this.privDeferralMap.complete(requestId, result);
            }
            else if (!!response.phrases && response.phrases.length > 0) {
                var reason = Exports_3.ResultReason.EnrollingVoiceProfile;
                var result = new Exports_3.VoiceProfilePhraseResult(reason, response.status.statusCode, response.passPhraseType, response.phrases);
                this.privDeferralMap.complete(requestId, result);
            }
            else {
                throw new Error("Voice Profile get activation phrases failed, no phrases received");
            }
        }
        else {
            throw new Error("Voice Profile get activation phrases request for requestID " + requestId + " not found");
        }
    };
    VoiceServiceRecognizer.prototype.handleCreateResponse = function (response, requestId) {
        if (!!response.profiles && response.profiles.length > 0) {
            if (!!this.privDeferralMap.getId(requestId)) {
                var profileIds = response.profiles.map(function (profile) { return profile.profileId; });
                this.privDeferralMap.complete(requestId, profileIds);
            }
            else {
                throw new Error("Voice Profile create request for requestID " + requestId + " not found");
            }
        }
        else {
            throw new Error("Voice Profile create failed, no profile id received");
        }
    };
    VoiceServiceRecognizer.prototype.handleResultResponse = function (response, requestId) {
        if (!!this.privDeferralMap.getId(requestId)) {
            var successReason = response.operation.toLowerCase() === "delete" ? Exports_3.ResultReason.DeletedVoiceProfile : Exports_3.ResultReason.ResetVoiceProfile;
            var reason = response.status.statusCode.toLowerCase() === "success" ? successReason : Exports_3.ResultReason.Canceled;
            var result = new Exports_3.VoiceProfileResult(reason, "statusCode: " + response.status.statusCode + ", errorDetails: " + response.status.reason);
            this.privDeferralMap.complete(requestId, result);
        }
        else {
            throw new Error("Voice Profile create request for requestID " + requestId + " not found");
        }
    };
    VoiceServiceRecognizer.prototype.handleFetchResponse = function (enrollmentResponse, requestId) {
        if (!!this.privDeferralMap.getId(requestId) && !!enrollmentResponse.profiles[0]) {
            if (!!this.privExpectedProfileId && enrollmentResponse.profiles.length === 1 && enrollmentResponse.profiles[0].profileId === this.privExpectedProfileId) {
                this.privExpectedProfileId = undefined;
                var profileInfo = enrollmentResponse.profiles[0];
                var result = new Exports_3.VoiceProfileEnrollmentResult(this.enrollmentReasonFrom(profileInfo.enrollmentStatus), JSON.stringify(profileInfo), enrollmentResponse.status.reason);
                this.privDeferralMap.complete(requestId, result);
            }
            else if (enrollmentResponse.profiles.length > 0) {
                var iProfiles = enrollmentResponse.profiles;
                var profileResults = [];
                for (var _i = 0, iProfiles_1 = iProfiles; _i < iProfiles_1.length; _i++) {
                    var profile = iProfiles_1[_i];
                    profileResults.push(new Exports_3.VoiceProfileEnrollmentResult(this.enrollmentReasonFrom(profile.enrollmentStatus), JSON.stringify(profile), enrollmentResponse.status.reason));
                }
                this.privDeferralMap.complete(requestId, profileResults);
            }
        }
        else {
            throw new Error("Voice Profile fetch request for requestID " + requestId + " not found");
        }
    };
    VoiceServiceRecognizer.prototype.enrollmentReasonFrom = function (statusCode) {
        switch (statusCode.toLowerCase()) {
            case "enrolled":
                return Exports_3.ResultReason.EnrolledVoiceProfile;
            case "invalidlocale":
            case "invalidphrase":
            case "invalidaudioformat":
            case "invalidscenario":
            case "invalidprofilecount":
            case "invalidoperation":
            case "audiotooshort":
            case "audiotoolong":
            case "toomanyenrollments":
            case "storageconflict":
            case "profilenotfound":
            case "incompatibleprofiles":
            case "incompleteenrollment":
                return Exports_3.ResultReason.Canceled;
            default:
                return Exports_3.ResultReason.EnrollingVoiceProfile;
        }
    };
    VoiceServiceRecognizer.prototype.scenarioFrom = function (profileType) {
        return profileType === Exports_3.VoiceProfileType.TextIndependentIdentification ? "TextIndependentIdentification" :
            profileType === Exports_3.VoiceProfileType.TextIndependentVerification ? "TextIndependentVerification" : "TextDependentVerification";
    };
    return VoiceServiceRecognizer;
}(Exports_4.ServiceRecognizerBase));
exports.VoiceServiceRecognizer = VoiceServiceRecognizer;

//# sourceMappingURL=VoiceServiceRecognizer.js.map
