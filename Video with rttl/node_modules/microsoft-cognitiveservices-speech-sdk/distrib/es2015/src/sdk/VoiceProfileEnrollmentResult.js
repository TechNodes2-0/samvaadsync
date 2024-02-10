// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
/* eslint-disable max-classes-per-file */
import { CancellationErrorCodePropertyName } from "../common.speech/Exports";
import { CancellationDetailsBase, CancellationErrorCode, CancellationReason, PropertyCollection, ResultReason } from "./Exports";
/**
 * Output format
 * @class VoiceProfileEnrollmentResult
 */
export class VoiceProfileEnrollmentResult {
    constructor(reason, json, statusText) {
        this.privReason = reason;
        this.privProperties = new PropertyCollection();
        if (this.privReason !== ResultReason.Canceled) {
            if (!!json) {
                this.privDetails = JSON.parse(json);
                if (this.privDetails.enrollmentStatus.toLowerCase() === "enrolling") {
                    this.privReason = ResultReason.EnrollingVoiceProfile;
                }
            }
        }
        else {
            this.privErrorDetails = statusText;
            this.privProperties.setProperty(CancellationErrorCodePropertyName, CancellationErrorCode[CancellationErrorCode.ServiceError]);
        }
    }
    get reason() {
        return this.privReason;
    }
    get enrollmentsCount() {
        return this.privDetails.enrollmentsCount;
    }
    get enrollmentsLength() {
        return this.privDetails.enrollmentsLength;
    }
    get properties() {
        return this.privProperties;
    }
    get enrollmentResultDetails() {
        return this.privDetails;
    }
    get errorDetails() {
        return this.privErrorDetails;
    }
    static FromIdentificationProfileList(json) {
        const results = [];
        for (const item of json.value) {
            const reason = item.enrollmentStatus.toLowerCase() === "enrolling" ?
                ResultReason.EnrollingVoiceProfile : item.enrollmentStatus.toLowerCase() === "enrolled" ?
                ResultReason.EnrolledVoiceProfile : ResultReason.Canceled;
            const result = new VoiceProfileEnrollmentResult(reason, null, null);
            result.privDetails = this.getIdentificationDetails(item);
            results.push(result);
        }
        return results;
    }
    static FromVerificationProfileList(json) {
        const results = [];
        for (const item of json.value) {
            const reason = item.enrollmentStatus.toLowerCase() === "enrolling" ?
                ResultReason.EnrollingVoiceProfile : item.enrollmentStatus.toLowerCase() === "enrolled" ?
                ResultReason.EnrolledVoiceProfile : ResultReason.Canceled;
            const result = new VoiceProfileEnrollmentResult(reason, null, null);
            result.privDetails = this.getVerificationDetails(item);
            results.push(result);
        }
        return results;
    }
    static getIdentificationDetails(json) {
        return {
            audioLength: json.audioLength ? parseFloat(json.audioLength) : 0,
            audioSpeechLength: json.audioSpeechLength ? parseFloat(json.audioSpeechLength) : 0,
            enrollmentStatus: json.enrollmentStatus,
            enrollmentsCount: json.enrollmentsCount || 0,
            enrollmentsLength: json.enrollmentsLength ? parseFloat(json.enrollmentsLength) : 0,
            enrollmentsSpeechLength: json.enrollmentsSpeechLength ? parseFloat(json.enrollmentsSpeechLength) : 0,
            profileId: json.profileId || json.identificationProfileId,
            remainingEnrollmentsSpeechLength: json.remainingEnrollmentsSpeechLength ? parseFloat(json.remainingEnrollmentsSpeechLength) : 0
        };
    }
    static getVerificationDetails(json) {
        return {
            audioLength: json.audioLength ? parseFloat(json.audioLength) : 0,
            audioSpeechLength: json.audioSpeechLength ? parseFloat(json.audioSpeechLength) : 0,
            enrollmentStatus: json.enrollmentStatus,
            enrollmentsCount: json.enrollmentsCount,
            enrollmentsLength: json.enrollmentsLength ? parseFloat(json.enrollmentsLength) : 0,
            enrollmentsSpeechLength: json.enrollmentsSpeechLength ? parseFloat(json.enrollmentsSpeechLength) : 0,
            profileId: json.profileId || json.verificationProfileId,
            remainingEnrollmentsCount: json.remainingEnrollments || json.remainingEnrollmentsCount,
            remainingEnrollmentsSpeechLength: json.remainingEnrollmentsSpeechLength ? parseFloat(json.remainingEnrollmentsSpeechLength) : 0
        };
    }
}
/**
 * @class VoiceProfileEnrollmentCancellationDetails
 */
export class VoiceProfileEnrollmentCancellationDetails extends CancellationDetailsBase {
    constructor(reason, errorDetails, errorCode) {
        super(reason, errorDetails, errorCode);
    }
    /**
     * Creates an instance of VoiceProfileEnrollmentCancellationDetails object for the canceled VoiceProfileEnrollmentResult.
     * @member VoiceProfileEnrollmentCancellationDetails.fromResult
     * @function
     * @public
     * @param {VoiceProfileEnrollmentResult} result - The result that was canceled.
     * @returns {VoiceProfileEnrollmentCancellationDetails} The cancellation details object being created.
     */
    static fromResult(result) {
        const reason = CancellationReason.Error;
        let errorCode = CancellationErrorCode.NoError;
        if (!!result.properties) {
            errorCode = CancellationErrorCode[result.properties.getProperty(CancellationErrorCodePropertyName, CancellationErrorCode[CancellationErrorCode.NoError])]; //eslint-disable-line
        }
        return new VoiceProfileEnrollmentCancellationDetails(reason, result.errorDetails, errorCode);
    }
}

//# sourceMappingURL=VoiceProfileEnrollmentResult.js.map
