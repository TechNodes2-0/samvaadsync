// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import { SynthesisStatus } from "../Exports";
export class TranslationSynthesisEnd {
    constructor(json) {
        this.privSynthesisEnd = JSON.parse(json);
        if (!!this.privSynthesisEnd.SynthesisStatus) {
            this.privSynthesisEnd.SynthesisStatus = SynthesisStatus[this.privSynthesisEnd.SynthesisStatus];
        }
        if (!!this.privSynthesisEnd.Status) {
            this.privSynthesisEnd.SynthesisStatus = SynthesisStatus[this.privSynthesisEnd.Status];
        }
    }
    static fromJSON(json) {
        return new TranslationSynthesisEnd(json);
    }
    get SynthesisStatus() {
        return this.privSynthesisEnd.SynthesisStatus;
    }
    get FailureReason() {
        return this.privSynthesisEnd.FailureReason;
    }
}

//# sourceMappingURL=TranslationSynthesisEnd.js.map
