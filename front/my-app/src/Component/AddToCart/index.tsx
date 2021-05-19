import React from 'react'

import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";

import { Tooltip } from '@material-ui/core';

import { withStyles } from "@material-ui/core/styles";

import IconButton from "@material-ui/core/IconButton";

const styles = {
  tooltip: {
      width: "92px",
      height: "36px",
      borderRadius: "18px",
      boxShadow: "0 20px 80px 0",
      backgroundColor: "red",
   
    
      
      // position:'fixed'
    
    
  }
}


const CustomTooltip = withStyles(styles)(Tooltip);


let MyCustomTooltip=React.forwardRef((ref,props)=> {
  
  const [itemCount,] = React.useState(1);
  return (
    <IconButton>
        <CustomTooltip title={`${itemCount} item added to a cart`} placement='right-end' >
            <Badge badgeContent={itemCount} color="secondary">
                <ShoppingCartIcon />
           </Badge>
       </CustomTooltip>
    </IconButton>
 );
})

export default MyCustomTooltip;

