import React, { useState, useEffect, createContext } from 'react';
import { IValueState, notLoadedState } from 'util/valueState';
import { loadFaceApiModels } from 'util/faceApiUtil';

interface IState {
	modelsLoaded: boolean;
}

interface IActions {}

type IContextProps = IState & IActions;

export const FaceApiContext = createContext<Partial<IContextProps>>({});

export const FaceApiContextProvider = ({ children }) => {
	const [ modelsLoaded, setModelsLoaded ] = useState(false);

	useEffect(() => {
		loadFaceApiModels().then(() => {
			setModelsLoaded(true);
		});
	}, []);

	return <FaceApiContext.Provider value={{ modelsLoaded }}>{children}</FaceApiContext.Provider>;
};
