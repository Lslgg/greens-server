import { model, Schema, Document } from 'mongoose';

export interface IGardenModel extends Document {
    id: string
    imageIds: [String]
    title:String
    brief: String
    updateAt: Date
    createAt: Date
}

let schema: Schema = new Schema({
    // id:string            
    imageIds: [String],
    title:String,
    brief: String,
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

export default model<IGardenModel>('Garden', schema);