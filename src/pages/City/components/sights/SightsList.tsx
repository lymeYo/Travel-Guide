import React from 'react'
import { useSelector } from 'react-redux'
import Accordeon from '../../../../common-components/Accordeon/Accordeon'
import CityPage from '../../CityPage'
import SightsItem from './SightsItem'

function SightsList(props: any) {
   
   const { sights } = useSelector(({ cityPage }: any) => ({
      sights: cityPage.sights,
   }))

   const getSightsItemPack = React.useCallback(() => { 
      return sights.map((sight: any, id: number) => {
         console.log(sight)

         return <SightsItem id={sight.xid} sight={sight} />
      })
    }, [sights]) 
   const SightsItemPack = getSightsItemPack()
   
   const AccordeonSights = Accordeon(
      <div className='list'>
         {SightsItemPack}
      </div>
   )
   return (
      <div className='sights-area'>
         {AccordeonSights}
      </div>
   )
}

export default SightsList
