import React, { useState, useEffect } from 'react';
import CartList from './CartList';
import { useParams } from 'react-router-dom';
export default function CartListCont() {

  const [cartAPIdata, setCartAPIdata] = useState([])
  
  const [cartsPaginationData, setCartsPaginationData] = useState([])
  const { id } = useParams()
  const cartAPIget = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/carts`);
      const data = await response.json();
      setCartAPIdata(data.payload)
      setCartsPaginationData(data.pagination)
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  useEffect(() => {
    cartAPIget();

  }, []);

  const [cart, setCart] = useState(null)
  
  const cartById = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/carts/${id}`);
      const data = await response.json();
      setCart(data)

    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  useEffect(() => {
    cartById();

  }, []);

console.log(cart)


  return (
    <div>
      <h1 className='tittle'>CARRITO</h1>
      {cart && (
        <>
        <p className='tittle'> Id del carrito: {cart._id} </p>
        <p  className='tittle'>PRODUCTOS</p>
        <div className='row'>
  
          {cart.products.map((e, index) => 
          <div key={index} className='cartItem'>
            <p> {e.name} </p>
            <p> ${e.price} </p>
            <p> Cantidad: {e.quantity} </p>
          </div>
          )  
       }
        </div>
        </>
      )}
      <CartList />
    </div>
  )
}
