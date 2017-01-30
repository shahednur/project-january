// @flow
import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import * as Model from './model';
import WsMiddleWare from './middlewares/ws';

//$FlowIssue
export default createStore(
  Model.reduce,
  Model.initialState,
  //$FlowIssue
  applyMiddleware(WsMiddleWare({}), createLogger())
);
