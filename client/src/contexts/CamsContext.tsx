import React, { useState, useEffect, createContext } from 'react';
import { IValueState, notLoadedState } from 'util/valueState';

interface IState {
	selectedCamUuid: string | null;
	camUuids: string[] | IValueState;
}

interface IActions {
	setSelectedCamUuid: React.Dispatch<React.SetStateAction<string | null>>;
}

type IContextProps = IState & IActions;

const getCameraDevicesIds = () =>
	navigator.mediaDevices
		.enumerateDevices()
		.then((devices: MediaDeviceInfo[]) =>
			devices.filter((dev) => dev.kind === 'videoinput').map((cam) => cam.deviceId)
		);

const allowUserMedia = async () => {
	await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
	let devices = await navigator.mediaDevices.enumerateDevices();
};

export const CamsContext = createContext<Partial<IContextProps>>({});

export const CamsContextProvider = ({ children }) => {
	const [ selectedCamUuid, setSelectedCamUuid ] = useState<string | null>(null); // camera set
	const [ camUuids, setCamUuids ] = useState<string[] | IValueState>(notLoadedState()); // camera set

	const loadCamUuids = () =>
		getCameraDevicesIds().then((camUuids) => {
			setCamUuids(camUuids);
		});

	useEffect(() => {
		allowUserMedia();
		loadCamUuids();
	}, []);

	return (
		<CamsContext.Provider value={{ camUuids, selectedCamUuid, setSelectedCamUuid }}>
			{children}
		</CamsContext.Provider>
	);
};
