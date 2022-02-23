import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import HotelItem from './HotelItem'

const getHotelList = (hotels: any, amount: number | boolean) => {
   const list = hotels.map((hotel: any, ind: number) => <li><HotelItem id={ind} hotel={hotel} /></li>) 
   if (amount === false) amount = list.length //если отправлено ложно значение для amount - вывожу все отели

   return (
      <ul className='hotel-list'>{list.slice(0, amount)}</ul>
   )
}

function HotelsList(props: any) {
   const { hotels }: any = useSelector(({ cityPage }: any) => ({
      hotels: cityPage.hotels,
   }))

   const hotelItemsInRow = 5 // количество элементов на одном ряду grid сетки
   const hotelList = React.useCallback((checkTurn) => getHotelList(hotels, checkTurn ? false : hotelItemsInRow), [hotels])
   const [turnListCheck, isListTurn] = React.useState(false)
   const turnList = () => isListTurn(!turnListCheck)

   const turnInfo = turnListCheck ? "Свернуть" : "Развернуть"
   return (
   <div> 
      <div className='description'>
         <p>
            Самые популярные отели по городу:
         </p>
      </div>
         {hotelList(turnListCheck)}
         <div onClick={turnList}><span className='turn-info'>{turnInfo}</span></div>
   </div>
   )
}

export default HotelsList