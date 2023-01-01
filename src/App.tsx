import { stringify } from 'querystring';
import {Button} from '@mui/material';
import React, { ReactElement, ReactNode, useCallback, useState, FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import NavBar from './components/NavBar';
import Home from './pages/Home';


console.log("hello");


const App:FC = () => {
  return (
    <>
    <NavBar /> 

    <Routes>
      <Route path="/home" element={<Home/>} />
      <Route path="/about" element={<h1>About</h1>} />
      <Route path="/contact" element={<h1>Contact</h1>} />
    </Routes>            
  
    </>
  )

}

export default App;
