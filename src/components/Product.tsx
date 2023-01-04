import { useEffect, useState} from 'react'
import {Card, CardHeader, CardMedia, CardContent, Typography, Button} from "@mui/material"
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, decrementItem, drawer, incrementItem, removeFromCart } from '../Redux/drawer';
import styled from '@emotion/styled';
// import { RootState } from './store';
type ProductProp = {
    
    productName: string
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


const  Product = ({productName} : ProductProp) => {


    // states
    const [isAdded, setIsAdded] = useState(false)
    const [productCount, setProductCount] = useState(1);

    const {shoppingCartItems} = useSelector((state:any) => state.drawer)
    const {isOpen} = useSelector((state:any) => state.drawer)


    const dispatch = useDispatch();
    console.log(isAdded)


    function adjustCount(e: any){
      let value = e.target.innerText;

      if(value == "+"){
        dispatch(incrementItem(productName))
      }else if (shoppingCartItems[productName] > 1) {
        dispatch(decrementItem(productName))
      }else{
        dispatch(removeFromCart(productName))
        setIsAdded(false)
      }

    }


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


      {
        (productName in shoppingCartItems) && !isOpen?
        <IncreaseAndReduceWrapper>
        <Button onClick={e => adjustCount(e)} variant='contained'>+</Button>
        <Typography sx={{marginTop:"5px"}}>{shoppingCartItems[productName]}</Typography>
        <Button onClick={e => adjustCount(e)} variant='contained'>-</Button>
        </IncreaseAndReduceWrapper>
        
        :
        !isAdded || isOpen || shoppingCartItems[productName] == undefined && !(productName in shoppingCartItems)?
        <CardContent>
        <Button onClick={e => {
          console.log("hacking")
          
          if(!(productName in shoppingCartItems)){
            dispatch(addToCart(productName))
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