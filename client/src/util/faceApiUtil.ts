import * as faceapi from 'face-api.js';
const MODEL_URL = '/models';
export const loadModels = async () => {
	// // load the models
	// await faceapi.loadMtcnnModel('/');
	// await faceapi.loadFaceRecognitionModel('/');

	// await faceapi.loadSsdMobilenetv1Model('/');
	// await faceapi.loadFaceLandmarkTinyModel('/');
	// await faceapi.loadFaceRecognitionModel('/');

	// await Promise.all([
	// 	faceapi.nets.ssdMobilenetv1.loadFromUri('./models'),
	// 	// faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
	// 	faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
	// 	faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
	// 	faceapi.nets.faceExpressionNet.loadFromUri('/models')
	// ]);

	//await faceapi.loadModels(MODEL_URL)
	await faceapi.loadFaceDetectionModel(MODEL_URL);
	await faceapi.loadFaceLandmarkModel(MODEL_URL);
	await faceapi.loadFaceRecognitionModel(MODEL_URL);
	await faceapi.loadFaceExpressionModel(MODEL_URL);
};
// export const getFullFaceDescription = async (canvas) => {
//     console.log(canvas);
//     this.fullFaceDescriptions = await faceapi.allFaces(canvas, minConfidence);
//     console.log(this.fullFaceDescriptions);
//   }

//   export const drawDescription = (canvas) => {
//     this.fullFaceDescriptions.forEach((fd, i) => {
//       faceapi.drawLandmarks(canvas, fd.landmarks, { drawLines: false })
//     })
//   }
// export async function getFullFaceDescription(blob, inputSize = 512) {
// 	// tiny_face_detector options
// 	let scoreThreshold = 0.5;
// 	const OPTION = new faceapi.TinyFaceDetectorOptions({
// 		inputSize,
// 		scoreThreshold
// 	});
// 	const useTinyModel = true;

// 	// fetch image to api
// 	let img = await faceapi.fetchImage(blob);

// 	// detect all faces and generate full description from image
// 	// including landmark and descriptor of each face
// 	let fullDesc = await faceapi.detectAllFaces(img, OPTION).withFaceLandmarks(useTinyModel).withFaceDescriptors();
// 	return fullDesc;
// }
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
