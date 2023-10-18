import React from 'react'
import CartItem from './CartItem'

export default function CartList( {cart, deleteItem} ) {
  return (
    <>
        {cart.products.map((e, index) => 
        <CartItem key={index} {...e} deleteItem={deleteItem} />
          )  
       }
    </>
  )
}
