import React, {useContext, useEffect, useMemo} from 'react'
import {Grid, Box} from "@mui/material"
import Product from '../components/Product'
import { ListContext, ProductContext } from '../context/productContext'
import { render } from '@testing-library/react'

// type products = {
//     productName: string,

// }

function Home(): React.ReactElement {

  const {product, setProduct} = useContext(ProductContext)
  const {productList, setProductList} = useContext(ListContext);
  // const {}

  const products: Object = productList;



    

   useEffect(() => {

    // creates an array with products keys
    setProduct(Object.keys(products))



    // creates a copy of products
    let copy = {...products}
    
    // the ProductList is supposed to be a copy that never changes and is displayed on the screen if no specific items are picked. 
    setProductList(copy)


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