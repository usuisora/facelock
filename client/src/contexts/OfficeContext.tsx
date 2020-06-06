import React, { createContext, useContext, useState, useEffect } from 'react';
import { TerminalContext } from './TerminalContext';

import { IWorker } from 'types/Worker.type';
import { IOffice } from 'types/Office.type';
import { IValueState, notLoadedState, isValueState, loadingState, errorState, isReady } from 'util/valueState';

import { getData, postData } from 'modules/api';
import { ApiUrl } from 'constants/apiEndpoints';

interface IState {
	office: IOffice | IValueState;
	workers: IWorker[];
}

interface IActions {
	loadOfficeByTerminalUuid: (terminalUuid: string) => void;

	loadWorkersByTerminalUuid: (terminalUuid: string) => void;
	addWorkerToOffice:  (worker: IWorker )  => void;
}
type IContextProps = IState & IActions;

export const OfficeContext = createContext<Partial<IContextProps>>({});

export default function OfficeContextProvider({ children }) {

	const { selectedTerminal } = useContext(TerminalContext);

	const [ officeForTerminal, setOfficeForTerminal ] = useState<IOffice | IValueState>(notLoadedState());


	const loadOfficeByUuid = async (Uuid: string) => {
		try {
			setOfficeForTerminal(loadingState());
			const office = await getData<IOffice>(ApiUrl.officeById(Uuid));
			setOfficeForTerminal(office);
		} catch (err) {
			console.log(err);
			setOfficeForTerminal(errorState(null, err));
		}
	};


	useEffect(
		() => {
			if (isReady(selectedTerminal) && selectedTerminal) {
				loadOfficeByUuid(selectedTerminal?.officeUuid)
			}
		},
		[ selectedTerminal ]
	);
	return (
		<OfficeContext.Provider value={{ office: officeForTerminal  }}>
			{children}
		</OfficeContext.Provider>
	);
}
