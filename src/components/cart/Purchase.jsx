import React, { useState, useEffect } from 'react';
import CartList from './CartList';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { Input, InputLabel } from '@mui/material';

export default function Purchase() {

  const [cartAPIdata, setCartAPIdata] = useState([])
  
  const [cartsPaginationData, setCartsPaginationData] = useState([])
  const [cart, setCart] = useState(null)
  const [purchased, setPurchased] = useState(false)
  const [stock, setStock] = useState(false)
  const [newTicket, setNewTicket] = useState({
    code: uuidv4(),
    purchase_datetime: Date.now(),
    amount: '',
    purchaser: '',
  });


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
  const createTicket = async () => {

    try {
  // Enviar los datos actualizados al servidor
  await fetch(`http://localhost:3001/api/ticket`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newTicket),
  })
  .then(() => {
    setPurchased(true)
  });

    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };
const purchase = async () => {
    try {
      const promises = cart.products.map(async (product) => {

        const response = await fetch(`http://localhost:3001/api/items/purchase/${product.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ quantity: product.quantity }),
        });

        if (!response.ok) {
            setStock(true)
          throw new Error(`Error al deducir stock para el producto con ID: ${product.id}`);
        } else {
            createTicket()
        }
      });
  
      await Promise.all(promises);

    } catch (error) {
      console.error('Error al realizar la compra', error);
    }
  };
  

 

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setNewTicket({
      ...newTicket,
      [name]: value,
    });
  };



    
  const handleSubmit = (e) => {
    e.preventDefault();

  };

  return (
    <div className='gap'>
      <h1 className='tittle'>Purchase</h1>

{purchased === true ?

<div>
    <p>¡Gracias por tu compra!</p>
    <p>Orden: {newTicket.code} </p>
    <p>Total: ${newTicket.amount} </p>
</div>

: 

<>
<form onSubmit={handleSubmit}> 
<InputLabel htmlFor="Email">EMAIL:</InputLabel>
            <Input
            type="text"
            name="purchaser"
            value={newTicket.purchaser}
            onChange={handleInputChange}
            placeholder="Email"
            required
            />
</form>
{newTicket.purchaser ?            <button onClick={purchase}  className='buttonbyn'>Comprar</button> : "Ingresá tu email para finalizar la compra"}
</>
}

{stock === true ? "Stock insuficiente" : ""}

    </div>
  )
}
