import React from 'react'

import { makeStyles, Theme } from '@material-ui/core/styles'

import { Button } from '@material-ui/core'

import { getSingleImage } from './list'




interface Image {
  id:string,
  path:string
}


const myStyle = makeStyles((theme:Theme)=>({
  div:{
    height:"50vh",
    backgroundColor: "red",
    display: "grid", 
    gridTemplateColumns: "repeat(5,20%)",
    gridTemplateRows: "repeat(5,20%)",
    borderRadius:"20px"
    
  },
  parentDiv: {
    gridColumnStart: "3",
    gridColumnEnd: "4",
    gridRow:"5/6",
    alignSelf: "end",
  },
  Image: {
    display: "block",
    margin:"auto",
    overflow: "hidden",
    position: "relative",
    height: "270px",
    width:"600px",
    left: "300px",
    
  imageRendering: "pixelated"
   
    
 }, 
  slideDot :{
    cursor: "pointer", 
    height: "10px",
    width: "10px",
    textDecoration: "none",
    color: "white",
    backgroundColor: "white",
    borderRadius: "50px",
    display: "inline-block",
    padding: "5px",
    marginLeft:"5px",
    backgroundClip: "content-box",
    border: "1px solid transparent", 
    
    
    
  },
  
  active :{
    backgroundColor: "black",
    borderColor: "blue",
    // height: "20px",
    // width:"20px"
  }
}))
// console.log('image',Image)
function ImageListShow() { 
  const { div, slideDot, active, parentDiv, Image } = myStyle()
  let [imageKey, setImageKey] = React.useState<number>(1)
 
  let Image1: Image | undefined = getSingleImage(imageKey.toString())
  console.log(Image1)
  
  let path = Image1?.path.split('/').slice(4).join('/')
  console.log(Image1?.path.split('/').slice(4).join('/'))
  React.useEffect(() => {
    // let data = true
    let myInterval = setInterval(() => {
      if (imageKey > 0 && imageKey < 4) {
        setImageKey(imageKey++)
      }
      else {
        setImageKey(1)
      }
    },2000) 
    return () => { 
      clearInterval(myInterval)
      // data=false
    }
  },[setImageKey,imageKey])
  return (
    <div className={div}> 
      
      <img src={path} alt="pic" className={Image} />
      <div className={parentDiv}>
        <Button onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
          console.log((e.target as HTMLButtonElement).id)
          // let di =(e.target as HTMLButtonElement).id
          setImageKey(Number((e.target as HTMLButtonElement).id))
        }  
           
        }> <div className={`${slideDot} ${imageKey===1?`${active}`:''}`} id="1"></div></Button>

         <Button onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
          console.log((e.target as HTMLButtonElement).id)
    
          setImageKey(Number((e.target as HTMLButtonElement).id))
        }  
           
        }>
          <div className={`${slideDot} ${imageKey===2?`${active}`:''}`} id="2"></div></Button>
        
         <Button onClick={(e:React.MouseEvent<HTMLButtonElement>) => {
          console.log((e.target as HTMLButtonElement).id)
        
          setImageKey(Number((e.target as HTMLButtonElement).id))
        }  
           
        }> <div className={`${slideDot} ${imageKey === 3 ? `${active}` : ''}`} id="3"></div>
        </Button>
          {/* <Button><div className={slideDot} id="4"></div></Button> */}
        </div>
    </div>
  ) 
}

export default ImageListShow
