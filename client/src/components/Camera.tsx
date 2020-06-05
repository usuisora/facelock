import React, { useRef, useEffect, useState, useContext } from 'react';

import { OfficeContext } from '../contexts/OfficeContext';
import * as faceapi from 'face-api.js';
import Info from './Info';
import { isValueState, didNotStartLoading, isReady } from 'util/valueState';
import { IOffice } from 'types/Office.type';

type IProps = {
	camId: string;
	// faceMatcher: faceapi.FaceMatcher;
};

export default function Camera({ camId }: IProps) {
	const [ mediaStream, setMediaStream ] = useState<MediaStream | null>(null);
	const [ faceMatcher, setFaceMatcher ] = useState<faceapi.FaceMatcher | null>(null);
	const videoRef = useRef<HTMLVideoElement>(null);

	const canvasPicWebCam = useRef<HTMLCanvasElement>(null);

	const { office, loadOfficeByTerminalUuid } = useContext(OfficeContext);

	const ratio = {
		width: '400',
		height: '300'
	};
	async function enableStream() {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: {
					deviceId: { exact: camId }
				}
			});
			setMediaStream(stream);
		} catch (err) {
			console.log('rer', err);
		}
	}
	useEffect(
		() => {
			if (!didNotStartLoading(office)) {
				loadOfficeByTerminalUuid!(camId);
			} else if (isReady(office)) {
				setFaceMatcher((office as IOffice).faceMatcher);
			}
		},
		[ office ]
	);
	// setting stream for output before render
	useEffect(
		() => {
			let mounted = true;
			if (!mediaStream) {
				if (mounted) enableStream();
			} else {
				return () => {
					mediaStream.getTracks().forEach((track) => {
						track.stop();
					});
					mounted = false;
				};
			}
			return () => (mounted = false);
		},
		[ mediaStream, enableStream ]
	);

	//  when useEffect ended it will check again
	if (mediaStream && videoRef.current) {
		if (!videoRef.current.srcObject) videoRef.current.srcObject = mediaStream;
	}
	function handlePlay() {
		const canvas = canvasPicWebCam.current;
		const displaySize = { width: videoRef.current!.width, height: videoRef.current!.height };
		faceapi.matchDimensions(canvas as faceapi.IDimensions, displaySize);
		setInterval(async () => {
			if (!canvas) {
				return;
			}
			if (videoRef.current) {
				const detection = await faceapi
					.detectSingleFace(videoRef.current)
					.withFaceLandmarks()
					.withFaceExpressions()
					.withFaceDescriptor();

				if (detection && faceMatcher) {
					const resizedDetection = faceapi.resizeResults(detection, displaySize);
					// @ts-ignore
					canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
					faceapi.draw.drawDetections(canvas, resizedDetection);
					faceapi.draw.drawFaceLandmarks(canvas, resizedDetection);
					faceapi.draw.drawFaceExpressions(canvas, resizedDetection);
					const bestmatch = faceMatcher.findBestMatch(detection.descriptor);
					console.log('bestmatch ', bestmatch.toString());
				}
			}
		}, 200);
	}

	return (
		<div className="camera">
			<video
				id={camId}
				ref={videoRef}
				width={ratio.width}
				height={ratio.height}
				onPlay={handlePlay}
				onCanPlay={() => videoRef.current!.play()}
				autoPlay
				playsInline
				muted
			/>
			<canvas ref={canvasPicWebCam} />
			<Info />
		</div>
	);
}
