import React from 'react'
import Result from './Result/Result'

interface Props {
  found: boolean,
  length: number,
  data:string
}

let B: React.FC<Props> = ({ found,length,data }) => {
  console.log('b.tsx', found)
  console.log('length', length)
  let searchHere = "Search Here"
 
  return (
    <div style={{gridRow: "2/3",gridColumn:"1/3"}}>
      {/* {
        found ? <h1>found :{data}</h1> : length === 0 ? <h1>Search Here</h1> : <h1>not Found:{ data}</h1>
      } */}
      {
        found ? <Result data={` found :${data}`} /> : length === 0 ? <Result data={searchHere} /> : <Result data={`Not Found ${data}`}/>
    }
    </div>
  )
}
export default B