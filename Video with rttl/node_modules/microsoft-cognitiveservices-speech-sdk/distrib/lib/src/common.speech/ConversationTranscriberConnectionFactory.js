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
exports.ConversationTranscriberConnectionFactory = void 0;
var Exports_1 = require("../common.browser/Exports");
var Exports_2 = require("../sdk/Exports");
var Exports_3 = require("../common.speech/Exports");
var ConnectionFactoryBase_1 = require("./ConnectionFactoryBase");
var Exports_4 = require("./Exports");
var HeaderNames_1 = require("./HeaderNames");
var QueryParameterNames_1 = require("./QueryParameterNames");
var ConversationTranscriberConnectionFactory = /** @class */ (function (_super) {
    __extends(ConversationTranscriberConnectionFactory, _super);
    function ConversationTranscriberConnectionFactory() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.universalUri = "/speech/universal/v2";
        return _this;
    }
    ConversationTranscriberConnectionFactory.prototype.create = function (config, authInfo, connectionId) {
        var endpoint = config.parameters.getProperty(Exports_2.PropertyId.SpeechServiceConnection_Endpoint, undefined);
        var region = config.parameters.getProperty(Exports_2.PropertyId.SpeechServiceConnection_Region, undefined);
        var hostSuffix = ConnectionFactoryBase_1.ConnectionFactoryBase.getHostSuffix(region);
        var host = config.parameters.getProperty(Exports_2.PropertyId.SpeechServiceConnection_Host, "wss://" + region + ".stt.speech" + hostSuffix);
        var queryParams = {};
        var endpointId = config.parameters.getProperty(Exports_2.PropertyId.SpeechServiceConnection_EndpointId, undefined);
        var language = config.parameters.getProperty(Exports_2.PropertyId.SpeechServiceConnection_RecoLanguage, undefined);
        if (endpointId) {
            if (!endpoint || endpoint.search(QueryParameterNames_1.QueryParameterNames.CustomSpeechDeploymentId) === -1) {
                queryParams[QueryParameterNames_1.QueryParameterNames.CustomSpeechDeploymentId] = endpointId;
            }
        }
        else if (language) {
            if (!endpoint || endpoint.search(QueryParameterNames_1.QueryParameterNames.Language) === -1) {
                queryParams[QueryParameterNames_1.QueryParameterNames.Language] = language;
            }
        }
        if (config.autoDetectSourceLanguages !== undefined) {
            queryParams[QueryParameterNames_1.QueryParameterNames.EnableLanguageId] = "true";
        }
        this.setV2UrlParams(config, queryParams, endpoint);
        if (!endpoint) {
            endpoint = "" + host + this.universalUri;
        }
        var headers = {};
        if (authInfo.token !== undefined && authInfo.token !== "") {
            headers[authInfo.headerName] = authInfo.token;
        }
        headers[HeaderNames_1.HeaderNames.ConnectionId] = connectionId;
        var enableCompression = config.parameters.getProperty("SPEECH-EnableWebsocketCompression", "false") === "true";
        var webSocketConnection = new Exports_1.WebsocketConnection(endpoint, queryParams, headers, new Exports_4.WebsocketMessageFormatter(), Exports_1.ProxyInfo.fromRecognizerConfig(config), enableCompression, connectionId);
        // Set the value of SpeechServiceConnection_Url to webSocketConnection.uri (and not to `endpoint`), since this value is the final
        // URI that was used to make the connection (including query parameters).
        var uri = webSocketConnection.uri;
        config.parameters.setProperty(Exports_2.PropertyId.SpeechServiceConnection_Url, uri);
        return webSocketConnection;
    };
    ConversationTranscriberConnectionFactory.prototype.setV2UrlParams = function (config, queryParams, endpoint) {
        var _this = this;
        var propertyIdToParameterMap = new Map([
            [Exports_2.PropertyId.Speech_SegmentationSilenceTimeoutMs, QueryParameterNames_1.QueryParameterNames.SegmentationSilenceTimeoutMs],
            [Exports_2.PropertyId.SpeechServiceConnection_EnableAudioLogging, QueryParameterNames_1.QueryParameterNames.EnableAudioLogging],
            [Exports_2.PropertyId.SpeechServiceConnection_EndSilenceTimeoutMs, QueryParameterNames_1.QueryParameterNames.EndSilenceTimeoutMs],
            [Exports_2.PropertyId.SpeechServiceConnection_InitialSilenceTimeoutMs, QueryParameterNames_1.QueryParameterNames.InitialSilenceTimeoutMs],
            [Exports_2.PropertyId.SpeechServiceResponse_PostProcessingOption, QueryParameterNames_1.QueryParameterNames.Postprocessing],
            [Exports_2.PropertyId.SpeechServiceResponse_ProfanityOption, QueryParameterNames_1.QueryParameterNames.Profanity],
            [Exports_2.PropertyId.SpeechServiceResponse_StablePartialResultThreshold, QueryParameterNames_1.QueryParameterNames.StableIntermediateThreshold],
        ]);
        propertyIdToParameterMap.forEach(function (parameterName, propertyId) {
            _this.setUrlParameter(propertyId, parameterName, config, queryParams, endpoint);
        });
        var serviceProperties = JSON.parse(config.parameters.getProperty(Exports_3.ServicePropertiesPropertyName, "{}"));
        Object.keys(serviceProperties).forEach(function (value) {
            queryParams[value] = serviceProperties[value];
        });
    };
    return ConversationTranscriberConnectionFactory;
}(ConnectionFactoryBase_1.ConnectionFactoryBase));
exports.ConversationTranscriberConnectionFactory = ConversationTranscriberConnectionFactory;

//# sourceMappingURL=ConversationTranscriberConnectionFactory.js.map
