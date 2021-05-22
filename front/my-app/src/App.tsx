import React from 'react'
import { useQuery, gql, useMutation } from '@apollo/client';
// import ErrorBoundary from './Component/ErrorBoundary/ErrorBoundary';
import { ErrorBoundary } from 'react-error-boundary'
// import SearchBox from './Component/SearchBox/index'
import './App.scss'
import Header from './Component2/Header'
import Footer from './Component2/Footer'
import Image from './Component2/Image/Index'

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import CovidHelp from './Component2/CovidHelp/Index'
import DealsOfTheDay from './Component2/DealsOfTheDay/Index'
import NepaliDress from './Component2/NepaliWear/Index'


import { Switch, Route } from 'react-router-dom'
 

interface Props {
  
}

let listOfName = [
  "rupak","dipak","nisha","madan","rabin","pandey","a"
]



// const mutation = `
// mutation AddUser($name:String!){
//   addUser(name:$name){
//     name,
//     id
//   }
// }`



const ADD_TODO = gql`
  mutation AddUser($name: String!) {
    addUser(name: $name) {
      name
      id
     
    }
  }
`;


// const mutation1 = gql`
//   mutation AddUser($name:String!){
//   addUser(name:$name){
//     name,
//     id
  // }

// `

const innerTheme = createMuiTheme({
  palette: {
    // common: {
     
    //   black: "#FF0000",
    //   white:"#228B22",
    // },
    
    primary: {
      main:"#FFD700"
    },
    secondary: {
      main: "#228B22",
    },
  
    
  },
  typography: {
    h3: {
      fontSize:40
    }  
  },
  mixins: {
    toolbar: {
      minHeight:9
    }
  }
});
  

let App: React.FC<Props> = (props) => {
  const [addUser] = useMutation(ADD_TODO);
  const [listOfUser, setListOfuser] = React.useState<{name:string,id:number}[]>([])
  
  let data1 = React.useCallback(() => {
    let res:any;
    let myfn = async () => {
      try {
 
        for (let i of listOfName) {
          console.log(i)
           res = await addUser({ variables: { name: i } })
          setListOfuser(res.data.addUser.flat());
        
        }
        if (res) {
          console.log(res)
        }
       
      }
      catch (err) {
        console.log(err)
        throw new Error(err.message)
      }
    }
    
  
      myfn()
  },[addUser])
  
  React.useEffect(() => {
    // 
    data1()
  },[data1])
  
  return (
    <ErrorBoundary
    FallbackComponent={ErrorFallback}
    onReset={() => {
      // reset the state of your app so the error doesn't happen again
    }}
    >
      {/* <h1>{props.name}</h1> */}
      {/* <SearchBox list={ listOfUser}/> */}
      <ThemeProvider theme={innerTheme}>
      <Header />
      {/* {
        [...new Array(1000)].map(()=>'lorem epsum').join('\n')
        } */}
        
        
        <Switch>
          <Route exact path="/"  component={()=><h1>Home Page</h1>}>
          </Route>
          <Route  path="/Men"  component={()=><h1>Men</h1>}>
          </Route>
          <Route  path="/Women" component={()=><h1>Women</h1>}></Route>
          <Route path="/Kids" component={() => <h1>Kids</h1>}></Route>
          <Route path="/Beauty" component={() => <h1>Beauty</h1>}></Route>
          <Route path="/HomeAndLiving" component={()=><h1>Home and Living</h1>}></Route>
        </Switch>
        <Image />
        <hr
        style={{
            color: 'black', 
            backgroundColor: 'grey',
            // width:calc(100%-20px), 
            width: "calc(100vw - 80px)",
            height: "2",
        }}
    />
        <CovidHelp />
        <DealsOfTheDay />
        <NepaliDress />
        <Footer />
        </ThemeProvider>
      
    </ErrorBoundary>
  )
}

export default App

// export default function appWithErrorBoundary(props:Props){
//   return (
//     <ErrorBoundary >
//         <App {...props}/>
//     </ErrorBoundary>
  
//   )
// }

function ErrorFallback({error, resetErrorBoundary}:{error:any,resetErrorBoundary:any}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre> 
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  ) 
} 