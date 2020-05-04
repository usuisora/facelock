import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import ivanImage from '../media/ivan.jpg';
import * as R from 'ramda';

export function createDescriptor(imageBlb) {
	console.log('image descr');
	let htmlImg = new Image();
	htmlImg.src = imageBlb;
	let d = faceapi.detectSingleFace(htmlImg).withFaceLandmarks().withFaceDescriptor();
	console.log(d);
	return d;
}
export async function createLabeledDescriptor(label, imageBlb) {
	let htmlImg = new Image();
	htmlImg.src = imageBlb;

	const results = await faceapi.detectAllFaces(htmlImg).withFaceLandmarks().withFaceDescriptors();

	const descriptorsObama = [ new Float32Array(results[0].descriptor) ];

	const labeledDescriptors = [ new faceapi.LabeledFaceDescriptors(label, descriptorsObama) ];
	return labeledDescriptors;
}

export function createFaceMatcher(labeledDescriptors) {
	const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors);
	console.log(faceMatcher);
	return faceMatcher;
}
