import {applyMiddleware, createStore} from 'redux'
import Reducer from './reducer'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'

const initState = {
    count : 0
  }


const store = createStore(Reducer,initState,applyMiddleware(thunk, createSagaMiddleware()));


export default store