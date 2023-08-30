import React, { useState, useEffect } from 'react';


export default function ShopListCont() {


  const [items, setItems] = useState([]);
  const [paginationData, setPaginationData] = useState([]);
  const [newItem, setNewItem] = useState({ name: '', description: '', stock: 0, size: 0 });

  const getDataFromDB = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/items');
      const data = await response.json();

      setItems(data);

 

    setPaginationData(data.pagination)
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };


  const createNewItem = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/items', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        console.log('Item creado exitosamente');
        // Actualizar la lista de items después de crear uno nuevo
        getDataFromDB();
      } else {
        console.error('Error al crear item');
      }
    } catch (error) {
      console.error('Error al crear item:', error);
    }
  };

  useEffect(() => {
    getDataFromDB();
  }, []);
  console.log(paginationData)
  
  const handleNextPage = () => {
    if (paginationData.hasNextPage) {
      const nextPage = paginationData.page + 1;
      const newQuery = `?page=${nextPage}&limit=${paginationData.limit}`; // Construimos la nueva query
      const newUrl = `${window.location.pathname}${newQuery}`; // Construimos la nueva URL
      window.history.pushState({}, '', newUrl); // Actualizamos la URL
      getDataFromDB(newUrl); // Obtenemos los datos actualizados
    }
  };



  return (
    <div>
      <h1>Lista de Datos</h1>

      <button onClick={getDataFromDB}>Obtener Datos</button>

      <h2>Nuevo Item</h2>
      <label htmlFor="name">Nombre</label>
      <input
        type="text"
        placeholder="Nombre"
        value={newItem.name}
        onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
      />
       <label htmlFor="description">Descripción</label>

      <input
        type="text"
        placeholder="Descripción"
        value={newItem.description}
        onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
      />

<label htmlFor="stock">Stock</label>
      <input
        type="number"
        placeholder="Stock"
        value={newItem.stock}
        onChange={(e) => setNewItem({ ...newItem, stock: parseInt(e.target.value) })}
      />

<label htmlFor="size">Tamaño</label>
      <input
        type="number"
        placeholder="Tamaño"
        value={newItem.size}
        onChange={(e) => setNewItem({ ...newItem, size: parseInt(e.target.value) })}
      />
      <button onClick={createNewItem}>Crear Item</button>

    <div className='column'>

   
      {items.payload && (
        
        items.payload.map((e, index) => 
          
          <div className='row' key={index}>
            <p> {e.name} </p>
            <p> {e.description} </p>
            <p> {e.stock} </p>
            <p> {e.size} </p>
          </div>
          )
          )}
           </div>
           <button onClick={handleNextPage} >NEXT PAGE</button>
    </div>
  );
}
