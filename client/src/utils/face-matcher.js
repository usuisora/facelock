import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import ivanImage from '../media/ivan.jpg';

async function createDescriptor(imageBlb) {
	let htmlImg = new Image();
	htmlImg.src = imageBlb;
	return await faceapi.detectSingleFace(htmlImg).withFaceLandmarks().withFaceDescriptor();
}

export async function createFaceMatcher(imageBlb) {
	const descriptor = await createDescriptor(imageBlb);
	const faceMatcher = new faceapi.FaceMatcher(descriptor);
	return faceMatcher;
}

function getAllEmployees() {
	const empls = [];
	return empls.map((em) => ({ label: em.nameid, descriptor: em.descriptor }));
}

export function getFaceMatcher({ name, descriptor, image }) {
	return new faceapi.FaceMatcher(getAllEmployees());
}

async function AddEmploee(name, imageBlb) {
	const id = Math.floor(Math.random * 2000);
	const employee = { nameid: name + id, descriptor: await createFaceMatcher(imageBlb) };
}
