import React, { useRef, useEffect, useState } from 'react';
import * as faceapi from 'face-api.js';
import Info from './Info';

export default function Camera({ camId, ratio, faceMatcher }) {
	const [ mediaStream, setMediaStream ] = useState(null);
	const videoRef = useRef();
	const canvasPicWebCam = useRef();

	// setting stream for output before render
	useEffect(() => {
		async function enableStream() {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({
					video: {
						deviceId: { exact: camId }
					}
				});
				setMediaStream(stream);
			} catch (err) {
				console.log('rer');
			}
		}
		if (!mediaStream) {
			enableStream();
		}
	}, []);

	//  when useEffect ended it will check again
	if (mediaStream && videoRef.current && !videoRef.current.srcObject) {
		videoRef.current.srcObject = mediaStream;
	}

	function handlePlay() {
		const canvas = canvasPicWebCam.current;
		const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
		faceapi.matchDimensions(canvas, displaySize);
		setInterval(async () => {
			const detection = await faceapi
				.detectSingleFace(videoRef.current, new faceapi.TinyFaceDetectorOptions())
				.withFaceLandmarks()
				.withFaceDescriptor();
			if (detection) {
				const resizedDetection = faceapi.resizeResults(detection, displaySize);
				canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
				faceapi.draw.drawDetections(canvas, resizedDetection);
				// faceapi.draw.drawFaceLandmarks(canvas, resizedDetection);
				// faceapi.draw.drawFaceExpressions(canvas, resizeddetection);
				let bestmatch = await faceMatcher.findBestMatch(detection.descriptor);
				console.log('bestmatch ', bestmatch.toString());
			}
		}, 300);
	}

	return faceMatcher ? (
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
	) : (
		<div>Facematcher loading</div>
	);
}
