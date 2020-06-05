import React, { useState, useEffect } from 'react';
import Camera from './Camera';
import { FaceMatcher } from 'face-api.js';
import { IValueState } from 'util/valueState';

// Factory
// initalize Camera objects
type IProps = {
	loading: boolean;
};

type ICamIds = string[];
export default function CameraFactory({ loading }: IProps) {
	const [ camIds, setCamIds ] = useState<ICamIds>(); // camera set

	const fetchCamIds = async () => {
		const devices = await navigator.mediaDevices.enumerateDevices();
		return await devices.filter((dev) => dev.kind === 'videoinput').map((cam) => cam.deviceId);
	};

	useEffect(
		() => {
			let mounted = true;
			fetchCamIds().then((camIds) => setCamIds(camIds));
			return () => {
				mounted = false;
			};
		},
		[ loading ]
	);
	return (
		<div className="container">
			<h3>Cams on this terminal in office __</h3>
			<div className="camFactory">
				{camIds && camIds.map((deviceId) => <Camera key={deviceId} camId={deviceId} />)}
			</div>
		</div>
	);
}
