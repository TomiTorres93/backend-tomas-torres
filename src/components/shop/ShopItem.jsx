import React from 'react'

export default function ShopItem({ _id, cartIdString, name, description, stock, size, price, addToCart }) {

  let product = {name: name, price: price, quantity: 1}

  return (
    <div className='itemCard'>
      <p> {name} </p>
      <p> {description} </p>
      <p> Stock: {stock} </p>
      <p> Talle: {size} </p>
      <p> ${price} </p>
      <button className='buttonbyn' onClick={() => {
        addToCart(cartIdString, product)
      }}>COMPRAR</button>
    </div>
  );
}
