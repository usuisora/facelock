import React, { useState, useEffect } from 'react';
import Camera from './Camera';

// Factory
// initalize Camera objects
export default function CameraFactory({ faceMatcher, loading }) {
	const [ camIds, setCamIds ] = useState(null); // camera set
	async function fetchCamIds() {
		const devices = await navigator.mediaDevices.enumerateDevices();
		return await devices.filter((dev) => dev.kind === 'videoinput').map((cam) => cam.deviceId);
	}
	useEffect(
		() => {
			let mounted = true;

			fetchCamIds().then((IDs) => setCamIds(IDs));
			// if (loading === false) {
			// 	createFaceMatcher().then((matcher) => setFaceMatcher(matcher));
			// }
			return () => (mounted = false);
		},
		[ loading ]
	);

	return (
		<div className="container">
			<h1>Cams</h1>
			<div className="camFactory">
				{camIds &&
					camIds.map((deviceId) => <Camera key={deviceId} camId={deviceId} faceMatcher={faceMatcher} />)}
			</div>
		</div>
	);
}
