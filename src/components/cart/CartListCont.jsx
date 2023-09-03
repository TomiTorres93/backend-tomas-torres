import React, { useState, useEffect } from 'react';
import CartList from './CartList';

export default function CartListCont() {

  const [cartAPIdata, setCartAPIdata] = useState([])
  
  const [cartsPaginationData, setCartsPaginationData] = useState([])
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

  console.log(cartAPIdata)


  return (
    <div>
      <h1 className='tittle'>CARRITO</h1>
      <CartList />
    </div>
  )
}
