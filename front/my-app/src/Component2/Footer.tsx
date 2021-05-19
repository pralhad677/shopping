import React from 'react'

import { AppBar, Toolbar, Typography, Container } from '@material-ui/core'
import  {makeStyles} from '@material-ui/core/styles'

const myStyle = makeStyles(theme=>({
  // footer:{
  //   backgroundColor: "#808080",
    
  // }
}))

interface Props {

}
let Footer: React.FC<Props> = (props) => {
  // const {footer} = myStyle()
  return (
    <div>
      <AppBar position="static" color="primary">
          <Container maxWidth="md">
            <Toolbar>
              <Typography variant="body1" color="inherit" >
              © 2019 Gistia
                <h1>hey</h1>
              <h1>jacob</h1>
              <h1>whats up</h1>
              </Typography>
            </Toolbar>
          </Container>
        </AppBar>
    </div>
  )
}

export default Footer
