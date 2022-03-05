import { combineReducers, createStore, compose, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from '@redux-saga/core'

import homePageReducer from './reducers/homePage/homePageReducer'
import cityPageReducer from './reducers/cityPage/cityPageReducer'
import rootSaga from './reducers/testSaga'

const sagaMiddleware = createSagaMiddleware()

const reducers = combineReducers({
   homePage: homePageReducer,
   cityPage: cityPageReducer,
})

const composeEnhancer = (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose

const store = createStore(reducers, composeEnhancer(applyMiddleware(thunkMiddleware, sagaMiddleware)))

sagaMiddleware.run(rootSaga)

export default store