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


const  Product = ({productName, quantity, price} : ProductProp): React.ReactElement => {


    // states
    const [isAdded, setIsAdded] = useState(false)
    const [productCount, setProductCount] = useState(1);


    //selectors
    const {shoppingCartItems} = useSelector((state:any) => state.drawer)
    const {isOpen} = useSelector((state:any) => state.drawer)


    //dispatch funciton
    const dispatch = useDispatch();


    function adjustCount(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
      
      let target = e.target as HTMLButtonElement

      let value = target.innerText;

      if(value == "+"){
        dispatch(incrementItem(productName))
      }else if (shoppingCartItems[productName].quantity > 1) {
        dispatch(decrementItem(productName))
      }else{
        dispatch(removeFromCart(productName))
        setIsAdded(false)
      }

      
      if(shoppingCartItems[productName].quantity) {
        dispatch(changePrice({productName, quantity, price}))
      }else{
      }

    }

  return (
    
    <div>
        <Card sx={{ maxWidth: 345 }}>
      <CardHeader
        sx={{textAlign:"center"}}
        title={productName in shoppingCartItems ? `£${shoppingCartItems[productName].price} ${productName}`: `£${price} ${productName}`}
      />

      
         <CardMedia
         sx={{width:"100%"}}
        component="img"
        height="350"
        image={require(`../images/${productName}.png`)}
        // image={`test.png`}
        alt={`an image of ${productName}`}
      />


      {
        (productName in shoppingCartItems) && !isOpen?
        <IncreaseAndReduceWrapper>
        <Button onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => adjustCount(e)} variant='contained'>+</Button>
        
        <Typography sx={{marginTop:"5px"}}>{shoppingCartItems[productName].quantity}</Typography>
        <Button onClick={(e:React.MouseEvent<HTMLButtonElement, MouseEvent>) => adjustCount(e)} variant='contained'>-</Button>
        </IncreaseAndReduceWrapper>
        
        :
        !isAdded || isOpen || shoppingCartItems[productName] == undefined && !(productName in shoppingCartItems)?
        <CardContent>
        <Button onClick={e => {
          
          if(!(productName in shoppingCartItems)){
            // console.log("PN", price)
            dispatch(addToCart({productName, quantity, price}))
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