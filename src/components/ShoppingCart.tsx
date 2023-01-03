import {useState} from 'react'
import {Drawer, Box, Typography, Button, CardHeader, Card, CardMedia, CardContent} from "@mui/material"
import { useDispatch, useSelector } from 'react-redux'
import { setDrawer } from '../Redux/drawer'
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
    const {shoppingCartItems} = useSelector((state:any) => state.drawer);
    const [productCount, setProductCount] = useState(1);



    


    const [isDrawOpen] = useState(isOpen);
    const dispatch = useDispatch()

    function adjustCount(e: any){
        let value = e.target.innerText;
  
        if(value == "+"){
          setProductCount(() => productCount + 1)
        }else if (productCount > 1) {
          setProductCount(() => productCount - 1)
  
        }else{
        //   setIsAdded(false)
        }
  
      }

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


            {Object.keys(shoppingCartItems).map((item:string) => (
                <Card key={item}>
                    <CardHeader
                            sx={{textAlign:"center"}}
                            title={item}
                        />
                        <CardMedia
                            component="img"
                            height="250"
                            image={`../images/${item}.png`}
                            alt={`an image of ${item}`}
                        />    
        

                    <IncreaseAndReduceWrapper>
                        <Button onClick={e => adjustCount(e)} variant='contained'>+</Button>
                        <Typography sx={{marginTop:"5px"}}>{shoppingCartItems[item]}</Typography>
                        <Button onClick={e => adjustCount(e)} variant='contained'>-</Button>
                        </IncreaseAndReduceWrapper>
                </Card>
            ))
            }

        </Box>


    </Drawer>
    </>
  )
}

export default ShoppingCart