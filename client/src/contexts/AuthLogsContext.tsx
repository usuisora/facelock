import React, { useState, createContext, useContext, useEffect } from 'react';
import { IAuthLog } from '../types/AuthLog.type';
import { isValueState, IValueState, notLoadedState, loadingState, errorState, isReady } from 'util/valueState';

import { ApiUrl } from 'constants/apiEndpoints';
import { getData, postData } from '../modules/api';
import { OfficeContext } from './OfficeContext';
import { TerminalContext } from './TerminalContext';
import { CURRENT_TIMESTAMP } from 'util/formatUtil';

interface IState {
	authLogs: IAuthLog[] | IValueState;
}

interface IActions {
	loadAuthLogs: (terminalUuid: string) => void;
	postAuthLog: (descriptor: Float32Array, success: boolean) => void;
}

type IContextProps = IState & IActions;

export const AuthLogsContext = createContext<Partial<IContextProps>>({});

export const AuthLogsProvider = ({ children }) => {
	const { selectedOffice } = useContext(OfficeContext);
	const { terminalUuid } = useContext(TerminalContext);

	const [ authLogs, setAuthLogs ] = useState<IAuthLog[] | IValueState>(notLoadedState());

	const postAuthLog = async (descriptor: Float32Array, success: boolean) => {
		try {
			if (!terminalUuid) {
				throw new Error('no terminal selected');
			}
			const authLog = await postData(ApiUrl.authLogs, { descriptor, terminal_uuid: terminalUuid, success });
			isValueState(authLogs) ? setAuthLogs([ authLog ]) : setAuthLogs([ ...(authLogs as IAuthLog[]), authLog ]);
		} catch (err) {
			setAuthLogs(errorState(null, err));
		}
	};

	const loadAuthLogs = async (officeUuid: string) => {
		if (!officeUuid) {
			return;
		}
		try {
			setAuthLogs(loadingState());
			const authLogs = await getData<IAuthLog[]>(ApiUrl.authLogsByOfficeId(officeUuid));
			setAuthLogs([ ...authLogs ]);
		} catch (err) {
			setAuthLogs(errorState(null, err));
		}
	};

	useEffect(
		() => {
			if (selectedOffice) {
				loadAuthLogs(selectedOffice.uuid);
			}
		},
		[ selectedOffice ]
	);

	return (
		<AuthLogsContext.Provider
			value={{
				authLogs,
				postAuthLog,
				loadAuthLogs
			}}
		>
			{children}
		</AuthLogsContext.Provider>
	);
};
