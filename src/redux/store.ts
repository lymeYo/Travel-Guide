import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import homePageReducer from './reducers/homePage/homePageReducer'
import cityPageReducer from './reducers/cityPage/cityPageReducer'

const reducers = combineReducers({
   homePage: homePageReducer,
   cityPage: cityPageReducer,
})

const composeEnhancer = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const store = createStore(reducers, composeEnhancer(applyMiddleware(thunkMiddleware)))

export default store