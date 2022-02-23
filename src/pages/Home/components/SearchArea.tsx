import React from 'react'

import MainInput from '../../../common-components/MainInput'

function SearchArea(props: any) {

   return (
      <div className='search-area-wrapper'>
         <div className='search-area'>
            <MainInput />
         </div>
      </div>
   )
}

export default SearchArea