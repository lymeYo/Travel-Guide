import React from 'react'
import { useSelector } from 'react-redux'

function MainCityInfo(props: any) {
   const { cityName, countryName } = useSelector(({ cityPage }: any) => ({
      cityName: cityPage.city,
      countryName: cityPage.country,
   }))

   return (
      <div className='main-info'>
         {/* блок с погодой итп */}
         <div className='name-area'>
            <h2>{cityName}</h2>
            <h3>{countryName}</h3>
         </div>
      </div>
   )
}

export default MainCityInfo