import React, { useState, useEffect } from 'react';
import CartList from './CartList';

export default function CartListCont() {
  return (
    <div>
      <h1 className='tittle'>CARRITO</h1>
      <CartList />
    </div>
  )
}
