import React from 'react'
import { OutlinedInput, TextField, InputUnstyled, InputAdornment, Theme, Typography } from '@mui/material'
import { makeStyles, styled } from '@mui/styles'
import SearchIcon from '@mui/icons-material/Search';

import ApiProcessing from '../utils/ApiProcessing';
import { useDispatch, useSelector } from 'react-redux';
import { mainInputHandler, renderSearchProcessing } from '../redux/reducers/homePage/homePageCreators';

const CustomTextField = styled(TextField)({
   '& .MuiOutlinedInput-root': {
      '&.Mui-focused fieldset': {
         borderColor: '#fff',
      },
   },
});

function MainInput() {
   const dispatch = useDispatch()
   const { inputValue, infoMessage } = useSelector(({ homePage: { mainInput } }: any) => ({
      inputValue: mainInput.value,
      infoMessage: mainInput.infoMessage,
   }))
   
   
   let inputRef: any = React.useRef()
   const inputHandler = () => {
      dispatch(mainInputHandler(inputRef.current.value))
   }

   const searchProcessing = () => {

   }
   
   //search listener
   React.useEffect(() => {
      const searchListenerCB = (e: any) => {
         let value = inputRef.current.value
         if (e.key !== 'Enter') return
            
         dispatch(renderSearchProcessing(value))
      }
      document.addEventListener('keypress', searchListenerCB)

      return () => document.removeEventListener('keypress', searchListenerCB)
   }, [])
   
   return (
      <div className='main-input'>
         <div className='input-container'>
            <Typography>{infoMessage}</Typography>
            <CustomTextField
               onChange={inputHandler}
               placeholder="Какой город вы хотите посетить?"
               inputRef={inputRef}
               value={inputValue}
               InputProps={{
                  endAdornment: (
                     <InputAdornment position={'end'}>
                        <SearchIcon />
                     </InputAdornment>),
               }}
               fullWidth />
         </div>
      </div>
   )
}

export default MainInput
