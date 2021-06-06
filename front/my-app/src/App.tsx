import React,{Dispatch} from 'react'
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
import LineBreak from './Component2/LineBreak/Index'


import { Switch, Route, Link } from 'react-router-dom';

import Men from './Component2/Men/Index'
import Profile from './Component2/Profile/Index'
import FileUpload from './Component2/FIleupload/Index'
import AdminLogin from './Component2/AdminLogin/Index'
import LoginUser from './Component2/LoginUser/Index'
import { Redux,StateType,Action } from './Component2/Redux/Index';

 

interface Props {
  
}



const Name = gql`
query name{
  name
}
`







const innerTheme = createMuiTheme({
  palette: {
    // common: {
     
    //   black: "#FF0000",
    //   white:"#228B22",
    // },
    
    primary: {
      main:"rgb(254,179,144)"
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
interface InitContextProps {
  state: StateType;
  dispatch: Dispatch<Action>;
}

export const Context = React.createContext(({} as InitContextProps))

let App: React.FC<Props> = (props) => {
  // const [addUser] = useMutation(ADD_TODO);
  const  {
    state,
    dispatch
  } = Redux()
  const [listOfUser, setListOfuser] = React.useState<{ name: string, id: number }[]>([])
  const {data}= useQuery(Name)
  function handleClick() {
    console.log(data)
  }
  
  
  let data1 = React.useCallback(() => {
    
    let res:any;
    let myfn = async () => {
      try {
 
        // for (let i of listOfName) {
        //   console.log(i)
        //    res = await addUser({ variables: { name: i } })
        //   setListOfuser(res.data.addUser.flat());
        
        // }
        // if (res) {
        //   console.log(res)
        // }
       
      }
      catch (err) {
        console.log(err)
        throw new Error(err.message)
      }
    }
    
  
      myfn()
  // },[addUser])
  },[])
  
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
      <Context.Provider value={{ state,dispatch }}>
      <ThemeProvider theme={innerTheme}>
      
      {/* {
        [...new Array(1000)].map(()=>'lorem epsum').join('\n')
        } */}
        
        
        <Switch>
      
          <Route exact path="/" component={() =>
            <div>
                <Header />
              <h1>home</h1>
              
              <Image />
              <LineBreak />
              <CovidHelp />
              <DealsOfTheDay />
              
            <NepaliDress />
            <Footer />
            </div>
          }>
          </Route>
          <Route path="/shop/Men/:id?" component={() =>
            <div>
                <Header />
              <h1>Men</h1>
              <Men />
              <Footer />
          </div>}>
          </Route>
          <Route path="/shop/Women" component={() => <div>
          
            <Header />
            Women
            <Footer />
             
            </div>}></Route>
          <Route path="/shop/Kids" component={() => <div>
            <Header />
            <h1>Kids</h1>
            <Footer />
          </div>}></Route>
          <Route path="/shop/Beauty" component={() => <div>
            <Header />
            <h1>Beauty</h1>
            <Footer />
          </div>}></Route>

          <Route path="/shop/HomeAndLiving" component={() => <div>
            <Header />
            <h1>HomeAndLiving</h1>
            <Footer />
          </div>}></Route>

          <Route exact path="/profile" >
           
          <Header />
            <Profile />
            <FileUpload />
            <Footer />
          </Route>
          <Route path="/adminLogin">
              <AdminLogin />
          </Route>
          <Route path="/adminPanel/:id">

          </Route>
          <Route path="/userLogin">
              <LoginUser />
          </Route>
            <Route path="/user/:id" component={() => {
              console.log('path', window.location.pathname.split('/').splice(2).join('/'))
              localStorage.setItem('id', window.location.pathname.split('/').splice(2).join('/'));
              return (
                <div>
                <h1>id:{`${window.location.pathname.split('/').splice(2).join('/')} `}</h1>
                
              <h1>successful login</h1>
              <button onClick={handleClick}>me</button>
              </div>
              )
            }}>
           
          </Route>
 
          <Route component={() => <div>
            <h1>Not Found</h1>
            <Link to="/">
              Go Home
             </Link> 
          </div>} />
         
        </Switch>
        
      
       
        
        </ThemeProvider>
        </Context.Provider>
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
