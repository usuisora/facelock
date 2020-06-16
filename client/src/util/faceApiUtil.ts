import * as faceapi from 'face-api.js';
const MODEL_URL = '/models';

export async function loadFaceApiModels() {
	await faceapi.loadFaceDetectionModel(MODEL_URL);
	// await faceapi.loadMtcnnModel(MODEL_URL);
	await faceapi.loadFaceLandmarkModel(MODEL_URL);
	await faceapi.loadFaceRecognitionModel(MODEL_URL);
}

// export const getDescriptor = async (imageBlob) =>
//   const detection =  await faceapi.detectSingleFace(imageBlob).withFaceLandmarks().withFaceDescriptor().descriptor;

export const getFaceDetectionFromBlob = async (blob) => {
	const img = await faceapi.fetchImage(blob);
	return faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
};

export const getFaceDetectionFromStream = async (input) =>
	await faceapi.detectSingleFace(input).withFaceLandmarks().withFaceDescriptor();
