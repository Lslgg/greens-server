import { model, Schema, Document } from 'mongoose';

export interface IContactInfoModel extends Document {
    id:string         
    webName:String
    sPhone:String
    cPhone1:String
    cPhone2:String
    webSite:String
    updateAt:Date
    createAt:Date    
}

let schema: Schema = new Schema({
    // id:string                
    webName:String,
    sPhone:String,
    cPhone1:String,
    cPhone2:String,
    webSite:String,  
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