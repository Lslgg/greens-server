import { model, Schema, Document } from 'mongoose';

export interface IArticleModel extends Document {
    id: string    
    imageIds: [String]
    type: String
    desc: String
    content:String
    isValid:Boolean  
    updateAt: Date
    createAt: Date
}

let schema: Schema = new Schema({
    // id:string            
    imageIds: [String],
    type: String,
    desc: String,
    content:String  ,
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

export default model<IArticleModel>('Article', schema);