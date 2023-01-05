import React from 'react'
import {Grid, Box} from "@mui/material"
import Product from '../components/Product'

// type products = {
//     productName: string,

// }

function Home() {

   const products: Object = {
    "ice-cream":{
        quantity:1,
        price:0.79
    },
    "pen":{
        quantity:1,
        price:0.89
    },

    "ruler":{
        quantity:1,
        price:0.5
    }
    
   }
//    const products: Array<string> = ["pen", "ruler", "ice-cream"]

  return (
<>

    <Grid container spacing={2} >

    {Object.keys(products).map(MyProduct => (
        <Grid key={MyProduct} item md={3} >
            <Product productName={MyProduct} quantity={products[MyProduct]["quantity"]} price={products[MyProduct]["price"]}/>
        </Grid>
    ))}

    </Grid>
    
</>
  )
}

export default Home