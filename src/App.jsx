import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import ShopListCont from './components/shop/ShopListCont';
import CartContextProvider from './context/CartContext';
import CartListCont from './components/cart/CartListCont';
import Login from './components/login/Login';
import NewUser from './components/login/NewUser';

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
            <Route path='/carts/:id' element={<CartListCont />} ></Route>
            <Route path='/users/login' element={<Login />} ></Route>
            <Route path='/newuser' element={<NewUser />} ></Route>
            <Route path='/newuser/user' element={<NewUser />} ></Route>

          </Routes>
    </div>
    </CartContextProvider>
    </BrowserRouter>
  );
}

export default App;
