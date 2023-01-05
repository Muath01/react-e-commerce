import React, {useContext, useEffect, useMemo} from 'react'
import {Grid, Box} from "@mui/material"
import Product from '../components/Product'
import { ProductContext } from '../context/productContext'
import { render } from '@testing-library/react'

// type products = {
//     productName: string,

// }

function Home() {

  const {value, setValue} = useContext(ProductContext)

  const products: Object = useMemo(
      () => ({
        "ice-cream": {
          quantity: 1,
          price: 0.79,
        },
        "pen": {
          quantity: 1,
          price: 0.89,
        },
        "ruler": {
          quantity: 1,
          price: 0.5,
        },
      }),
      []
    );

   useEffect(() => {
    setValue(Object.keys(products))

   }, [])


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