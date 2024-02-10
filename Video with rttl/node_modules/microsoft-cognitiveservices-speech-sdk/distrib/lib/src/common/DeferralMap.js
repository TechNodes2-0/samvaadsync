"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeferralMap = void 0;
/**
 * The error that is thrown when an argument passed in is null.
 *
 * @export
 * @class DefferalMap
 */
var DeferralMap = /** @class */ (function () {
    function DeferralMap() {
        this.privMap = {};
    }
    DeferralMap.prototype.add = function (id, deferral) {
        this.privMap[id] = deferral;
    };
    DeferralMap.prototype.getId = function (id) {
        return this.privMap[id];
    };
    DeferralMap.prototype.complete = function (id, result) {
        try {
            this.privMap[id].resolve(result);
        }
        catch (error) {
            this.privMap[id].reject(error);
        }
        finally {
            this.privMap[id] = undefined;
        }
    };
    return DeferralMap;
}());
exports.DeferralMap = DeferralMap;

//# sourceMappingURL=DeferralMap.js.map
