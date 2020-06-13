import * as faceapi from 'face-api.js';

export interface IWorker {
	uuid: string;
	officeUuid: string;
	name: string;
	lastName;
	phone: string;
	imageBlob?: string | null;
	faceDescriptor?: faceapi.LabeledFaceDescriptors[] | null;
}
export interface IWorkerForm {
	name: string;
	lastName: string;
	phone: string;
	password: string;
	imageBlob?: string;
}
