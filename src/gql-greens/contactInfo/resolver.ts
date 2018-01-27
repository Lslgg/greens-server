import ContactInfoSchema, { IContactInfoModel } from './contactInfo';
import { DocumentQuery, MongoosePromise } from 'mongoose';
import { FileManager } from '../../common/file/fileManager';
export class ContactInfo {
    constructor() {

    }

    static Query: any = {
        getContactInfo(parent, { }, context): Promise<Array<IContactInfoModel>> {
            
            let promise = new Promise<Array<IContactInfoModel>>((resolve, reject) => {
                ContactInfoSchema.find().then(res => {
                    resolve(res);
                }).catch(err => resolve(null));
            })
            return promise;
        },
        getContactInfoById(parent, { id }, context): Promise<IContactInfoModel> {
            
            let promise = new Promise<IContactInfoModel>((resolve, reject) => {
                ContactInfoSchema.findById(id).then(res => {
                    resolve(res);
                }).catch(err => resolve(null));
            });
            return promise;
        },

    }

    static Mutation: any = {
        saveContactInfo(parent, { contactInfo }, context) {
            
            if (contactInfo.id && contactInfo.id != "0") {
                return new Promise<IContactInfoModel>((resolve, reject) => {
                    ContactInfoSchema.findByIdAndUpdate(contactInfo.id, contactInfo, (err, res) => {
                        Object.assign(res, contactInfo);
                        resolve(res);
                    })
                });
            }
            return ContactInfoSchema.create(contactInfo);
        },
        deleteContactInfo(parent, { id }, context): Promise<Boolean> {
            
            let promise = new Promise<Boolean>((resolve, reject) => {
                ContactInfoSchema.findByIdAndRemove(id, (err, res) => {
                    resolve(res != null)
                }).catch(err => reject(err));
            });
            return promise;
        }
    }
}