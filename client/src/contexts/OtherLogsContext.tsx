import React, { createContext, useState, useContext, useEffect } from 'react';
import { IOtherLog } from 'types/otherLog.type';
import { IValueState, notLoadedState, loadingState, errorState, isValueState, isReady } from 'util/valueState';
import { ApiUrl } from 'constants/apiEndpoints';
import { getData, postData } from '../modules/api';
import Moment from 'moment';
import { v1 as uuidv1 } from 'uuid';
import { OfficeContext } from './OfficeContext';

interface IState {
	otherLogs: IOtherLog[] | IValueState;
}

interface IActions {
	loadOtherLogs: (termUuid: string) => void;
	addOtherLog: (message: string, terminalUuid: string) => void;
}

type IContextProps = IState & IActions;
export const OtherLogsContext = createContext<Partial<IContextProps>>({});

export function OtherLogsProvider({ children }) {
	const { selectedOffice } = useContext(OfficeContext);
	const [ otherLogs, setOtherLogs ] = useState<IOtherLog[] | IValueState>(notLoadedState());

	const loadOtherLogs = async (officeUuid) => {
		if (!officeUuid) {
			return;
		}
		try {
			setOtherLogs(loadingState());
			const otherLogs = await getData<IOtherLog[]>(ApiUrl.otherLogsByOfficeId(officeUuid));
			setOtherLogs(otherLogs);
		} catch (err) {
			setOtherLogs(errorState(null, err));
			console.error(err);
		}
	};

	const addOtherLog = (message: string, terminalUuid: string) => {
		const moment = Moment().format();

		const newOtherLog: IOtherLog = {
			moment,
			message,
			terminalUuid
		};

		isValueState(otherLogs)
			? setOtherLogs([ newOtherLog ])
			: setOtherLogs([ ...(otherLogs as IOtherLog[]), newOtherLog ]);
		postData(ApiUrl.otherLogs, newOtherLog);
	};

	useEffect(
		() => {
			if (selectedOffice) {
				loadOtherLogs(selectedOffice.uuid);
			}
		},
		[ selectedOffice ]
	);

	return (
		<OtherLogsContext.Provider value={{ otherLogs, loadOtherLogs, addOtherLog }}>
			{children}
		</OtherLogsContext.Provider>
	);
}
