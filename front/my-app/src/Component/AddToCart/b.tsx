import React from 'react'

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";

import { Tooltip } from '@material-ui/core';

// import { withStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";


// const styles = {
//   tooltip: {
//       width: "92px",
//       height: "36px",
//       borderRadius: "18px",
//       boxShadow: "0 20px 80px 0",
//     backgroundColor: "red",
    
      
//       // position:'fixed'
    
    
//   }
// }


// const CustomTooltip = withStyles(styles)(Tooltip);


let MyCustomTooltip=React.forwardRef((ref,props)=> {
  
  const [itemCount,] = React.useState(13);
  return (
    <Button onClick={() => { console.log('onClick'); }}>
            <Badge badgeContent={itemCount} color="secondary">
                <ShoppingCartIcon />
        </Badge>
      </Button>
 );
})

export default MyCustomTooltip;

