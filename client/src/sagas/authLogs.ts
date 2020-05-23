import { call, put, takeEvery } from 'redux-saga/effects';

import { ApiUrl } from '../constants/apiEndpoints';

import { LOCAL_STORAGE_TOKEN_KEY } from '../constants/localStorage';
import { path } from '../constants/routes';
import { http } from '../util/apiServiceRequest';
import { createActions, createReducers, createActionTypes } from '../util/reduxBoilerplate';
import { IAuthLog } from '../types/AuthLog.type';

import { replace } from '../store/configureStore';

const resource = 'AUTH_LOGS';
const actions = [ 'get' ];
type reducerType = IAuthLog[];

export const authTypes = createActionTypes(resource, actions);
export const authActions = createActions<reducerType>(resource, actions);
export const authReducer = createReducers<reducerType>(resource, actions);

function* getAuthLogs() {}
export function* authLogsSaga() {
	yield takeEvery(authTypes.get.run, getAuthLogs);
}
