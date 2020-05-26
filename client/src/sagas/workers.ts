import { call, put, takeEvery } from 'redux-saga/effects';

import { ApiUrl } from '../constants/apiEndpoints';

import { LOCAL_STORAGE_TOKEN_KEY } from '../constants/localStorage';
import { path } from '../constants/routes';
import { http } from '../util/apiServiceRequest';
import { createActions, createReducers, createActionTypes } from '../util/reduxBoilerplate';

import { replace } from '../store/configureStore';
import { IWorker } from 'types/Worker.type';

const resource = 'WORKERS';
const actions = [ 'get' ];
type reducerType = IWorker[];

export const workersTypes = createActionTypes(resource, actions);
export const workersActions = createActions<reducerType>(resource, actions);
export const workersReducer = createReducers<reducerType>(resource, actions);

function* getworkers() {}

export function* workersSaga() {
	yield takeEvery(workersTypes.get.run, getworkers);
}
