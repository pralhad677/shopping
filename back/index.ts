import express from "express"
const app=express()
import {ApolloServer,PubSub} from 'apollo-server-express'
import dotenv from 'dotenv'
//using graphql --->we dont need body parser
dotenv.config({path:'./dotenv.env'})
// import {schema} from './Graphql/graphql'
import {resolvers} from './graphql/resolvers'
import { typeDefs } from './graphql/typedefs';

import  { getTokens } from './graphql/token';
// import mongoose from 'mongoose'
import mongoose from 'mongoose'
import path from 'path'
import bodyParser from 'body-parser'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import { User } from './Model/User'

const pubsub = new PubSub()



// app.use(cors({origin:'http://localhost:3000'}))
app.use(cors({ origin: 'http://localhost:3000', credentials: true }))


app.use(bodyParser.urlencoded()); 

// app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));

const server = new ApolloServer({
   typeDefs,
    resolvers,
    context: ({ req, res }: any) => (({ req, res, pubsub })),
    subscriptions: {
        path: '/subscriptions'
      },
    
//    uploads:true
});

app.use(cookieParser())

app.use(async (req, res, next) => {
    // console.log(req.headers.accessToken)
    // console.log(req.headers.refreshToken)
    console.log(req.cookies)
    
    const accessToken = req.cookies['access-token']
    const refreshToken = req.cookies['refresh-token']
    console.log(' accessToken',accessToken)
    console.log(' refreshToken',refreshToken)
    if (!accessToken || !refreshToken) {
        console.log('not found accessToken or refreshToken')
    //    return  next()
    }
    console.log('accessToken jacob',accessToken)
    try {
        // const refreshToken = req.cookies['refresh-token']
      console.log('first try block')
        const decode = jwt.verify(accessToken, 'process.env.SECRET_KEY') as any
        (req as any).userId = decode.userId
        console.log('jacob') 
        console.log((req as any).userId)
        return next()
    }
   
    
    catch { }
    if (!refreshToken) {
        console.log('refresh token not found')
        return next()
    }
    let data;
    try {
        // const refreshToken = req.cookies['refresh-token']
        console.log('using refresh token to re assign access token')
        data = jwt.verify(refreshToken, 'process.env.SECRET_KEY') as any
        console.log('data',data)
        
        
    }
   
    
    catch {
        return next()
    }
    console.log('data.userId',data.userId)
    const user = await User.findById(data.userId)
    console.log('data.count',data.count)
    console.log('user.count',user?.count)
    if (!user || user.count !== data.count) {
        return next() 
    }
    const { accessToken:accessToken1 , refreshToken:refreshToken1 } = getTokens(user)
     //7 days
    res.cookie("refresh-token", refreshToken1, { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), httpOnly: true })
    
   //15 min 15 * 60 * 1000
    res.cookie("access-token", accessToken1, { expires: new Date(Date.now() + 1000*60*1), httpOnly: true });

    (req as any).useId = user.id
    
    next()
}) 

 
server.applyMiddleware({app,path:'/graphql',cors: false})



// 'mongodb://localhost/new'
mongoose.connect('mongodb://localhost:27017/graphqlDb',{
    // newURLParser:true
    useNewUrlParser: true, 
    useUnifiedTopology: true
      
}).then(() => {  
    console.log('connected to mongodb') 
    app.listen(process.env.PORT,()=>{
        console.log('app is listening on port 3014/graphql')
    })  
}).catch(console.log) 

process.on('unhandledRejection', (err:Error) => {
    
    console.log(err?.name,err?.message);
    process.exit(1);
});

