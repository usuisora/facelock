import React, { useState, useEffect, createContext, useContext } from 'react';
import { IValueState, notLoadedState, errorState, loadingState } from 'util/valueState';
import { loadFaceApiModels } from 'util/faceApiUtil';
// import { OfficeContext } from './OfficeContext';
// import { ApiUrl } from 'constants/apiEndpoints';
import * as faceapi from 'face-api.js';

interface IState {
	modelsLoaded: boolean;
	faceMatcher: any | IValueState;
}

interface IActions {}

type IContextProps = IState & IActions;

export const FaceApiContext = createContext<Partial<IContextProps>>({});

export const FaceApiContextProvider = ({ children }) => {
	// const { selectedOffice } = useContext(OfficeContext);
	const [ modelsLoaded, setModelsLoaded ] = useState(false);
	// const [ faceMatcher, setFaceMatcher ] = useState(notLoadedState());

	// const loadFaceMatcher = () => {
	// 	try{
	// 		if(selectedOffice?.uuid){
	// 			setFaceMatcher(loadingState())
	// 			const fm : faceapi.FaceMatcher = getData<faceapi.FaceMatcher>(ApiUrl.faceMatcherByOfficeUuid(selectedOffice.uuid))
	// 		}

	// 	}
	// 	catch(err){
	// 		setFaceMatcher(errorState(null,err));
	// 	}

	// }
	// useEffect(
	// 	() => {

	// 			loadFaceMatcher();
	// 	},
	// 	[ selectedOffice ]
	// );

	useEffect(() => {
		loadFaceApiModels().then(() => {
			setModelsLoaded(true);
		});
	}, []);

	return <FaceApiContext.Provider value={{ modelsLoaded }}>{children}</FaceApiContext.Provider>;
};
