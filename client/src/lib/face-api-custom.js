import * as faceapi from 'face-api.js';
import ivanImage from '../media/ivan.jpg';

export async function createFaceMatcher() {
	let img = document.createElement('img');
	img.src = ivanImage;
	const results = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors();
	if (!results.length) {
		console.log('not found face');

		// return createFaceMatcher();
	}
	console.log('FaceMatcher created');
	return new faceapi.FaceMatcher(results);
}

// export const faceMatcher = createFaceMatcher();
