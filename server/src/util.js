const faceapi = require('face-api.js');

export const createDescriptor = async (imageSrc) => {
	const htmlImg = new Image();
	htmlImg.src = imageBlb;
	return await faceapi.detectSingleFace(htmlImg).withFaceLandmarks().withFaceDescriptor();
};

export const createFaceMatcher = (descriptors) => {
	const faceMatcher = new faceapi.FaceMatcher(descriptors);
	console.log(faceMatcher);
	return faceMatcher;
};
