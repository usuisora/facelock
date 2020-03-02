import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import Info from './Info';

// Camera object
// Represent a display of one of video inputs
export default function Camera({ camId, ratio }) {
	const [ mediaStream, setMediaStream ] = useState(null);
	// ref to HTML elements
	const videoRef = useRef();
	const canvasPicWebCam = useRef();

	async function enableStream() {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({
				video: {
					deviceId: { exact: camId }
				}
			});
			setMediaStream(stream);
		} catch (err) {}
	}
	// setting stream for output before render
	useEffect(
		() => {
			if (!mediaStream) {
				enableStream();
			} else {
				return function cleanup() {
					mediaStream.getTracks().forEach((track) => {
						track.stop();
						console.log('clean up');
					});
				};
			}
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
			const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions());
			// .withFaceLandmarks()
			// .withFaceExpressions();
			const resizedDetections = faceapi.resizeResults(detections, displaySize);
			canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
			faceapi.draw.drawDetections(canvas, resizedDetections);
			// faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
			// faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
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
