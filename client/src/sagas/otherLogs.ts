import { call, put, takeEvery } from 'redux-saga/effects';

import { ApiUrl } from '../constants/apiEndpoints';

import { LOCAL_STORAGE_TOKEN_KEY } from '../constants/localStorage';
import { path } from '../constants/routes';
import { http } from '../util/apiServiceRequest';
import { createActions, createReducers, createActionTypes } from '../util/reduxBoilerplate';
import { IOtherLog } from '../types/OtherLog.type';
import { replace } from '../store/configureStore';

const resource = 'AUTH_LOGS';
const actions = [ 'get' ];
type reducerType = IOtherLog[];

export const authTypes = createActionTypes(resource, actions);
export const authActions = createActions<reducerType>(resource, actions);
export const authReducer = createReducers<reducerType>(resource, actions);

function* getOtherLogs() {}

export function* authLogsSaga() {
	yield takeEvery(authTypes.get.run, getOtherLogs);
}
