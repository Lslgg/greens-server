import lcNewsSchema, { IlcNewsModel } from './lcnews';
import { DocumentQuery, MongoosePromise } from 'mongoose';
import { FileManager } from '../../common/file/fileManager';
export class lcNews {
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
        getlcNews(parent, { }, context): Promise<Array<IlcNewsModel>> {
            if (!context.user) return null;

            let promise = new Promise<Array<IlcNewsModel>>((resolve, reject) => {
                lcNewsSchema.find().then(res => {
                    resolve(res);
                }).catch(err => resolve(null));
            })
            return promise;
        },
        getlcNewsById(parent, { id }, context): Promise<IlcNewsModel> {
            if (!context.user) return null;

            let promise = new Promise<IlcNewsModel>((resolve, reject) => {
                lcNewsSchema.findById(id).then(res => {
                    resolve(res);
                }).catch(err => resolve(null));
            });
            return promise;
        },

        getlcNewsPage(parent, { pageIndex = 1, pageSize = 10,lcnews }, context) {
            if (!context.user) return null;
            var skip = (pageIndex - 1) * pageSize
            var lcnewsInfo = lcNewsSchema.find(lcnews).skip(skip).limit(pageSize)
            return lcnewsInfo;
        },

        getlcNewsWhere(parent, { lcnews }, context) {
            if (!context.user) return null;
            var lcnewsInfo = lcNewsSchema.find(lcnews);
            return lcnewsInfo;
        },

        getlcNewsCount(parent, { lcnews }, context) {
            if (!context.user) return 0;
            var count = lcNewsSchema.count(lcnews);
            return count;
        },
    }

    static Mutation: any = {
        savelcNews(parent, { lcnews }, context) {
            if (!context.user) return null;
            if (lcnews.id && lcnews.id != "0") {
                return new Promise<IlcNewsModel>((resolve, reject) => {
                    lcNewsSchema.findByIdAndUpdate(lcnews.id, lcnews, (err, res) => {
                        Object.assign(res, lcnews);
                        resolve(res);
                    })
                });
            }
            return lcNewsSchema.create(lcnews);
        },
        deletelcNews(parent, { id }, context): Promise<Boolean> {
            if (!context.user) return null;
            let promise = new Promise<Boolean>((resolve, reject) => {
                lcNewsSchema.findByIdAndRemove(id, (err, res) => {
                    resolve(res != null)
                }).catch(err => reject(err));
            });
            return promise;
        }
    }
}