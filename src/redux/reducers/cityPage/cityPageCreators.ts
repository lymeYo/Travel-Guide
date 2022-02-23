import ApiProcessing from "../../../utils/ApiProcessing"

//Constants
export const SET_CITY_PAGE = 'SET_CITY_PAGE'

//Creators

export const renderCityPage = (city: string) => async (dispatch: any) => {
   const data = await ApiProcessing.getCityPageData(city)
   
   dispatch(setCityPage(data))
} 

export const setCityPage = ({ sights, hotels, imageSrc, country, city }: any) => ({
   type: SET_CITY_PAGE,
   sights, 
   hotels, 
   imageSrc, 
   country,
   city
}) 