import { model, Schema, Document } from 'mongoose';

export interface ITypeModel extends Document {
    id: string
    key: String
    value: String
    type:String
    updateAt: Date
    createAt: Date
}

let schema: Schema = new Schema({
    // id:string                
    key: String,
    value: String, 
    type:String,   
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

export default model<ITypeModel>('Type', schema);