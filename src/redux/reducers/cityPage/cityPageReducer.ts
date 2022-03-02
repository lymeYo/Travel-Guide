import { actionInterface } from '../../../utils/constants'
import { SET_CITY_PAGE } from './cityPageCreators'
import produce, { Draft } from 'immer'

interface initialStateInterface {
   city: string,
   country: string,
   imageSrc: string,
   hotels: Array<object>,
   sights: Array<object>,
}

let initialState: initialStateInterface = {
   city: '',
   country: '',
   hotels: [],
   sights: [],
   imageSrc: '',
}

export const homePageReducer = produce((draft: Draft<initialStateInterface>, action: actionInterface) => {
   switch (action.type) {
      case SET_CITY_PAGE: 
         draft.sights = action.sights
         draft.hotels = action.hotels
         draft.imageSrc = action.imageSrc
         draft.country = action.country
         draft.city = action.city
         break
         
   }

   return draft
}, initialState)

export default homePageReducer