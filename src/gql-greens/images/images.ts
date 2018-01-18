import { model, Schema, Document } from 'mongoose';

export interface IImagesModel extends Document {
    id: string    
    imageIds: [String]
    type: String
    desc: String
    updateAt: Date
    createAt: Date
}

let schema: Schema = new Schema({
    // id:string            
    imageIds: [String],
    type: String,
    desc: String,
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

export default model<IImagesModel>('Images', schema);