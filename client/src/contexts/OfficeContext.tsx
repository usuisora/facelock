import React, { createContext, useContext, useState, useEffect } from 'react';
import { TerminalContext } from './TerminalContext';

import { IWorker } from 'types/Worker.type';
import { IOffice } from 'types/Office.type';
import { IValueState, notLoadedState, isValueState, loadingState, errorState, isReady } from 'util/valueState';

import { getData, postData } from 'modules/api';
import { ApiUrl } from 'constants/apiEndpoints';

interface IState {
	selectedOffice: IOffice | null;
	offices: IOffice[] | IValueState;
	workers: IWorker[];
}

interface IActions {
	loadOfficeByTerminalUuid: (terminalUuid: string) => void;

	loadWorkersByTerminalUuid: (terminalUuid: string) => void;
	addWorkerToOffice: (worker: IWorker) => void;
	setSelectedOffice: React.Dispatch<React.SetStateAction<IOffice | null>>;
}
type IContextProps = IState & IActions;

export const OfficeContext = createContext<Partial<IContextProps>>({});

export const OfficeContextProvider = ({ children }) => {
	const [ selectedOffice, setSelectedOffice ] = useState<IOffice | null>(null);

	const [ offices, setOffices ] = useState<IOffice[] | IValueState>(notLoadedState());

	const loadOffices = async () => {
		try {
			setOffices(loadingState());
			const offices = await getData<IOffice[]>(ApiUrl.offices);
			setOffices(offices);
		} catch (err) {
			console.log(err);
			setOffices(errorState(null, err));
		}
	};

	useEffect(() => {
		loadOffices();
	}, []);

	// useEffect(
	// 	() => {
	// 	},
	// 	[ selectedOffice ]
	// );
	return (
		<OfficeContext.Provider value={{ offices, selectedOffice, setSelectedOffice }}>
			{children}
		</OfficeContext.Provider>
	);
};
