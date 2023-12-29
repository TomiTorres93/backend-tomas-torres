
import { FormLabel, Input, InputLabel } from '@mui/material';
import React, { useState, useEffect } from 'react';

export default function CompleteRegistration( { } ) {


    const [user, setUser] = useState([])
    const [newUser, setNewUser] = useState({
        first_name: '',
        last_name: '',
        email: user.email,
        password: '',
        age: '',
      });


      const searchParams = window.location.search;

      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNewUser({
          ...newUser,
          [name]: value,
        });
      };

   
      const getUserDataFromDB = async () => {
        try {
    
          const response = await fetch(`https://backend-tomitorres.onrender.com/api/users/userExists/${window.location.search.substring(1)}`);
          const data = await response.json();
    
          setUser(data.match)

        } catch (error) {
          console.error('Error al obtener datos:', error);
        }
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();

      };

      useEffect(() => {
            getUserDataFromDB()
      }, [])
      
      
      const createNewUser = async () => {
        try {
          const response = await fetch('https://backend-tomitorres.onrender.com/api/sessions/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
          })
      
            if (response.status === 201) {
          console.log("creado")

          } else {
            console.log("No se pudo crear el usuario!");
          }
      

        } 
        
        catch (error) {
          console.error('Error al crear usuario:', error);
        }
      };
      
  
    return (
      <div>

        {user && (
      <form onSubmit={handleSubmit}>
                <h2 className='text'>¡Hola, {user.first_name}! <br /> Por favor completá el registro con los datos requeridos </h2>
      <div>
        <InputLabel htmlFor="firstName">Nombre:</InputLabel>

        <Input
        type="text"
        name="first_name"
        value={newUser.first_name}
        onChange={handleInputChange}
        placeholder="Nombre"
        required
        />
      </div>
      <div>
        <InputLabel htmlFor="lastName">Apellido:</InputLabel>
        <Input
        type="text"
        name="last_name"
        value={newUser.last_name}
        onChange={handleInputChange}
        placeholder="Apellido"
        required
        />
      </div>
      <div>
        <InputLabel htmlFor="email">Email:</InputLabel>
        <Input
        type="email"
        name="email"
        value={user.email}
        onChange={handleInputChange}
        placeholder="Email"
        required
        />
      </div>
      <div>
        <InputLabel htmlFor="password">Contraseña:</InputLabel>
        <Input
        type="password"
        name="password"
        value={newUser.password}
        onChange={handleInputChange}
        placeholder="Nueva contraseña"
        required
        />
      </div>
      <div>
        <InputLabel htmlFor="age">Edad:</InputLabel>
        <Input
        type="number"
        name="age"
        value={newUser.age}
        onChange={handleInputChange}
        placeholder="Edad"
        required
        />
      </div>
      <button onClick={createNewUser} type="submit">Registrarse</button>
    </form>
        )}
  
      </div>
    );
  }
  
