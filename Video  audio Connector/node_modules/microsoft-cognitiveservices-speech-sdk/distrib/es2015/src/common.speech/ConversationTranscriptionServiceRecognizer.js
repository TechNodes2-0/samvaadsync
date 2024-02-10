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
import { CancellationErrorCode, OutputFormat, PropertyCollection, PropertyId, ResultReason, ConversationTranscriptionCanceledEventArgs, ConversationTranscriptionEventArgs, ConversationTranscriptionResult, } from "../sdk/Exports";
import { CancellationErrorCodePropertyName, DetailedSpeechPhrase, EnumTranslation, OutputFormatPropertyName, RecognitionStatus, ServiceRecognizerBase, SimpleSpeechPhrase, SpeechHypothesis, } from "./Exports";
// eslint-disable-next-line max-classes-per-file
export class ConversationTranscriptionServiceRecognizer extends ServiceRecognizerBase {
    constructor(authentication, connectionFactory, audioSource, recognizerConfig, conversationTranscriber) {
        super(authentication, connectionFactory, audioSource, recognizerConfig, conversationTranscriber);
        this.privConversationTranscriber = conversationTranscriber;
        this.setSpeakerDiarizationJson();
    }
    setSpeakerDiarizationJson() {
        if (this.privEnableSpeakerId) {
            const phraseDetection = this.privSpeechContext.getSection("phraseDetection");
            const speakerDiarization = {};
            speakerDiarization.mode = "Anonymous";
            speakerDiarization.audioSessionId = this.privDiarizationSessionId;
            speakerDiarization.audioOffsetMs = 0;
            phraseDetection.speakerDiarization = speakerDiarization;
            this.privSpeechContext.setSection("phraseDetection", phraseDetection);
        }
    }
    processTypeSpecificMessages(connectionMessage) {
        return __awaiter(this, void 0, void 0, function* () {
            let result;
            const resultProps = new PropertyCollection();
            resultProps.setProperty(PropertyId.SpeechServiceResponse_JsonResult, connectionMessage.textBody);
            let processed = false;
            switch (connectionMessage.path.toLowerCase()) {
                case "speech.hypothesis":
                case "speech.fragment":
                    const hypothesis = SpeechHypothesis.fromJSON(connectionMessage.textBody);
                    const offset = hypothesis.Offset + this.privRequestSession.currentTurnAudioOffset;
                    result = new ConversationTranscriptionResult(this.privRequestSession.requestId, ResultReason.RecognizingSpeech, hypothesis.Text, hypothesis.Duration, offset, hypothesis.Language, hypothesis.LanguageDetectionConfidence, undefined, // Speaker Id
                    undefined, connectionMessage.textBody, resultProps);
                    this.privRequestSession.onHypothesis(offset);
                    const ev = new ConversationTranscriptionEventArgs(result, hypothesis.Duration, this.privRequestSession.sessionId);
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
                    break;
                case "speech.phrase":
                    const simple = SimpleSpeechPhrase.fromJSON(connectionMessage.textBody);
                    const resultReason = EnumTranslation.implTranslateRecognitionResult(simple.RecognitionStatus);
                    this.privRequestSession.onPhraseRecognized(this.privRequestSession.currentTurnAudioOffset + simple.Offset + simple.Duration);
                    if (ResultReason.Canceled === resultReason) {
                        const cancelReason = EnumTranslation.implTranslateCancelResult(simple.RecognitionStatus);
                        const cancellationErrorCode = EnumTranslation.implTranslateCancelErrorCode(simple.RecognitionStatus);
                        yield this.cancelRecognitionLocal(cancelReason, cancellationErrorCode, EnumTranslation.implTranslateErrorDetails(cancellationErrorCode));
                    }
                    else {
                        if (!(this.privRequestSession.isSpeechEnded && resultReason === ResultReason.NoMatch && simple.RecognitionStatus !== RecognitionStatus.InitialSilenceTimeout)) {
                            if (this.privRecognizerConfig.parameters.getProperty(OutputFormatPropertyName) === OutputFormat[OutputFormat.Simple]) {
                                result = new ConversationTranscriptionResult(this.privRequestSession.requestId, resultReason, simple.DisplayText, simple.Duration, simple.Offset + this.privRequestSession.currentTurnAudioOffset, simple.Language, simple.LanguageDetectionConfidence, simple.SpeakerId, undefined, connectionMessage.textBody, resultProps);
                            }
                            else {
                                const detailed = DetailedSpeechPhrase.fromJSON(connectionMessage.textBody);
                                const totalOffset = detailed.Offset + this.privRequestSession.currentTurnAudioOffset;
                                const offsetCorrectedJson = detailed.getJsonWithCorrectedOffsets(totalOffset);
                                result = new ConversationTranscriptionResult(this.privRequestSession.requestId, resultReason, detailed.RecognitionStatus === RecognitionStatus.Success ? detailed.NBest[0].Display : undefined, detailed.Duration, totalOffset, detailed.Language, detailed.LanguageDetectionConfidence, simple.SpeakerId, undefined, offsetCorrectedJson, resultProps);
                            }
                            const event = new ConversationTranscriptionEventArgs(result, result.offset, this.privRequestSession.sessionId);
                            if (!!this.privConversationTranscriber.transcribed) {
                                try {
                                    this.privConversationTranscriber.transcribed(this.privConversationTranscriber, event);
                                    /* eslint-disable no-empty */
                                }
                                catch (error) {
                                    // Not going to let errors in the event handler
                                    // trip things up.
                                }
                            }
                        }
                    }
                    processed = true;
                    break;
                default:
                    break;
            }
            return processed;
        });
    }
    // Cancels recognition.
    cancelRecognition(sessionId, requestId, cancellationReason, errorCode, error) {
        const properties = new PropertyCollection();
        properties.setProperty(CancellationErrorCodePropertyName, CancellationErrorCode[errorCode]);
        if (!!this.privConversationTranscriber.canceled) {
            const cancelEvent = new ConversationTranscriptionCanceledEventArgs(cancellationReason, error, errorCode, undefined, sessionId);
            try {
                this.privConversationTranscriber.canceled(this.privConversationTranscriber, cancelEvent);
                /* eslint-disable no-empty */
            }
            catch (_a) { }
        }
    }
}

//# sourceMappingURL=ConversationTranscriptionServiceRecognizer.js.map
