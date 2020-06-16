import { IWorker } from './Worker.type';
import * as faceapi from 'face-api.js';
export interface IOffice {
	uuid: string;
	name: string;
	terminal_uuid: string;
	// faceMatcher: faceapi.FaceMatcher;
	businessCenterUuid: string;
	open: boolean;
	floor: number;
}
