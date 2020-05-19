import { all, fork } from 'redux-saga/effects';

import { authSaga } from '../sagas/auth';
import { settingsSaga } from '../sagas/auth';
import { authLogsSaga } from '../sagas/auth';
import { otherLogsSaga } from '../sagas/auth';
import { workersSaga } from '../sagas/auth';
import { selectedWorkerReducerSaga } from '../sagas/auth';
import { officeSaga } from '../sagas/auth';
import { terminalSaga } from '../sagas/auth';

const allSagas = [
	authSaga,
	settingsSaga,
	authLogsSaga,
	otherLogsSaga,
	workersSaga,
	selectedWorkerReducerSaga,
	officeSaga,
	terminalSaga
];

export default function* appSagas() {
	yield all(allSagas.map(fork));
}
