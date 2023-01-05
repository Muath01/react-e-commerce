import { stringify } from 'querystring';
import {Button} from '@mui/material';
import React, { ReactElement, ReactNode, useCallback, useState, FC, useMemo } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import ShoppingCart from './components/ShoppingCart';
import { useSelector } from 'react-redux';
import Product from './components/Product';
import { ListContext, ProductContext } from './context/productContext';





const App:FC = () => {

  const [product, setProduct] = useState([])
  const [productList, setProductList] = useState({})

  const provideValue = useMemo(() => ({product, setProduct}), [product, setProduct])
  const productListValue = useMemo(() => ({productList, setProductList}), [productList, setProductList])


  const {isOpen} = useSelector((state:any) => state.drawer);
  return (
    <>
    <ListContext.Provider value={productListValue}>

    <ProductContext.Provider value={provideValue}>

    <NavBar /> 

    <Routes>
      <Route path="/home" element={<Home/>} />
      <Route path="/about" element={<h1>Hello</h1>} />
      <Route path="/contact" element={<h1>Contact</h1>} />
    </Routes>    
    </ProductContext.Provider>
    </ListContext.Provider>

    {isOpen ? <ShoppingCart/> : null}
  
    </>
  )

}

export default App;
