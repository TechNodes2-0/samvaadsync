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
exports.ConversationTranscriptionServiceRecognizer = void 0;
var Exports_1 = require("../sdk/Exports");
var Exports_2 = require("./Exports");
// eslint-disable-next-line max-classes-per-file
var ConversationTranscriptionServiceRecognizer = /** @class */ (function (_super) {
    __extends(ConversationTranscriptionServiceRecognizer, _super);
    function ConversationTranscriptionServiceRecognizer(authentication, connectionFactory, audioSource, recognizerConfig, conversationTranscriber) {
        var _this = _super.call(this, authentication, connectionFactory, audioSource, recognizerConfig, conversationTranscriber) || this;
        _this.privConversationTranscriber = conversationTranscriber;
        _this.setSpeakerDiarizationJson();
        return _this;
    }
    ConversationTranscriptionServiceRecognizer.prototype.setSpeakerDiarizationJson = function () {
        if (this.privEnableSpeakerId) {
            var phraseDetection = this.privSpeechContext.getSection("phraseDetection");
            var speakerDiarization = {};
            speakerDiarization.mode = "Anonymous";
            speakerDiarization.audioSessionId = this.privDiarizationSessionId;
            speakerDiarization.audioOffsetMs = 0;
            phraseDetection.speakerDiarization = speakerDiarization;
            this.privSpeechContext.setSection("phraseDetection", phraseDetection);
        }
    };
    ConversationTranscriptionServiceRecognizer.prototype.processTypeSpecificMessages = function (connectionMessage) {
        return __awaiter(this, void 0, void 0, function () {
            var result, resultProps, processed, _a, hypothesis, offset, ev, simple, resultReason, cancelReason, cancellationErrorCode, detailed, totalOffset, offsetCorrectedJson, event_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        resultProps = new Exports_1.PropertyCollection();
                        resultProps.setProperty(Exports_1.PropertyId.SpeechServiceResponse_JsonResult, connectionMessage.textBody);
                        processed = false;
                        _a = connectionMessage.path.toLowerCase();
                        switch (_a) {
                            case "speech.hypothesis": return [3 /*break*/, 1];
                            case "speech.fragment": return [3 /*break*/, 1];
                            case "speech.phrase": return [3 /*break*/, 2];
                        }
                        return [3 /*break*/, 6];
                    case 1:
                        hypothesis = Exports_2.SpeechHypothesis.fromJSON(connectionMessage.textBody);
                        offset = hypothesis.Offset + this.privRequestSession.currentTurnAudioOffset;
                        result = new Exports_1.ConversationTranscriptionResult(this.privRequestSession.requestId, Exports_1.ResultReason.RecognizingSpeech, hypothesis.Text, hypothesis.Duration, offset, hypothesis.Language, hypothesis.LanguageDetectionConfidence, undefined, // Speaker Id
                        undefined, connectionMessage.textBody, resultProps);
                        this.privRequestSession.onHypothesis(offset);
                        ev = new Exports_1.ConversationTranscriptionEventArgs(result, hypothesis.Duration, this.privRequestSession.sessionId);
                        if (!!this.privConversationTranscriber.transcribing) {
                            try {
                                this.privConversationTranscriber.transcribing(this.privConversationTranscriber, ev);
                                /* eslint-disable no-empty */
                            }
                            catch (error) {
                                // Not going to let errors in the event handler
                                // trip things up.
                            }
                        }
                        processed = true;
                        return [3 /*break*/, 7];
                    case 2:
                        simple = Exports_2.SimpleSpeechPhrase.fromJSON(connectionMessage.textBody);
                        resultReason = Exports_2.EnumTranslation.implTranslateRecognitionResult(simple.RecognitionStatus);
                        this.privRequestSession.onPhraseRecognized(this.privRequestSession.currentTurnAudioOffset + simple.Offset + simple.Duration);
                        if (!(Exports_1.ResultReason.Canceled === resultReason)) return [3 /*break*/, 4];
                        cancelReason = Exports_2.EnumTranslation.implTranslateCancelResult(simple.RecognitionStatus);
                        cancellationErrorCode = Exports_2.EnumTranslation.implTranslateCancelErrorCode(simple.RecognitionStatus);
                        return [4 /*yield*/, this.cancelRecognitionLocal(cancelReason, cancellationErrorCode, Exports_2.EnumTranslation.implTranslateErrorDetails(cancellationErrorCode))];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        if (!(this.privRequestSession.isSpeechEnded && resultReason === Exports_1.ResultReason.NoMatch && simple.RecognitionStatus !== Exports_2.RecognitionStatus.InitialSilenceTimeout)) {
                            if (this.privRecognizerConfig.parameters.getProperty(Exports_2.OutputFormatPropertyName) === Exports_1.OutputFormat[Exports_1.OutputFormat.Simple]) {
                                result = new Exports_1.ConversationTranscriptionResult(this.privRequestSession.requestId, resultReason, simple.DisplayText, simple.Duration, simple.Offset + this.privRequestSession.currentTurnAudioOffset, simple.Language, simple.LanguageDetectionConfidence, simple.SpeakerId, undefined, connectionMessage.textBody, resultProps);
                            }
                            else {
                                detailed = Exports_2.DetailedSpeechPhrase.fromJSON(connectionMessage.textBody);
                                totalOffset = detailed.Offset + this.privRequestSession.currentTurnAudioOffset;
                                offsetCorrectedJson = detailed.getJsonWithCorrectedOffsets(totalOffset);
                                result = new Exports_1.ConversationTranscriptionResult(this.privRequestSession.requestId, resultReason, detailed.RecognitionStatus === Exports_2.RecognitionStatus.Success ? detailed.NBest[0].Display : undefined, detailed.Duration, totalOffset, detailed.Language, detailed.LanguageDetectionConfidence, simple.SpeakerId, undefined, offsetCorrectedJson, resultProps);
                            }
                            event_1 = new Exports_1.ConversationTranscriptionEventArgs(result, result.offset, this.privRequestSession.sessionId);
                            if (!!this.privConversationTranscriber.transcribed) {
                                try {
                                    this.privConversationTranscriber.transcribed(this.privConversationTranscriber, event_1);
                                    /* eslint-disable no-empty */
                                }
                                catch (error) {
                                    // Not going to let errors in the event handler
                                    // trip things up.
                                }
                            }
                        }
                        _b.label = 5;
                    case 5:
                        processed = true;
                        return [3 /*break*/, 7];
                    case 6: return [3 /*break*/, 7];
                    case 7: return [2 /*return*/, processed];
                }
            });
        });
    };
    // Cancels recognition.
    ConversationTranscriptionServiceRecognizer.prototype.cancelRecognition = function (sessionId, requestId, cancellationReason, errorCode, error) {
        var properties = new Exports_1.PropertyCollection();
        properties.setProperty(Exports_2.CancellationErrorCodePropertyName, Exports_1.CancellationErrorCode[errorCode]);
        if (!!this.privConversationTranscriber.canceled) {
            var cancelEvent = new Exports_1.ConversationTranscriptionCanceledEventArgs(cancellationReason, error, errorCode, undefined, sessionId);
            try {
                this.privConversationTranscriber.canceled(this.privConversationTranscriber, cancelEvent);
                /* eslint-disable no-empty */
            }
            catch (_a) { }
        }
    };
    return ConversationTranscriptionServiceRecognizer;
}(Exports_2.ServiceRecognizerBase));
exports.ConversationTranscriptionServiceRecognizer = ConversationTranscriptionServiceRecognizer;

//# sourceMappingURL=ConversationTranscriptionServiceRecognizer.js.map
