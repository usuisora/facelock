import React, { useEffect, useRef, useState } from 'react';
import CameraFactory from './components2/CameraFactory';
import * as faceapi from 'face-api.js';

function App() {
	const [ loading, setLoading ] = useState(true);
	const config = {
		ratio: {
			width: '400',
			height: '300'
		}
	};
	useEffect(() => {
		Promise.all([
			faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
			faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
			faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
			faceapi.nets.faceLandmark68Net.loadFromUri('/models')
			// faceapi.nets.faceExpressionNet.loadFromUri('/models')
		]).then(
			() => {
				setLoading(false);
			},
			(err) => {
				console.log('Models are not loaded', err);
			}
		);
	}, []);
	return (
		<div className="App">
			<h1>Cams</h1>
			<CameraFactory config={config} loading={loading} />
		</div>
	);
}

export default App;
