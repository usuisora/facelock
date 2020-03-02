import React, { useState, useEffect } from 'react';
import Camera from './Camera';
import { getCamsIds } from '../lib/mediaLib';
// Factory
// initalize Camera objects
export default function CameraFactory({ config }) {
	const [ camIds, setCamIds ] = useState(null); // camera set

	useEffect(() => {
		// (before render) asyncronosly get all cameras (video inputs )
		getCamsIds().then((ids) => setCamIds(ids));
	}, []);

	const cams = camIds ? (
		camIds.map((deviceId) => <Camera key={deviceId} camId={deviceId} ratio={config.ratio} />)
	) : (
		<h1>....</h1>
	);

	return <div className="camFactory">{cams}</div>;
}
