"use strict";
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
exports.MeetingTranscriber = void 0;
var Exports_1 = require("../../common.speech/Exports");
var Exports_2 = require("../../common/Exports");
var Contracts_1 = require("../Contracts");
var Exports_3 = require("../Exports");
var Exports_4 = require("./Exports");
var MeetingTranscriber = /** @class */ (function () {
    /**
     * MeetingTranscriber constructor.
     * @constructor
     * @param {AudioConfig} audioConfig - An optional audio configuration associated with the recognizer
     */
    function MeetingTranscriber(audioConfig) {
        this.privAudioConfig = audioConfig;
        this.privProperties = new Exports_3.PropertyCollection();
        this.privRecognizer = undefined;
        this.privDisposedRecognizer = false;
    }
    Object.defineProperty(MeetingTranscriber.prototype, "speechRecognitionLanguage", {
        /**
         * Gets the spoken language of recognition.
         * @member MeetingTranscriber.prototype.speechRecognitionLanguage
         * @function
         * @public
         * @returns {string} The spoken language of recognition.
         */
        get: function () {
            Contracts_1.Contracts.throwIfDisposed(this.privDisposedRecognizer);
            return this.properties.getProperty(Exports_3.PropertyId.SpeechServiceConnection_RecoLanguage);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MeetingTranscriber.prototype, "properties", {
        /**
         * The collection of properties and their values defined for this MeetingTranscriber.
         * @member MeetingTranscriber.prototype.properties
         * @function
         * @public
         * @returns {PropertyCollection} The collection of properties and their values defined for this MeetingTranscriber.
         */
        get: function () {
            return this.privProperties;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MeetingTranscriber.prototype, "internalData", {
        /**
         * @Internal
         * Internal data member to support fromRecognizer* pattern methods on other classes.
         * Do not use externally, object returned will change without warning or notice.
         */
        get: function () {
            return this.privRecognizer.internalData;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MeetingTranscriber.prototype, "connection", {
        /**
         * @Deprecated
         * @Obsolete
         * Please use the Connection.fromRecognizer pattern to obtain a connection object
         */
        get: function () {
            return Exports_3.Connection.fromRecognizer(this.privRecognizer);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(MeetingTranscriber.prototype, "authorizationToken", {
        /**
         * Gets the authorization token used to communicate with the service.
         * @member MeetingTranscriber.prototype.authorizationToken
         * @function
         * @public
         * @returns {string} Authorization token.
         */
        get: function () {
            return this.properties.getProperty(Exports_3.PropertyId.SpeechServiceAuthorization_Token);
        },
        /**
         * Gets/Sets the authorization token used to communicate with the service.
         * @member MeetingTranscriber.prototype.authorizationToken
         * @function
         * @public
         * @param {string} token - Authorization token.
         */
        set: function (token) {
            Contracts_1.Contracts.throwIfNullOrWhitespace(token, "token");
            this.properties.setProperty(Exports_3.PropertyId.SpeechServiceAuthorization_Token, token);
        },
        enumerable: false,
        configurable: true
    });
    /**
     * @param {Meeting} meeting - meeting to be recognized
     */
    MeetingTranscriber.prototype.joinMeetingAsync = function (meeting, cb, err) {
        /* eslint-disable no-console */
        // console.log(">> MeetingTranscriber::joinMeetingAsync");
        /* eslint-enable no-console */
        var meetingImpl = meeting;
        Contracts_1.Contracts.throwIfNullOrUndefined(Exports_4.MeetingImpl, "Meeting");
        // ref the meeting object
        // create recognizer and subscribe to recognizer events
        this.privRecognizer = new Exports_1.TranscriberRecognizer(meeting.config, this.privAudioConfig);
        Contracts_1.Contracts.throwIfNullOrUndefined(this.privRecognizer, "Recognizer");
        this.privRecognizer.connectMeetingCallbacks(this);
        Exports_2.marshalPromiseToCallbacks(meetingImpl.connectTranscriberRecognizer(this.privRecognizer), cb, err);
    };
    /**
     * Starts meeting transcription, until stopTranscribingAsync() is called.
     * User must subscribe to events to receive transcription results.
     * @member MeetingTranscriber.prototype.startTranscribingAsync
     * @function
     * @public
     * @param cb - Callback invoked once the transcription has started.
     * @param err - Callback invoked in case of an error.
     */
    MeetingTranscriber.prototype.startTranscribingAsync = function (cb, err) {
        this.privRecognizer.startContinuousRecognitionAsync(cb, err);
    };
    /**
     * Starts meeting transcription, until stopTranscribingAsync() is called.
     * User must subscribe to events to receive transcription results.
     * @member MeetingTranscriber.prototype.stopTranscribingAsync
     * @function
     * @public
     * @param cb - Callback invoked once the transcription has started.
     * @param err - Callback invoked in case of an error.
     */
    MeetingTranscriber.prototype.stopTranscribingAsync = function (cb, err) {
        this.privRecognizer.stopContinuousRecognitionAsync(cb, err);
    };
    /**
     * Leave the current meeting. After this is called, you will no longer receive any events.
     */
    MeetingTranscriber.prototype.leaveMeetingAsync = function (cb, err) {
        var _this = this;
        this.privRecognizer.disconnectCallbacks();
        // eslint-disable-next-line
        Exports_2.marshalPromiseToCallbacks((function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            return [2 /*return*/];
        }); }); })(), cb, err);
    };
    /**
     * closes all external resources held by an instance of this class.
     * @member MeetingTranscriber.prototype.close
     * @function
     * @public
     */
    MeetingTranscriber.prototype.close = function (cb, errorCb) {
        Contracts_1.Contracts.throwIfDisposed(this.privDisposedRecognizer);
        Exports_2.marshalPromiseToCallbacks(this.dispose(true), cb, errorCb);
    };
    /**
     * Disposes any resources held by the object.
     * @member MeetingTranscriber.prototype.dispose
     * @function
     * @public
     * @param {boolean} disposing - true if disposing the object.
     */
    MeetingTranscriber.prototype.dispose = function (disposing) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.privDisposedRecognizer) {
                            return [2 /*return*/];
                        }
                        if (!!!this.privRecognizer) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.privRecognizer.close()];
                    case 1:
                        _a.sent();
                        this.privRecognizer = undefined;
                        _a.label = 2;
                    case 2:
                        if (disposing) {
                            this.privDisposedRecognizer = true;
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return MeetingTranscriber;
}());
exports.MeetingTranscriber = MeetingTranscriber;

//# sourceMappingURL=MeetingTranscriber.js.map
