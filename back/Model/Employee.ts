// {
//   "_id": "ObjectId('AAA')",
//   "name": "Joe Karlsson",
//   "company": "MongoDB",
//   "twitter": "@JoeKarlsson1",
//   "twitch": "joe_karlsson",
//   "tiktok": "joekarlsson",
//   "website": "joekarlsson.com",
//   "addresses": [
//       { "street": "123 Sesame St", "city": "Anytown", "cc": "USA" },
//       { "street": "123 Avenue Q",  "city": "New York", "cc": "USA" }
//   ]
// }

import { model, Schema, Model, Document } from 'mongoose';
import bcrypt from 'bcryptjs'

interface Address {
  
  street: String
  , city: String
  
}
export interface IEmployee extends Document {
 name:String,
  company: String,
  twitter: String,
  tiktok: String,
  website: String,
  addresses: Address[]

}

const addressSchema = new Schema({
  street: String,
  city: String
})
const EmployeeSchema: Schema = new Schema({

  name: { type: String, required: true },
  company: { type: String, required: true },
  twitter: { type: String, required: true },
  tiktok: { type: String, required: true },
  website: { type: String, required: true },
  addresses: {
   type: [{
    street: String
  , city: String 
    },
    
    ],
    required: true,
    // select:false
}

});



export const Employee: Model<IEmployee> = model('Employee', EmployeeSchema);