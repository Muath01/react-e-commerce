import React, {useContext, useEffect, useMemo} from 'react'
import {Grid, Box} from "@mui/material"
import Product from '../components/Product'
import { ListContext, ProductContext } from '../context/productContext'
import { render } from '@testing-library/react'

// type products = {
//     productName: string,

// }

function Home() {

  const {product, setProduct} = useContext(ProductContext)
  const {productList, setProductList} = useContext(ListContext);
  // const {}

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

    // creates an array with products keys
    setProduct(Object.keys(products))


    // console.log(product)

    // creates a copy of products
    let copy = {...products}
    // console.log("copy", copy)
    
    // the ProductList is supposed to be a copy that never changes and is displayed on the screen if no specific items are picked. 
    setProductList(copy)
    // console.log("productListz", productList)


   }, [])


//    const products: Array<string> = ["pen", "ruler", "ice-cream"]

  return (
<>


    <Grid container spacing={2} >

    {Object.keys(productList).map(MyProduct => (
        <Grid key={MyProduct} item md={3} >
            <Product productName={MyProduct} quantity={products[MyProduct]["quantity"]} price={products[MyProduct]["price"]}/>
        </Grid>
    ))}

    </Grid>
    
</>
  )
}

export default Home