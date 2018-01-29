import { model, Schema, Document } from 'mongoose';

export interface IMenulModel extends Document {
    id: string
    name1:String
    name2:String
    name3:String
    name4:String
    name5:String
    name6:String
    name7:String 
    updateAt: Date
    createAt: Date
}

let schema: Schema = new Schema({
    // id:string                
    name1:String,
    name2:String,
    name3:String,
    name4:String,
    name5:String,
    name6:String,
    name7:String,
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

export default model<IMenulModel>('Menul', schema);