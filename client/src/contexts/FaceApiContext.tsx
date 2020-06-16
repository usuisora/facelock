import React, { useState, useEffect, createContext, useContext } from 'react';
import { IValueState, notLoadedState, errorState, loadingState } from 'util/valueState';
import { loadFaceApiModels } from 'util/faceApiUtil';
import * as faceapi from 'face-api.js';

interface IState {
	modelsLoaded: boolean;
	faceMatcher: any | IValueState;
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
