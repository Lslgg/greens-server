import TypeSchema, { ITypeModel } from './type';
import { DocumentQuery, MongoosePromise } from 'mongoose';
import { FileManager } from '../../common/file/fileManager';
export class Type {
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
        getType(parent, { }, context): Promise<Array<ITypeModel>> {
            if (!context.user) return null;

            let promise = new Promise<Array<ITypeModel>>((resolve, reject) => {
                TypeSchema.find().then(res => {
                    resolve(res);
                }).catch(err => resolve(null));
            })
            return promise;
        },
        getTypeById(parent, { id }, context): Promise<ITypeModel> {
            if (!context.user) return null;

            let promise = new Promise<ITypeModel>((resolve, reject) => {
                TypeSchema.findById(id).then(res => {
                    resolve(res);
                }).catch(err => resolve(null));
            });
            return promise;
        },

        getTypePage(parent, { pageIndex = 1, pageSize = 10, type }, context) {
            if (!context.user) return null;
            var skip = (pageIndex - 1) * pageSize
            var typeInfo = TypeSchema.find(type).skip(skip).limit(pageSize)
            return typeInfo;
        },

        getTypeWhere(parent, { type }, context) {
            if (!context.user) return null;
            var typeInfo = TypeSchema.find(type);
            return typeInfo;
        },

        getTypeCount(parent, { type }, context) {
            if (!context.user) return 0;
            var count = TypeSchema.count(type);
            return count;
        },
    }

    static Mutation: any = {
        saveType(parent, { type }, context) {
            if (!context.user) return null;
            if (type.id && type.id != "0") {
                return new Promise<ITypeModel>((resolve, reject) => {
                    TypeSchema.findByIdAndUpdate(type.id, type, (err, res) => {
                        Object.assign(res, type);
                        resolve(res);
                    })
                });
            }
            return TypeSchema.create(type);
        },
        deleteType(parent, { id }, context): Promise<Boolean> {
            if (!context.user) return null;
            let promise = new Promise<Boolean>((resolve, reject) => {
                TypeSchema.findByIdAndRemove(id, (err, res) => {
                    resolve(res != null)
                }).catch(err => reject(err));
            });
            return promise;
        }
    }
}