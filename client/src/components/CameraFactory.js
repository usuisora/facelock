import React, { useState, useEffect } from 'react';
import Camera from './Camera';

async function getCamsIds() {
	const devices = await navigator.mediaDevices.enumerateDevices();
	const camIds = await devices.filter((dev) => dev.kind === 'videoinput').map((cam) => cam.deviceId);
	return camIds;
}

export default function CameraFactory({ config }) {
	const [ camIds, setCamIds ] = useState(null);
	useEffect(() => {
		getCamsIds().then((ids) => setCamIds(ids));
	}, []);
	const cams = camIds ? camIds.map((deviceId) => <Camera camId={deviceId} ratio={config.ratio} />) : <h1>....</h1>;
	return <div class="camFactory">{cams}</div>;
}
