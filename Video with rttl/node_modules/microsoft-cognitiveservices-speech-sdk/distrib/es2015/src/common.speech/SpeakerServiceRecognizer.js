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
import { ReplayableAudioNode } from "../common.browser/Exports";
import { Deferred, MessageType, } from "../common/Exports";
import { CancellationErrorCode, CancellationReason, SpeakerRecognitionResult, PropertyCollection, PropertyId, ResultReason, SessionEventArgs, } from "../sdk/Exports";
import { CancellationErrorCodePropertyName, ServiceRecognizerBase, } from "./Exports";
import { SpeechConnectionMessage } from "./SpeechConnectionMessage.Internal";
// eslint-disable-next-line max-classes-per-file
export class SpeakerServiceRecognizer extends ServiceRecognizerBase {
    constructor(authentication, connectionFactory, audioSource, recognizerConfig, recognizer) {
        super(authentication, connectionFactory, audioSource, recognizerConfig, recognizer);
        this.privSpeakerRecognizer = recognizer;
        this.privSpeakerAudioSource = audioSource;
        this.recognizeSpeaker = (model) => this.recognizeSpeakerOnce(model);
        this.sendPrePayloadJSONOverride = () => this.noOp();
    }
    processTypeSpecificMessages(connectionMessage) {
        let processed = false;
        const resultProps = new PropertyCollection();
        if (connectionMessage.messageType === MessageType.Text) {
            resultProps.setProperty(PropertyId.SpeechServiceResponse_JsonResult, connectionMessage.textBody);
        }
        switch (connectionMessage.path.toLowerCase()) {
            case "speaker.response":
                const response = JSON.parse(connectionMessage.textBody);
                let result;
                if (response.status.statusCode.toLowerCase() !== "success") {
                    result = new SpeakerRecognitionResult(response, ResultReason.Canceled, CancellationErrorCode.ServiceError, response.status.reason);
                }
                else {
                    result = new SpeakerRecognitionResult(response, ResultReason.RecognizedSpeaker);
                }
                if (!!this.privResultDeferral) {
                    this.privResultDeferral.resolve(result);
                }
                processed = true;
                break;
            default:
                break;
        }
        const defferal = new Deferred();
        defferal.resolve(processed);
        return defferal.promise;
    }
    // Cancels recognition.
    cancelRecognition(sessionId, requestId, cancellationReason, errorCode, error) {
        const properties = new PropertyCollection();
        properties.setProperty(CancellationErrorCodePropertyName, CancellationErrorCode[errorCode]);
        if (!!this.privResultDeferral) {
            const result = new SpeakerRecognitionResult({
                scenario: this.privSpeakerModel.scenario,
                status: { statusCode: error, reason: error }
            }, ResultReason.Canceled, errorCode, error);
            try {
                this.privResultDeferral.resolve(result);
            }
            catch (error) {
                this.privResultDeferral.reject(error);
            }
        }
    }
    recognizeSpeakerOnce(model) {
        return __awaiter(this, void 0, void 0, function* () {
            this.privSpeakerModel = model;
            this.voiceProfileType = model.scenario;
            if (!this.privResultDeferral) {
                this.privResultDeferral = new Deferred();
            }
            this.privRequestSession.startNewRecognition();
            this.privRequestSession.listenForServiceTelemetry(this.privSpeakerAudioSource.events);
            this.privRecognizerConfig.parameters.setProperty(PropertyId.Speech_SessionId, this.privRequestSession.sessionId);
            // Start the connection to the service. The promise this will create is stored and will be used by configureConnection().
            const conPromise = this.connectImpl();
            const preAudioPromise = this.sendPreAudioMessages(this.extractSpeakerContext(model));
            const node = yield this.privSpeakerAudioSource.attach(this.privRequestSession.audioNodeId);
            const format = yield this.privSpeakerAudioSource.format;
            const deviceInfo = yield this.privSpeakerAudioSource.deviceInfo;
            const audioNode = new ReplayableAudioNode(node, format.avgBytesPerSec);
            yield this.privRequestSession.onAudioSourceAttachCompleted(audioNode, false);
            this.privRecognizerConfig.SpeechServiceConfig.Context.audio = { source: deviceInfo };
            try {
                yield conPromise;
                yield preAudioPromise;
            }
            catch (err) {
                this.cancelRecognition(this.privRequestSession.sessionId, this.privRequestSession.requestId, CancellationReason.Error, CancellationErrorCode.ConnectionFailure, err);
            }
            const sessionStartEventArgs = new SessionEventArgs(this.privRequestSession.sessionId);
            if (!!this.privRecognizer.sessionStarted) {
                this.privRecognizer.sessionStarted(this.privRecognizer, sessionStartEventArgs);
            }
            void this.receiveMessage();
            const audioSendPromise = this.sendAudio(audioNode);
            // /* eslint-disable no-empty */
            audioSendPromise.then(() => { }, (error) => {
                this.cancelRecognition(this.privRequestSession.sessionId, this.privRequestSession.requestId, CancellationReason.Error, CancellationErrorCode.RuntimeError, error);
            });
            return this.privResultDeferral.promise;
        });
    }
    sendPreAudioMessages(context) {
        return __awaiter(this, void 0, void 0, function* () {
            const connection = yield this.fetchConnection();
            yield this.sendSpeakerRecognition(connection, context);
            // await this.sendWaveHeader(connection);
        });
    }
    sendSpeakerRecognition(connection, context) {
        return __awaiter(this, void 0, void 0, function* () {
            const speakerContextJson = JSON.stringify(context);
            return connection.send(new SpeechConnectionMessage(MessageType.Text, "speaker.context", this.privRequestSession.requestId, "application/json; charset=utf-8", speakerContextJson));
        });
    }
    extractSpeakerContext(model) {
        return {
            features: {
                interimResult: "enabled",
                progressiveDetection: "disabled",
            },
            profileIds: model.profileIds,
            scenario: model.scenario,
        };
    }
}

//# sourceMappingURL=SpeakerServiceRecognizer.js.map
