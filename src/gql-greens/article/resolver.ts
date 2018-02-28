import ArticleSchema, { IArticleModel } from './article';
import { DocumentQuery, MongoosePromise } from 'mongoose';
import { FileManager } from '../../common/file/fileManager';
export class Article {
    constructor() {

    }

    static Images: any = {
        Images(model) {
            let promise = new Promise<Array<any>>((resolve, reject) => {
                let fm = new FileManager();
                let imgs = fm.getFileByIds(model.imageIds);
                resolve(imgs);
            });
            return promise;
        }
    };

    static Query: any = {
        getArticle(parent, { }, context): Promise<Array<IArticleModel>> {
            let promise = new Promise<Array<IArticleModel>>((resolve, reject) => {
                ArticleSchema.find().then(res => {
                    resolve(res);
                }).catch(err => resolve(null));
            })
            return promise;
        },
        getArticleById(parent, { id }, context): Promise<IArticleModel> {
            

            let promise = new Promise<IArticleModel>((resolve, reject) => {
                ArticleSchema.findById(id).then(res => {
                    resolve(res);
                }).catch(err => resolve(null));
            });
            return promise;
        },

        getArticlePage(parent, { pageIndex = 1, pageSize = 10, article }, context) {
            
            var skip = (pageIndex - 1) * pageSize
            var articleInfo = ArticleSchema.find(article).skip(skip).limit(pageSize)
            return articleInfo;
        },

        getArticleWhere(parent, { article }, context) {
            
            var articleInfo = ArticleSchema.find(article);
            return articleInfo;
        },
        getArticleWhereOne(parent, { article }, context) {
            
            var articleInfo = ArticleSchema.findOne(article);
            return articleInfo;
        },

        getArticleCount(parent, { article }, context) {
            if (!context.user) return 0;
            var count = ArticleSchema.count(article);
            return count;
        },
    }

    static Mutation: any = {
        saveArticle(parent, { article }, context) {
            
            if (article.id && article.id != "0") {
                return new Promise<IArticleModel>((resolve, reject) => {
                    ArticleSchema.findByIdAndUpdate(article.id, article, (err, res) => {
                        Object.assign(res, article);
                        resolve(res);
                    })
                });
            }
            return ArticleSchema.create(article);
        },
        deleteArticle(parent, { id }, context): Promise<Boolean> {
            
            let promise = new Promise<Boolean>((resolve, reject) => {
                ArticleSchema.findByIdAndRemove(id, (err, res) => {
                    resolve(res != null)
                }).catch(err => reject(err));
            });
            return promise;
        }
    }
}