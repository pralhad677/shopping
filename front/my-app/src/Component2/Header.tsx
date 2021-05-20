import React, { ReactElement,useState } from 'react'

import { AppBar, Toolbar,Typography,Tabs,Tab,Button,Theme } from '@material-ui/core'

// import Typography from '@material-ui/core/Typography';
// import CssBaseline from '@material-ui/core/CssBaseline';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
 
import ShoppingImage from './SVG/shop.svg'
import { makeStyles } from '@material-ui/core/styles'
import { Link } from 'react-router-dom'

import SearchBar from "material-ui-search-bar";
import Avatar from '@material-ui/core/Avatar'; 

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { boolean } from 'yargs';




 
interface ElevatedProps {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
  children: React.ReactElement;
}

function ElevationScroll(props: ElevatedProps) {
  // const { children, window } = props;
  const { children, } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true, //delay 
    threshold: 0, //default 100 0 rakhda chai user le scroll grna paxena scroll satrt hunxa
    // target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}


function SimpleMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mouseOverButton,setmouseOverButton]=React.useState<boolean>(false)
  const [mouseOverMenu, setmouseOverMenu] = React.useState<boolean>(false)
  const [open,setOpen] =React.useState<boolean>(false)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    // setOpen(true)
  };

  const handleClose = () => {
    setAnchorEl(null);
    // setmouseOverButton(false)
    // setmouseOverMenu(false)
    
  };
  // handleClick = event => {
  //   this.setState({ open: true, anchorEl: event.currentTarget });
  // };

  // handleClose = () => {
  //   this.setState({ mouseOverButton: false, mouseOverMenu: false });
  // };

  // const enterButton = () => {
     
  //   setmouseOverButton(true);
  // }

//  const leaveButton = () => {
//     // Set a timeout so that the menu doesn't close before the user has time to
//     // move their mouse over it
//    setTimeout(() => {
//      setmouseOverButton(false);
//      }, 300);
   
//   }

  // const enterMenu = () => {
   
  //   setmouseOverMenu(false)
  // }

  // const leaveMenu = () => {
  //   setTimeout(() => {
  //     setmouseOverMenu(false)
  //      }, 300);
    
  // }
  return {
    handleClose,
    handleClick,
    anchorEl,
    setAnchorEl,
    // enterMenu,
    // leaveMenu,
    // leaveButton,
    // enterButton,
    // mouseOverButton,mouseOverMenu
    // leaveButton
  }
 
}
interface Props{

}

const style = makeStyles((theme:Theme) => ({
  tabs: {
      marginLeft:"auto"
  },
  tab: {
    fontFamily: 'Rubik', 
    fontWeight:300,
    fontSize: "1rem",
    minWidth: 14,
    marginLeft:"25px"
    // textTransform:"none"
  },
  button: {
    height: "30px",
    marginLeft: "30px",
    borderRadius: "50px",
    margin: "auto",
    marginRight: "25px",
    fontFamily: "Pattaya",
    textTransform: "none",
    color:"white"
  },
  logoContainer: {
    padding:"0px"
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    // marginRight:"55px",
    height: '80%',
    width:"380px", 
    position: 'absolute',
    left:"100px",
    // pointerEvents: 'none',
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  avatar: {
    // '&:hover': {
    //   backgroundColor:'white'
    // }
  }
    
})) 
function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}




let Header: React.FC<Props> = (): ReactElement => {
  let { tabs, tab, button, logoContainer, searchIcon, avatar } = style()
  const { handleClose, handleClick, anchorEl,
    // enterMenu,
    // leaveMenu,
    // leaveButton,
    // enterButton,
    // mouseOverButton,
    // mouseOverMenu
  } = SimpleMenu()
    
  
  const [value, setValue] = React.useState<number>(0);
  const [searchVal, setSearchVal] = React.useState<string>('')

  
  

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    console.log(newValue)
    setValue(newValue);
  };
  React.useEffect(() => {
    if (window.location.pathname === '/Home' && value !== 0) {
        setValue(0)
    }
    else if (window.location.pathname === '/Men' && value !== 1) {
        setValue(1)
    }
    else if (window.location.pathname === '/Women' && value !== 2) {
      setValue(2)
    }
    else if (window.location.pathname === '/Kids' && value !== 3) {
      setValue(3)
    }else if (window.location.pathname === '/Beauty' && value !== 4) {
      setValue(4)
    }
    else if (window.location.pathname === '/HomeAndLiving' && value !== 4) {
      setValue(5)
    }
  }, [value])
  
  // const open = mouseOverButton|| mouseOverMenu
  return (
    <ElevationScroll>
      
    <AppBar position="static" color="secondary" > 
      
        <Toolbar disableGutters>
          <Button component={Link} to="/" className={logoContainer} onClick={()=>setValue(0)} disableRipple>
          <img height="70" src={ShoppingImage} alt="shopping Image" />
          </Button>
          <SearchBar
            className={searchIcon}
           placeholder="Search"
            value={searchVal}
            onChange={(val) => setSearchVal(val)}
            onRequestSearch={() => console.log(searchVal)}
            onCancelSearch={()=>console.log('search cancel')}
            
          />
        
            
          <Tabs className={tabs} value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab label="Home" className={tab} {...a11yProps(0)} component={Link} to="/"></Tab>
            <Tab label="Men" className={tab} {...a11yProps(1)} component={Link} to="/Men"></Tab>
            <Tab label="Women" className={tab} {...a11yProps(2)} component={Link} to="/Women"></Tab>
            <Tab label="Kids" className={tab} {...a11yProps(3)} component={Link} to="/Kids"></Tab> 
            <Tab label="Beauty" className={tab} {...a11yProps(4)} component={Link} to="/Beauty"></Tab>
            <Tab label="Home & Living" className={tab} {...a11yProps(5)} component={Link} to="/HomeAndLiving"></Tab>
            
              
            <Button className={button}
             
              onMouseEnter={handleClick} 
            > <Avatar className={avatar} /></Button>
           
            <Menu 
        id="simple-menu" 
        anchorEl={anchorEl}
        keepMounted 
        open={Boolean(anchorEl)}
              // open={open}
              onClose={handleClose}
              // onClose={this.handleClose} 
              // MenuListProps={{ 
              //   onMouseEnter: enterMenu,
              //   onMouseLeave: leaveMenu,
              // }}
      >
        <MenuItem onClick={handleClose}>Profile</MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
              
          </Tabs> 
           
      </Toolbar> 
        
    </AppBar>
    </ElevationScroll>   
  ) 
}

//note appBar vitra position static rakhda scroll huda header harauxa

export default Header
