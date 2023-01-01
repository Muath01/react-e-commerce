import React from 'react'
import {Card, CardHeader, Avatar, IconButton, CardMedia, CardContent, Typography, Button} from "@mui/material"
import {Home} from "@mui/icons-material"
import { useDispatch, useSelector } from 'react-redux';
// import { RootState } from './store';
type ProductProp = {
    
    productName: string
}

const buttonStyle = {
    position: "relative", 
    left: "3rem"
}

const  Product = ({productName} : ProductProp) => {

    const {isOpen} = useSelector((state:any) => state.drawer)
    console.log(isOpen)

  return (
    <div>
        <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        sx={{textAlign:"center"}}
        title={productName}
      />
      <CardMedia
        component="img"
        height="250"
        image={`../images/${productName}.png`}
        alt={`an image of ${productName}`}
      />

      <CardContent>
        <Button sx={buttonStyle} variant='contained'>Add To Shopping Cart</Button>
      </CardContent>
     
    
    </Card>
    </div>
  )
}

export default Product