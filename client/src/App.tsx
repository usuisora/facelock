import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Nav from './components/Nav';
import CameraFactory from './components/Terminal/CameraFactory';
import AddEmployeeForm from './components/AddEmployeeForm';
import Logs from './components/Logs/Logs';
import { path } from './constants/routes';
import * as faceapi from 'face-api.js';
import * as R from 'ramda';

import { createFaceMatcher, createLabeledDescriptor } from './util/faceMatcher';

import image from './media/ivan.jpg';
import Terminal from 'components/Terminal/Terminal';

function App() {
	const [ loading, setLoading ] = useState(true);
	// const [ faceMatcher, setFaceMatcher ] = useState() as [
	// 	faceapi.FaceMatcher,
	// 	React.Dispatch<React.SetStateAction<faceapi.FaceMatcher>>
	// ];
	// useEffect(() => {
	// 	Promise.all([
	// 		faceapi.nets.ssdMobilenetv1.loadFromUri('./models'),
	// 		// faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
	// 		faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
	// 		faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
	// 		faceapi.nets.faceExpressionNet.loadFromUri('/models')
	// 	]).then(
	// 		() => {
	// 			setLoading(false);
	// 			//@ts-ignore
	// 			createLabeledDescriptor('ivan', image).then((ld) => R.compose(setFaceMatcher, createFaceMatcher)(ld));
	// 		},
	// 		(err) => {
	// 			console.log('Models are not loaded', err);
	// 		}
	// 	);
	// }, []);
	return (
		<div className="App">
			<Router>
				<Nav />
				<Switch>
					{/* <Route
						path={path.terminal}
						exact
						component={() => <CameraFactory loading={loading} faceMatcher={faceMatcher} />}
					/> */}
					<Route path={path.login}>
						<div>Login</div>
					</Route>
					<Route path={path.terminal}>
						<Terminal />
					</Route>
					<Route path={path.logs} exact>
						<Logs />
					</Route>
					<Route path={path.settings} exact>
						<div>Settings</div>
					</Route>
					<Route path={path.workers} exact>
						<div>workers</div>
					</Route>
					<Route path={path.addWorker} exact>
						<AddEmployeeForm />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
