import ImagesSchema, { IImagesModel } from './images';
import { DocumentQuery, MongoosePromise } from 'mongoose';
import { FileManager } from '../../common/file/fileManager';
export class Images {
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
        getImages(parent, { }, context): Promise<Array<IImagesModel>> {
            

            let promise = new Promise<Array<IImagesModel>>((resolve, reject) => {
                ImagesSchema.find().then(res => {
                    resolve(res);
                }).catch(err => resolve(null));
            })
            return promise;
        },
        getImagesById(parent, { id }, context): Promise<IImagesModel> {
            

            let promise = new Promise<IImagesModel>((resolve, reject) => {
                ImagesSchema.findById(id).then(res => {
                    resolve(res);
                }).catch(err => resolve(null));
            });
            return promise;
        },

        getImagesPage(parent, { pageIndex = 1, pageSize = 10, images }, context) {
            
            var skip = (pageIndex - 1) * pageSize
            var imagesInfo = ImagesSchema.find(images).skip(skip).limit(pageSize)
            return imagesInfo;
        },

        getImagesWhere(parent, { images, limit }, context) {
            
            var imagesInfo = ImagesSchema.find(images).limit(limit);
            return imagesInfo;
        },
        getImagesWhereOne(parent, { images }, context) {
            
            var imagesInfo = ImagesSchema.findOne(images);
            return imagesInfo;
        },

        getImagesCount(parent, { images }, context) {
            if (!context.user) return 0;
            var count = ImagesSchema.count(images);
            return count;
        },

    }

    static Mutation: any = {
        saveImages(parent, { images }, context) {
            
            if (images.id && images.id != "0") {
                return new Promise<IImagesModel>((resolve, reject) => {
                    ImagesSchema.findByIdAndUpdate(images.id, images, (err, res) => {
                        Object.assign(res, images);
                        resolve(res);
                    })
                });
            }
            return ImagesSchema.create(images);
        },
        deleteImages(parent, { id }, context): Promise<Boolean> {
            
            let promise = new Promise<Boolean>((resolve, reject) => {
                ImagesSchema.findByIdAndRemove(id, (err, res) => {
                    resolve(res != null)
                }).catch(err => reject(err));
            });
            return promise;
        }
    }
}