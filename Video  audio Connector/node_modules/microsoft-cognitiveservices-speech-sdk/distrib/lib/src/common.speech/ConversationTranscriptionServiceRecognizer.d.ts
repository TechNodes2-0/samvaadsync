import { IAudioSource } from "../common/Exports";
import { CancellationErrorCode, CancellationReason, ConversationTranscriber } from "../sdk/Exports";
import { ServiceRecognizerBase } from "./Exports";
import { IAuthentication } from "./IAuthentication";
import { IConnectionFactory } from "./IConnectionFactory";
import { RecognizerConfig } from "./RecognizerConfig";
import { SpeechConnectionMessage } from "./SpeechConnectionMessage.Internal";
export declare class ConversationTranscriptionServiceRecognizer extends ServiceRecognizerBase {
    private privConversationTranscriber;
    constructor(authentication: IAuthentication, connectionFactory: IConnectionFactory, audioSource: IAudioSource, recognizerConfig: RecognizerConfig, conversationTranscriber: ConversationTranscriber);
    protected setSpeakerDiarizationJson(): void;
    protected processTypeSpecificMessages(connectionMessage: SpeechConnectionMessage): Promise<boolean>;
    protected cancelRecognition(sessionId: string, requestId: string, cancellationReason: CancellationReason, errorCode: CancellationErrorCode, error: string): void;
}
