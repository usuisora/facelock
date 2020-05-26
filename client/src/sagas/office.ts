import { call, put, takeEvery } from 'redux-saga/effects';

import { ApiUrl } from '../constants/apiEndpoints';

import { LOCAL_STORAGE_TOKEN_KEY } from '../constants/localStorage';
import { path } from '../constants/routes';
import { http } from '../util/apiServiceRequest';
import { createActions, createReducers, createActionTypes } from '../util/reduxBoilerplate';

import { replace } from '../store/configureStore';

const resource = 'WORKERS';
const actions = [ 'get' ];
type reducerType = IOffice[];

export const officeTypes = createActionTypes(resource, actions);
export const officeActions = createActions<reducerType>(resource, actions);
export const officeReducer = createReducers<reducerType>(resource, actions);

function* getOffices() {
    try{

            //    const offices yield http.get(ApiUrl.offices)
    }
    catch{

    }
}

export function* officeSaga() {
	yield takeEvery(officeTypes.get.run, getOffices);
}
