import * as faceapi from 'face-api.js';

export interface IWorker {
	uuid: string;
	office_uuid: string;
	name: string;
	last_name;
	phone: string;
	imageBlob?: string | null;
	faceDescriptor?: faceapi.LabeledFaceDescriptors[] | null;
}
