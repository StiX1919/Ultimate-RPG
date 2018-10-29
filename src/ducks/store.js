import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware'
import thunk from 'redux-thunk'

import CCReducer from './reducers/CCReducer';
import userReducer from './reducers/userReducer'
import heroReducer from './reducers/heroReducer'
import monsterReducer from './reducers/monsterReducer'
import shopReducer from './reducers/shopReducer'
import mapReducer from './reducers/mapReducer'

import { composeWithDevTools } from 'redux-devtools-extension'

export default createStore(
    combineReducers({CCReducer, userReducer, heroReducer, monsterReducer, shopReducer, mapReducer}), composeWithDevTools(applyMiddleware(promiseMiddleware(), thunk)))