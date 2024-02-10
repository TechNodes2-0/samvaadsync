// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
/* eslint-disable max-classes-per-file */
import { CancellationErrorCodePropertyName } from "../common.speech/Exports";
import { CancellationDetailsBase, CancellationErrorCode, CancellationReason, PropertyCollection, PropertyId, ResultReason, } from "./Exports";
export var SpeakerRecognitionResultType;
(function (SpeakerRecognitionResultType) {
    SpeakerRecognitionResultType[SpeakerRecognitionResultType["Verify"] = 0] = "Verify";
    SpeakerRecognitionResultType[SpeakerRecognitionResultType["Identify"] = 1] = "Identify";
})(SpeakerRecognitionResultType || (SpeakerRecognitionResultType = {}));
/**
 * Output format
 * @class SpeakerRecognitionResult
 */
export class SpeakerRecognitionResult {
    constructor(response, resultReason = ResultReason.RecognizedSpeaker, cancellationErrorCode = CancellationErrorCode.NoError, errorDetails = "") {
        this.privProperties = new PropertyCollection();
        const resultType = response.scenario === "TextIndependentIdentification" ? SpeakerRecognitionResultType.Identify : SpeakerRecognitionResultType.Verify;
        this.privReason = resultReason;
        if (this.privReason !== ResultReason.Canceled) {
            if (resultType === SpeakerRecognitionResultType.Identify) {
                this.privProfileId = response.identificationResult.identifiedProfile.profileId;
                this.privScore = response.identificationResult.identifiedProfile.score;
                this.privReason = ResultReason.RecognizedSpeakers;
            }
            else {
                this.privScore = response.verificationResult.score;
                if (response.verificationResult.recognitionResult.toLowerCase() !== "accept") {
                    this.privReason = ResultReason.NoMatch;
                }
                if (response.verificationResult.profileId !== undefined && response.verificationResult.profileId !== "") {
                    this.privProfileId = response.verificationResult.profileId;
                }
            }
        }
        else {
            this.privErrorDetails = errorDetails;
            this.privProperties.setProperty(CancellationErrorCodePropertyName, CancellationErrorCode[cancellationErrorCode]);
        }
        this.privProperties.setProperty(PropertyId.SpeechServiceResponse_JsonResult, JSON.stringify(response));
    }
    get properties() {
        return this.privProperties;
    }
    get reason() {
        return this.privReason;
    }
    get profileId() {
        return this.privProfileId;
    }
    get errorDetails() {
        return this.privErrorDetails;
    }
    get score() {
        return this.privScore;
    }
}
/**
 * @class SpeakerRecognitionCancellationDetails
 */
export class SpeakerRecognitionCancellationDetails extends CancellationDetailsBase {
    constructor(reason, errorDetails, errorCode) {
        super(reason, errorDetails, errorCode);
    }
    /**
     * Creates an instance of SpeakerRecognitionCancellationDetails object for the canceled SpeakerRecognitionResult
     * @member SpeakerRecognitionCancellationDetails.fromResult
     * @function
     * @public
     * @param {SpeakerRecognitionResult} result - The result that was canceled.
     * @returns {SpeakerRecognitionCancellationDetails} The cancellation details object being created.
     */
    static fromResult(result) {
        const reason = CancellationReason.Error;
        let errorCode = CancellationErrorCode.NoError;
        if (!!result.properties) {
            errorCode = CancellationErrorCode[result.properties.getProperty(CancellationErrorCodePropertyName, CancellationErrorCode[CancellationErrorCode.NoError])];
        }
        return new SpeakerRecognitionCancellationDetails(reason, result.errorDetails, errorCode);
    }
}

//# sourceMappingURL=SpeakerRecognitionResult.js.map
