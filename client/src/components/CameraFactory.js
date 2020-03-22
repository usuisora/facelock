import React, { useState, useEffect } from 'react';
import Camera from './Camera';
import { createFaceMatcher } from '../utils/face-matcher';

// Factory
// initalize Camera objects
export default function CameraFactory({ config, loading }) {
	const [ faceMatcher, setFaceMatcher ] = useState(null);
	const [ camIds, setCamIds ] = useState(null); // camera set

	useEffect(
		() => {
			async function fetchCamIds() {
				const devices = await navigator.mediaDevices.enumerateDevices();
				return await devices.filter((dev) => dev.kind === 'videoinput').map((cam) => cam.deviceId);
			}
			fetchCamIds().then((IDs) => setCamIds(IDs));
			if (loading === false) {
				createFaceMatcher().then((matcher) => setFaceMatcher(matcher));
			}
		},
		[ loading ]
	);

	const cams = camIds ? (
		camIds.map((deviceId) => (
			<Camera key={deviceId} camId={deviceId} ratio={config.ratio} faceMatcher={faceMatcher} />
		))
	) : (
		<h1>....</h1>
	);

	return (
		<div className="container">
			<h1>Cams</h1>
			<div className="camFactory">{cams}</div>
		</div>
	);
}
