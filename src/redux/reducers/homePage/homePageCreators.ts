import ApiProcessing from "../../../utils/ApiProcessing"
import { requestError } from "../../../utils/constants"

//Constants
export const SET_INITIAL_CARDS = 'SET_INITIAL_CARDS'
export const MAIN_INPUT_HANDLER = 'MAIN_INPUT_HANDLER'
export const SEARCH_PROCESSING = 'SEARCH_PROCESSING'
export const INVALID_REQUEST_INFO = 'INVALID_REQUEST_INFO'

//Creators
//TODO разобрать докумиентацию указывания типов данных в массиве
export const renderInitialCards = (order: Array<any>) => async (dispatch: any) => {
   let dataPack: Array<{}> = []

   // let testData: any = {}
   // let testReq = 'Стокгольм'
   // const resForLocations = await axios.get(`https://engine.hotellook.com/api/v2/lookup.json?query=${testReq}&lang=ru&lookFor=both&limit=1`)
   // const location = Object.values(resForLocations.data.results.locations[0].location).join(',')
   // const resForHotels = await axios.get(`https://engine.hotellook.com/api/v2/lookup.json?query=${location}&lang=ru&lookFor=both&limit=5`)
   // console.log(resForHotels.data.results.hotels)
   // testData.hotels = resForHotels.data.results.hotels

   // const reqForCityLocation = await axios.get(`http://api.opentripmap.com/0.1/ru/places/geoname?name=${testReq}&apikey=5ae2e3f221c38a28845f05b6692e253f1e111058702f77d090cdbfae`)
   // let coords = `lon=${reqForCityLocation.data.lon}&lat=${reqForCityLocation.data.lat}`
   // const dataForXID = await axios.get(`https://api.opentripmap.com/0.1/ru/places/radius?radius=1000&${coords}&apikey=5ae2e3f221c38a28845f05b6692e253f1e111058702f77d090cdbfae`)
   // let XID = dataForXID.data.features[0].properties.xid
   // const sight = await axios.get(`https://api.opentripmap.com/0.1/ru/places/xid/${XID}?apikey=5ae2e3f221c38a28845f05b6692e253f1e111058702f77d090cdbfae`)
   // console.log(sight)

   // testData.sights = sight

   //'https://yasen.hotellook.com/photos/hotel_photos?id=27926056,4'
   for (let item of order) {

      for (let ind in item.pack) {
         let dataOrder: any = await ApiProcessing.getPreviewData(item.pack[ind])
         dataOrder.forEach((data: any) => dataPack.push(data))


         // let testReq = 'Стокгольм' || item.pack[ind]
         // const resForLocations = await axios.get(`https://engine.hotellook.com/api/v2/lookup.json?query=${testReq}&lang=ru&lookFor=both&limit=1`)
         // const location = Object.values(resForLocations.data.results.locations[0].location).join(',')

         // const resForHotels = await axios.get(`https://engine.hotellook.com/api/v2/lookup.json?query=${location}&lang=ru&lookFor=both&limit=1`)
         // //'https://yasen.hotellook.com/photos/hotel_photos?id=27926056,4'
         // console.log(resForHotels)

         // item.pack[ind] = resForHotels.data.results.hotels
      }
   }

   dispatch(setInitialCards(dataPack))
}

export const renderSearchProcessing = (value: string) => async (dispatch: any) => {
   
   const searchPack: Array<object> = []
   let checkValid = await ApiProcessing.checkValidQuery(value)
   let dataOrder: any = await ApiProcessing.getPreviewData(value)

   if (!checkValid) {
      console.log(dataOrder.message)
      dispatch(invalidRequestInfo(dataOrder.message))
      return
   }
   
   dataOrder.forEach((data: any) => searchPack.push(data))
   
   dispatch(searchProcessing(searchPack))
}


export const setInitialCards = (dataPack: any) => ({
   type: SET_INITIAL_CARDS,
   cardsData: dataPack,
})

export const mainInputHandler = (value: string) => ({
   type: MAIN_INPUT_HANDLER,
   value,
})

export const searchProcessing = (searchPack: any) => ({
   type: SEARCH_PROCESSING,
   searchPack,
})

export const invalidRequestInfo = (message: string) => ({
   type: INVALID_REQUEST_INFO,
   message,
})