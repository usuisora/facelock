import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthLogsContext } from './AuthLogsContext';

import { IWorker } from 'types/Worker.type';
import { IOffice } from 'types/Office.type';
import { IValueState, notLoadedState, isValueState, loadingState, errorState, isReady } from 'util/valueState';

import { getData,   updateData } from 'modules/api';
import { ApiUrl } from 'constants/apiEndpoints';

interface IState {
	selectedOffice: IOffice | null;
	offices: IOffice[] | IValueState;
	lastEnteredWorker:IWorker
}

interface IActions {
	loadOfficeByTerminalUuid: (terminalUuid: string) => void;
	updateOffice:(  ) =>void;
	setSelectedOffice: React.Dispatch<React.SetStateAction<IOffice | null>>;
	getWorkerByFaceMatch: (descriptor: Float32Array) =>Promise<IWorker | null>;
	
}

interface IFaceMatch {
	_label: string;
	_distance: number;
}
type IContextProps = IState & IActions;

export const OfficeContext = createContext<Partial<IContextProps>>({});

export const OfficeContextProvider = ({ children }) => {
	const [ selectedOffice, setSelectedOffice ] = useState<IOffice | null>(null);
	const { postAuthLog } = useContext(AuthLogsContext);
	const [ offices, setOffices ] = useState<IOffice[] | IValueState>(notLoadedState());
	const [lastEnteredWorker, setLastEnteredWorker] = useState<IWorker>();

	const loadOffices = async () => {
		try {
			setOffices(loadingState());
			const offices = await getData<IOffice[]>(ApiUrl.offices);
			setOffices(offices);
		} catch (err) {
			setOffices(errorState(null, err));
		}
	};

	const updateOffice  = async () =>{

		try{
			selectedOffice && 
			 await updateData(ApiUrl.offices, {office_uuid: selectedOffice.uuid})
		}
		catch(err){
			console.error(err)
		}
	}

	const openOffice =  () =>{
		selectedOffice && setSelectedOffice({...selectedOffice, open: true})
				setTimeout(()=>{
					selectedOffice && setSelectedOffice({...selectedOffice, open: false})
				},3000)
	}

	const getWorkerByFaceMatch  = async (descriptor: Float32Array) => {
		try {
			const faceMatch = await getData<IFaceMatch>( ApiUrl.faceMatch ,
				{descriptor, office_uuid: selectedOffice?.uuid});
				const open = faceMatch._label !== 'unknown'
			if(	open ){
				openOffice()
				const worker = await getData<IWorker>(ApiUrl.workerByUuid(faceMatch._label))
				setLastEnteredWorker(worker)
				return worker
			}
			else {
				return null
			}

		} catch (err) {
			console.error(err);
			return null
		}
	};



	useEffect(() => {
		loadOffices();
	}, []);
	

	
	return (
		<OfficeContext.Provider value={{ lastEnteredWorker, offices, selectedOffice, setSelectedOffice, getWorkerByFaceMatch , updateOffice}}>
			{children}
		</OfficeContext.Provider>
	);
};
