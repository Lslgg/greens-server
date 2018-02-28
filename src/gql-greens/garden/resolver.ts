import GardenSchema, { IGardenModel } from './garden';
import { DocumentQuery, MongoosePromise } from 'mongoose';
import { FileManager } from '../../common/file/fileManager';
export class Garden {
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
        getGarden(parent, { }, context): Promise<Array<IGardenModel>> {
            let promise = new Promise<Array<IGardenModel>>((resolve, reject) => {
                GardenSchema.find().then(res => {
                    resolve(res);
                }).catch(err => resolve(null));
            })
            return promise;
        },
        getGardenById(parent, { id }, context): Promise<IGardenModel> {


            let promise = new Promise<IGardenModel>((resolve, reject) => {
                GardenSchema.findById(id).then(res => {
                    resolve(res);
                }).catch(err => resolve(null));
            });
            return promise;
        },

        getGardenPage(parent, { pageIndex = 1, pageSize = 10, garden }, context) {
            var skip = (pageIndex - 1) * pageSize
            var gardenInfo = GardenSchema.find(garden).skip(skip).limit(pageSize)
            return gardenInfo;
        },

        getGardenWhere(parent, { garden }, context) {
            var gardenInfo = GardenSchema.find(garden);
            return gardenInfo;
        },
        getGardenWhereOne(parent, { garden }, context) {
            var gardenInfo = GardenSchema.findOne(garden);
            return gardenInfo;
        },

        getGardenCount(parent, { garden }, context) {
            if (!context.user) return 0;
            var count = GardenSchema.count(garden);
            return count;
        },
    }

    static Mutation: any = {
        saveGarden(parent, { garden }, context) {
            if (garden.id && garden.id != "0") {
                return new Promise<IGardenModel>((resolve, reject) => {
                    GardenSchema.findByIdAndUpdate(garden.id, garden, (err, res) => {
                        Object.assign(res, garden);
                        resolve(res);
                    })
                });
            }
            return GardenSchema.create(garden);
        },
        deleteGarden(parent, { id }, context): Promise<Boolean> {
            let promise = new Promise<Boolean>((resolve, reject) => {
                GardenSchema.findByIdAndRemove(id, (err, res) => {
                    resolve(res != null)
                }).catch(err => reject(err));
            });
            return promise;
        }
    }
}