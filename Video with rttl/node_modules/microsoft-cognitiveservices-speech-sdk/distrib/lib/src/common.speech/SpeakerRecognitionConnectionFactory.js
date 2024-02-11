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
exports.VoiceProfileConnectionFactory = exports.SpeakerRecognitionConnectionFactory = void 0;
/* eslint-disable max-classes-per-file */
var Exports_1 = require("../common.browser/Exports");
var Exports_2 = require("../sdk/Exports");
var ConnectionFactoryBase_1 = require("./ConnectionFactoryBase");
var Exports_3 = require("./Exports");
var HeaderNames_1 = require("./HeaderNames");
var SpeakerRecognitionConnectionFactoryBase = /** @class */ (function (_super) {
    __extends(SpeakerRecognitionConnectionFactoryBase, _super);
    function SpeakerRecognitionConnectionFactoryBase() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpeakerRecognitionConnectionFactoryBase.prototype.create = function (config, authInfo, endpointPath, connectionId) {
        var endpoint = config.parameters.getProperty(Exports_2.PropertyId.SpeechServiceConnection_Endpoint);
        if (!endpoint) {
            var region = config.parameters.getProperty(Exports_2.PropertyId.SpeechServiceConnection_Region);
            var hostSuffix = ConnectionFactoryBase_1.ConnectionFactoryBase.getHostSuffix(region);
            var host = config.parameters.getProperty(Exports_2.PropertyId.SpeechServiceConnection_Host, "wss://" + region + ".spr-frontend.speech" + hostSuffix);
            var scenario = config.parameters.getProperty(Exports_2.PropertyId.SpeechServiceConnection_SpeakerIdMode, "TextIndependentIdentification");
            endpoint = host + "/speaker/ws/" + this.scenarioToPath(scenario) + "/" + endpointPath;
        }
        var queryParams = {
            format: "simple",
            language: config.parameters.getProperty(Exports_2.PropertyId.SpeechServiceConnection_RecoLanguage),
        };
        this.setCommonUrlParams(config, queryParams, endpoint);
        var headers = {};
        if (authInfo.token !== undefined && authInfo.token !== "") {
            headers[authInfo.headerName] = authInfo.token;
        }
        headers[HeaderNames_1.HeaderNames.ConnectionId] = connectionId;
        headers[HeaderNames_1.HeaderNames.SpIDAuthKey] = config.parameters.getProperty(Exports_2.PropertyId.SpeechServiceConnection_Key);
        config.parameters.setProperty(Exports_2.PropertyId.SpeechServiceConnection_Url, endpoint);
        var enableCompression = config.parameters.getProperty("SPEECH-EnableWebsocketCompression", "false") === "true";
        return new Exports_1.WebsocketConnection(endpoint, queryParams, headers, new Exports_3.WebsocketMessageFormatter(), Exports_1.ProxyInfo.fromRecognizerConfig(config), enableCompression, connectionId);
    };
    SpeakerRecognitionConnectionFactoryBase.prototype.scenarioToPath = function (mode) {
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
    };
    return SpeakerRecognitionConnectionFactoryBase;
}(ConnectionFactoryBase_1.ConnectionFactoryBase));
var SpeakerRecognitionConnectionFactory = /** @class */ (function (_super) {
    __extends(SpeakerRecognitionConnectionFactory, _super);
    function SpeakerRecognitionConnectionFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    SpeakerRecognitionConnectionFactory.prototype.create = function (config, authInfo, connectionId) {
        return _super.prototype.create.call(this, config, authInfo, "recognition", connectionId);
    };
    return SpeakerRecognitionConnectionFactory;
}(SpeakerRecognitionConnectionFactoryBase));
exports.SpeakerRecognitionConnectionFactory = SpeakerRecognitionConnectionFactory;
var VoiceProfileConnectionFactory = /** @class */ (function (_super) {
    __extends(VoiceProfileConnectionFactory, _super);
    function VoiceProfileConnectionFactory() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    VoiceProfileConnectionFactory.prototype.create = function (config, authInfo, connectionId) {
        return _super.prototype.create.call(this, config, authInfo, "profile", connectionId);
    };
    return VoiceProfileConnectionFactory;
}(SpeakerRecognitionConnectionFactoryBase));
exports.VoiceProfileConnectionFactory = VoiceProfileConnectionFactory;

//# sourceMappingURL=SpeakerRecognitionConnectionFactory.js.map
