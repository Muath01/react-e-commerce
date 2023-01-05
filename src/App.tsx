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
import { ProductContext } from './context/productContext';


console.log("hello");



const App:FC = () => {

  const [value, setValue] = useState([])

  const provideValue = useMemo(() => ({value, setValue}), [value, setValue])

  const {isOpen} = useSelector((state:any) => state.drawer);
  return (
    <>
    <ProductContext.Provider value = {provideValue}>

    <NavBar /> 

    <Routes>
      <Route path="/home" element={<Home/>} />
      <Route path="/about" element={<h1>Hello</h1>} />
      <Route path="/contact" element={<h1>Contact</h1>} />
    </Routes>    
    </ProductContext.Provider>

    {isOpen ? <ShoppingCart/> : null}
  
    </>
  )

}

export default App;
