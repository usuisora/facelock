import React, { useState, createContext ,useContext,useEffect} from 'react';
import { IAuthLog } from '../types/AuthLog.type';
import { isValueState, IValueState, notLoadedState, loadingState, errorState, isReady } from 'util/valueState';

import { ApiUrl } from 'constants/apiEndpoints';
import { getData } from '../modules/api';
import { TerminalContext } from './TerminalContext';

interface IState {
	authLogs: IAuthLog[] | IValueState;
}

interface IActions {
	loadAuthLogs: (terminalUuid: string) => void;
	addAuthLog: (log: IAuthLog) => void;
}

type IContextProps = IState & IActions;

export const AuthLogsContext = createContext<Partial<IContextProps>>({});

export function AuthLogsProvider({ children }) {
	const {selectedTerminal} = useContext(TerminalContext)

	const [ authLogs, setAuthLogs ] = useState<IAuthLog[] | IValueState>(notLoadedState());

	const addAuthLog = (newAuthLog: IAuthLog) => {
		isValueState(authLogs) ? setAuthLogs([ newAuthLog ]) : setAuthLogs([ ...(authLogs as IAuthLog[]), newAuthLog ]);
	};

	const loadAuthLogs = async (officeUuid) => {
		try {
			setAuthLogs(loadingState());
			const authLogs = await getData<IAuthLog[]>(ApiUrl.authLogsByOfficeId(officeUuid));
			setAuthLogs([ ...authLogs ]);
		} catch (err) {
			setAuthLogs(errorState(null, err));
		}
	};


	useEffect(() => {
		if( isReady(selectedTerminal) ){
			loadAuthLogs(selectedTerminal?.officeUuid)
		}
		
	}, [selectedTerminal])
	
	return (
		<AuthLogsContext.Provider
			value={{
				authLogs,
				addAuthLog,
				loadAuthLogs
			}}
		>
			{children}
		</AuthLogsContext.Provider>
	);
}
