import { IAuth } from '../sagas/auth';
import { ISettings } from './Settings.type';
import { ILocation } from './History.type';
import { IAuthLog } from './authLog.type';
import { IOtherLog } from './otherLog.type';
import { ITerminal } from './Terminal.type';
import { IWorker } from './Worker.type';

export interface IStore {
	location: ILocation;
	auth: IAuth;
	authLogs: IAuthLog[];
	otherLogs: IOtherLog[];
	workers: IWorker[];
	selectedWorker: IWorker;
	office: IOffice;
	terminal: ITerminal;
	settings: ISettings[];
}
