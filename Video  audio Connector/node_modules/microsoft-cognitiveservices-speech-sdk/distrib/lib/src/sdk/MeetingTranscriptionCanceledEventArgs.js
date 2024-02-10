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
exports.MeetingTranscriptionCanceledEventArgs = void 0;
var CancellationEventArgsBase_1 = require("./CancellationEventArgsBase");
/**
 * Defines content of a MeetingTranscriptionCanceledEvent.
 * @class MeetingTranscriptionCanceledEventArgs
 */
var MeetingTranscriptionCanceledEventArgs = /** @class */ (function (_super) {
    __extends(MeetingTranscriptionCanceledEventArgs, _super);
    function MeetingTranscriptionCanceledEventArgs() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MeetingTranscriptionCanceledEventArgs;
}(CancellationEventArgsBase_1.CancellationEventArgsBase));
exports.MeetingTranscriptionCanceledEventArgs = MeetingTranscriptionCanceledEventArgs;

//# sourceMappingURL=MeetingTranscriptionCanceledEventArgs.js.map
