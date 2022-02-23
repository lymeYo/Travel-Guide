import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './styles/styles-default.scss'
import { Provider } from 'react-redux'
import store from './redux/store'

import Header from './Header/Header'
import HomePage from './pages/Home/HomePage'
import CityPage from './pages/City/CityPage'

function App() {
    //TODO сделать роутер на cityPage
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <Header />
          
          <div>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/city-page" element={<CityPage />} />
              <Route path="/settings" element={<HomePage />} />
            </Routes>
          </div>
        </div>
      </Provider>
    </BrowserRouter>
  )  
} 
               
export default App;