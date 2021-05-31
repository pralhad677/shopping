import React from 'react'

import { makeStyles, Theme, Button } from '@material-ui/core'

import { useForm, SubmitHandler } from 'react-hook-form';
import  './index.module.css'
import { Redux,StateType } from '../Redux/Index'

import { useMutation, gql } from '@apollo/client';
import _ from 'lodash'

const Add_Admin = gql`
        # //ya nira capital AddAdmin or addAdmin j lekhe ni hunxa
mutation AddAdmin($email:String!,$password:String!){ 
  addAdmin(email:$email,password:$password){
    _id,
    email,
    password
  }
}
` 
// const addAdmin = gql`
// mutation addAdmin($email:String!,$password:String!){
//   addAdmin(email:$email,password:$password){
//     _id,
//     m
//   }
// }
// `

interface Props{

}

const style = makeStyles((theme: Theme) => ({
  parentDiv: {
    display: "flex",
    // justifyContent: "center",
    // alignContent: "center",
    margin:"40px 0 10px 60px"
    // margin:"auto" 
  },
  firstDIv: {
    height: "70vh",
    width: "40vw",
    backgroundColor: "rgb(241,241,239)",
    display: "flex",

    justifyContent: "center",
    alignContent: "center",
    
    boxShadow: " 0 9px 4px rgb(254,179,144)  "
  },
  secondDiv: {
    height: "70vh",
    width: "40vw",
    
    backgroundColor: "rgb(255,237,225)",
    boxShadow: " 0 9px 4px rgb(254,179,144)  "
  },
  button: {
    height: "40px",
    width: "70px",
    fontSize: "10px",
    color:"rgb(255,86,0)"
  },
  form: {
    display: "grid",
    gridTemplateColumns: "repeat(30px,4)",
    gridTemplateRows:"repeat(20px,4)"
  }
  
}))
interface IFormInput {
  email: string;
  password: string;
  
  
}

let Index: React.FC<Props> = (props) => {
  const { firstDIv, secondDiv, parentDiv, button,form } = style()
  // const password = React.useRef({});
  const [addAdmin] = useMutation(Add_Admin, {
    onCompleted:data=>console.log(data)
  })
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm<IFormInput>();
  
  // password.current = watch("password", "");
  
  const {state,dispatch} = Redux()
  
  const onSubmit:SubmitHandler<IFormInput> =async  data =>{

  //  console.log('data,',data);
 
    
    
    // await addAdmin({ variables: {email:"prk",password:"kjcasd "} })
   let graphResponse= await addAdmin({ variables:  data })
    console.log('graphResponse', graphResponse)
    let FilteredData = _.pick(graphResponse.data.addAdmin, ['email', 'password'])
    console.log('FilteredData',FilteredData)
     
    // dispatch({ data: { data:[{ email: 'kvchg', password: '' }]},type:"success"})
    dispatch({ data: { data:[data]},type:"success"})
    dispatch({ data: { data:[FilteredData]},type:"success"})
  } 
 
  return (
    <div className={parentDiv}>
      <div className={firstDIv}>
        <form onSubmit={handleSubmit(onSubmit)} >
          <h3>Login as Admin User</h3>
        <label>Email</label> 
      <input
        {...register("email", {
          required: true,
          maxLength: 30,
          // pattern: /^[A-Za-z]+$/i
          pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/i
        })}
      />
      {errors?.email?.type === "required" && <p>This field is required</p>}
      {errors?.email?.type === "maxLength" && (
        <p>First name cannot exceed 20 characters</p>
      )} 
      {errors?.email?.type === "pattern" && (
        <p>email only</p>
          )}
          <label>Password</label>
          <input {...register("password", {
            // pattern: /^[A-Za-z]+$/i
            // pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/i,
            pattern: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/
          })} />
          {errors?.password?.type === "pattern" && (
            <div>
              <ul>
                <li>at least a special character</li>
                <li>at least a number</li>
              </ul>
              
              </div>
      )}
      
                            {/* <label>Confirm Password</label> */}
                            {/* <input name="confirmPassword" type="password" ref={register({
          validate: value =>
            value === password.current || "The passwords do not match"
        })} /> */}
      <a href="_" style={{textDecoration:"none",marginTop:"30px"}}>forget Password?</a>
          <input type="submit" />
       
       
        </form>
       </div> 
      <div className={secondDiv}>
        <div id="1">
{/*         
        <h1>{state.data.email}</h1> */}
        {
          state.data.map(item=>{
            return<ul>
            <li>{item.email}</li>
            </ul>
          })
        }
          </div>
      </div>
     
    </div>
  )
}

export default Index 
