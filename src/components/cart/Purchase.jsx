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

  const [purchaser, setPurchaser] = useState("")

  const { id } = useParams()
  const cartAPIget = async () => {
    try {
      const response = await fetch(`https://backend-newapi-production.up.railway.app/api/carts`);
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
      const response = await fetch(`https://backend-newapi-production.up.railway.app/api/carts/${id}`);
      const data = await response.json();
      setCart(data)

    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  useEffect(() => {
    cartById();
  }, []);

 

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



 // MERCADOPAGO

 let backUrl = `https://backend-tomitorres.netlify.app/checkout?purchaser=${encodeURIComponent(newTicket.purchaser)}&code=${newTicket.code}&amount=100&datetime=${newTicket.purchase_datetime}`

 const data = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    Authorization:
      `Bearer APP_USR-8404686005993449-122720-be07e7d66d5d1cb1e20e3a36e0ee2227-169291933`
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
    notification_url:  `https://backend-newapi-production.up.railway.app/api/ticket/webhook?purchaser=${encodeURIComponent(newTicket.purchaser)}&code=${newTicket.code}&amount=100&datetime=${newTicket.purchase_datetime}`,
    auto_return: "approved",
    back_urls: { success: backUrl }
  })

};


console.log(encodeURIComponent(newTicket.purchaser))
useEffect(() => {
  //getFetch();
  fetch("https://api.mercadopago.com/checkout/preferences", data)
    .then(function (resp) {
      return resp.json();
    })
    .then((resp) => setOrdenmp(resp));

}, []);  

const purchase = async () => {
  try {
    const promises = cart.products.map(async (product) => {

      const response = await fetch(`https://backend-newapi-production.up.railway.app/api/items/purchase/${product.id}`, {
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


const handleInputChange2 = (event) => {
  setPurchaser(event.target.value);
};

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
