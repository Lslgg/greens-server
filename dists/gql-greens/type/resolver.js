"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const type_1 = require("./type");
const fileManager_1 = require("../../common/file/fileManager");
class Type {
    constructor() {
    }
}
Type.Images = {
    Images(model) {
        let promise = new Promise((resolve, reject) => {
            let fm = new fileManager_1.FileManager();
            let imgs = fm.getFileByIds(model.imageIds);
            resolve(imgs);
        });
        return promise;
    }
};
Type.Query = {
    getType(parent, {}, context) {
        let promise = new Promise((resolve, reject) => {
            type_1.default.find().then(res => {
                resolve(res);
            }).catch(err => resolve(null));
        });
        return promise;
    },
    getTypeById(parent, { id }, context) {
        let promise = new Promise((resolve, reject) => {
            type_1.default.findById(id).then(res => {
                resolve(res);
            }).catch(err => resolve(null));
        });
        return promise;
    },
    getTypePage(parent, { pageIndex = 1, pageSize = 10, type }, context) {
        var skip = (pageIndex - 1) * pageSize;
        var typeInfo = type_1.default.find(type).skip(skip).limit(pageSize);
        return typeInfo;
    },
    getTypeWhere(parent, { type }, context) {
        var typeInfo = type_1.default.find(type);
        return typeInfo;
    },
    getTypeCount(parent, { type }, context) {
        if (!context.user)
            return 0;
        var count = type_1.default.count(type);
        return count;
    },
};
Type.Mutation = {
    saveType(parent, { type }, context) {
        type.value = type.key;
        if (type.id && type.id != "0") {
            return new Promise((resolve, reject) => {
                type_1.default.findByIdAndUpdate(type.id, type, (err, res) => {
                    Object.assign(res, type);
                    resolve(res);
                });
            });
        }
        return type_1.default.create(type);
    },
    deleteType(parent, { id }, context) {
        let promise = new Promise((resolve, reject) => {
            type_1.default.findByIdAndRemove(id, (err, res) => {
                resolve(res != null);
            }).catch(err => reject(err));
        });
        return promise;
    }
};
exports.Type = Type;
