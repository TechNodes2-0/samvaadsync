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
exports.SpeakerRecognitionCancellationDetails = exports.SpeakerRecognitionResult = exports.SpeakerRecognitionResultType = void 0;
/* eslint-disable max-classes-per-file */
var Exports_1 = require("../common.speech/Exports");
var Exports_2 = require("./Exports");
var SpeakerRecognitionResultType;
(function (SpeakerRecognitionResultType) {
    SpeakerRecognitionResultType[SpeakerRecognitionResultType["Verify"] = 0] = "Verify";
    SpeakerRecognitionResultType[SpeakerRecognitionResultType["Identify"] = 1] = "Identify";
})(SpeakerRecognitionResultType = exports.SpeakerRecognitionResultType || (exports.SpeakerRecognitionResultType = {}));
/**
 * Output format
 * @class SpeakerRecognitionResult
 */
var SpeakerRecognitionResult = /** @class */ (function () {
    function SpeakerRecognitionResult(response, resultReason, cancellationErrorCode, errorDetails) {
        if (resultReason === void 0) { resultReason = Exports_2.ResultReason.RecognizedSpeaker; }
        if (cancellationErrorCode === void 0) { cancellationErrorCode = Exports_2.CancellationErrorCode.NoError; }
        if (errorDetails === void 0) { errorDetails = ""; }
        this.privProperties = new Exports_2.PropertyCollection();
        var resultType = response.scenario === "TextIndependentIdentification" ? SpeakerRecognitionResultType.Identify : SpeakerRecognitionResultType.Verify;
        this.privReason = resultReason;
        if (this.privReason !== Exports_2.ResultReason.Canceled) {
            if (resultType === SpeakerRecognitionResultType.Identify) {
                this.privProfileId = response.identificationResult.identifiedProfile.profileId;
                this.privScore = response.identificationResult.identifiedProfile.score;
                this.privReason = Exports_2.ResultReason.RecognizedSpeakers;
            }
            else {
                this.privScore = response.verificationResult.score;
                if (response.verificationResult.recognitionResult.toLowerCase() !== "accept") {
                    this.privReason = Exports_2.ResultReason.NoMatch;
                }
                if (response.verificationResult.profileId !== undefined && response.verificationResult.profileId !== "") {
                    this.privProfileId = response.verificationResult.profileId;
                }
            }
        }
        else {
            this.privErrorDetails = errorDetails;
            this.privProperties.setProperty(Exports_1.CancellationErrorCodePropertyName, Exports_2.CancellationErrorCode[cancellationErrorCode]);
        }
        this.privProperties.setProperty(Exports_2.PropertyId.SpeechServiceResponse_JsonResult, JSON.stringify(response));
    }
    Object.defineProperty(SpeakerRecognitionResult.prototype, "properties", {
        get: function () {
            return this.privProperties;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeakerRecognitionResult.prototype, "reason", {
        get: function () {
            return this.privReason;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeakerRecognitionResult.prototype, "profileId", {
        get: function () {
            return this.privProfileId;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeakerRecognitionResult.prototype, "errorDetails", {
        get: function () {
            return this.privErrorDetails;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeakerRecognitionResult.prototype, "score", {
        get: function () {
            return this.privScore;
        },
        enumerable: false,
        configurable: true
    });
    return SpeakerRecognitionResult;
}());
exports.SpeakerRecognitionResult = SpeakerRecognitionResult;
/**
 * @class SpeakerRecognitionCancellationDetails
 */
var SpeakerRecognitionCancellationDetails = /** @class */ (function (_super) {
    __extends(SpeakerRecognitionCancellationDetails, _super);
    function SpeakerRecognitionCancellationDetails(reason, errorDetails, errorCode) {
        return _super.call(this, reason, errorDetails, errorCode) || this;
    }
    /**
     * Creates an instance of SpeakerRecognitionCancellationDetails object for the canceled SpeakerRecognitionResult
     * @member SpeakerRecognitionCancellationDetails.fromResult
     * @function
     * @public
     * @param {SpeakerRecognitionResult} result - The result that was canceled.
     * @returns {SpeakerRecognitionCancellationDetails} The cancellation details object being created.
     */
    SpeakerRecognitionCancellationDetails.fromResult = function (result) {
        var reason = Exports_2.CancellationReason.Error;
        var errorCode = Exports_2.CancellationErrorCode.NoError;
        if (!!result.properties) {
            errorCode = Exports_2.CancellationErrorCode[result.properties.getProperty(Exports_1.CancellationErrorCodePropertyName, Exports_2.CancellationErrorCode[Exports_2.CancellationErrorCode.NoError])];
        }
        return new SpeakerRecognitionCancellationDetails(reason, result.errorDetails, errorCode);
    };
    return SpeakerRecognitionCancellationDetails;
}(Exports_2.CancellationDetailsBase));
exports.SpeakerRecognitionCancellationDetails = SpeakerRecognitionCancellationDetails;

//# sourceMappingURL=SpeakerRecognitionResult.js.map
