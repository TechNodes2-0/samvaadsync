"use strict";
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
Object.defineProperty(exports, "__esModule", { value: true });
exports.SpeakerIdentificationModel = void 0;
var Contracts_1 = require("./Contracts");
var Exports_1 = require("./Exports");
/**
 * Defines SpeakerIdentificationModel class for Speaker Recognition
 * Model contains a set of profiles against which to identify speaker(s)
 * @class SpeakerIdentificationModel
 */
var SpeakerIdentificationModel = /** @class */ (function () {
    function SpeakerIdentificationModel(profiles) {
        this.privVoiceProfiles = [];
        this.privProfileIds = [];
        Contracts_1.Contracts.throwIfNullOrUndefined(profiles, "VoiceProfiles");
        if (profiles.length === 0) {
            throw new Error("Empty Voice Profiles array");
        }
        for (var _i = 0, profiles_1 = profiles; _i < profiles_1.length; _i++) {
            var profile = profiles_1[_i];
            if (profile.profileType !== Exports_1.VoiceProfileType.TextIndependentIdentification) {
                throw new Error("Identification model can only be created from Identification profile: " + profile.profileId);
            }
            this.privVoiceProfiles.push(profile);
            this.privProfileIds.push(profile.profileId);
        }
    }
    SpeakerIdentificationModel.fromProfiles = function (profiles) {
        return new SpeakerIdentificationModel(profiles);
    };
    Object.defineProperty(SpeakerIdentificationModel.prototype, "voiceProfileIds", {
        get: function () {
            return this.privProfileIds.join(",");
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeakerIdentificationModel.prototype, "profileIds", {
        get: function () {
            return this.privProfileIds;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(SpeakerIdentificationModel.prototype, "scenario", {
        get: function () {
            return "TextIndependentIdentification";
        },
        enumerable: false,
        configurable: true
    });
    return SpeakerIdentificationModel;
}());
exports.SpeakerIdentificationModel = SpeakerIdentificationModel;

//# sourceMappingURL=SpeakerIdentificationModel.js.map
