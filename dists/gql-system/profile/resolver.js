"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const profile_1 = require("./profile");
class Profile {
    constructor() {
    }
}
Profile.Query = {
    getProfiles(parent, __, context) {
        if (!context.user)
            return null;
        let promise = new Promise((resolve, reject) => {
            var proFiles = profile_1.default.find().then(res => {
                resolve(res);
            }).catch(err => resolve(null));
        });
        return promise;
    },
    getProfileById(parent, { id }, context) {
        if (!context.user)
            return null;
        let promise = new Promise((resolve, reject) => {
            var proFiles = profile_1.default.findById(id).then(res => {
                resolve(res);
            }).catch(err => resolve(null));
        });
        return promise;
    },
    getProfilePage(parent, { pageIndex = 1, pageSize = 10, profile }, context) {
        if (!context.user)
            return null;
        var skip = (pageIndex - 1) * pageSize;
        var proFileInfo = profile_1.default.find(profile).skip(skip).limit(pageSize);
        return proFileInfo;
    },
    getProfileWhere(parent, { profile }, context) {
        if (!context.user)
            return 0;
        // console.log(profile);
        var proFiles = profile_1.default.find(profile);
        return proFiles;
    },
    getProfileCount(parent, { profile }, context) {
        if (!context.user)
            return null;
        var count = profile_1.default.count(profile);
        return count;
    },
    getProfileAggregate(parent, { profile }, context) {
        if (!context.user)
            return null;
        let promise = new Promise((resolve, reject) => {
            profile_1.default.aggregate([profile]).then(data => resolve(data))
                .catch(err => {
                // console.error(err);
                reject(err);
            });
        });
        return promise;
    }
};
Profile.Mutation = {
    saveProfile(parent, { profile }, context) {
        if (!context.user)
            return null;
        if (profile.id && profile.id != "0") {
            return new Promise((resolve, reject) => {
                profile_1.default.findByIdAndUpdate(profile.id, profile, (err, res) => {
                    Object.assign(res, profile);
                    resolve(res);
                });
            });
        }
        return profile_1.default.create(profile);
    },
    deleteProfile(parent, { id }, context) {
        if (!context.user)
            return null;
        let promise = new Promise((resolve, reject) => {
            profile_1.default.findByIdAndRemove(id, (err, res) => {
                resolve(res != null);
            }).catch(err => reject(err));
        });
        return promise;
    }
};
exports.Profile = Profile;
