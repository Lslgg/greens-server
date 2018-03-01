"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const images_1 = require("./images");
const fileManager_1 = require("../../common/file/fileManager");
class Images {
    constructor() {
    }
}
Images.Images = {
    Images(model) {
        let promise = new Promise((resolve, reject) => {
            let fm = new fileManager_1.FileManager();
            let imgs = fm.getFileByIds(model.imageIds);
            resolve(imgs);
        });
        return promise;
    }
};
Images.Query = {
    getImages(parent, {}, context) {
        let promise = new Promise((resolve, reject) => {
            images_1.default.find().then(res => {
                resolve(res);
            }).catch(err => resolve(null));
        });
        return promise;
    },
    getImagesById(parent, { id }, context) {
        let promise = new Promise((resolve, reject) => {
            images_1.default.findById(id).then(res => {
                resolve(res);
            }).catch(err => resolve(null));
        });
        return promise;
    },
    getImagesPage(parent, { pageIndex = 1, pageSize = 10, images }, context) {
        var skip = (pageIndex - 1) * pageSize;
        var imagesInfo = images_1.default.find(images).skip(skip).limit(pageSize);
        return imagesInfo;
    },
    getImagesWhere(parent, { images, limit }, context) {
        var imagesInfo = images_1.default.find(images).limit(limit);
        return imagesInfo;
    },
    getImagesWhereOne(parent, { images }, context) {
        var imagesInfo = images_1.default.findOne(images);
        return imagesInfo;
    },
    getImagesCount(parent, { images }, context) {
        if (!context.user)
            return 0;
        var count = images_1.default.count(images);
        return count;
    },
};
Images.Mutation = {
    saveImages(parent, { images }, context) {
        if (images.id && images.id != "0") {
            return new Promise((resolve, reject) => {
                images_1.default.findByIdAndUpdate(images.id, images, (err, res) => {
                    Object.assign(res, images);
                    resolve(res);
                });
            });
        }
        return images_1.default.create(images);
    },
    deleteImages(parent, { id }, context) {
        let promise = new Promise((resolve, reject) => {
            images_1.default.findByIdAndRemove(id, (err, res) => {
                resolve(res != null);
            }).catch(err => reject(err));
        });
        return promise;
    }
};
exports.Images = Images;
