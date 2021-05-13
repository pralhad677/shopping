import React from 'react'
import { useQuery, gql,useMutation  } from '@apollo/client';

interface Props {

}

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
  

let App: React.FC<Props> = () => {
  const [addUser] = useMutation(ADD_TODO);
  
  let data1 = React.useCallback(() => {
    let myfn = async () => {
        let res = await addUser({ variables: { name: 'kali' } })
        console.log('res',res)
      }
      myfn()
  },[addUser])
  
  React.useEffect(() => {
    // 
    data1()
  },[data1])
  
  return (
    <div>
    
        
      
    </div>
  )
}

export default App
