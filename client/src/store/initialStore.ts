import { LOCAL_STORAGE_TOKEN_KEY } from '../constants/localStorage';
import { notLoadedState } from '../util/valueState';
import { ISettings } from '../types/Settings.type';
import { IStore } from '../types/Store.type';
import { IAuthLog } from 'types/authLog.type';
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
		authLogs: (notLoadedState() as unknown) as IAuthLog[],
		otherLogs: (notLoadedState() as unknown) as IOtherLog[],
		workers: (notLoadedState() as unknown) as IWorker[],
		selectedWorker: (notLoadedState() as unknown) as IWorker,
		office: (notLoadedState() as unknown) as IOffice,
		terminal: (notLoadedState() as unknown) as ITerminal,
		settings: (notLoadedState() as unknown) as ISettings[]
	};
};
