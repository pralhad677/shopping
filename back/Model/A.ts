import { model, Schema, Model, Document } from 'mongoose';
// import {Employee} from './Admin'
import { IEmployee,Employee } from './Employee';

export interface A extends Document {
  name: String,
  refer: IEmployee[]
  
}
// https://zellwk.com/blog/mongoose-subdocuments/
const ASchema = new Schema({
  name: { type: String, required: true },
  refer:[{ type: Schema.Types.ObjectId, ref: 'Employee' }]
  
});

ASchema.pre('save', async function (this:A,next:(err?: Error | undefined) => void) {
  let allEmployeeData = await Employee.find()
//     .populate({
//     path:'addresses',
//     // select:'-__v -passwordResetExpires -passwordResetToken -updatedAt -createdAt -password'

// })
  console.log('allEmployeeData',allEmployeeData[0].addresses)
  console.log('allEmployeeData', allEmployeeData)
  this.refer = this.refer.concat(allEmployeeData)
  console.log(this.refer)
  next()
})

 

export const A: Model<A> = model('A', ASchema);