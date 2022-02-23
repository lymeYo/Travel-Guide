import { actionInterface } from '../../../utils/constants'
import { SET_CITY_PAGE } from './cityPageCreators'


interface initialState {
   city: string,
   country: string,
   hotels: Array<object>,
   sights: Array<object>,
}

let initialState: initialState = {
   city: '',
   country: '',
   hotels: [],
   sights: []
}

function homePageReducer(state: any = initialState, action: actionInterface) {
   switch (action.type) {
      case SET_CITY_PAGE:
         
         return {
            ...state,
            sights: action.sights,
            hotels: action.hotels,
            imageSrc: action.imageSrc,
            country: action.country,
            city: action.city,
         }
      
      default:
         return state
   }
}

export default homePageReducer