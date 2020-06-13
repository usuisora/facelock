import React, { createContext, useContext, useState, useEffect } from 'react';
import { TerminalContext } from './TerminalContext';

import { IWorker, IWorkerForm } from 'types/Worker.type';
import { IOffice } from 'types/Office.type';
import { IValueState, notLoadedState, isValueState, loadingState, errorState, isReady } from 'util/valueState';

import { getData, postData } from 'modules/api';
import { ApiUrl } from 'constants/apiEndpoints';
import { OfficeContext } from './OfficeContext';

interface IState {
	workers: IWorker[] | IValueState;
}

interface IActions {
	loadWorkersByTerminalUuid: (terminalUuid: string) => Promise<void>;
	postWorker: (worker: IWorker) => void;
}

type IContextProps = IState & IActions;

export const WorkerContext = createContext<Partial<IContextProps>>({});

export const WorkerContextProvider = ({ children }) => {
	const [ workers, setWorkers ] = useState<IWorker[] | IValueState>(notLoadedState);
	const { selectedOffice } = useContext(OfficeContext);

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
			if (!worker.imageBlob || !worker.imageBlob.length) {
				throw new Error('No image blob provided! ');
			}
			setWorkers(loadingState());
			postData(ApiUrl.workers, { worker });
			setWorkers([ ...(workers as IWorker[]), worker ]);
		} catch (err) {
			console.error(err, 'Registration failed');
		}
	};

	useEffect(
		() => {
			if (selectedOffice && isReady(selectedOffice)) {
				loadWorkersByOfficeUuid(selectedOffice.uuid);
			}
		},
		[ selectedOffice ]
	);
	return <WorkerContext.Provider value={{ workers, postWorker }}>{children}</WorkerContext.Provider>;
};
