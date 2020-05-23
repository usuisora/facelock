import { all, fork } from 'redux-saga/effects';

import { authSaga } from '../sagas/auth';
import { settingsSaga } from '../sagas/settings';
import { authLogsSaga } from '../sagas/authLogs	';
import { otherLogsSaga } from '../sagas/otherLogsSaga';
import { workersSaga } from '../sagas/workersSaga';
import { selectedWorkerSaga } from '../sagas/selectedWorker';
import { officeSaga } from '../sagas/office';
import { terminalSaga } from '../sagas/terminal';

const allSagas = [
	authSaga,
	settingsSaga,
	authLogsSaga,
	otherLogsSaga,
	workersSaga,
	selectedWorkerReducerSaga,
	officeSaga,selectedWorkerSaga
	terminalSaga
];

export default function* appSagas() {
	yield all(allSagas.map(fork));
}
