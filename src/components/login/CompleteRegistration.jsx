
import { FormLabel, Input, InputLabel } from '@mui/material';
import React, { useState, useEffect } from 'react';

export default function CompleteRegistration( { } ) {


    const [users, setUsers] = useState([])
    const [newUser, setNewUser] = useState({
        first_name: '',
        last_name: '',
        email: '',
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


      const getDataFromDB = async () => {
        try {
    
          const response = await fetch(`http://localhost:3001/api/sessions`);
          const data = await response.json();
    
          setUsers(data.payload);
          console.log(data)
        } catch (error) {
          console.error('Error al obtener datos:', error);
        }
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();

      };



      
      const createNewUser = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/sessions/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
          })
      
            if (response.status === 201) {
              try {
                const res = await fetch(`http://localhost:3001/api/cookies/setCookie?value=${newUser.email}`)
                console.log(res)
                console.log("cookie existosa!");

    
              }
              catch (error) {
                console.error('Error al guardar la cookie:', error);
              }


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
        <h2>¡Hola, USUARIO! <br /> Por favor completá el registro con los datos requeridos </h2>
        <form onSubmit={handleSubmit}>
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
            value={newUser.email}
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
            placeholder="Contraseña"
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
      </div>
    );
  }
  
