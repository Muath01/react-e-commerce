import {useState} from 'react'
import {Drawer, Box, Typography, Button, CardHeader, Card, CardMedia, CardContent} from "@mui/material"
import { useDispatch, useSelector } from 'react-redux'
import { changePrice, decrementItem, incrementItem, removeFromCart, setDrawer } from '../Redux/drawer'
import styled from '@emotion/styled'

const IncreaseAndReduceWrapper = styled(CardContent)(({ theme }) => ({

    display:"flex",
    gap:10,
    justifyContent:"center"
  
  }))


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
    const [productName, setProductName] = useState("");
    const {shoppingCartItems} = useSelector((state:any) => state.drawer);
    const [productCount, setProductCount] = useState(1);


    // Calculate the total of the shopping cart and display it

    let total = 0;
    function calculateCartTotal(){

        Object.keys(shoppingCartItems).map(item => {
    
        console.log(item)
        total += Math.round(shoppingCartItems[item]["price"] * 100) / 100
        }) 
        return total
    }




    


    const [isDrawOpen] = useState(isOpen);
    const dispatch = useDispatch()
    
    
    function adjustCount(e: React.MouseEvent<HTMLButtonElement, MouseEvent>, productName: string) {
        let value = e.currentTarget.innerText;
        let quantity = shoppingCartItems[productName].quantity
        let price = shoppingCartItems[productName].price / shoppingCartItems[productName].quantity;


        if (value == "+") {
          dispatch(incrementItem(productName))
        } else if (shoppingCartItems[productName].quantity > 1) {
            dispatch(decrementItem(productName))
        } else {
            dispatch(removeFromCart(productName))
            
        }
        
        if(quantity >= 1) dispatch(changePrice({productName, quantity, price}))
        
      }

  return (
    <>
    <Drawer anchor='right' open={isOpen} onClose={() => dispatch(setDrawer(false))}>
        <Box p={2} width="350px" textAlign="center" role="presentation">
            <Typography variant='h6' component='div'>
                Shopping Cart
            </Typography>
            <Typography variant='h6' component='div'>
                Total: {calculateCartTotal()}
            </Typography>

            <Button variant='contained' sx={closeButton} onClick={() => dispatch(setDrawer(false))}>
                X
            </Button>


            {Object.keys(shoppingCartItems).map((item:string) => (
            <Card key={item}>
                    <div>
                    <CardHeader
                        sx={{textAlign:"center"}}
                        title={Object.keys(shoppingCartItems).length != 0 ? `£${shoppingCartItems[item].price} ${item}`: `£${item} ${item}`}

                        />
                    <CardMedia
                        component="img"
                        height="250"
                        image={`../images/${item}.png`}
                        alt={`an image of ${item}`}
                        />    
                    </div>

                    <IncreaseAndReduceWrapper>
                    <Button onClick={e => adjustCount(e, item)} variant='contained'>+</Button>
                    <Typography sx={{marginTop:"5px"}}>{shoppingCartItems[item].quantity}</Typography>
                    <Button onClick={e => adjustCount(e, item)} variant='contained'>-</Button>
                    </IncreaseAndReduceWrapper>
            </Card>
            ))}

        </Box>


    </Drawer>
    </>
  )
}

export default ShoppingCart