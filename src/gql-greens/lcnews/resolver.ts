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
            

            let promise = new Promise<Array<IlcNewsModel>>((resolve, reject) => {
                lcNewsSchema.find().then(res => {
                    resolve(res);
                }).catch(err => resolve(null));
            })
            return promise;
        },
        getlcNewsById(parent, { id }, context): Promise<IlcNewsModel> {
            

            let promise = new Promise<IlcNewsModel>((resolve, reject) => {
                lcNewsSchema.findById(id).then(res => {
                    resolve(res);
                }).catch(err => resolve(null));
            });
            return promise;
        },

        getlcNewsPage(parent, { pageIndex = 1, pageSize = 10,lcnews }, context) {
            
            var skip = (pageIndex - 1) * pageSize
            var lcnewsInfo = lcNewsSchema.find(lcnews).skip(skip).limit(pageSize)
            return lcnewsInfo;
        },

        getlcNewsWhere(parent, { lcnews,limit }, context) {            
            var lcnewsInfo = lcNewsSchema.find(lcnews).limit(limit);                        
            return lcnewsInfo;
        },

        getlcNewsCount(parent, { lcnews }, context) {                        
            var count = lcNewsSchema.count(lcnews);
            return count;
        },
        getlcNewsNext(parent, { lcnews }, context) {

        }
    }

    static Mutation: any = {
        savelcNews(parent, { lcnews }, context) {
            
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
            
            let promise = new Promise<Boolean>((resolve, reject) => {
                lcNewsSchema.findByIdAndRemove(id, (err, res) => {
                    resolve(res != null)
                }).catch(err => reject(err));
            });
            return promise;
        }
    }
}