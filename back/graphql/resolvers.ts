import { IResolvers,UserInputError,ApolloError,PubSub } from 'apollo-server-express'
import { User,IUser } from '../Model/User'
import { Admin, IAdmin } from '../Model/Admin'
import { Employee, } from '../Model/Employee'
import { A as A1 } from '../Model/A'
import jwt from 'jsonwebtoken'
import { getTokens } from './token'
import { Subscription} from './subscription'
// const jwt = require('jsonwebtoken');
// import { User, } from '../Model/User'

import path from 'path'
import fs  from 'fs'

// import {upload} from '../FileUpload/Index'

import _ from 'lodash'
import bcrypt from 'bcryptjs';

let EMP ='emp'

let item=[ {
    id: 1982364832791746192734669139747,
  name: 'Jacob', 
  genre: 'Nepali', 
}]
 const lists = [
    {
        name:'jacob',
        id:112673471283009123
    },
    {
        name:'ryan',
        id:223712893712321378
    }
]

// interface JsonType {
//     status: number,
//     message:string
// }
// type X = IAdmin & JsonType

//  type JsonResponse = Pick<X,"_id"|"email"|"password"|"status"|"message">

export const resolvers: IResolvers = {
    Query: {
        name(parent, args, { req }, info) {
            console.log('req.userId',req.userId)
            if (!req.userId) {
                return 'login to access '
            }
            return 'my name is jacob'
        },
        users() {
            // throw new UserInputError('Invalid argument value', {
            //     argumentName: 'id'
            //   });
            return lists
        },
        async user() {
            const name = 'jacob'
            
            let data = await User.create({ name })
           
            let data1 = _.pick(data, ["name", "_id"])
            return {
                email: data1.email,
                id: data1._id
            }
        },
        item() {
           
         return [{
            id: 1982364832791746192734669139747,
          name: 'Jacob', 
          page:200,
          genre: 'Nepali', 
        
        }]
        }
    },
    Item: {
        __resolveType(obj:any, context:any, info:any){
       if(obj.name){
           return 'Book'
       }
       if(obj.genre){
           return 'Film'
       }
       return 'Item'
           
          }
    },
    Mutation: {

        //signup
        async addUser(parent, { email, password, confirmPassword }) {
            console.log('oo')
            let data = new User({
                email,
                password,
                confirmPassword,
                count:0
        })
            console.log(data)
            let data1 = await data.save()
            console.log(data1)

            return data1

            
        },

        uploadFile: async (parent, {file}) => {
            const { createReadStream,filename, mimetype, encoding } = await file
            console.log('asd')
            const stream = await createReadStream()
            console.log(file)
            
            let pathname = path.join(__dirname, `/public/images/${filename}`)
           
             let pathname1 =a(pathname)
                console.log( pathname1)
            await new Promise((resolve, reject) => {
                const writeStream = fs.createWriteStream(pathname1);
                stream
                    .pipe(writeStream)
                    .on('finish', resolve)
                    .on('error', reject);
            });
            
            console.log('d')
            return { 
                url:`http://localhost:3014/images/${filename}` 
            }
        },
        // :Promise<JsonResponse >
        addAdmin: async (parent, {email,password}, context, info) => {
           console.log(email,password)
            let adminData = new Admin({
                        email,
                        password
            })
            let data = await adminData.save()
            console.log(data) 
                    return data
        // return {
        //     ...data,
        //     status: 201,
        //     message:"successfully created resource"
        // }
        },
        loginUser: async (parent, {email,password}, {res}, info)=>{
            let user:IUser|null = await User.findOne({ email })
            if (!user) {
                // throw new Error("NO User found With given id")
                
                    throw new UserInputError('NO User found With given id');
            }
            const valid = await bcrypt.compare(password, user.password.toString())
            console.log("valid",valid)
            if(!valid){
                 
                throw new Error("InValid Password")
            }
            console.log('hey')
            const { accessToken,
                refreshToken} =getTokens(user)
            res.cookie("refresh-token",refreshToken,{expires: new Date(Date.now() + 1000*60*60*24*7),httpOnly:true}) //7 days
            res.cookie("access-token", accessToken, {expires: new Date(Date.now() + 1*60*1000),httpOnly:true}) //15 min
            
            console.log('hey1') 
            return user
        },
        getUser: async (parent, { id }, {req}, info) => {
            //this is custom error made by extending Apollo Error
            // if (!req.userId) {
                
            // throw new NotAllowed('k khalko error ho kunni')
            // }
            console.log('malai vanna aaudaina ')
            return await User.findById(id)
            
        },
        getEmployee: async (_, {name,company,twitter,tiktok,website,addresses }, { pubsub }) => {
            let emp = new Employee({
                name,
                company,
                twitter,
                tiktok,
                website,
                addresses
            })
            console.log('emp',emp)
            let data = await emp.save()
            //subscription is based on webscoet so taht whenever i call this mutation method subscirption will b auto aupdate
            //but subscription is not working in this case
            // {
            //     "error": "Could not connect to websocket endpoint ws://localhost:3014/subscriptions. Please check if the endpoint url is correct."
            //   }
            pubsub.publish('emp', {
                data
            })
            return data
        },
        getA: async (_, {name}, { }) => {
            let data = await A1.create({ name })
            return data
        },
        aggregate: async (_1:any,_2:any,_3:any,_4:any) => {
            let docs = await Employee.aggregate([
                {
                    $match: { "name":"jacob" } ,  
                },
                {
                    $group: {
                      _id: '$name',
                      count: { $sum: 1 }
                    }
                  }
            ])
            console.log('docs', docs)
            return docs[0]
        }
    },
    Subscription: {
        count: {
          subscribe(parent:any,args:any,{pubsub}:any,info:any) {
            let count = 0
            setInterval(() => {
              ++count
              pubsub.publish('count', {
                count
              })
            },1000)
            return pubsub.asyncIterator('count')
        },
        getEmployee: {
            subscribe:(_, _1, { pubsub }: any) =>pubsub.asyncIterator(['emp'])
        }
        },
    
    }
        }
    
interface A{
    (x:string):string
} 

let a:A=(data:string)=> {
    let x = data.split('\\') //regex pattern manne vako le double slah rakheko
    console.log('x',x)
   x.splice(5, 1)
    console.log('x',x)
    return x.join('\\')
        }




 class NotAllowed extends ApolloError {
  constructor(message: string, properties?: Record<string, any>) {
    super(message, 'Not Allowed TO Access', properties);

    Object.defineProperty(this, 'name', { value: 'NotAllowed' });
  }
}
        