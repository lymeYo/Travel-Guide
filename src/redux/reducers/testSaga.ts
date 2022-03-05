import { take, takeEvery } from 'redux-saga/effects'
import { SEARCH_PROCESSING } from './homePage/homePageCreators'

// export function* rootSaga() {}

export function* workerSaga() {
   console.log('saga worker is ready')
}

export function* watcherSaga() {
   yield takeEvery(SEARCH_PROCESSING, workerSaga)
}

export default function* rootSaga() {
   console.log('Saga started!')
   yield watcherSaga()
}