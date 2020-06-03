import React, { useState, useEffect } from 'react';
import Camera from './Camera';
import { FaceMatcher } from 'face-api.js';

// Factory
// initalize Camera objects
type IProps = {
	faceMatcher: FaceMatcher;
	loading: boolean;
};
type ICamIds = string[];
export default function CameraFactory({ faceMatcher, loading }: IProps) {
	const [ camIds, setCamIds ] = useState<ICamIds>(); // camera set
	async function fetchCamIds() {
		const devices = await navigator.mediaDevices.enumerateDevices();
		return await devices.filter((dev) => dev.kind === 'videoinput').map((cam) => cam.deviceId);
	}

	useEffect(
		() => {
			let mounted = true;
			fetchCamIds().then((IDs) => setCamIds(IDs));
			return () => {
				mounted = false;
			};
		},
		[ loading ]
	);
	return (
		<div className="container">
			<h1>Cams</h1>
			{/* <div className="camFactory">
				{camIds &&
					camIds.map((deviceId) => <Camera key={deviceId} camId={deviceId} faceMatcher={faceMatcher} />)}
			</div> */}
		</div>
	);
}
