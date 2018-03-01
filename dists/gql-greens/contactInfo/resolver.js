"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const contactInfo_1 = require("./contactInfo");
class ContactInfo {
    constructor() {
    }
}
ContactInfo.Query = {
    getContactInfo(parent, {}, context) {
        let promise = new Promise((resolve, reject) => {
            contactInfo_1.default.find().then(res => {
                resolve(res);
            }).catch(err => resolve(null));
        });
        return promise;
    },
    getContactInfoById(parent, { id }, context) {
        let promise = new Promise((resolve, reject) => {
            contactInfo_1.default.findById(id).then(res => {
                resolve(res);
            }).catch(err => resolve(null));
        });
        return promise;
    },
};
ContactInfo.Mutation = {
    saveContactInfo(parent, { contactInfo }, context) {
        if (contactInfo.id && contactInfo.id != "0") {
            return new Promise((resolve, reject) => {
                contactInfo_1.default.findByIdAndUpdate(contactInfo.id, contactInfo, (err, res) => {
                    Object.assign(res, contactInfo);
                    resolve(res);
                });
            });
        }
        return contactInfo_1.default.create(contactInfo);
    },
    deleteContactInfo(parent, { id }, context) {
        let promise = new Promise((resolve, reject) => {
            contactInfo_1.default.findByIdAndRemove(id, (err, res) => {
                resolve(res != null);
            }).catch(err => reject(err));
        });
        return promise;
    }
};
exports.ContactInfo = ContactInfo;
