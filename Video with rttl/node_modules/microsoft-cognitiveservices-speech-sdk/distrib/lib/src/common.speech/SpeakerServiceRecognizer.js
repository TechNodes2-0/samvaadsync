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
exports.SpeakerServiceRecognizer = void 0;
var Exports_1 = require("../common.browser/Exports");
var Exports_2 = require("../common/Exports");
var Exports_3 = require("../sdk/Exports");
var Exports_4 = require("./Exports");
var SpeechConnectionMessage_Internal_1 = require("./SpeechConnectionMessage.Internal");
// eslint-disable-next-line max-classes-per-file
var SpeakerServiceRecognizer = /** @class */ (function (_super) {
    __extends(SpeakerServiceRecognizer, _super);
    function SpeakerServiceRecognizer(authentication, connectionFactory, audioSource, recognizerConfig, recognizer) {
        var _this = _super.call(this, authentication, connectionFactory, audioSource, recognizerConfig, recognizer) || this;
        _this.privSpeakerRecognizer = recognizer;
        _this.privSpeakerAudioSource = audioSource;
        _this.recognizeSpeaker = function (model) { return _this.recognizeSpeakerOnce(model); };
        _this.sendPrePayloadJSONOverride = function () { return _this.noOp(); };
        return _this;
    }
    SpeakerServiceRecognizer.prototype.processTypeSpecificMessages = function (connectionMessage) {
        var processed = false;
        var resultProps = new Exports_3.PropertyCollection();
        if (connectionMessage.messageType === Exports_2.MessageType.Text) {
            resultProps.setProperty(Exports_3.PropertyId.SpeechServiceResponse_JsonResult, connectionMessage.textBody);
        }
        switch (connectionMessage.path.toLowerCase()) {
            case "speaker.response":
                var response = JSON.parse(connectionMessage.textBody);
                var result = void 0;
                if (response.status.statusCode.toLowerCase() !== "success") {
                    result = new Exports_3.SpeakerRecognitionResult(response, Exports_3.ResultReason.Canceled, Exports_3.CancellationErrorCode.ServiceError, response.status.reason);
                }
                else {
                    result = new Exports_3.SpeakerRecognitionResult(response, Exports_3.ResultReason.RecognizedSpeaker);
                }
                if (!!this.privResultDeferral) {
                    this.privResultDeferral.resolve(result);
                }
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
    SpeakerServiceRecognizer.prototype.cancelRecognition = function (sessionId, requestId, cancellationReason, errorCode, error) {
        var properties = new Exports_3.PropertyCollection();
        properties.setProperty(Exports_4.CancellationErrorCodePropertyName, Exports_3.CancellationErrorCode[errorCode]);
        if (!!this.privResultDeferral) {
            var result = new Exports_3.SpeakerRecognitionResult({
                scenario: this.privSpeakerModel.scenario,
                status: { statusCode: error, reason: error }
            }, Exports_3.ResultReason.Canceled, errorCode, error);
            try {
                this.privResultDeferral.resolve(result);
            }
            catch (error) {
                this.privResultDeferral.reject(error);
            }
        }
    };
    SpeakerServiceRecognizer.prototype.recognizeSpeakerOnce = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var conPromise, preAudioPromise, node, format, deviceInfo, audioNode, err_1, sessionStartEventArgs, audioSendPromise;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.privSpeakerModel = model;
                        this.voiceProfileType = model.scenario;
                        if (!this.privResultDeferral) {
                            this.privResultDeferral = new Exports_2.Deferred();
                        }
                        this.privRequestSession.startNewRecognition();
                        this.privRequestSession.listenForServiceTelemetry(this.privSpeakerAudioSource.events);
                        this.privRecognizerConfig.parameters.setProperty(Exports_3.PropertyId.Speech_SessionId, this.privRequestSession.sessionId);
                        conPromise = this.connectImpl();
                        preAudioPromise = this.sendPreAudioMessages(this.extractSpeakerContext(model));
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
                        err_1 = _a.sent();
                        this.cancelRecognition(this.privRequestSession.sessionId, this.privRequestSession.requestId, Exports_3.CancellationReason.Error, Exports_3.CancellationErrorCode.ConnectionFailure, err_1);
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
                        return [2 /*return*/, this.privResultDeferral.promise];
                }
            });
        });
    };
    SpeakerServiceRecognizer.prototype.sendPreAudioMessages = function (context) {
        return __awaiter(this, void 0, void 0, function () {
            var connection;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.fetchConnection()];
                    case 1:
                        connection = _a.sent();
                        return [4 /*yield*/, this.sendSpeakerRecognition(connection, context)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SpeakerServiceRecognizer.prototype.sendSpeakerRecognition = function (connection, context) {
        return __awaiter(this, void 0, void 0, function () {
            var speakerContextJson;
            return __generator(this, function (_a) {
                speakerContextJson = JSON.stringify(context);
                return [2 /*return*/, connection.send(new SpeechConnectionMessage_Internal_1.SpeechConnectionMessage(Exports_2.MessageType.Text, "speaker.context", this.privRequestSession.requestId, "application/json; charset=utf-8", speakerContextJson))];
            });
        });
    };
    SpeakerServiceRecognizer.prototype.extractSpeakerContext = function (model) {
        return {
            features: {
                interimResult: "enabled",
                progressiveDetection: "disabled",
            },
            profileIds: model.profileIds,
            scenario: model.scenario,
        };
    };
    return SpeakerServiceRecognizer;
}(Exports_4.ServiceRecognizerBase));
exports.SpeakerServiceRecognizer = SpeakerServiceRecognizer;

//# sourceMappingURL=SpeakerServiceRecognizer.js.map
