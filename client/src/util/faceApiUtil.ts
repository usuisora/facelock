import * as faceapi from 'face-api.js';
const MODEL_URL = '/models';

export async function loadFaceApiModels() {
	await faceapi.loadFaceDetectionModel(MODEL_URL);
	await faceapi.loadFaceLandmarkModel(MODEL_URL);
	await faceapi.loadFaceRecognitionModel(MODEL_URL);
}

export const getFaceDetection = async (input) =>
	await faceapi.detectSingleFace(input).withFaceLandmarks().withFaceDescriptor();

export const getFaceDescriptor = async (blob) => {
	const img = await faceapi.fetchImage(blob);
	return faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
};
