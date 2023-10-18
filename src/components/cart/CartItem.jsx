import React from 'react'

export default function CartItem({name, price, quantity, _id, deleteItem}) {

  return (
    <div  className='cartItem'>
    <p> {name} </p>
    <p> ${price} </p>
    <p> Cantidad: {quantity} </p>
    <button onClick={() => {
      deleteItem(name)
    }} className='cancelStatus'>Eliminar</button>
  </div>
  )
}
