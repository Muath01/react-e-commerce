import { useEffect, useState} from 'react'
import {Card, CardHeader, CardMedia, CardContent, Typography, Button} from "@mui/material"
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, changePrice, decrementItem, drawer, incrementItem, removeFromCart } from '../Redux/drawer';
import styled from '@emotion/styled';
// import { RootState } from './store';
type ProductProp = {
    
    productName: string
    quantity:number, 
    price:number
}

const buttonStyle = {
    position: "relative", 
    left: "3rem"
}

const IncreaseAndReduceWrapper = styled(CardContent)(({ theme }) => ({

  display:"flex",
  gap:10,
  justifyContent:"center"

}))


const  Product = ({productName, quantity, price} : ProductProp) => {


    // states
    const [isAdded, setIsAdded] = useState(false)
    const [productCount, setProductCount] = useState(1);

    const {shoppingCartItems} = useSelector((state:any) => state.drawer)
    const {isOpen} = useSelector((state:any) => state.drawer)

    // console.log("che", shoppingCartItems[productName].price)

    // console.log(shoppingCartItems.)
    console.log(productName)


    const dispatch = useDispatch();


    function adjustCount(e: any){
      let value = e.target.innerText;

      if(value == "+"){
        console.log("first")
        dispatch(incrementItem(productName))
      }else if (shoppingCartItems[productName].quantity > 1) {
        dispatch(decrementItem(productName))
      }else{
        dispatch(removeFromCart(productName))
        setIsAdded(false)
      }
      dispatch(changePrice({productName, price}))


    }


  return (
    
    <div>
        <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        sx={{textAlign:"center"}}
        title={Object.keys(shoppingCartItems).length != 0 ? `£${shoppingCartItems[productName].price} ${productName}`: `£${price} ${productName}`}
      />
      <CardMedia
        component="img"
        height="250"
        image={`../images/${productName}.png`}
        alt={`an image of ${productName}`}
      />


      {
        (productName in shoppingCartItems) && !isOpen?
        <IncreaseAndReduceWrapper>
        <Button onClick={e => adjustCount(e)} variant='contained'>+</Button>
        
        <Typography sx={{marginTop:"5px"}}>{shoppingCartItems[productName].quantity}</Typography>
        <Button onClick={e => adjustCount(e)} variant='contained'>-</Button>
        </IncreaseAndReduceWrapper>
        
        :
        !isAdded || isOpen || shoppingCartItems[productName] == undefined && !(productName in shoppingCartItems)?
        <CardContent>
        <Button onClick={e => {
          
          if(!(productName in shoppingCartItems)){
            // console.log("PN", price)
            dispatch(addToCart({productName, quantity}))
            setIsAdded(true)
          }

          }} sx={buttonStyle} variant='contained'>Add To Shopping Cart</Button>
      </CardContent>
     :
     null
      }
    
    </Card>
    </div>
  )
}

export default Product