// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
/**
 * The error that is thrown when an argument passed in is null.
 *
 * @export
 * @class DefferalMap
 */
export class DeferralMap {
    constructor() {
        this.privMap = {};
    }
    add(id, deferral) {
        this.privMap[id] = deferral;
    }
    getId(id) {
        return this.privMap[id];
    }
    complete(id, result) {
        try {
            this.privMap[id].resolve(result);
        }
        catch (error) {
            this.privMap[id].reject(error);
        }
        finally {
            this.privMap[id] = undefined;
        }
    }
}

//# sourceMappingURL=DeferralMap.js.map
