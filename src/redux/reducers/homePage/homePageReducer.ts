import axios from "axios"
import produce, { Draft } from 'immer'

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
   mainInput: {
      value: string,
      infoMessage: string,
   }
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

const homePageReducer = produce((draft: Draft<initialStateInterface>, action: actionInterface) => {
   
   switch (action.type) {
      case SET_INITIAL_CARDS:
         draft.initialCards = action.cardsData
         break

      case MAIN_INPUT_HANDLER: 
         draft.mainInput.value = action.value
         break

      case SEARCH_PROCESSING:
         draft.searchPack = action.searchPack
         draft.mainInput.infoMessage = ''
         break

      case INVALID_REQUEST_INFO:
         draft.searchPack = []
         draft.mainInput.infoMessage = action.message
         break
   }

   return draft
}, initialState)

export default homePageReducer