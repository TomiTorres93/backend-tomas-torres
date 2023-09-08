import React from 'react'

export default function GitHubLogin() {


    const GitHubLog = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/sessions/github')
             console.log(response)
              if (response.status === 200) {
             
                console.log("Usuario creado con éxito!");
       
              } else {
                console.log("No se pudo crear el usuario.");
              }
           
          } catch (error) {
            console.error('Error al obtener datos:', error);
          }
        };

       


  return (
    <div>
<a href="http://localhost:3001/api/sessions/github">Iniciar sesión con GitHub</a>

<button onClick={GitHubLog}> GITHUB</button>
    </div>
  )
}
