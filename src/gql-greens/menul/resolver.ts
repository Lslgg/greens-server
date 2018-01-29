import MenulSchema, { IMenulModel } from './menul';
import { DocumentQuery, MongoosePromise } from 'mongoose';
import { FileManager } from '../../common/file/fileManager';
export class Menul {
    constructor() {

    }

    static Query: any = {
        getMenul(parent, { }, context): Promise<Array<IMenulModel>> {
            let promise = new Promise<Array<IMenulModel>>((resolve, reject) => {
                MenulSchema.find().then(res => {
                    resolve(res);
                }).catch(err => resolve(null));
            })
            return promise;
        },
        getMenulById(parent, { id }, context): Promise<IMenulModel> {
            let promise = new Promise<IMenulModel>((resolve, reject) => {
                MenulSchema.findById(id).then(res => {
                    resolve(res);
                }).catch(err => resolve(null));
            });
            return promise;
        },

    }

    static Mutation: any = {
        saveMenul(parent, { menul }, context) {

            if (menul.id && menul.id != "0") {
                return new Promise<IMenulModel>((resolve, reject) => {
                    MenulSchema.findByIdAndUpdate(menul.id, menul, (err, res) => {
                        Object.assign(res, menul);
                        resolve(res);
                    })
                });
            }
            return MenulSchema.create(menul);
        },
        deleteMenul(parent, { id }, context): Promise<Boolean> {

            let promise = new Promise<Boolean>((resolve, reject) => {
                MenulSchema.findByIdAndRemove(id, (err, res) => {
                    resolve(res != null)
                }).catch(err => reject(err));
            });
            return promise;
        }
    }
}