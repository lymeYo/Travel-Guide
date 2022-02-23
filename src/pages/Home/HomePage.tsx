import React from 'react'
import './styles.scss'
import SearchArea from './components/SearchArea'
import HomeCards from './components/HomeCards'

function HomePage() {
   return (
      <div className='home-page'>
         <SearchArea />
         <HomeCards />
      </div>
   )
}

export default HomePage
