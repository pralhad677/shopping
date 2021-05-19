import { IResolvers } from 'apollo-server-express'
import {User} from '../Model/User'
import _ from 'lodash'
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


export const resolvers: IResolvers = {
    Query: {
        name(parent, args, context, info) {
            return 'my name is jacob'
        },
        users() {
            return lists
        },
        async user() {
            const name = 'jacob'
            
            let data = await User.create({ name })
           
            let data1 = _.pick(data, ["name", "_id"])
            return {
                name: data1.name,
                id: data1._id
            }
        },
    },
            Mutation: {
                addUser(parent, { name }) {
                    // throw new Error('error occurs')
                    let obj = {
                        name,
                        id:Math.ceil(Math.random()*106891230903123)
                    }
                    let itemFound = lists.find(item => item.name === name);
                    if (itemFound || name==="") {
                        return lists
                    }
                    lists.push(obj)
                    return lists
                }
            }

        }
    

