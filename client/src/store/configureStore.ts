import { createBrowserHistory } from 'history';
import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import { IStore } from '../types/Store.type';
import { getInitialStore } from './initialStore';
import { rootReducer } from './rootReducer';
import rootSaga from './rootSaga';

export const history = createBrowserHistory();

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, getInitialStore(), composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga);

export default store;

export const getStore = () => (store.getState() as unknown) as IStore;

export const navigate = (path: string) => history.push(path);
export const replace = (path: string) => history.replace(path);
export const comeBack = () => history.goBack();
