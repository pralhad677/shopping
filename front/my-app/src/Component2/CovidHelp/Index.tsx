import React from 'react'
import { makeStyles, Theme } from '@material-ui/core/styles'
// import Image from '../../../public/CovidHelp/covid help.jpg'

import { Button } from '@material-ui/core'

interface Props {

}

const styles = makeStyles((theme:Theme)=>({
  ParentDiv: {
    height: "200px",
    width: "100vw",
    backgroundColor: "grey",
    margin:"20px 0px",
    
  },
  Image: {
    position: "relative",
    overflow: "hidden",
    // height: "180px",
    top: "5px",
    borderRadius:"50%"

    
  },
  button: {
    backgroundColor: "red",
    color: "white",
    height: "40px",
    width: "120px",
    fontSize:"15px",
    borderRadius: "5px",
    position: "relative",
    left:"300px"
  } 
})) 

let Index: React.FC<Props> = (props) => {
  const {ParentDiv,Image,button} = styles()
  return (
    <div className={ParentDiv}> 
      <Button>
        <img alt="covid help " src={'CovidHelp/1.jpg'} className={Image} />
       <h1 style={{color:"red",position:"relative",left:"80px"}}>Donate for Covid  Crisis</h1>
        <button className={button}>+Donate Now</button> 
        </Button>
    </div> 
  ) 
}

export default Index
 