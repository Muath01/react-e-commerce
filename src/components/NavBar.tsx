import React, {useContext, ChangeEvent, useMemo,useState} from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreIcon from '@mui/icons-material/MoreVert';
import { ShoppingBasket } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDrawer } from '../Redux/drawer';
import { Autocomplete, Button, TextField } from '@mui/material';
import { ListContext, ProductContext } from '../context/productContext';


const backStyle = {
    backgroundColor: "primary",
    padding:2,
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  height:"3.5rem",

  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const LinkWrapper = styled(Box)(({theme}) => ({
    display: "flex",
    gap: 30,
    fontSize: "1.7rem",
    "& a": {

        color: "white", 
        textDecoration:"none",

        "&:hover":{
            textDecoration: "underline",
            textDecorationColor: "red"
        }
        
    },

}))


export default function NavBar(): React.ReactElement {


  //states
  const [open, setOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [anchorEl, setAnchorEl] = useState<null>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null>(null);


  // selector 
  const {shoppingCartItems} = useSelector((state:any) => state.drawer)
  const {isOpen} = useSelector((state:any) => state.drawer)
  
  // dispatch 
  const dispatch = useDispatch();
  
  //Context
  const {product} = useContext(ProductContext);
  const {productList, setProductList} = useContext(ListContext)
  
  
  //variables
  const originalList = useMemo(() => ({...productList}), []);
  let arr = Object.keys(shoppingCartItems)
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  


 




  const handleProfileMenuOpen = (event: any) => {
    console.log("eventType: ", event.type);
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = ():void => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = ():void => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    // let event = event as HTMLButtonElement
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu

      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
   
      <MenuItem>
        <IconButton
          size="large"
          aria-label="show 17 new notifications"
          color="inherit"
        >
          <Badge badgeContent={17} color="error">
            <ShoppingBasket sx={{fontSize: "2rem"}}/>
          </Badge>
        </IconButton>
      </MenuItem>

      
    </Menu>
  );

  const top100Films = [
    { label: 'The Shawshank Redemption', year: 1994 },
  
  ];

  function change(e: React.KeyboardEvent<HTMLDivElement> | React.SyntheticEvent<Element, Event>){
    console.log("nig")

    let value;
    let target = e.target as HTMLInputElement

    
    {target.innerText === "" ? value = target.value : value = target.innerText}
    
    console.log(target.innerText)
    console.log(target.value)

    setInputValue(value);

    
    let newObj = { 
      [value]:{
        ...originalList[value]
      }
    }
    
    
    if(value in originalList){
      setProductList(newObj);
    }else if(value == ""){
      setProductList(originalList)
    }else{
    }
  }

  return (
    <Box sx={{ flexGrow: 1, backgroundColor:"red"} }>
      <AppBar position="static">
        <Toolbar sx={backStyle}>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            MUI
          </Typography>
          <Search>
            <SearchIconWrapper>
              {/* <SearchIcon /> */}
            </SearchIconWrapper>
            <Autocomplete
              freeSolo
              open={open}
              onOpen= {()=> {if(inputValue){setOpen(true)}}}

              onClose={() => setOpen(false)}
              inputValue={inputValue}

              // multiple
              filterSelectedOptions
              options={product}
              sx={{ width: 400, height:50}}
              placeholder="search..."
              onInputChange={(e, v) => {
                setInputValue(v);

                if(!v){
                  setOpen(false)
                }
              }}

              onKeyUp={(e: React.KeyboardEvent<HTMLDivElement>) => change(e)}
              onChange={(e: React.SyntheticEvent<Element, Event>) => change(e)}
              renderInput={(params) => <TextField {...params}/>}
            />
            {/* <StyledInputBase
              placeholder="Search…"
              inputProps={{ 'aria-label': 'search' }}
            /> */}
          </Search>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

            <LinkWrapper>
                <Link to="/home">Home</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/about">About</Link>
            </LinkWrapper>

            <IconButton
              size="large"
              aria-label="show 17 new notifications"
              color="inherit"
            >
              <Badge sx={{position:"relative", bottom:5}} badgeContent={Object.keys(shoppingCartItems).length} color="error">
                <ShoppingBasket onClick={() => dispatch(setDrawer(true))} sx={{fontSize: "2rem", marginLeft:2}} />
              </Badge>
            </IconButton>
         
          </Box>

          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => handleMobileMenuOpen(e)}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}