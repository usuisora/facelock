import { IRoute } from '../types/Route.type';

export enum path {
	login = '/login',
	terminal = '/',
	settings = '/settings',
	workers = '/workers',
	addWorker = '/addWorker',
	logs = '/logs'
}

const routes: IRoute[] = [
	{
		name: 'Login',
		path: path.login
	},
	{
		name: 'Terminal',
		path: path.terminal
	},
	{
		name: 'Settings',
		path: path.settings
	},
	{
		name: 'Workers',
		path: path.workers
	},
	{
		name: 'Add Worker',
		path: path.addWorker
	},
	{
		name: 'Logs',
		path: path.logs
	}
];
export default routes;
