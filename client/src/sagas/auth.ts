import { call, put, takeEvery } from 'redux-saga/effects';

import { ApiUrl } from '../constants/apiEndpoints';

import { LOCAL_STORAGE_TOKEN_KEY } from '../constants/localStorage';
import { path } from '../constants/routes';
import { http } from '../util/apiServiceRequest';
import { createActions, createReducers, createActionTypes } from '../util/reduxBoilerplate';

import { replace } from '../store/configureStore';

const resource = 'AUTH';
const actions = [ 'get', 'delete', 'rememberEmail' ];
type reducerType = IAuth;

export const authTypes = createActionTypes(resource, actions);
export const authActions = createActions<reducerType>(resource, actions);
export const authReducer = createReducers<reducerType>(resource, actions);

export interface IAuth {
	token: string | null;
	email?: string;
}

export interface ILoginPayload {
	username: string;
	password: string;
}

interface ILoginAction {
	payload: ILoginPayload;
}

export const isLoggedIn = (auth: IAuth) => {
	return !!(auth && auth.token);
};

function* getToken({ payload }: ILoginAction) {
	try {
		const { token } = yield call(http.post, ApiUrl.login, payload, { isAuth: false });
		localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
		yield put(authActions.get.commit({ token }));
		yield replace(path.login);
	} catch (err) {
		yield put(authActions.get.fail(err));
	}
}

function* doLogout() {
	if (localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)) {
		try {
			yield call(http.delete, ApiUrl.logout);
		} catch (err) {
			yield put(authActions.delete.fail(err));
		} finally {
			localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
		}
	}
	yield put(authActions.delete.commit(null));
	yield replace(path.login);
}

export interface IResetPasswordPayload {
	email: string;
}

function* rememberEmail({ payload }: { payload: IResetPasswordPayload }) {
	yield put(authActions.rememberEmail.commit({ email: payload.email }));
}

export function* authSaga() {
	yield takeEvery(authTypes.get.run, getToken);
	yield takeEvery(authTypes.delete.run, doLogout);
	yield takeEvery(authTypes.rememberEmail.run, rememberEmail);
}
