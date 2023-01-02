import { useState} from 'react'
import {Card, CardHeader, CardMedia, CardContent, Typography, Button} from "@mui/material"
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../Redux/drawer';
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

    // const {isOpen} = useSelector((state:any) => state.drawer)
    const dispatch = useDispatch();

    function addToShoppingCart(item: any){

      // dispatch(addToCart(item))
      setIsAdded(true)
      console.log(isAdded) //prints false because the dispatch function is causing a re-render and so resetting the state

    }


    function adjustCount(e: any){
      let value = e.target.innerText;

      if(value == "+"){
        setProductCount(() => productCount + 1)
      }else if (productCount > 1) {
        setProductCount(() => productCount - 1)

      }else{
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


{/* sfdljksfdl;jsfdjlksdfjkfsjkdl */}
      {
        !isAdded?
        <CardContent>
        <Button onClick={e => {
          addToShoppingCart(productName);

          }} sx={buttonStyle} variant='contained'>Add To Shopping Cart</Button>
      </CardContent>
     :
     <IncreaseAndReduceWrapper>
     <Button onClick={e => adjustCount(e)} variant='contained'>+</Button>
     <Typography sx={{marginTop:"5px"}}>{productCount}</Typography>
     <Button onClick={e => adjustCount(e)} variant='contained'>-</Button>
     </IncreaseAndReduceWrapper>
      }
    
    </Card>
    </div>
  )
}

export default Product