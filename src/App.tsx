import { stringify } from 'querystring';
import {Button} from '@mui/material';
import React, { ReactElement, ReactNode, useCallback, useState, FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import ShoppingCart from './components/ShoppingCart';
import { useSelector } from 'react-redux';
import Product from './components/Product';


console.log("hello");



const App:FC = () => {

  const {isOpen} = useSelector((state:any) => state.drawer);
  return (
    <>
    <NavBar /> 

    <Routes>
      <Route path="/home" element={<Home/>} />
      <Route path="/about" element={<Product productName="pen"/>} />
      <Route path="/contact" element={<h1>Contact</h1>} />
    </Routes>    

    {isOpen ? <ShoppingCart/> : null}
  
    </>
  )

}

export default App;
