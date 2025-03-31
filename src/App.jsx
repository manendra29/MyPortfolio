import { useState } from 'react'
import './App.css'
import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Portfolio from './Component/portfolio';

function App() {

  return (
    <>
         <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio />} /> 
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
