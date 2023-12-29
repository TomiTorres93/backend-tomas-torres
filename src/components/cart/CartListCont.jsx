import React, { useState, useEffect } from 'react';
import CartList from './CartList';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Input, InputLabel } from '@mui/material';

export default function CartListCont() {

  const [cartAPIdata, setCartAPIdata] = useState([])
  
  const [cartsPaginationData, setCartsPaginationData] = useState([])
  const [cart, setCart] = useState(null)
  const [newTicket, setNewTicket] = useState({
    code: uuidv4(),
    purchase_datetime: Date.now(),
    amount: '',
    purchaser: '',
  });


  const { id } = useParams()
  const cartAPIget = async () => {
    try {
      const response = await fetch(`https://backend-tomitorres.onrender.com/api/carts`);
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


  
  const cartById = async () => {
    try {
      const response = await fetch(`https://backend-tomitorres.onrender.com/api/carts/${id}`);
      const data = await response.json();
      setCart(data)

    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  useEffect(() => {
    cartById();
  }, []);

  useEffect(() => {
    if(cart) {
      let total = cart.products.reduce((accumulator, item) => {
        const productValue = item.price * item.quantity;
        return accumulator + productValue;
      }, 0) 
      setNewTicket({
        ...newTicket,
        amount: total,
      });

    }
  
  }, [cart])
  

  const deleteItem = async (product) => {
    try {
  // Enviar los datos actualizados al servidor
  await fetch(`https://backend-tomitorres.onrender.com/api/carts/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ product }),
  })
  .then(() => {
    cartById()
  });

    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };



  return (
    <div className='gap'>
      <h1 className='tittle'>CARRITO</h1>
      {cart && (
        <>
        <p  className='tittle'>PRODUCTOS</p>
        <div className='row'>
        <CartList cart={cart} deleteItem={deleteItem} />
        

        </div>

        </>
      )}


<Link className='buttonbyn' to={`/carts/${id}/purchase`}> Finalizar compra </Link>
    </div>
  )
}
