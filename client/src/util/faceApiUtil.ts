import * as faceapi from 'face-api.js';
const MODEL_URL = '/models';

export async function loadFaceApiModels() {
	//await faceapi.loadModels(MODEL_URL)
	await faceapi.loadFaceDetectionModel(MODEL_URL);
	await faceapi.loadFaceLandmarkModel(MODEL_URL);
	await faceapi.loadFaceRecognitionModel(MODEL_URL);
}

export const loadFaceApiModels2 = async () => {
	// // load the models
	// await Promise.all([ faceapi.loadMtcnnModel(MODEL_URL), faceapi.loadFaceRecognitionModel(MODEL_URL) ]);
	// await Promise.all([
	// 	faceapi.loadM(MODEL_URL),
	// 	faceapi.loadFaceLandmarkTinyModel(MODEL_URL),
	// 	faceapi.loadFaceRecognitionModel(MODEL_URL)
	// ]);
	// await Promise.all([
	// 	faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
	// 	// faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL),
	// 	faceapi.nets.faceRecognitionNet.loadFromUri(MODEL_URL),
	// 	faceapi.nets.faceLandmark68Net.loadFromUri(MODEL_URL),
	// 	faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL)
	// ]);
	// await faceapi.loadModels(MODEL_URL)
	// await Promise.all([
	// 	faceapi.loadFaceDetectionModel(MODEL_URL),
	// 	faceapi.loadFaceLandmarkModel(MODEL_URL),
	// 	faceapi.loadFaceRecognitionModel(MODEL_URL)
	// faceapi.loadFaceExpressionModel(MODEL_URL),
	// faceapi.loadAgeGenderModel(MODEL_URL)
	// ]);
};
const options = new faceapi.TinyFaceDetectorOptions({ inputSize: 320 });

export const getFaceDetection = async (input) =>
	await faceapi.detectSingleFace(input).withFaceLandmarks().withFaceDescriptor();

export const getFaceDescriptor = async (blob) => {
	const img = await faceapi.fetchImage(blob);
	return faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
};

// const maxDescriptorDistance = 0.5;

// const mtcnnForwardParams = {
// 	// number of scaled versions of the input image passed through the CNN
// 	// of the first stage, lower numbers will result in lower inference time,
// 	// but will also be less accurate
// 	maxNumScales: 10,
// 	// scale factor used to calculate the scale steps of the image
// 	// pyramid used in stage 1
// 	scaleFactor: 0.709,
// 	// the score threshold values used to filter the bounding
// 	// boxes of stage 1, 2 and 3
// 	scoreThresholds: [ 0.6, 0.7, 0.7 ],
// 	// mininum face size to expect, the higher the faster processing will be,
// 	// but smaller faces won't be detected
// 	minFaceSize: 200
// };
