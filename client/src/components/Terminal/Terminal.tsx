import React from 'react';
import CameraFactory from 'components/CameraFactory';
import *as faceapi from 
export default function Terminal() {
    const mtcnnResults = 
    await faceapi.mtcnn(document.getElementById('inputVideo'), mtcnnForwardParams);

	return (
		//@ts-ignore
		<div style="position: relative" className="margin">
			<video id="inputVideo" autoPlay muted />
			<canvas id="overlay" />
		</div>
	);
}
