import { createStore, applyMiddleware, combineReducers } from 'redux';
import promiseMiddleware from 'redux-promise-middleware'

import baseReducer from './ducks/baseReducer';

import { composeWithDevTools } from 'redux-devtools-extension'

export default createStore(
    combineReducers({baseReducer}), composeWithDevTools(applyMiddleware(promiseMiddleware())))