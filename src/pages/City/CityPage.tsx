import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SightsList from './components/sights/SightsList'
import HotelsList from './components/hotels/HotelsList'
import MainCityInfo from './components/mainInfo/MainCityInfo'
import './styles.scss'

function CityPage() {
   const dispatch = useDispatch()
   
   return (
      <div className='city-page'>
         <MainCityInfo />
         <div className='additional'>
            <SightsList />
            <HotelsList />
         </div>
      </div>
   )
}

export default CityPage