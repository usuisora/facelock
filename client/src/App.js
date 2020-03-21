import React, { useEffect, useRef, useState } from 'react';
import CameraFactory from './components/CameraFactory';
import * as faceapi from 'face-api.js';
import AddEmployeeForm from './components/AddEmployeeForm/AddEmployeeForm';
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
			{/* <CameraFactory config={config} loading={loading} /> */}
			<AddEmployeeForm />
		</div>
	);
}

export default App;
