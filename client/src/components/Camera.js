import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import Info from './Info';

export default function Camera({ camId, faceMatcher }) {
	const [ mediaStream, setMediaStream ] = useState(null);
	const videoRef = useRef();
	const canvasPicWebCam = useRef();

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

	// setting stream for output before render
	useEffect(
		() => {
			debugger;
			let mounted = true;
			if (!mediaStream) {
				if (mounted) enableStream();
			} else {
				return function cleanup() {
					mediaStream.getTracks().forEach((track) => {
						track.stop();
						console.log('clean up');
					});
				};
			}
			return () => (mounted = false);
		},
		[ mediaStream ]
	);

	//  when useEffect ended it will check again
	if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
		videoRef.current.srcObject = mediaStream;
	}

	function handlePlay() {
		const canvas = canvasPicWebCam.current;
		const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
		faceapi.matchDimensions(canvas, displaySize);
		setInterval(async () => {
			if (videoRef.current) {
				const detection = await faceapi
					.detectSingleFace(videoRef.current)
					.withFaceLandmarks()
					.withFaceExpressions()
					.withFaceDescriptor();

				if (detection !== undefined) {
					const resizedDetection = faceapi.resizeResults(detection, displaySize);
					canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
					faceapi.draw.drawDetections(canvas, resizedDetection);
					faceapi.draw.drawFaceLandmarks(canvas, resizedDetection);
					faceapi.draw.drawFaceExpressions(canvas, resizedDetection);
					let bestmatch = await faceMatcher.findBestMatch(detection.descriptor);
					console.log('bestmatch ', bestmatch.toString());
				}
			}
		}, 300);
	}

	return (
		<div className="camera">
			<video
				id={camId}
				ref={videoRef}
				width={ratio.width}
				height={ratio.height}
				onPlay={handlePlay}
				onCanPlay={() => videoRef.current.play()}
				autoPlay
				playsInline
				muted
			/>
			<canvas ref={canvasPicWebCam} />
			<Info />
		</div>
	);
}
