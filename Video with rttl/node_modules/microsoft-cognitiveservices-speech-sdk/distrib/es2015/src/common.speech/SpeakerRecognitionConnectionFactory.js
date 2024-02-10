// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
/* eslint-disable max-classes-per-file */
import { ProxyInfo, WebsocketConnection, } from "../common.browser/Exports";
import { PropertyId } from "../sdk/Exports";
import { ConnectionFactoryBase } from "./ConnectionFactoryBase";
import { WebsocketMessageFormatter, } from "./Exports";
import { HeaderNames } from "./HeaderNames";
class SpeakerRecognitionConnectionFactoryBase extends ConnectionFactoryBase {
    create(config, authInfo, endpointPath, connectionId) {
        let endpoint = config.parameters.getProperty(PropertyId.SpeechServiceConnection_Endpoint);
        if (!endpoint) {
            const region = config.parameters.getProperty(PropertyId.SpeechServiceConnection_Region);
            const hostSuffix = ConnectionFactoryBase.getHostSuffix(region);
            const host = config.parameters.getProperty(PropertyId.SpeechServiceConnection_Host, `wss://${region}.spr-frontend.speech${hostSuffix}`);
            const scenario = config.parameters.getProperty(PropertyId.SpeechServiceConnection_SpeakerIdMode, "TextIndependentIdentification");
            endpoint = `${host}/speaker/ws/${this.scenarioToPath(scenario)}/${endpointPath}`;
        }
        const queryParams = {
            format: "simple",
            language: config.parameters.getProperty(PropertyId.SpeechServiceConnection_RecoLanguage),
        };
        this.setCommonUrlParams(config, queryParams, endpoint);
        const headers = {};
        if (authInfo.token !== undefined && authInfo.token !== "") {
            headers[authInfo.headerName] = authInfo.token;
        }
        headers[HeaderNames.ConnectionId] = connectionId;
        headers[HeaderNames.SpIDAuthKey] = config.parameters.getProperty(PropertyId.SpeechServiceConnection_Key);
        config.parameters.setProperty(PropertyId.SpeechServiceConnection_Url, endpoint);
        const enableCompression = config.parameters.getProperty("SPEECH-EnableWebsocketCompression", "false") === "true";
        return new WebsocketConnection(endpoint, queryParams, headers, new WebsocketMessageFormatter(), ProxyInfo.fromRecognizerConfig(config), enableCompression, connectionId);
    }
    scenarioToPath(mode) {
        switch (mode) {
            case "TextIndependentVerification":
            case "2":
                return "verification/text-independent";
            case "TextDependentVerification":
            case "1":
                return "verification/text-dependent";
            default:
                return "identification/text-independent";
        }
    }
}
export class SpeakerRecognitionConnectionFactory extends SpeakerRecognitionConnectionFactoryBase {
    create(config, authInfo, connectionId) {
        return super.create(config, authInfo, "recognition", connectionId);
    }
}
export class VoiceProfileConnectionFactory extends SpeakerRecognitionConnectionFactoryBase {
    create(config, authInfo, connectionId) {
        return super.create(config, authInfo, "profile", connectionId);
    }
}

//# sourceMappingURL=SpeakerRecognitionConnectionFactory.js.map
