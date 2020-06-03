import * as faceapi from 'face-api.js';
// import * as R from 'ramda';

export async function createDescriptor(imageBlb: string) {
	let htmlImg = new Image();
	htmlImg.src = imageBlb;
	return await faceapi.computeFaceDescriptor(htmlImg);
}

export function createFaceMatcher(labeledDescriptors: any) {
	const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors);
	console.log(faceMatcher);
	return faceMatcher;
}

export async function createLabeledDescriptor(label: string, imageBlb: string) {
	let htmlImg = new Image();
	htmlImg.src = imageBlb;
	// let result = (await faceapi.computeFaceDescriptor(htmlImg)) as Float32Array;
	const results = await faceapi.detectAllFaces(htmlImg).withFaceLandmarks().withFaceDescriptors();

	// (results)
	const descriptorsObama = [ new Float32Array(results[0].descriptor) ];
	const labeledDescriptors = [ new faceapi.LabeledFaceDescriptors(label, descriptorsObama) ];
	return labeledDescriptors;
}
