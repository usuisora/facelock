import React, { createContext, useState, useContext } from 'react';
import { IOtherLog } from 'types/otherLog.type';
import { IValueState, notLoadedState, loadingState, errorState, isValueState } from 'util/valueState';
import { ApiUrl } from 'constants/apiEndpoints';
import { getData, postData } from '../modules/api';
import Moment from 'moment';
import { v1 as uuidv1 } from 'uuid';
import { TerminalContext } from './TerminalContext';
import { ITerminal } from 'types/Terminal.type';

interface IState {
	otherLogs: IOtherLog[] | IValueState;
}

interface IActions {
	loadOtherLogs: (termUuid: string) => void;
	addOtherLog: (message: string) => void;
}

type IContextProps = IState & IActions;
export const OtherLogsContext = createContext<Partial<IContextProps>>({});

export function OtherLogsProvider({ children }) {
	const { selectedTerminal } = useContext(TerminalContext);

	const [ otherLogs, setOtherLogs ] = useState<IOtherLog[] | IValueState>(notLoadedState());

	const loadOtherLogs = async (officeUuid) => {
		try {
			setOtherLogs(loadingState());
			const otherLogs = await getData<IOtherLog[]>(ApiUrl.otherLogsByOfficeId(officeUuid));
			setOtherLogs(otherLogs);
		} catch (err) {
			setOtherLogs(errorState(null, err));
			console.error(err);
		}
	};

	const addOtherLog = (message) => {
		const moment = Moment().format();
		const uuid = uuidv1();
		const newOtherLog: IOtherLog = {
			uuid,
			moment,
			message,
			terminalUuid: (selectedTerminal as ITerminal).uuid,
			officeUuid: (selectedTerminal as ITerminal).officeUuid
		};
		isValueState(otherLogs)
			? setOtherLogs([ newOtherLog ])
			: setOtherLogs([ ...(otherLogs as IOtherLog[]), newOtherLog ]);
		postData(ApiUrl.otherLogs, newOtherLog);
	};

	return (
		<OtherLogsContext.Provider value={{ otherLogs, loadOtherLogs, addOtherLog }}>
			{children}
		</OtherLogsContext.Provider>
	);
}

// // export default OtherLogsProvider;
