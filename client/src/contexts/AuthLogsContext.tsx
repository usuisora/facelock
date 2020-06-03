import React, { useState, createContext } from 'react';
import { IAuthLog } from '../types/AuthLog.type';
import { isValueState, IValueState, notLoadedState, loadingState, errorState } from 'util/valueState';

import { ApiUrl } from 'constants/apiEndpoints';
import { getData } from '../modules/api';

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
	const [ authLogs, setAuthLogs ] = useState<IAuthLog[] | IValueState>(notLoadedState());

	const addAuthLog = (newAuthLog: IAuthLog) => {
		isValueState(authLogs) ? setAuthLogs([ newAuthLog ]) : setAuthLogs([ ...(authLogs as IAuthLog[]), newAuthLog ]);
	};

	const loadAuthLogs = async (terminalUuid) => {
		try {
			setAuthLogs(loadingState());
			const authLogs = await getData<IAuthLog[]>(ApiUrl.authLogs + terminalUuid);
			setAuthLogs([ ...authLogs ]);
		} catch (err) {
			setAuthLogs(errorState(null, err));
		}
	};

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
