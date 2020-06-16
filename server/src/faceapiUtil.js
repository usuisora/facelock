const faceapi = require('face-api.js');

const loadFaceApiModels = async () => {
	await faceapi.loadFaceDetectionModel(MODEL_URL);
	await faceapi.loadFaceLandmarkModel(MODEL_URL);
	await faceapi.loadFaceRecognitionModel(MODEL_URL);
};

const strToFloat32Arr = (str) => {
	const arr = [];
	const obj = JSON.parse(str);
	for (const property in obj) {
		arr.push(obj[property]);
	}
	return new Float32Array(arr);
};

module.exports = {
	loadFaceApiModels,
	strToFloat32Arr
};
