// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { Contracts } from "./Contracts";
import { VoiceProfileResult } from "./Exports";
/**
 * Output format
 * @class VoiceProfilePhraseResult
 */
export class VoiceProfilePhraseResult extends VoiceProfileResult {
    constructor(reason, statusText, type, phraseArray) {
        super(reason, statusText);
        this.privPhrases = [];
        Contracts.throwIfNullOrUndefined(phraseArray, "phrase array");
        this.privType = type;
        if (!!phraseArray && !!phraseArray[0]) {
            this.privPhrases = phraseArray;
        }
    }
    get phrases() {
        return this.privPhrases;
    }
    get type() {
        return this.privType;
    }
}

//# sourceMappingURL=VoiceProfilePhraseResult.js.map
