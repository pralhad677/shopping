import { gql } from 'apollo-server-express'


export const typeDefs = gql`
type Query {
    name:String!,
    users:[User!]!,
    user:User!,
    # pactising interface
    item:[Item!]!
},
type User {
    email:String!,
    _id:ID! ,
    password:String!,
    confirmPassword:String!
}, 
type File {
#   originalname : String
#   mimetype : String
#   encoding : String
#   destination : String
#   filename : String
#   path : String
#   size : Int
url:String!
},
type Admin{
    _id:ID!
    email:String!,
    password:String!
}
type loginToken {
    token:String!
}
type Mutation {
    addUser(email:String!,password:String!,confirmPassword:String!):User!
    uploadFile(file : Upload!) : File!,
    addAdmin(email:String!,password:String!):Admin!,
    loginUser(email:String!,password:String!):User!
    getUser(id:ID!):User!
    getEmployee(
  name:String,
  company:String,
  twitter: String,
  tiktok: String,
  website: String,
  addresses:[address!]!):Employee!

  getA(name:String):A!
}


# //pactice kp ;lagi
interface Item {
  id: ID!

}

type Book implements Item {
    id: ID!
  name: String!
  page:Int!
  
  
}

type Film implements Item {
    id: ID!
  genre: String! 
 
}
type Address{
  _id:ID!,
  street:String,
  city:String
}
input address {
  
  street:String,
  city:String
} 

type Employee {
  _id:ID!,
  name:String,
  company:String,
  twitter: String,
  tiktok: String,
  website: String,
  addresses:[Address!]!
}
type A{
  name:String,
  refer:[Employee!]!
}

type Subscription {
  count:Int!
  getEmployee:Employee!
}


`
