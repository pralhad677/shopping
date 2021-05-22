import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'

import { Button, Grow } from '@material-ui/core'

import {getAllImage,Image as Image1} from './list'
// import { map } from 'rxjs/operators';
import Jimp from 'jimp'


interface Props {

}
const style = makeStyles((theme: Theme) => ({
  parentDiv: {
    height: "60vh",
    width: "80vw",
  },
  ImageList: {
    display:"flex",
  },

  gridImage: {
    borderRadius: "50%",
    width: "200px", 
    height: "200px",
    margin:"5px"
  },
  secondDiv: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems:"center",
    marginLeft: "60px",
    backgroundColor: "rgb(180, 255, 255)",
    borderRadius:"10px"
   
  }
  
}))

let Index: React.FC<Props> = (props) => {
  const { parentDiv, ImageList,gridImage,secondDiv } = style()
  const Image:Image1[] =getAllImage()
  return (
    <div className={parentDiv}>
      <h1 style={{color:"rgb(255,0,0)"}}>Deals Of The week</h1>
      <div className={ImageList} >
        {
          Image.map(item => {
            return <div key={item.id} className={secondDiv} >
                
               
              <h1  >{ item.name}</h1>
               <img alt="pic" src={  item?.path.split('/').slice(4).join('/')}  className={gridImage}/> 
            </div>
          })
       }
      </div>
      
    </div>
  )
}

export default Index
