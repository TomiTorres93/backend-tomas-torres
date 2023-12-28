import React, { useState, useEffect } from 'react';

export default function Checkout() {
    const urlParams = new URLSearchParams(queryString);

    const purchaser = urlParams.get('purchaser')

    
  return (
    <div className='gap'>


        <div>
            <p>¡Gracias por tu compra!</p>
            <p>{purchaser} </p>
        </div>
        
  
    </div>
  )
}
