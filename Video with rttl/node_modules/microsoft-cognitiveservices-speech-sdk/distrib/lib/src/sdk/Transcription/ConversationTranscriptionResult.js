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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationTranscriptionResult = void 0;
var Exports_1 = require("../Exports");
/**
 * Defines result of conversation transcription.
 * @class ConversationTranscriptionResult
 */
var ConversationTranscriptionResult = /** @class */ (function (_super) {
    __extends(ConversationTranscriptionResult, _super);
    /**
     * Creates and initializes an instance of this class.
     * @constructor
     * @public
     * @param {string} resultId - The result id.
     * @param {ResultReason} reason - The reason.
     * @param {string} text - The recognized text.
     * @param {number} duration - The duration.
     * @param {number} offset - The offset into the stream.
     * @param {string} language - Primary Language detected, if provided.
     * @param {string} languageDetectionConfidence - Primary Language confidence ("Unknown," "Low," "Medium," "High"...), if provided.
     * @param {string} speakerId - speaker id for conversation transcription.
     * @param {string} errorDetails - Error details, if provided.
     * @param {string} json - Additional Json, if provided.
     * @param {PropertyCollection} properties - Additional properties, if provided.
     */
    function ConversationTranscriptionResult(resultId, reason, text, duration, offset, language, languageDetectionConfidence, speakerId, errorDetails, json, properties) {
        var _this = _super.call(this, resultId, reason, text, duration, offset, language, languageDetectionConfidence, errorDetails, json, properties) || this;
        _this.privSpeakerId = speakerId;
        return _this;
    }
    Object.defineProperty(ConversationTranscriptionResult.prototype, "speakerId", {
        /**
         * speaker id
         * @member ConversationTranscriptionResult.prototype.speakerId
         * @function
         * @public
         * @returns {string} id of speaker in given result
         */
        get: function () {
            return this.privSpeakerId;
        },
        enumerable: false,
        configurable: true
    });
    return ConversationTranscriptionResult;
}(Exports_1.RecognitionResult));
exports.ConversationTranscriptionResult = ConversationTranscriptionResult;

//# sourceMappingURL=ConversationTranscriptionResult.js.map
