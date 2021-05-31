import React from 'react'
import { useMutation,gql } from '@apollo/client';
// import {useMutation}

const upload_File = gql`
mutation uploadFile($file:Upload!){
  uploadFile(file:$file){
    url
  }
}
 
`


function Index() {
  const [uploadFile] = useMutation(upload_File, {
    onCompleted:data=>console.log(data)
  })
  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) {
      return;
  }

    if (!e.target.files[0]) return;
    const file = e.target.files[0]
    console.log('file',file)
    uploadFile({variables:{file}})

  }
  return (
    <div>
      <h1>upload file</h1>
      <input type="file" onChange={changeHandler} />
    </div>
  )
}

export default Index
