import React, { useState, useEffect } from 'react';
import Camera from './Camera';
import { getCamsIds } from '../lib/mediaLib';
import { createFaceMatcher } from '../lib/face-api-custom';

// Factory
// initalize Camera objects
export default function CameraFactory({ config, loading }) {
	const [ faceMatcher, setFaceMatcher ] = useState(null);
	const [ camIds, setCamIds ] = useState(null); // camera set

	useEffect(
		() => {
			// (before render) asyncronosly get all cameras (video inputs )
			getCamsIds().then((ids) => setCamIds(ids));
			if (!loading) {
				createFaceMatcher().then((res) => setFaceMatcher(res));
			}
			console.log('updated');
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

	return <div className="camFactory">{cams}</div>;
}
