import { LOCAL_STORAGE_TOKEN_KEY } from '../constants/localStorage';
import { notLoadedState, IValueState } from '../util/valueState';
import { ISettings } from '../types/Settings.type';
import { IStore } from '../types/Store.type';
import { IAuthLog } from 'types/authLog.type';
// @ts-ignore
import { IOtherLog } from 'types/otherLog.type';
import { IWorker } from 'types/Worker.type';
import { ITerminal } from 'types/Terminal.type';

export const getInitialStore = (): Partial<IStore> => {
	const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
	const location = window.location;

	return {
		location: {
			pathname: location.pathname,
			search: location.search,
			hash: location.hash,
			state: {
				initial: true
			}
		},
		auth: { token },
		authLogs: notLoadedState(),
		otherLogs: notLoadedState(),
		workers: notLoadedState(),
		selectedWorker: notLoadedState(),
		office: notLoadedState(),
		terminal: notLoadedState(),
		settings: notLoadedState()
	};
};
