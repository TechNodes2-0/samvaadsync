import { IConnection } from "../common/Exports";
import { ConnectionFactoryBase } from "./ConnectionFactoryBase";
import { AuthInfo, RecognizerConfig } from "./Exports";
declare class SpeakerRecognitionConnectionFactoryBase extends ConnectionFactoryBase {
    create(config: RecognizerConfig, authInfo: AuthInfo, endpointPath: string, connectionId?: string): IConnection;
    private scenarioToPath;
}
export declare class SpeakerRecognitionConnectionFactory extends SpeakerRecognitionConnectionFactoryBase {
    create(config: RecognizerConfig, authInfo: AuthInfo, connectionId?: string): IConnection;
}
export declare class VoiceProfileConnectionFactory extends SpeakerRecognitionConnectionFactoryBase {
    create(config: RecognizerConfig, authInfo: AuthInfo, connectionId?: string): IConnection;
}
export {};
