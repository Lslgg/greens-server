"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const article_1 = require("./article");
const fileManager_1 = require("../../common/file/fileManager");
class Article {
    constructor() {
    }
}
Article.Images = {
    Images(model) {
        let promise = new Promise((resolve, reject) => {
            let fm = new fileManager_1.FileManager();
            let imgs = fm.getFileByIds(model.imageIds);
            resolve(imgs);
        });
        return promise;
    }
};
Article.Query = {
    getArticle(parent, {}, context) {
        let promise = new Promise((resolve, reject) => {
            article_1.default.find().then(res => {
                resolve(res);
            }).catch(err => resolve(null));
        });
        return promise;
    },
    getArticleById(parent, { id }, context) {
        let promise = new Promise((resolve, reject) => {
            article_1.default.findById(id).then(res => {
                resolve(res);
            }).catch(err => resolve(null));
        });
        return promise;
    },
    getArticlePage(parent, { pageIndex = 1, pageSize = 10, article }, context) {
        var skip = (pageIndex - 1) * pageSize;
        var articleInfo = article_1.default.find(article).skip(skip).limit(pageSize);
        return articleInfo;
    },
    getArticleWhere(parent, { article }, context) {
        var articleInfo = article_1.default.find(article);
        return articleInfo;
    },
    getArticleWhereOne(parent, { article }, context) {
        var articleInfo = article_1.default.findOne(article);
        return articleInfo;
    },
    getArticleCount(parent, { article }, context) {
        if (!context.user)
            return 0;
        var count = article_1.default.count(article);
        return count;
    },
};
Article.Mutation = {
    saveArticle(parent, { article }, context) {
        if (article.id && article.id != "0") {
            return new Promise((resolve, reject) => {
                article_1.default.findByIdAndUpdate(article.id, article, (err, res) => {
                    Object.assign(res, article);
                    resolve(res);
                });
            });
        }
        return article_1.default.create(article);
    },
    deleteArticle(parent, { id }, context) {
        let promise = new Promise((resolve, reject) => {
            article_1.default.findByIdAndRemove(id, (err, res) => {
                resolve(res != null);
            }).catch(err => reject(err));
        });
        return promise;
    }
};
exports.Article = Article;
