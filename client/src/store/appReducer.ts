import { combineReducers } from 'redux';

import { authReducer } from '../sagas/auth';
import { authLogsReducer } from '../sagas/auth';
import { otherLogsReducer } from '../sagas/auth';
import { workersReducer } from '../sagas/auth';
import { selectedWorkerReducer } from '../sagas/auth';
import { officeReducer } from '../sagas/auth';
import { terminalReducer } from '../sagas/auth';
import { settingsReducer } from '../sagas/settings';
import { locationReducer } from '../reducers/location';

// TODO typescript add store keys checking
export const appReducer = combineReducers({
	location: locationReducer,
	auth: authReducer,
	authLogs: authLogsReducer,
	otherLogs: otherLogsReducer,
	workers: workersReducer,
	selectedWorker: selectedWorkerReducer,
	office: officeReducer,
	terminal: terminalReducer
});
