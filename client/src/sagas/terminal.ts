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
const resource = 'TERMINAL';
const actions = [ 'get' ];
type reducerType = IOtherLog[];

export const terminalTypes = createActionTypes(resource, actions);
export const terminalActions = createActions<reducerType>(resource, actions);
export const terminalReducer = createReducers<reducerType>(resource, actions);

// function* getTerminal() {
// 	try {
// 		const terminal = getStore().terminal;
// 		if (IsValueState(terminal)) return;
// 		else {
// 			// @ts-ignore
// 			otherLogsActions.get.commit();

// 			const res = yield call(http.get, ApiUrl.terminal);
// 		}
// 	} catch (err) {
// 		console.log(err);
// 	}
// }
function* setTerminal({ payload }) {
	try {
		const { uuid, officeUuid } = payload;
		const { terminal } = getStore();

		if (IsValueState(terminal)) return;
		else {
			// @ts-ignore
			const res = yield http.get('');
			terminalActions.set.commit();
		}
	} catch (err) {
		console.log(err);
	}
}

export function* terminalSaga() {
	// yield takeEvery(terminalTypes.get.run, getTerminal);
	yield takeEvery(terminalTypes.set.run, setTerminal);
}
