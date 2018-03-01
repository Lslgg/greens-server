"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const garden_1 = require("./garden");
const fileManager_1 = require("../../common/file/fileManager");
class Garden {
    constructor() {
    }
}
Garden.Images = {
    Images(model) {
        let promise = new Promise((resolve, reject) => {
            let fm = new fileManager_1.FileManager();
            let imgs = fm.getFileByIds(model.imageIds);
            resolve(imgs);
        });
        return promise;
    }
};
Garden.Query = {
    getGarden(parent, {}, context) {
        let promise = new Promise((resolve, reject) => {
            garden_1.default.find().then(res => {
                resolve(res);
            }).catch(err => resolve(null));
        });
        return promise;
    },
    getGardenById(parent, { id }, context) {
        let promise = new Promise((resolve, reject) => {
            garden_1.default.findById(id).then(res => {
                resolve(res);
            }).catch(err => resolve(null));
        });
        return promise;
    },
    getGardenPage(parent, { pageIndex = 1, pageSize = 10, garden }, context) {
        var skip = (pageIndex - 1) * pageSize;
        var gardenInfo = garden_1.default.find(garden).skip(skip).limit(pageSize);
        return gardenInfo;
    },
    getGardenWhere(parent, { garden }, context) {
        var gardenInfo = garden_1.default.find(garden);
        return gardenInfo;
    },
    getGardenWhereOne(parent, { garden }, context) {
        var gardenInfo = garden_1.default.findOne(garden);
        return gardenInfo;
    },
    getGardenCount(parent, { garden }, context) {
        if (!context.user)
            return 0;
        var count = garden_1.default.count(garden);
        return count;
    },
};
Garden.Mutation = {
    saveGarden(parent, { garden }, context) {
        if (garden.id && garden.id != "0") {
            return new Promise((resolve, reject) => {
                garden_1.default.findByIdAndUpdate(garden.id, garden, (err, res) => {
                    Object.assign(res, garden);
                    resolve(res);
                });
            });
        }
        return garden_1.default.create(garden);
    },
    deleteGarden(parent, { id }, context) {
        let promise = new Promise((resolve, reject) => {
            garden_1.default.findByIdAndRemove(id, (err, res) => {
                resolve(res != null);
            }).catch(err => reject(err));
        });
        return promise;
    }
};
exports.Garden = Garden;
