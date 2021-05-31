import { gql } from 'apollo-server-express'


export const typeDefs = gql`
type Query {
    name:String!,
    users:[User!]!,
    user:User!
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
}


`
