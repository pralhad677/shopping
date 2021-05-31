import { model, Schema, Model, Document } from 'mongoose';
import bcrypt from 'bcryptjs'

export interface IUser extends Document {
 email:String,
 password:String,
  confirmPassword: String | undefined,
  count:Number
}
const UserSchema: Schema = new Schema({

  email: { type: String, required: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  count: {
    type: Number,
    required: true,

    default:0
  }
});

UserSchema.pre('save', async function (this:IUser,next:(err?: Error | undefined) => void) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();

  console.log('UserSchema.pre',this .password)
  // Hash the password with cost of 12 
  // (this as IUser ).password = await bcrypt.hash((this as IUser).password, 12);

  
  // 'string' is a primitive, but 'String' is a wrapper object. Prefer using 'string' when possible.
  this.password = await bcrypt.hash(this.password.toString(), 12);

  // Delete passwordConfirm field
  this.confirmPassword = undefined;
  next();
})

export const User: Model<IUser> = model('User', UserSchema);