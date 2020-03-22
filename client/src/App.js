import React, { useEffect, useRef, useState } from 'react';
import Nav from './components/Nav';
import CameraFactory from './components/CameraFactory';
import * as faceapi from 'face-api.js';
import AddEmployeeForm from './components/AddEmployeeForm';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
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
			<Router>
				<Nav />
				<Switch>
					<Route path="/add" exact>
						<AddEmployeeForm />
					</Route>
					<Route path="/alert" exact>
						<div>Alerted cams component</div>
					</Route>
					<Route path="/faces" exact>
						<div>Faces</div>
					</Route>
					<Route path="/" exact component={() => <CameraFactory config={config} loading={loading} />} />
				</Switch>
			</Router>
			{/* <CameraFactory config={config} loading={loading} /> */}
		</div>
	);
}

export default App;
