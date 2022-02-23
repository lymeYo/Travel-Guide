import { Typography } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardStandart from '../../../common-components/CardStandart/CardStandart'
import { renderInitialCards } from '../../../redux/reducers/homePage/homePageCreators'


const getInitialCards = () => {
   const initialCities = [
      {
         type: 'Города',
         pack: [
            'Москва',
            'Хельсинки',
            'Стокгольм',
            'Бухарест',
         ]
      }
   ]
   
   return initialCities
   // const orderCadrs = initialCities.map((name, ind) => ) //TODO преобразовать массив в карточки
   
}

function CadrsPack({ dataCards }: any) {
   let cards = dataCards.map(({ country, city, imageSrc }: any, ind: number) => {
      return <CardStandart id={ind} country={country} city={city} imageSrc={imageSrc} /> 
   })
   
   return (
      <div className='home-cards'>{cards}</div>
   )
}

function HomeCards(props: any) {
   const dispatch = useDispatch()
   const { searchPack, initialCards, searchMode, rowTitle } = useSelector(({ homePage }: any) => ({
      searchPack: homePage.searchPack,
      initialCards: homePage.initialCards,
      rowTitle: homePage.searchMode ? 'Результаты поиска по запросу: ${запрос}' : 'Куда хотите отправиться?',
      searchMode: homePage.searchMode,
   }))

   let cards: any = React.useMemo(() => {
      if (searchPack.length == 0) return initialCards
      return searchPack
   }, [searchPack, initialCards])
   
   React.useEffect(() => {
      let initialCardsData = getInitialCards()
      dispatch(renderInitialCards(initialCardsData))
   }, [])
   
   if (!cards.length) return <div>loading...</div>
   
   return (
      <div>
         <Typography className='row-title' variant="h4">{rowTitle}</Typography>
         <CadrsPack dataCards={cards} />
      </div>
   )
}

export default HomeCards
