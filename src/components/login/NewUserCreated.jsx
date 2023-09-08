import { FormLabel, Input, InputLabel } from '@mui/material';
import React, { useState, useEffect } from 'react';
export default function NewUserCreated() {

  const [userData, setUserData] = useState([])

  const getUserData = async () => {
    try {
      const response = await fetch('http://localhost:3001/getUserData', {
        credentials: 'include', // Esto permite que las cookies se envíen con la solicitud
      });
  
      if (response.status === 200) {
        const userData = await response.json();
        setUserData(userData)
        console.log('Datos del usuario:', userData);
      } else {
        console.error('Error al obtener los datos del usuario');
      }
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };
  
  // Llama a la función para obtener los datos del usuario
  getUserData();
  

  return (
    <div>
      ¡Hola!
    </div>
  )
}
