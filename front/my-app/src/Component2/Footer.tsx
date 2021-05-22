import React from 'react'

import { AppBar, Toolbar, Typography, Container,Theme,Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { footerData } from './FooterData';
import {mediaImage} from './LinkImage'

import ShoppingImage from './SVG/shop.svg'
import { Link, useHistory  } from 'react-router-dom'

const myStyle = makeStyles((theme:Theme)=>({ 
  footer:{
    backgroundColor: "	rgb(102, 102, 0)",
    
  },
  parentDiv: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
 
  },
  secondDiv: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    height: "40vh",
    width: "70vw",
    // backgroundColor:"white"
  },
  innerDiv: {
    display: "flex",
    flexDirection: "column",
    height: "20vh",
    margin: "50px"
  },
  anchor: {
    textDecoration: "none"
  },
  Image: {
    borderRadius:"50%"
  }
}))

interface Props {

}
let Footer: React.FC<Props> = (props) => {
  const { footer, parentDiv, secondDiv, anchor, innerDiv, Image } = myStyle()
  const history = useHistory();

  function handleClick() {
    history.push("/")
  }
  return (
    <div>
      <AppBar position="static"  className={footer}> 
          <Container maxWidth="md">
            <Toolbar>
              <Typography variant="body1" color="inherit" >
            
              <div className={parentDiv}>
                <div className={secondDiv}>
                <Button component={Link} to="/" onClick={()=>handleClick()}  disableRipple>
          <img height="70" src={ShoppingImage} alt="shopping Image" className={Image} />
          </Button>
                  {
                    footerData.map(item => {
                      return <div key={`${item.id}`} className={innerDiv}>
                        <h1>{ item.name}</h1>
                        {
                          item.data.map(text => { 
                            return <a key={text} href="_" className={anchor}>{text}</a>
                          })
                        } 
                      </div>
                    })
                      }
                </div> 
               <hr
        style={{
            color: 'black', 
            backgroundColor: 'grey',
            
            width: "730px",
            // height: "2",
        }}
    /> 
                <h1 style={{color:'white',fontSize:"20px"}}>Follow us on</h1>
                <div style={{display:"flex",}}>
                  {
                    mediaImage.map(image => {
                      return <img key={image.id} alt="pic" src={ image?.path.split('/').slice(3).join('/')} style={{height:"40px",width:"40px",marginLeft:"5px",borderRadius:"50%"}} />
                    })
                }
                </div>
                @2021 MyShopping Pvt. Ltd
               </div >
                
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
    </div> 
  )
}

export default Footer
