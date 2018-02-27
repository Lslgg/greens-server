import { model, Schema, Document } from 'mongoose';

export interface IlcNewsModel extends Document {
    id: string
    imageIds: [String]
    title: String
    brief: String
    content: String
    updateAt: Date
    isValid:Boolean
    createAt: Date
}

let schema: Schema = new Schema({
    // id:String,             
    imageIds: [String],
    title: String,
    brief: String,
    content: String,
    isValid:Boolean,
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

export default model<IlcNewsModel>('lcNews', schema);