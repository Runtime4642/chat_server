import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import { createLogger } from 'redux-logger';
import penderMiddleware from 'redux-pender';
import * as modules from './modules';
import ReduxThunk from 'redux-thunk';

const reducers = combineReducers(modules);
const middlewares = [penderMiddleware()];
const logger = createLogger();

//개발 모드일 때만 Redux Devtools를 적용합니다.
const isDev = process.env.NODE_ENV === 'development';
const devtools = isDev && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancers = devtools || compose;

const configure = createStore(
  reducers,
  composeEnhancers(applyMiddleware(ReduxThunk, ...middlewares))
);

export default configure;