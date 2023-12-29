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

const [userData, setUserData] = useState(undefined)
  const jwt = async () => {

    try {
      const response = await fetch('https://backend-tomitorres.onrender.com/api/jwt/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email: loginData.user, password: loginData.password }),
      }); 

      if(response.status === 200) {
        let json = await response.json()
        setUserData(json.id)
          window.location.replace(`/dashboard`);  
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
      <div className='row marginTop'>
      <button onClick={() => {
        jwt()
      }} className='buttonbyn' type="submit">Iniciar Sesión</button>

      <a href="https://backend-tomitorres.onrender.com/api/sessions/github" className='buttonbyn'>Login con GitHub </a> <img className='gitLogo' width="20" height="20" src="https://img.icons8.com/ios-glyphs/30/github.png" alt="github"/>
      </div>
  </div>
  )
}
