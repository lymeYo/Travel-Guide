import { Card, CardMedia, CardContent, Typography, CardActions, Button } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from "react-router-dom"

import { renderCityPage } from '../../redux/reducers/cityPage/cityPageCreators'


function CardStandart(props: any) {
   const dispatch = useDispatch()
   
   const {  } = useSelector((state) => ({

   }))
   
   const buttonHandler = () => {
      dispatch(renderCityPage(props.city))
   }
   
   return (
      <Card sx={{ maxWidth: 345 }}>
         <CardMedia
            component="img"
            height="140"
            image={props.imageSrc}
         />
         <CardContent className='card-bg'>
            <Typography color='secondary' gutterBottom variant="h5" component="div">
               {props.country}
            </Typography>
            <Typography color='secondary' variant="body2">
               {props.city}
            </Typography>
         </CardContent>
         <CardActions className='card-bg'>
            <NavLink to="/city-page">
               <Button onClick={buttonHandler} variant="outlined" color='secondary' size="small">Подробнее</Button>
            </NavLink>
         </CardActions>
      </Card>
   )
}

export default CardStandart