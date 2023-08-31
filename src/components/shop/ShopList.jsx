import React from 'react'
import ShopItem from './ShopItem'
import { Button } from '@mui/material'

export default function ShopList( { items, addToCart, sortFunction, paginationData, handlePreviousPage, handleNextPage } ) {
  

  return (
<div className='column'>

<div className='row'>
   <button className='buttonbyn'  onClick={() => {sortFunction("asc")  } }>
            PRECIO ASCENDENTE
          </button>

          <button className='buttonbyn'  onClick={() => {sortFunction("desc")}}>
            PRECIO DESCENDENTE
          </button>
   </div>

   <p className='buttonbyn'> Mostrando {paginationData.limit} de {paginationData.totalDocs} </p>
<div className='row'>
    {items && (
        
      items.map((item, index) => 
        
       <ShopItem key={index} {...item} addToCart={addToCart} />
       
        )
        )}
        </div>

<p className='buttonbyn'> Página {paginationData.page} </p>

<div className='row'>
{paginationData.hasPrevPage && (
 <button className='buttonbynbigger'  onClick={handlePreviousPage} >ANTERIOR</button>
           )}
          

{paginationData.hasNextPage && (
    <button className='buttonbynbigger'  onClick={handleNextPage} >SIGUIENTE</button>
           )}
           </div>

           
        
        </div>
  )
}
