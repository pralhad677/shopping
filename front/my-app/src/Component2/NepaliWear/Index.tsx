import React from 'react'
import {NepaliDressList} from './list'

interface Props{

}

let Index:React.FC<Props>=(props)=> {
  return (
    <div>
      <h1>Nepali Dress</h1>
      <div style={{ height: "800px", "width": "100vw", backgroundColor: "white", margin: "20px 0px", display: "flex" }}>
        {
          NepaliDressList.map(item => {
            return <div key={item.image.id} style={{height:"700px",backgroundColor:"rgb(217, 217, 217)",margin:"25px",flexGrow:2,borderRadius:"10%"}}>
              {item.image.data.map(item1 => {
                return <div key={item1.id} style={{ display: "flex",flexDirection:"column",alignItems:"center" }}>
                  <h1>{item1.name}</h1>
                  <img src={item1?.path.split('/').slice(4).join('/')} alt="pic" style={{borderRadius:"20%",height:"250px",width:"200px"}}/>
               </div>
             })}
            </div>
          })
        }

      </div>
      
    </div>
  )
}

export default Index
