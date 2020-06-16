import * as faceapi from 'face-api.js';

export interface IWorker {
	uuid: string;
	officeUuid: string;
	name: string;
	last_name: string;
	phone: string;
	descriptor: string;
}
export interface IWorkerForm {
	name: string;
	lastName: string;
	phone: string;
	password: string;
	imageBlob?: string;
}
