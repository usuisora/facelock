import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import Info from './Info';

export default function Camera({ camId, ratio }) {
	const [ mediaStream, setMediaStream ] = useState(null);
	const videoRef = useRef();
	const canvasPicWebCam = useRef();

	useEffect(
		() => {
			async function enableStream() {
				try {
					const stream = await navigator.mediaDevices.getUserMedia({
						video: {
							deviceId: { exact: camId }
						}
					});
					setMediaStream(stream);
				} catch (err) {
					// Removed for brevity
				}
			}

			if (!mediaStream) {
				Promise.all([
					// faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
					faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
					faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
					faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
					faceapi.nets.faceExpressionNet.loadFromUri('/models')
				]).then(enableStream(), (err) => console.log('rejected'));
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

	if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
		videoRef.current.srcObject = mediaStream;
	}

	function handleCanPlay() {
		videoRef.current.play();
	}

	function handlePlay() {
		const canvas = canvasPicWebCam.current;
		const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
		faceapi.matchDimensions(canvas, displaySize);
		setInterval(async () => {
			const detections = await faceapi
				.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
				.withFaceLandmarks()
				.withFaceExpressions();
			const resizedDetections = faceapi.resizeResults(detections, displaySize);
			canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
			faceapi.draw.drawDetections(canvas, resizedDetections);
			faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
			faceapi.draw.drawFaceExpressions(canvas, resizedDetections);
			// setApiIsLoaded(true);
		}, 100);
	}

	return (
		<div className="camera">
			<video
				id={camId}
				ref={videoRef}
				width={ratio.width}
				height={ratio.height}
				onPlay={handlePlay}
				onCanPlay={handleCanPlay}
				autoPlay
				playsInline
				muted
			/>
			<canvas ref={canvasPicWebCam} />
			<Info />
		</div>
	);
}
