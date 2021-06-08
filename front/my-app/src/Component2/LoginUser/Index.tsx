import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

import {gql,useMutation} from '@apollo/client'
import {InputAdornment } from '@material-ui/core/';
import { useHistory } from 'react-router-dom';


// loginUser(email:String!,password:String!):User!
const Login_User = gql`
mutation loginUser($email:String!,$password:String!){ 
  loginUser(email:$email,password:$password){
    _id
  }
}

`
const Get_User = gql`
mutation getUser($id:ID!){
  getUser(id:$id){
    email
  }
}
`

const loginSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: Yup.string().email("Invalid email").required("Required")
});

const LoginForm = () => {
  const history = useHistory()
  const [loginUser] = useMutation(Login_User, {
    onCompleted:data=>console.log(data)
  })
  const [getUser] = useMutation(Get_User, {
    onCompleted:data=>console.log(data)
  })
  const [err,setError] =React.useState<string>('')
 const handleSubmit = async (values:any, { setSubmitting }:{setSubmitting:any}) => {
    // setTimeout(() => {
    //   alert(JSON.stringify(values, null, 2));
      
    //   setSubmitting(false);
    // }, 400);
   let graphResponse = await loginUser({ variables: values })
   
   console.log(graphResponse.data.loginUser._id)
   if (graphResponse.data.loginUser._id) {

   
     history.push(`/user/${graphResponse.data.loginUser._id}`)
   }
    setSubmitting(false);
  };
  let data = React.useCallback(async () => {
    await getUser({ variables: { id: "60b1f9951d2b5807e81b8ff4" } }).then(data, err => {
      console.log(err)
      // throw new Error(err)
      setError(err.message)
    })
  },[getUser])
  React.useEffect(() => {
    let item = true
    data()
    return () => {
      item=false
    } 
  }, [data])
  if (err) {
    return <h1>{ err}</h1>
  }

    return (
      <>
        <h1>Login</h1>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => {
            return (
              <Form>
                <label>
                  Email: <Field type="email" name="email" />
                  <ErrorMessage name="email" component="div" />
                </label>
                <label>
                  Password:
                  <Field type="password" name="password"  />
                  <ErrorMessage name="password" component="div" />
                </label>
                <button type="submit" disabled={isSubmitting} style={{marginTop:"30px"}}>
                  Submit
                </button> 
              </Form>
            );
          }}
        </Formik>
      </>
    );
  }


export default LoginForm;
