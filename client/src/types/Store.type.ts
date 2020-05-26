import { IAuth } from '../sagas/auth';
import { ISettings } from './Settings.type';
import { ILocation } from './History.type';
import { IAuthLog } from './authLog.type';
import { IOtherLog } from './otherLog.type';
import { ITerminal } from './Terminal.type';
import { IWorker } from './Worker.type';
import { IValueState } from 'util/valueState';

export interface IStore {
	location: ILocation | IValueState;
	auth: IAuth | IValueState;
	authLogs: IAuthLog[] | IValueState;
	otherLogs: IOtherLog[] | IValueState;
	workers: IWorker[] | IValueState;
	selectedWorker: IWorker | IValueState;
	office: IOffice | IValueState;
	terminal: ITerminal | IValueState;
	settings: ISettings[] | IValueState;
}
