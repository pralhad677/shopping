import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache,ApolloLink,createHttpLink,NormalizedCacheObject } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';
import { createUploadLink } from 'apollo-upload-client'
// import { onError } from "@apollo/client/link/error";
import { onError } from "apollo-link-error";

import { BrowserRouter as Router,useHistory } from 'react-router-dom'


 
const link = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
     
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
      if (message.includes('not authenticated')) {
        useHistory().replace('/userLogin')
      }
    }
    );
  if (networkError) console.log(`[Network error]: ${networkError}`);
});
const uploadLink =createUploadLink({
      
  uri: 'http://localhost:3013/graphql',
  credentials: "include"
})
const httpLink = createHttpLink({
  uri: 'http://localhost:3013/graphql',
  credentials: "include"
})
 
const client = new ApolloClient({
  link:  ApolloLink.from([ (link as unknown)  as ApolloLink,httpLink,uploadLink ]),
  cache: new InMemoryCache()
}); 
  
// const client = new ApolloClient({
//   link: createUploadLink({
      
//     uri: 'http://localhost:3010/graphql',
//     credentials: 'same-origin'
//   }),
//   cache: new InMemoryCache()
// }); 
  
ReactDOM.render(
  <React.StrictMode> 
  <Router >
      <ApolloProvider client={client}>
          <App  />
      </ApolloProvider>
  </Router>
  
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
