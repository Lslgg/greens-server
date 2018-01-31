import { model, Schema, Document } from 'mongoose';

export interface IContactInfoModel extends Document {
    id: string
    comName1: String
    comName2: String
    sPhone: String
    webName: String
    comAddress: String
    cPhone1: String
    cPhone2: String
    webSite: String
    title:String
    updateAt: Date
    createAt: Date
}

let schema: Schema = new Schema({
    // id:string                
    comName1: String,
    comName2: String,
    sPhone: String,
    webName: String,
    comAddress: String,
    cPhone1: String,
    cPhone2: String,
    webSite: String,
    title:String,
    createAt: {
        type: Date,
        default: new Date(),
        required: true
    },
    updateAt: {
        type: Date,
        default: new Date(),
        required: true
    },
})

export default model<IContactInfoModel>('ContactInfo', schema);