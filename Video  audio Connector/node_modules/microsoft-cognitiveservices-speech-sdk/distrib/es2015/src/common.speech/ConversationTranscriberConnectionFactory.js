// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { ProxyInfo, WebsocketConnection, } from "../common.browser/Exports";
import { PropertyId } from "../sdk/Exports";
import { ServicePropertiesPropertyName } from "../common.speech/Exports";
import { ConnectionFactoryBase } from "./ConnectionFactoryBase";
import { WebsocketMessageFormatter } from "./Exports";
import { HeaderNames } from "./HeaderNames";
import { QueryParameterNames } from "./QueryParameterNames";
export class ConversationTranscriberConnectionFactory extends ConnectionFactoryBase {
    constructor() {
        super(...arguments);
        this.universalUri = "/speech/universal/v2";
    }
    create(config, authInfo, connectionId) {
        let endpoint = config.parameters.getProperty(PropertyId.SpeechServiceConnection_Endpoint, undefined);
        const region = config.parameters.getProperty(PropertyId.SpeechServiceConnection_Region, undefined);
        const hostSuffix = ConnectionFactoryBase.getHostSuffix(region);
        const host = config.parameters.getProperty(PropertyId.SpeechServiceConnection_Host, "wss://" + region + ".stt.speech" + hostSuffix);
        const queryParams = {};
        const endpointId = config.parameters.getProperty(PropertyId.SpeechServiceConnection_EndpointId, undefined);
        const language = config.parameters.getProperty(PropertyId.SpeechServiceConnection_RecoLanguage, undefined);
        if (endpointId) {
            if (!endpoint || endpoint.search(QueryParameterNames.CustomSpeechDeploymentId) === -1) {
                queryParams[QueryParameterNames.CustomSpeechDeploymentId] = endpointId;
            }
        }
        else if (language) {
            if (!endpoint || endpoint.search(QueryParameterNames.Language) === -1) {
                queryParams[QueryParameterNames.Language] = language;
            }
        }
        if (config.autoDetectSourceLanguages !== undefined) {
            queryParams[QueryParameterNames.EnableLanguageId] = "true";
        }
        this.setV2UrlParams(config, queryParams, endpoint);
        if (!endpoint) {
            endpoint = `${host}${this.universalUri}`;
        }
        const headers = {};
        if (authInfo.token !== undefined && authInfo.token !== "") {
            headers[authInfo.headerName] = authInfo.token;
        }
        headers[HeaderNames.ConnectionId] = connectionId;
        const enableCompression = config.parameters.getProperty("SPEECH-EnableWebsocketCompression", "false") === "true";
        const webSocketConnection = new WebsocketConnection(endpoint, queryParams, headers, new WebsocketMessageFormatter(), ProxyInfo.fromRecognizerConfig(config), enableCompression, connectionId);
        // Set the value of SpeechServiceConnection_Url to webSocketConnection.uri (and not to `endpoint`), since this value is the final
        // URI that was used to make the connection (including query parameters).
        const uri = webSocketConnection.uri;
        config.parameters.setProperty(PropertyId.SpeechServiceConnection_Url, uri);
        return webSocketConnection;
    }
    setV2UrlParams(config, queryParams, endpoint) {
        const propertyIdToParameterMap = new Map([
            [PropertyId.Speech_SegmentationSilenceTimeoutMs, QueryParameterNames.SegmentationSilenceTimeoutMs],
            [PropertyId.SpeechServiceConnection_EnableAudioLogging, QueryParameterNames.EnableAudioLogging],
            [PropertyId.SpeechServiceConnection_EndSilenceTimeoutMs, QueryParameterNames.EndSilenceTimeoutMs],
            [PropertyId.SpeechServiceConnection_InitialSilenceTimeoutMs, QueryParameterNames.InitialSilenceTimeoutMs],
            [PropertyId.SpeechServiceResponse_PostProcessingOption, QueryParameterNames.Postprocessing],
            [PropertyId.SpeechServiceResponse_ProfanityOption, QueryParameterNames.Profanity],
            [PropertyId.SpeechServiceResponse_StablePartialResultThreshold, QueryParameterNames.StableIntermediateThreshold],
        ]);
        propertyIdToParameterMap.forEach((parameterName, propertyId) => {
            this.setUrlParameter(propertyId, parameterName, config, queryParams, endpoint);
        });
        const serviceProperties = JSON.parse(config.parameters.getProperty(ServicePropertiesPropertyName, "{}"));
        Object.keys(serviceProperties).forEach((value) => {
            queryParams[value] = serviceProperties[value];
        });
    }
}

//# sourceMappingURL=ConversationTranscriberConnectionFactory.js.map
