import React, { createContext, useContext, useState, useEffect } from 'react';
import { TerminalContext } from './TerminalContext';

import { IWorker } from 'types/Worker.type';
import { IOffice } from 'types/Office.type';
import { IValueState, notLoadedState, isValueState, loadingState, errorState, isReady } from 'util/valueState';

import { getData, postData, updateData } from 'modules/api';
import { ApiUrl } from 'constants/apiEndpoints';
import { IAuthLog } from 'types/AuthLog.type';
import { AuthLogsContext } from './AuthLogsContext';
import { is } from 'ramda';

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
	isFaceMatchFound: (descriptor: Float32Array) => void;
	
}
type IContextProps = IState & IActions;

export const OfficeContext = createContext<Partial<IContextProps>>({});

export const OfficeContextProvider = ({ children }) => {
	const [ selectedOffice, setSelectedOffice ] = useState<IOffice | null>(null);
	const { terminalUuid } = useContext(TerminalContext);
	const { postAuthLog } = useContext(AuthLogsContext);
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

	const isFaceMatchFound = async (descriptor: Float32Array) => {
		try {
			const isOpened = await getData<boolean>( ApiUrl.faceMatch ,{descriptor, office_uuid: selectedOffice?.uuid});
			if(!!isOpened && selectedOffice){
				setSelectedOffice({...selectedOffice, open: true})
				setTimeout(()=>{
					setSelectedOffice({...selectedOffice, open: false})
				},3000)
			}
			postAuthLog!(descriptor, isOpened)
		} catch (err) {
			console.error(err);
		}
	};



	useEffect(() => {
		loadOffices();
	}, []);

	
	return (
		<OfficeContext.Provider value={{ offices, selectedOffice, setSelectedOffice, isFaceMatchFound }}>
			{children}
		</OfficeContext.Provider>
	);
};
