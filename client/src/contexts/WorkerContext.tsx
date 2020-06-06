import React, { createContext, useContext, useState, useEffect } from 'react';
import { TerminalContext } from './TerminalContext';

import { IWorker } from 'types/Worker.type';
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
	addWorkerToOffice: (worker: IWorker) => void;
}

type IContextProps = IState & IActions;

export const WorkerContext = createContext<Partial<IContextProps>>({});

export default function WorkerContextProvider({ children }) {
	const [ workers, setWorkers ] = useState<IWorker[] | IValueState>(notLoadedState);
	const { office } = useContext(OfficeContext);

	const loadWorkers = async (officeUuid) => {
		try {
			setWorkers(loadingState());
			const nWorkers = await getData<IWorker[]>(ApiUrl.workers, { officeUuid });
			setWorkers([ ...nWorkers ]);
		} catch (err) {
			console.log(err);
			setWorkers(errorState(null, err));
		}
	};

	const addWorkerToOffice = (worker: IWorker) => {
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
			if (isReady(office) && office) {
				loadWorkers(office);
			}
		},
		[ office ]
	);
	return <WorkerContext.Provider value={{ workers, addWorkerToOffice }}>{children}</WorkerContext.Provider>;
}
