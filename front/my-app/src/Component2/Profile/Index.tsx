import React from 'react'
import Card from '@material-ui/core/Card';
import { Formik, Form, Field } from 'formik';
 import * as Yup from 'yup';
import { useMutation, gql } from '@apollo/client';
 import {NavLink} from 'react-router-dom'

interface Props{

}

const Add_User = gql`
mutation addUser($email:String!,$password:String!,$confirmPassword:String!){ 
  addUser(email:$email,password:$password,confirmPassword:$confirmPassword){
    _id,
   
    
  }
}
 
`


const SignupSchema = Yup.object().shape({
 
  email: Yup.string().email('Invalid email').required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    
  .max(14, 'Too Long!')
  .required('Required'),
  confirmPassword: Yup.string()
  .oneOf([Yup.ref('password'), null], 'Passwords must match')

});



let Index: React.FC<Props> = (props) => {

  const [addUser] = useMutation(Add_User, {
    onCompleted:data=>console.log(data)
  })


  return (
    <div style={{backgroundColor:"pink"}}>
      <Card style={{ margin: "10px", backgroundColor: "white", height: "600px", width: "40vw", display: "flex", flexDirection: "column",alignItems:"start" }}>
      
  

<h1>Signup</h1>
     <Formik
       initialValues={{
        
         email: '',
         password: '',
         confirmPassword: '',
       }}
       validationSchema={SignupSchema}
       onSubmit={async values => {
         // same shape as initial values
         console.log(values);
         
    await addUser({ variables:  values })
       }}
     >
       {({ errors, touched }) => (
         <Form>
            <label>Email</label>
              <Field name="email" type="email" />
           {errors.email && touched.email ? (
             <div>{errors.email}</div>
              ) : null}
              
            <label>Password</label>
           <Field name="password" />
           {errors.password && touched.password ? (
             <div>{errors.password}</div>
              ) : null}
              
            <label>confirmPassword</label>
             <Field name="confirmPassword"  />
           {errors.confirmPassword && touched.confirmPassword ? <div>{errors.confirmPassword}</div> : null}
           <button type="submit">Submit</button>
         </Form>
       )}
     </Formik>
      
        <NavLink to="/userLogin">already signed Up?click here to login</NavLink>
         
     {/* <a href={"http://localhost:3000"}>already signed Up?click here to login</a> */}
      </Card>
      
    </div>
  )
}

export default Index
