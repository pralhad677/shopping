import { model, Schema, Model, Document } from 'mongoose';
import AppError from '../utils/AppError'

export interface IAdmin extends Document {
  email: String,
  password:String
}
const AdminSchema: Schema = new Schema({

  email: { type: String, required: true,unique: true,
    validate: async function(value:string):Promise<any>  {
        try {
            const result:Document| null = await Admin.findOne({ email: value })
            // const result:Document| null = await this.constructor.findOne({ email: value })
            if (result) throw new Error(`duplicity detected: email : ${value}`);
        } catch (error) {
            console.log(error)
            throw new AppError(error.message,400);
        }
    } },
  password: { type: String, required: true }
});

export const Admin: Model<IAdmin> = model('Admin', AdminSchema);