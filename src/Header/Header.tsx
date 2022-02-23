import React from 'react'
import { Typography, IconButton, AppBar, Toolbar } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import '../Header/styles.scss'
import DrawerMenu from './components/DrawerMenu'

function Header() {
   const toggleDrawer = (event: React.KeyboardEvent | React.MouseEvent) => {
      if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
         return;
      }

      setIsDrawerOpen(!isDrawerOpen)
   }

   const [isDrawerOpen, setIsDrawerOpen] = React.useState(false)
   
   return (
      <>
         <DrawerMenu toggleDrawer={toggleDrawer} isDrawerOpen={isDrawerOpen} />
         {/* подключаю DrawerMenu в компненте Header, дабы легче было сориантроваться */}
         
         <AppBar position='relative'>
            <Toolbar>
               <IconButton
                  size="large"
                  edge="start"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={toggleDrawer}
               >
                  <MenuIcon />
               </IconButton>

               <Typography color='#fff'>
                  Header travel guide!
               </Typography>
            </Toolbar>
         </AppBar>
      </>
   )
}

export default Header