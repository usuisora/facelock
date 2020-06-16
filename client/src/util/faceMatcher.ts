import * as faceapi from 'face-api.js';
// import * as R from 'ramda';

export async function createDescriptor(imageBlb: string): Promise<Float32Array | Float32Array[]> {
	let htmlImg = new Image();
	htmlImg.src = imageBlb;
	return await faceapi.computeFaceDescriptor(htmlImg);
}

export function createFaceMatcher(labeledDescriptors: any) {
	const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors);
	return faceMatcher;
}

export async function createLabeledDescriptor(label: string, imageBlob: string) {
	try {
		let htmlImg = new Image();
		htmlImg.src = imageBlob;
		const results = await faceapi.detectSingleFace(htmlImg).withFaceLandmarks().withFaceDescriptor();
		if (!results) {
			return null;
		}
		const descriptorsObama = [ new Float32Array(results.descriptor) ];
		const labeledDescriptors = [ new faceapi.LabeledFaceDescriptors(label, descriptorsObama) ];
		return labeledDescriptors;
	} catch (err) {
		console.error(err + ' createLabeledDescriptor');
	}
}
