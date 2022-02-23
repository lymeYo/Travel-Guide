import axios from "axios"

import { SET_INITIAL_CARDS, MAIN_INPUT_HANDLER, SEARCH_PROCESSING, INVALID_REQUEST_INFO } from './homePageCreators'
import { actionInterface } from '../../../utils/constants'

interface packItemInterface {
   [key: string]: any
}

interface cardsRowInterface {
   type: string,
   pack: Array<packItemInterface>
}

interface initialStateInterface {
   mainInput: object
   initialCards: Array<cardsRowInterface>
   searchPack: Array<packItemInterface>
   searchMode: boolean
}

let initialState: initialStateInterface = {
   mainInput: {
      value: '',
      infoMessage: '',
   },
   initialCards: [
      {
         type: 'cities',
         pack: [],
      }
   ],
   searchPack: [],
   searchMode: false,
}

function homePageReducer(state: any = initialState, action: actionInterface) {
   
   switch (action.type) {
      case SET_INITIAL_CARDS:
         return {
            ...state,
            initialCards: action.cardsData
         }

      case MAIN_INPUT_HANDLER: 
         return {
            ...state,
            mainInput: {
               ...state.mainInput,
               value: action.value,
            }
         }

      case SEARCH_PROCESSING:
         return {
            ...state,
            searchPack: action.searchPack,
            mainInput: {
               ...state.mainInput,
               infoMessage: '',
            }
         }

      case INVALID_REQUEST_INFO:
         return {
            ...state,
            searchPack: [],
            mainInput: {
               ...state.mainInput,
               infoMessage: action.message,
            }
         }
      
      default:
         return state
   }
}

export default homePageReducer