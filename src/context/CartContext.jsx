import React, { useState, useEffect, createContext, useContext } from 'react';

const CartContext = createContext([])

export const useCartContext = () => useContext(CartContext)

export default function CartContextProvider( {children} ) {

  const [cartList, setCartList] = useState([])
  const [imagesArr, setImagesArr] = useState([])
  function totalQty() {
    if (cartList.length > 0) { return cartList.map(a => a.price).reduce((a, b) => a + b) } else {
        return 0
    }
}

    // ESTA FUNCIÓN AGREGA EL ITEM AL CARRITO Y VERIFICA SI YA EXISTE UN ITEM CON EL MISMO ID. 
    // EN CASO DE QUE EXISTA, NO SE DUPLICA EL ITEM EN EL CARRITO, SINO QUE SE SUMA LA CANTIDAD DEL ITEM Y SE ACTUALIZA EL CARRITO
    function addToCart(item, cat) {

      let i = cartList.findIndex(a => a.id === item.id && a.size === item.size);
      if (i !== -1) {
          setCartList([...cartList])
      } else {
          setCartList(
              [...cartList, item])
      }
  }


  // ESTA FUNCIÓN VACÍA DE ITEMS EL CARRITO
  function vaciarCart() {
      setCartList([])
  }

  // ESTA FUNCIÓN ELIMINA UN ITEM DEL CARRITO
  function eliminarItem(idPro, cat) {
      setCartList(cartList.filter((pro) => pro.id !== idPro))
}


  const [stored, setStored] = useState([])

  useEffect(() => {
    const storedCartList = sessionStorage.getItem('cartList');

    setStored(storedCartList)
    if (storedCartList) {
      setCartList(JSON.parse(storedCartList));
    }
  }, []);


    // Actualizar el cartList en sessionStorage cuando cambie
    useEffect(() => {
        let stor = stored !== null ? stored.length !== 0 : true
        if(stor) {
            sessionStorage.setItem('cartList', JSON.stringify(cartList));
        }
    }, [cartList]);

  return (
    <CartContext.Provider value={{
      cartList,
      addToCart,
      vaciarCart,
      totalQty,
      eliminarItem,
      imagesArr
  }}>
      {children}

  </CartContext.Provider>
  )
}


