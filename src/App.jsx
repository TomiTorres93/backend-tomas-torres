import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import ShopListCont from './components/shop/ShopListCont';
import CartContextProvider from './context/CartContext';
import CartListCont from './components/cart/CartListCont';

function App() {

  // const [backendData, setBackendData] = useState([{}])

  // useEffect(() => {
  //   fetch("/").then(data => {
  //     setBackendData(data)
  //   })
  // }, [])
  
  // console.log(backendData)

  return (
    <BrowserRouter>
    
    <CartContextProvider>
    <div className="App">
          <Routes>
            <Route path='/products' element={<ShopListCont />} ></Route>
            <Route path='/carts' element={<CartListCont />} ></Route>
          </Routes>
    </div>
    </CartContextProvider>
    </BrowserRouter>
  );
}

export default App;
