import React, { useState, useEffect } from 'react';
import ShopItem from './shop/ShopItem';

export default function Mock() {

    const [data, setData] = useState([])
  
    const cartAPIget = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/mockproducts`);
        const data = await response.json();
        setData(data.payload)
  
      } catch (error) {
        console.error('Error al obtener datos:', error);
      }
    };


    useEffect(() => {
      cartAPIget();
  
    }, []);

    console.log(data)
  
  return (
    <div className='row'>
        <p className='buttonbyn'>Mock products</p>

        {data && (
        
        data.map((item, index) => 
          
         <ShopItem key={index} {...item}   />
         
          )
          )}
        
    </div>
  )
}
