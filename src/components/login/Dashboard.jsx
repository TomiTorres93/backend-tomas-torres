import { FormLabel, Input, InputLabel } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
export default function Dashboard() {
    const [userData, setUserData] = useState([])
    const { userId } = useParams()
    const userDataById = async (req, res) => {

        try {
              const response = await fetch(`http://localhost:3001/api/users/`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json'
              },
              credentials: 'include'
            }); 

            if(response.status === 200) {
              let json = await response.json()
              setUserData(json)
            } else if (response.status === 401) {
                window.location.replace(`/users/login`);  
            }
       
         
        } catch (error) {
          console.error('Error al obtener datos:', error);

        }
      };
    
      useEffect(() => {
        userDataById()
       }, [])
console.log(userData)

  return (
    <div>
        {userData && (
            <p>¡Hola, {userData.first_name}! </p>
        )}
    </div>
  )
}
