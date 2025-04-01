import { useState } from 'react'
import './App.css'
import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Portfolio from './Component/portfolio';
import { Toaster } from 'react-hot-toast';

function App() {

  return (
    <>
         <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} /> 
        </Routes>
        <Toaster />
      </BrowserRouter>
    </>
  )
}

export default App
