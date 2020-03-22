import React, { useState, useEffect } from 'react';
import Camera from './Camera';
import { getCamsIds } from '../utils/nav-media';
import { createFaceMatcher } from '../utils/face-matcher';
import img from '../media/ivan.jpg';
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
				createFaceMatcher(img).then((matcher) => setFaceMatcher(matcher));
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

	return (
		<div className="camFactory">
			<h1>Cams</h1>
			{cams}
		</div>
	);
}
