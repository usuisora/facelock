import React, { createContext, useState } from 'react';
import { IWorker } from 'types/Worker.type';
import { IOffice } from 'types/Office.type';
import { IValueState, notLoadedState, isValueState, loadingState, errorState } from 'util/valueState';
import { getData, postData } from 'modules/api';
import { ApiUrl } from 'constants/apiEndpoints';

interface IState {
	office: IOffice | IValueState;
	workers: IWorker[];
}

interface IActions {
	loadOfficeByTerminalUuid: (terminalUuid: string) => void;
	loadWorkersByTerminalUuid: (terminalUuid: string) => void;
	addNewWorkerToOffice: (worker: IWorker) => void;
	addWorkerToOffice: (worker: IWorker, workerBlobImage: string) => void;
}
type IContextProps = IState & IActions;

export const OfficeContext = createContext<Partial<IContextProps>>({});

export default function OfficeContextProvider({ children }) {
	const [ officeForTerminal, setOfficeForTerminal ] = useState<IOffice | IValueState>(notLoadedState());
	const [ workers, setWorkers ] = useState<IWorker[] | IValueState>(notLoadedState);

	const loadOfficeByTerminalUuid = async (terminalUuid: string) => {
		try {
			setOfficeForTerminal(loadingState());
			const office = await getData<IOffice>(ApiUrl.officeByTerminalId(terminalUuid));
			setOfficeForTerminal(office);
		} catch (err) {
			console.log(err);
			setOfficeForTerminal(errorState(null, err));
		}
	};

	const loadWorkersByTerminalUuid = async (terminalUuid: string) => {
		try {
			setWorkers(loadingState());
			const nWorkers = await getData<IWorker[]>(ApiUrl.officeByTerminalId(terminalUuid));
			setWorkers([ ...nWorkers ]);
		} catch (err) {
			console.log(err);
			setWorkers(errorState(null, err));
		}
	};

	const addWorkerToOffice = (worker: IWorker, workerBlobImage: string) => {
		try {
			setWorkers(loadingState());
			postData(ApiUrl.workers, { worker, workerBlobImage, officeUuid: worker.officeUuid });
			setWorkers([ ...(workers as IWorker[]), worker ]);
		} catch (err) {
			console.log(err, 'registration failed');
		}
	};
	return (
		<OfficeContext.Provider value={{ office: officeForTerminal, loadOfficeByTerminalUuid }}>
			{children}
		</OfficeContext.Provider>
	);
}
