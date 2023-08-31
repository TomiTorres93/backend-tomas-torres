import { Button, IconButton } from '@mui/material'
import React from 'react'

export default function ShopItem({name, description, stock, size, price, addToCart}) {


  const addToCartF = () => {
    addToCart( name, price);
 
  };

  return (
    <div className='itemCard'>
    <p> {name} </p>
    <p> {description} </p>
    <p> Stock: {stock} </p>
    <p> Talle: {size} </p>
    <p> ${price} </p>
    <button className='buttonbyn' onClick={addToCartF}>COMPRAR</button>
  </div>
  )
}
