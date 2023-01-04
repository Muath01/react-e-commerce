import React from 'react'
import {Grid, Box} from "@mui/material"
import Product from '../components/Product'

type products = {
    productName: string,

}

function Home() {

   const products: Array<string> = ["ice-cream"]
//    const products: Array<string> = ["pen", "ruler", "ice-cream"]

  return (
<>

    <Grid container spacing={2} >

    {products.map(item => (
        <Grid key={item} item md={3} >
            <Product productName={item}/>
        </Grid>
    ))}

    </Grid>
    
</>
  )
}

export default Home