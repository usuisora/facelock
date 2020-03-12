import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import ivanImage from '../media/ivan.jpg';

function useImageNode(image) {
	// ref to HTML elements
	const imgRef = useRef();
	// Import result is the URL of your image
	var htmlNode = <img src={image} ref={imgRef} alt="Logo" />;
	return imgRef;
}

export async function createFaceMatcher() {
	var htmlImg = new Image();
	htmlImg.src = ivanImage;
	// export const faceMatcher = createFaceMatcher();
	const sourceImageResult = await faceapi.detectSingleFace(htmlImg).withFaceLandmarks().withFaceDescriptor();

	let faceMatcher = new faceapi.FaceMatcher(sourceImageResult);
	return faceMatcher;
}
