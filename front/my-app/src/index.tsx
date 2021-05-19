import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { ApolloProvider } from '@apollo/client/react';

// import { BrowserRouter as Router } from "react-router-dom";
import { BrowserRouter as Router} from 'react-router-dom' 

const client = new ApolloClient({
  uri: 'http://localhost:3005/graphql',
  cache: new InMemoryCache()
});
 
ReactDOM.render(
  <React.StrictMode>
  <Router>
      <ApolloProvider client={client}>
          <App />
      </ApolloProvider>
  </Router>
  
    
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
