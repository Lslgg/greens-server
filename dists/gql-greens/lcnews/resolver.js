"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lcnews_1 = require("./lcnews");
const fileManager_1 = require("../../common/file/fileManager");
class lcNews {
    constructor() {
    }
}
lcNews.Images = {
    Images(model) {
        let promise = new Promise((resolve, reject) => {
            let fm = new fileManager_1.FileManager();
            let imgs = fm.getFileByIds(model.imageIds);
            resolve(imgs);
        });
        return promise;
    }
};
lcNews.Query = {
    getlcNews(parent, {}, context) {
        let promise = new Promise((resolve, reject) => {
            lcnews_1.default.find().then(res => {
                resolve(res);
            }).catch(err => resolve(null));
        });
        return promise;
    },
    getlcNewsById(parent, { id }, context) {
        let promise = new Promise((resolve, reject) => {
            lcnews_1.default.findById(id).then(res => {
                resolve(res);
            }).catch(err => resolve(null));
        });
        return promise;
    },
    getlcNewsPage(parent, { pageIndex = 1, pageSize = 10, lcnews }, context) {
        var skip = (pageIndex - 1) * pageSize;
        var lcnewsInfo = lcnews_1.default.find(lcnews).skip(skip).limit(pageSize);
        return lcnewsInfo;
    },
    getlcNewsWhere(parent, { lcnews, limit }, context) {
        var lcnewsInfo = lcnews_1.default.find(lcnews).limit(limit);
        return lcnewsInfo;
    },
    getlcNewsCount(parent, { lcnews }, context) {
        var count = lcnews_1.default.count(lcnews);
        return count;
    },
    getlcNewsNext(parent, { lcnews }, context) {
    }
};
lcNews.Mutation = {
    savelcNews(parent, { lcnews }, context) {
        if (lcnews.id && lcnews.id != "0") {
            return new Promise((resolve, reject) => {
                lcnews_1.default.findByIdAndUpdate(lcnews.id, lcnews, (err, res) => {
                    Object.assign(res, lcnews);
                    resolve(res);
                });
            });
        }
        return lcnews_1.default.create(lcnews);
    },
    deletelcNews(parent, { id }, context) {
        let promise = new Promise((resolve, reject) => {
            lcnews_1.default.findByIdAndRemove(id, (err, res) => {
                resolve(res != null);
            }).catch(err => reject(err));
        });
        return promise;
    }
};
exports.lcNews = lcNews;
