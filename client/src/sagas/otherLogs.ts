import { call, put, takeEvery } from 'redux-saga/effects';

import { ApiUrl } from '../constants/apiEndpoints';

import { LOCAL_STORAGE_TOKEN_KEY } from '../constants/localStorage';
import { path } from '../constants/routes';
import { http } from '../util/apiServiceRequest';
import { createActions, createReducers, createActionTypes } from '../util/reduxBoilerplate';
// @ts-ignore
import { IOtherLog } from '../types/OtherLog.type';
import { replace } from '../store/configureStore';
import { getStore } from '../store/configureStore';
import { ITerminal } from 'types/Terminal.type';
import { isLoading, IsValueState } from 'util/valueState';
const resource = 'OTHER_LOGS';
const actions = [ 'get' ];
type reducerType = IOtherLog[];

export const otherLogsTypes = createActionTypes(resource, actions);
export const otherLogsActions = createActions<reducerType>(resource, actions);
export const otherLogsReducer = createReducers<reducerType>(resource, actions);

function* getOtherLogs() {
	debugger;
	try {
		const { terminal, office } = getStore();
		if (IsValueState(terminal)) return;
		else {
			// @ts-ignore
			const res = yield call(http.get, ApiUrl.otherLogs, { terminalUuid: terminal, officeUuid: office.});
			otherLogsActions.get.commit();
		}
	} catch (err) {
		console.log(err);
	}
}

export function* otherLogsSaga() {
	yield takeEvery(otherLogsTypes.get.run, getOtherLogs);
}
