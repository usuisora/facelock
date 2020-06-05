import * as faceapi from 'face-api.js';

export interface IWorker {
	uuid: string;
	officeUuid: string;
	name: string;
	phone: string;
	imageBlob?: string;
	faceDescriptor?: faceapi.LabeledFaceDescriptors[] | null;
}
