import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import ivanImage from '../media/ivan.jpg';
import * as R from 'ramda';
// const labeledDescriptors = [
// 	new faceapi.LabeledFaceDescriptors(
// 	  'obama',
// 	  [descriptorObama1, descriptorObama2]
// 	),
// 	new faceapi.LabeledFaceDescriptors(
// 	  'trump',
// 	  [descriptorTrump]
// 	)
//   ]

//   const faceMatcher = new faceapi.FaceMatcher(labeledDescriptors);
export function createDescriptor(imageBlb) {
	console.log('image descr');
	let htmlImg = new Image();
	htmlImg.src = imageBlb;
	let d = faceapi.detectSingleFace(htmlImg).withFaceLandmarks().withFaceDescriptor();
	console.log(d);
	return d;
}
// string, blob => LabeledFaceDescriptor[]
export async function createLabeledDescriptor(label, imageBlb) {
	// let htmlImg = new Image();
	// htmlImg.src = imageBlb;
	// let d = faceapi.detectSingleFace(htmlImg).withFaceLandmarks().withFaceDescriptor();
	// let rs = new Float32Array(d.descriptor);
	// return faceapi.LabeledFaceDescriptors(label, rs);
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
// const labeledDescriptors = createLabeledDescriptor();
// export const faceMatcher = createFaceMatcher(createLabeledDescriptor('ivan', ivanImage));

// function getAllEmployees() {
// 	const empls = [];
// 	return empls.map((em) => ({ label: em.nameid, descriptor: em.descriptor }));
// }

// async function AddEmployee(name, imageBlb) {
// 	const id = Math.floor(Math.random * 2000);
// 	const employee = { nameid: name + id, descriptor: await createFaceMatcher(imageBlb) };
// }
