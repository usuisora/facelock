import React, { useState, useEffect } from 'react';
import Camera from './Camera';
import { FaceMatcher } from 'face-api.js';
import { IValueState } from 'util/valueState';
import MessageCentered from 'partials/MessageCentered';

// Factory
// initalize Camera objects
type IProps = {
	loading: boolean;
};

export default function CameraFactory({ loading }: IProps) {
	const [ camUuids, setCamUuids ] = useState<string[]>([]); // camera set
	useEffect(
		() => {
			let mounted = true;
			navigator.mediaDevices.enumerateDevices().then((devices: MediaDeviceInfo[]) => {
				const camIds = devices.filter((dev) => dev.kind === 'videoinput').map((cam) => cam.deviceId);
				setCamUuids(camIds);
			});
			return () => {
				mounted = false;
			};
		},
		[ loading ]
	);

	// useEffect(() => {
	// 	if(camUuids.length){
	// 		// getfirstKnownTerminaByUuid(camUuids)
	// 	}
	// 	return () => {
	// 		cleanup
	// 	}
	// }, [input])

	return (
		<div className="container">
			<h3>Cams on this terminal in office __</h3>

			{/* <div className="camFactory">
				{camUuids.length ? (
					camUuids.map((camUuid) => <Camera   />)
				) : (
					<MessageCentered>No cams</MessageCentered>
				)}
			</div> */}
		</div>
	);
}
