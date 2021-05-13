import express from "express"
const app=express()
import {ApolloServer} from 'apollo-server-express'
import dotenv from 'dotenv'
//using graphql --->we dont need body parser
dotenv.config({path:'./dotenv.env'})
// import {schema} from './Graphql/graphql'
import {resolvers} from './graphql/resolvers'
import { typeDefs } from './graphql/typedefs';
// import mongoose from 'mongoose'
import mongoose from 'mongoose'
// import cors from 'cors'





// app.use(cors({origin:'http://localhost:3000'}))

const server = new ApolloServer({
   
 
typeDefs,
   resolvers
});
server.applyMiddleware({app,path:'/graphql'})


console.log('hey') 

// 'mongodb://localhost/new'
mongoose.connect('mongodb://localhost:27017/graphqlDb',{
    // newURLParser:true
    useNewUrlParser: true,
    useUnifiedTopology: true
     
}).then(() => { 
    console.log('connected to mongodb')
    app.listen(process.env.PORT,()=>{
        console.log('app is listening on port 3005/graphql')
    }) 
}).catch(console.log)

process.on('unhandledRejection', (err:Error) => {
    
    console.log(err?.name,err?.message);
    process.exit(1);
});

