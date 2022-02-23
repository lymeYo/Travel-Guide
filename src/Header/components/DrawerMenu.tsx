import React, { MouseEvent  } from 'react'
import { Typography, List, ListItem, ListItemText, ListItemIcon, Drawer } from '@mui/material'
import LocalHotelIcon from '@mui/icons-material/LocalHotel';
import SettingsIcon from '@mui/icons-material/Settings';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import HomeIcon from '@mui/icons-material/Home';
import { NavLink } from 'react-router-dom';

function MenuList(props: any) {

   return (
      <List>
            <NavLink to="/">
               <ListItem button >
                     <ListItemIcon> <HomeIcon /> </ListItemIcon>
                     <ListItemText>Главная</ListItemText>
               </ListItem>
            </NavLink>

         <ListItem button >
            <ListItemIcon> <AccountBalanceIcon /> </ListItemIcon>
            <ListItemText>Достопримечательности</ListItemText>
         </ListItem>

         <ListItem button >
            <ListItemIcon> <LocalHotelIcon /> </ListItemIcon>
            <ListItemText>Отели</ListItemText>
         </ListItem>

         <ListItem button >
            <ListItemIcon> <SettingsIcon /> </ListItemIcon>
            <ListItemText>Настройки профиля</ListItemText>
         </ListItem>
      </List>
   )
}

function DrawerMenu(props: any) {
      
   return (
      <Drawer
         anchor={'left'}
         open={props.isDrawerOpen}
         onClose={props.toggleDrawer} 
      >
         <MenuList />
      </Drawer>
   )
}

export default DrawerMenu