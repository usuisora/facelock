import React, { useState, useEffect, createContext, useContext } from 'react';
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
import { CamsContext } from './CamsContext';
import { OfficeContext } from './OfficeContext';
import { getUuid } from 'util/formatUtil';
interface IState {
	terminalUuid: string | IValueState;
}

interface IActions {}

type IContextProps = IState & IActions;

export const TerminalContext = createContext<Partial<IContextProps>>({});

export function TerminalProvider({ children }) {
	const { selectedOffice } = useContext(OfficeContext);
	const { selectedCamUuid } = useContext(CamsContext);

	const [ terminalUuid, setTerminalUuid ] = useState<string | IValueState>(notLoadedState());

	
	const postTerminal = async (cam_uuid: string, office_uuid: string) => {
		try {
			await postData(ApiUrl.terminals, {
				uuid: getUuid(),
				cam_uuid,
				office_uuid
			} as ITerminal);
			loadTerminalUuid(cam_uuid, office_uuid);
		} catch (err) {
			console.error(err);
		}
	};
	
	const loadTerminalUuid = async (cam_uuid, office_uuid) => {
		try {
			setTerminalUuid(loadingState());
			let terminals = await getData<ITerminal[]>(ApiUrl.terminals, { cam_uuid, office_uuid });
			if (!terminals.length) {
				await postTerminal(cam_uuid, office_uuid);
				terminals = await getData<ITerminal[]>(ApiUrl.terminals, {
					cam_uuid,
					office_uuid
				});
			}
			setTerminalUuid(terminals[0].uuid);
		} catch (err) {
			console.error(err);
			setTerminalUuid(errorState(null, err));
		}
	};

	useEffect(
		() => {
			if (selectedCamUuid && selectedOffice) {
				loadTerminalUuid(selectedCamUuid, selectedOffice!.uuid);
			}
		},
		[ selectedCamUuid, selectedOffice ]
	);

	return (
		<TerminalContext.Provider
			value={{
				terminalUuid
			}}
		>
			{children}
		</TerminalContext.Provider>
	);
}
