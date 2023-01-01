import React, {useState} from 'react'
import {Drawer, Box, Typography, IconButton, Button} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import { useDispatch, useSelector } from 'react-redux'
import { setDrawer } from '../Redux/drawer'


const closeButton = {
    width:"2%", 
    height:"5%", 
    borderRadius:0,
    padding:0, 
    position:"absolute", 
    right:0, 
    top:0,
    backgroundColor: "red",

    "&:hover":{
        backgroundColor: "darkRed",

    }
}

const ShoppingCart = () => {
    
    const {isOpen} = useSelector((state:any) => state.drawer)


    const [isDrawOpen, setIsDrawOpen] = useState(isOpen);
    const dispatch = useDispatch()

  return (
    <>
    <Drawer anchor='right' open={isDrawOpen} onClose={() => dispatch(setDrawer(false))}>
        <Box p={2} width="350px" textAlign="center" role="presentation">
            <Typography variant='h6' component='div'>
                Shopping Cart
            </Typography>

            <Button variant='contained' sx={closeButton} onClick={() => dispatch(setDrawer(false))}>
                X
            </Button>
            
        </Box>


    </Drawer>
    </>
  )
}

export default ShoppingCart