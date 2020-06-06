import React, { useState, useEffect, createContext } from 'react';
import { ITerminal } from '../types/Terminal.type';
import {
	isValueState,
	IValueState,
	notLoadedState,
	loadingState,
	errorState,
	isReady,
	didNotStartLoading
} from 'util/valueState';
import { ApiUrl } from 'constants/apiEndpoints';
import { getData, updateData, postData } from '../modules/api';

interface IState {
	selectedTerminal: ITerminal | null;
	terminals: ITerminal[] | IValueState;
}

interface IActions {
	registrateTerminal: (terminalUuid: string, officeUuid: string) => void;
	loadTerminals: (camUuids: string[]) => void;
}

type IContextProps = IState & IActions;

export const TerminalContext = createContext<Partial<IContextProps>>({});

export function TerminalProvider({ children }) {
	const [ camUuids, setCamUuids ] = useState<string[] | IValueState>(notLoadedState()); // camera set
	const [ terminals, setTerminals ] = useState<ITerminal[] | IValueState>();
	const [ selectedTerminal, setSelectedTerminal ] = useState<ITerminal | null>();

	const getCameraDevicesIds = () =>
		navigator.mediaDevices.enumerateDevices().then((devices: MediaDeviceInfo[]) => {
			return devices.filter((dev) => dev.kind === 'videoinput').map((cam) => cam.deviceId);
		});

	const loadTerminals = async (Uuids: string[]) => {
		try {
			setTerminals(loadingState());
			const terminals = await getData<ITerminal[]>(ApiUrl.terminals, { camUuids });
			setTerminals(terminals);
		} catch (err) {
			console.log(err);
			setTerminals(errorState(null, err));
		}
	};

	const updateCamUuids = () =>
		getCameraDevicesIds().then((camUuids) => {
			setCamUuids(camUuids);
		});

	const registrateTerminal = (terminalUuid: string, officeUuid: string) => {
		const newTerminal: ITerminal = { uuid: terminalUuid, officeUuid: officeUuid };
		postData(ApiUrl.terminals, newTerminal);
		setTerminals([ ...(terminals as ITerminal[]), newTerminal ]);
	};

	const updateOfficeUuidOfSelectedTerminal = (officeUuid) => {
		try{
			if(isReady(selectedTerminal))
			updateData(ApiUrl.terminalById(selectedTerminal?.uuid), { officeUuid });
			setSelectedTerminal({...selectedTerminal, officeUuid} as ITerminal)
		}
		catch(err){
			console.error(err)
		}
	};

	useEffect(() => {
		updateCamUuids();
	}, []);

	useEffect(
		() => {
			if (isReady(camUuids)) {
				loadTerminals(camUuids as string[]);
			}
		},
		[ camUuids ]
	);

	return (
		<TerminalContext.Provider
			value={{
				selectedTerminal,
				terminals,
				registrateTerminal
			}}
		>
			{children}
		</TerminalContext.Provider>
	);
}
