import { Button, ButtonBase, Input } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ShopList from './ShopList';


export default function ShopListCont() {

  const [cartId, setCartId] = useState(null); 
  const [items, setItems] = useState([]);
  const [search, setSearch] = useState('');
  const [paginationData, setPaginationData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1)
  const [newItem, setNewItem] = useState({ name: '', description: '', category: '', stock: 0, size: 0, price: 0 });


  useEffect(() => {
    getDataFromDB();
  }, []);



  const searchParams = window.location.search;

  const getDataFromDB = async (url) => {
    try {

      const response = await fetch(url === undefined ? `http://localhost:3001/api/items${searchParams}` : url);
      const data = await response.json();

      setItems(data.payload);
      setPaginationData(data.pagination)
    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  const [cartAPIdata, setCartAPIdata] = useState([])
  
  const [cartsPaginationData, setCartsPaginationData] = useState([])
  const cartAPIget = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/carts`);
      const data = await response.json();
      setCartAPIdata(data.payload)

    } catch (error) {
      console.error('Error al obtener datos:', error);
    }
  };

  useEffect(() => {
    cartAPIget();

  }, []);



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
        getDataFromDB();
      } else {
        console.error('Error al crear item');
      }
    } catch (error) {
      console.error('Error al crear item:', error);
    }
  };


  
  /// CARRITO

    // Función para crear un carrito nuevo
    const createCart = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/carts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ cart: { products: [] } }), 
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log(data.payload)
          setCartId(data.payload._id); 
          console.log('Carrito creado exitosamente');
        } else {
          console.error('Error al crear carrito');
        }
      } catch (error) {
 
        console.error('Error al crear carrito:', error);
      }
    };


    const cartIdString = cartId ? cartId.toString() : ''; // Convierte cartId a cadena si no es nulo

  
    // Función para agregar un producto al carrito
    const addToCart = async (cartIdString, productInfo) => {
      if (!cartId) {
        await createCart().then( async () => {
           await fetch(`http://localhost:3001/api/carts/${cartIdString}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify([{ product: productInfo.name, price: productInfo.price, quantity: productInfo.quantity }])
          });
        
        }
                  // Enviar los datos actualizados al servidor
        )
      
      }
      try {



        // Obtener el carrito con los productos poblados
        const cart = await fetch(`http://localhost:3001/api/carts/${cartIdString}`);
        const cartData = await cart.json();
    
        console.log(cart);
    

        // Enviar los datos actualizados al servidor
          await fetch(`http://localhost:3001/api/carts/${cartIdString}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify([{ product: productInfo.name, price: productInfo.price, quantity: productInfo.quantity }])
        });
      } catch (error) {
        console.error('Error al agregar producto al carrito:', error);
      }
    };




  const handleNextPage = () => {
    if (paginationData.hasNextPage) {
      const url = new URL(window.location.href);
      let sort = url.searchParams.get('sort') !== null ? '&sort=' + url.searchParams.get('sort') : ''
      const nextPage = paginationData.page + 1;
      const newQuery = `?page=${nextPage}&limit=${paginationData.limit}${sort}`; 
      const newUrl = `/api/items${newQuery}`; 
      window.history.pushState({}, '', `/products${newQuery}`); 
      getDataFromDB(newUrl); 
      setCurrentPage(currentPage + 1)
    }
  };





  const handlePreviousPage = () => {
    if (paginationData.hasPrevPage) {
      const url = new URL(window.location.href);
      let sort = url.searchParams.get('sort') !== null ? '&sort=' + url.searchParams.get('sort') : ''
      const previousPage = paginationData.page - 1;
      const newQuery = `?page=${previousPage}&limit=${paginationData.limit}${sort}`; 
      const newUrl = `/api/items${newQuery}`;
      window.history.pushState({}, '', `/products${newQuery}`);
      getDataFromDB(newUrl); 
      setCurrentPage(currentPage - 1)
    }
  };

  const searchFunction = () => {
    if (search.length > 0) {
      const newQuery = `?page=1&limit=${paginationData.limit}&filter=${search}`; 
      const newUrl = `/api/items${newQuery}`; 
      window.history.pushState({}, '', `/products${newQuery}`); 
      getDataFromDB(newUrl); 
      setCurrentPage(1)
    } else {
      const newQuery = `?page=1&limit=${paginationData.limit}`;
      const newUrl = `/api/items${newQuery}`; 
      window.history.pushState({}, '', `/products${newQuery}`); 
      getDataFromDB(newUrl); 
      setCurrentPage(1)
    }
  }



  const sortFunction = (criteria) => {
    const url = new URL(window.location.href);

    url.searchParams.set('sort', criteria);
    const newUrl = `/api/items${url.search}`; 

    window.history.pushState({}, '', url);
    getDataFromDB(newUrl);
  };



  const closeSearch = () => {
    const newQuery = `?page=1&limit=${paginationData.limit}`;
    const newUrl = `/api/items${newQuery}`; 
    window.history.pushState({}, '', `/products${newQuery}`); 
    getDataFromDB(newUrl); 
    setCurrentPage(1)

  }




  return (
    <div>
      <h1 className='tittle'>PRODUCTOS</h1>

      {/* <button onClick={getDataFromDB}>Obtener Datos</button>  */}

      {/* <h2>Nuevo Item</h2>
      <div className='column'>
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


<label htmlFor="description">Categoria</label>

<input
  type="text"
  placeholder="Categoria"
  value={newItem.category}
  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
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

<label htmlFor="size">Precio</label>
      <input
        type="number"
        placeholder="Precio"
        value={newItem.price}
        onChange={(e) => setNewItem({ ...newItem, price: parseInt(e.target.value) })}
      />
      <button onClick={createNewItem}>Crear Item</button> 
      </div>
       */}

      {/* <button onClick={cartAPIget}>GET CART API</button> */}

      <div className='column'>
        <div className='row'>
          <Input onChange={(e) => setSearch(e.target.value)} placeholder='Buscá una prenda...' className='input' /> <button className='buttonbyn' onClick={searchFunction}> BUSCAR </button> <button className='buttonbyn' onClick={closeSearch}> CERRAR BÚSQUEDA </button>
        </div>


        <ShopList addToCart={addToCart} cartIdString={cartIdString} items={items} paginationData={paginationData} handlePreviousPage={handlePreviousPage} handleNextPage={handleNextPage} sortFunction={sortFunction} />


      </div>






    </div>
  );
}
