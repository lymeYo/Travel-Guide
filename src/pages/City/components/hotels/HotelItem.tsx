import { Typography } from '@mui/material'
import React from 'react'

function HotelItem({ hotel }: any) {
   const { name: { en: name }, photos, } = hotel
   
   return (
      <div className='hotel-item item'>
         <div className='name'>
            <h3>
               {name}
            </h3>
         </div>
         <div className='body'>
            <div className='photos'>
               <div className='photo'>
                  <img src={photos[0]?.url} alt="" />
               </div>
            </div>
         </div>
      </div>
   )
}

export default HotelItem