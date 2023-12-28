import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Input, InputLabel } from '@mui/material';
import { v4 as uuidv4 } from 'uuid';

export default function Purchase() {

  const [cartAPIdata, setCartAPIdata] = useState([])
  const [ordenmp, setOrdenmp] = useState([]);
  const [stock, setStock] = useState(false)
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
          window.location.href = ordenmp.init_point;
  
        }
      });
  
      await Promise.all(promises);

    } catch (error) {
      console.error('Error al realizar la compra', error);
    }
  };

 // MERCADOPAGO

 const data = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      `Bearer TEST-c7578c8a-e674-4346-bef9-5b48559be58c`
  },
  body: JSON.stringify({
    items: [
      {
        title: "Tomi Torres",
        description: "Gracias",
        category_id: "backend",
        quantity: 1,
        currency_id: "ARS",
        unit_price: parseInt(1),
      }
    ],
    auto_return: "approved",
    back_urls: { success: `https://frontend.com/purchase?purchaser=${newTicket.purchaser}&code=${newTicket.code}&amount=${newTicket.amount}&datetime=${newTicket.purchase_datetime}` },
  })

};



useEffect(() => {
  //getFetch();
  fetch("https://api.mercadopago.com/checkout/preferences", data)
    .then(function (resp) {
      return resp.json();
    })
    .then((resp) => setOrdenmp(resp));

}, []);  

  return (
    <div className='gap'>
      <h1 className='tittle'>Purchase</h1>



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
{newTicket.purchaser ?            

<>
<button onClick={purchase}  className='buttonbyn'>Comprar</button> 

</>



: "Ingresá tu email para finalizar la compra"}
</>




    </div>
  )
}
