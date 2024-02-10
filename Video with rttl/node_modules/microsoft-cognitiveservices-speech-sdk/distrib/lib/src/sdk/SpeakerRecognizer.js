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
exports.SpeakerRecognizer = void 0;
var Exports_1 = require("../common.speech/Exports");
var Contracts_1 = require("./Contracts");
var Exports_2 = require("./Exports");
/**
 * Defines SpeakerRecognizer class for Speaker Recognition
 * Handles operations from user for Voice Profile operations (e.g. createProfile, deleteProfile)
 * @class SpeakerRecognizer
 */
var SpeakerRecognizer = /** @class */ (function (_super) {
    __extends(SpeakerRecognizer, _super);
    /**
     * Initializes an instance of the SpeakerRecognizer.
     * @constructor
     * @param {SpeechConfig} speechConfig - The set of configuration properties.
     * @param {AudioConfig} audioConfig - An optional audio input config associated with the recognizer
     */
    function SpeakerRecognizer(speechConfig, audioConfig) {
        var _this = this;
        Contracts_1.Contracts.throwIfNullOrUndefined(speechConfig, "speechConfig");
        var configImpl = speechConfig;
        Contracts_1.Contracts.throwIfNullOrUndefined(configImpl, "speechConfig");
        _this = _super.call(this, audioConfig, configImpl.properties, new Exports_1.SpeakerRecognitionConnectionFactory()) || this;
        _this.privAudioConfigImpl = audioConfig;
        Contracts_1.Contracts.throwIfNull(_this.privAudioConfigImpl, "audioConfig");
        _this.privDisposedSpeakerRecognizer = false;
        _this.privProperties = configImpl.properties;
        return _this;
    }
    Object.defineProperty(SpeakerRecognizer.prototype, "authorizationToken", {
        /**
         * Gets the authorization token used to communicate with the service.
         * @member SpeakerRecognizer.prototype.authorizationToken
         * @function
         * @public
         * @returns {string} Authorization token.
         */
        get: function () {
            return this.properties.getProperty(Exports_2.PropertyId.SpeechServiceAuthorization_Token);
        },
        /**
         * Gets/Sets the authorization token used to communicate with the service.
         * @member SpeakerRecognizer.prototype.authorizationToken
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
    Object.defineProperty(SpeakerRecognizer.prototype, "properties", {
        /**
         * The collection of properties and their values defined for this SpeakerRecognizer.
         * @member SpeakerRecognizer.prototype.properties
         * @function
         * @public
         * @returns {PropertyCollection} The collection of properties and their values defined for this SpeakerRecognizer.
         */
        get: function () {
            return this.privProperties;
        },
        enumerable: false,
        configurable: true
    });
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
    SpeakerRecognizer.prototype.recognizeOnceAsync = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                Contracts_1.Contracts.throwIfDisposed(this.privDisposedSpeakerRecognizer);
                return [2 /*return*/, this.recognizeSpeakerOnceAsyncImpl(model)];
            });
        });
    };
    /**
     * Included for compatibility
     * @member SpeakerRecognizer.prototype.close
     * @function
     * @public
     * @async
     */
    SpeakerRecognizer.prototype.close = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Contracts_1.Contracts.throwIfDisposed(this.privDisposedSpeakerRecognizer);
                        return [4 /*yield*/, this.dispose(true)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SpeakerRecognizer.prototype.recognizeSpeakerOnceAsyncImpl = function (model) {
        return __awaiter(this, void 0, void 0, function () {
            var result;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        Contracts_1.Contracts.throwIfDisposed(this.privDisposedSpeakerRecognizer);
                        return [4 /*yield*/, this.implRecognizerStop()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.privReco.recognizeSpeaker(model)];
                    case 2:
                        result = _a.sent();
                        return [4 /*yield*/, this.implRecognizerStop()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, result];
                }
            });
        });
    };
    SpeakerRecognizer.prototype.implRecognizerStop = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.privReco) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.privReco.stopRecognizing()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    SpeakerRecognizer.prototype.createRecognizerConfig = function (speechConfig) {
        return new Exports_1.RecognizerConfig(speechConfig, this.privProperties);
    };
    SpeakerRecognizer.prototype.createServiceRecognizer = function (authentication, connectionFactory, audioConfig, recognizerConfig) {
        var audioImpl = audioConfig;
        return new Exports_1.SpeakerServiceRecognizer(authentication, connectionFactory, audioImpl, recognizerConfig, this);
    };
    SpeakerRecognizer.prototype.dispose = function (disposing) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.privDisposedSpeakerRecognizer) {
                            return [2 /*return*/];
                        }
                        if (!disposing) return [3 /*break*/, 2];
                        this.privDisposedSpeakerRecognizer = true;
                        return [4 /*yield*/, _super.prototype.dispose.call(this, disposing)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    return SpeakerRecognizer;
}(Exports_2.Recognizer));
exports.SpeakerRecognizer = SpeakerRecognizer;

//# sourceMappingURL=SpeakerRecognizer.js.map
