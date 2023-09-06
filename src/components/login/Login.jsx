import { FormLabel, Input, InputLabel } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
 
    const [loginData, setLoginData] = useState({
        user: '',
        password: ''
      });

  const [users, setUsers] = useState([])

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };



  const login = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/sessions/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: loginData.user, password: loginData.password }),
      })
 
  
        
        if (response.status === 200) {
          console.log("Usuario creado con éxito!");
          window.location.replace('/products');
        } else {
          console.log("No se pudo crear el usuario.");
        }
     
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };
  
  


  return (
    <div>
        <Link className='buttonbyn' to="/newuser"> Crear nuevo usuario</Link>


  


    <h2>Iniciar Sesión</h2>
 
      <div>
        <InputLabel htmlFor="usuario">Usuario</InputLabel>
        <Input
            type="text"
            name="user"
            value={loginData.user}
            onChange={handleInputChange}
            placeholder="usuario"
            required
        />
      </div>
      <div>
        <InputLabel htmlFor="contraseña">Contraseña</InputLabel>
        <Input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleInputChange}
            placeholder="contraseña"
            required
        />
      </div>
      <button onClick={login} className='buttonbyn' type="submit">Iniciar Sesión</button>
   
  </div>
  )
}
