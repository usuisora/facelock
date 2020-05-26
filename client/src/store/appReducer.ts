import { combineReducers } from 'redux';

import { authReducer } from '../sagas/auth';
import { authLogsReducer } from '../sagas/authLogs';
import { otherLogsReducer } from '../sagas/otherLogs';
import { workersReducer } from '../sagas/workers';
// import { selectedWorkerReducer } from '../sagas/selectedWorker';
import { officeReducer } from '../sagas/office';
import { terminalReducer } from '../sagas/terminal';
import { IWorker } from 'types/Worker.type';
import { IStore } from 'types/Store.type';
// import { settingsReducer } from '../sagas/settings';
// import { locationReducer } from '../reducers/location';

// TODO typescript add store keys checking
export const appReducer = combineReducers({
	// location: locationReducer,
	auth: authReducer,
	authLogs: authLogsReducer,
	otherLogs: otherLogsReducer,
	workers: workersReducer,
	// selectedWorker: selectedWorkerReducer,
	office: officeReducer,
	terminal: terminalReducer
});
