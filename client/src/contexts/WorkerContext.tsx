import React, { createContext, useContext, useState, useEffect } from 'react';
import { TerminalContext } from './TerminalContext';

import { IWorker, IWorkerForm } from 'types/Worker.type';
import { IOffice } from 'types/Office.type';
import { IValueState, notLoadedState, isValueState, loadingState, errorState, isReady } from 'util/valueState';

import { getData, postData, deleteData } from 'modules/api';
import { ApiUrl } from 'constants/apiEndpoints';
import { OfficeContext } from './OfficeContext';

interface IState {
	workers: IWorker[] | IValueState;
}

interface IActions {
	loadWorkersByTerminalUuid: (terminalUuid: string) => Promise<void>;
	postWorker: (worker: IWorker) => void;
	deleteWorker: (worker_uuid: string) => void;
}

type IContextProps = IState & IActions;

export const WorkerContext = createContext<Partial<IContextProps>>({});

export const WorkerContextProvider = ({ children }) => {
	const [ workers, setWorkers ] = useState<IWorker[] | IValueState>(notLoadedState);
	const { selectedOffice } = useContext(OfficeContext);

	const deleteWorker = (worker_uuid) => {
		try {
			deleteData(ApiUrl.workerByUuid(worker_uuid));
			setWorkers({ ...(workers as IWorker[]).filter((w) => w.uuid !== worker_uuid) });
		} catch (err) {
			console.log(err);
		}
	};

	const loadWorkersByOfficeUuid = async (office_uuid: string) => {
		try {
			setWorkers(loadingState());
			const nWorkers = await getData<IWorker[]>(ApiUrl.workers, { office_uuid });
			setWorkers([ ...nWorkers ]);
		} catch (err) {
			console.log(err);
			setWorkers(errorState(null, err));
		}
	};

	const postWorker = (worker: IWorker) => {
		try {
			if (!worker.descriptor) {
				throw new Error('No descriptor provided! ');
			}

			setWorkers(loadingState());
			postData(ApiUrl.workers, { ...worker });
			setWorkers([ ...(workers as IWorker[]), worker ]);
		} catch (err) {
			console.error(err, 'Registration failed');
		}
	};

	useEffect(
		() => {
			if (selectedOffice && !isValueState(selectedOffice)) {
				loadWorkersByOfficeUuid(selectedOffice.uuid);
			}
		},
		[ selectedOffice ]
	);
	return <WorkerContext.Provider value={{ workers, postWorker, deleteWorker }}>{children}</WorkerContext.Provider>;
};
