import { IAudioSource } from "../common/Exports";
import { SpeakerRecognitionModel } from "../sdk/SpeakerRecognitionModel";
import { CancellationErrorCode, CancellationReason, SpeakerRecognitionResult, SpeakerRecognizer } from "../sdk/Exports";
import { ServiceRecognizerBase } from "./Exports";
import { IAuthentication } from "./IAuthentication";
import { IConnectionFactory } from "./IConnectionFactory";
import { RecognizerConfig } from "./RecognizerConfig";
import { SpeechConnectionMessage } from "./SpeechConnectionMessage.Internal";
export declare class SpeakerServiceRecognizer extends ServiceRecognizerBase {
    private privSpeakerRecognizer;
    private privSpeakerAudioSource;
    private privResultDeferral;
    private privSpeakerModel;
    constructor(authentication: IAuthentication, connectionFactory: IConnectionFactory, audioSource: IAudioSource, recognizerConfig: RecognizerConfig, recognizer: SpeakerRecognizer);
    protected processTypeSpecificMessages(connectionMessage: SpeechConnectionMessage): Promise<boolean>;
    protected cancelRecognition(sessionId: string, requestId: string, cancellationReason: CancellationReason, errorCode: CancellationErrorCode, error: string): void;
    recognizeSpeakerOnce(model: SpeakerRecognitionModel): Promise<SpeakerRecognitionResult>;
    private sendPreAudioMessages;
    private sendSpeakerRecognition;
    private extractSpeakerContext;
}
