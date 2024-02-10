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
exports.VoiceProfilePhraseResult = void 0;
var Contracts_1 = require("./Contracts");
var Exports_1 = require("./Exports");
/**
 * Output format
 * @class VoiceProfilePhraseResult
 */
var VoiceProfilePhraseResult = /** @class */ (function (_super) {
    __extends(VoiceProfilePhraseResult, _super);
    function VoiceProfilePhraseResult(reason, statusText, type, phraseArray) {
        var _this = _super.call(this, reason, statusText) || this;
        _this.privPhrases = [];
        Contracts_1.Contracts.throwIfNullOrUndefined(phraseArray, "phrase array");
        _this.privType = type;
        if (!!phraseArray && !!phraseArray[0]) {
            _this.privPhrases = phraseArray;
        }
        return _this;
    }
    Object.defineProperty(VoiceProfilePhraseResult.prototype, "phrases", {
        get: function () {
            return this.privPhrases;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(VoiceProfilePhraseResult.prototype, "type", {
        get: function () {
            return this.privType;
        },
        enumerable: false,
        configurable: true
    });
    return VoiceProfilePhraseResult;
}(Exports_1.VoiceProfileResult));
exports.VoiceProfilePhraseResult = VoiceProfilePhraseResult;

//# sourceMappingURL=VoiceProfilePhraseResult.js.map
