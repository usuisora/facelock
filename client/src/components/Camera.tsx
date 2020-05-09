import React, { useRef, useEffect, useState, MutableRefObject, SetStateAction } from 'react';
import * as faceapi from 'face-api.js';
import Info from './Info';

type IProps = {
	camId: string;
	faceMatcher: Promise<any>;
};
type IStream = MediaStream | null;
export default function Camera({ camId, faceMatcher }: IProps) {
	const [ mediaStream, setMediaStream ] = useState<IStream>(null);
	const videoRef = useRef() as MutableRefObject<HTMLVideoElement>;
	const canvasPicWebCam = useRef() as MutableRefObject<HTMLCanvasElement>;

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
			let mounted = true;
			if (!mediaStream) {
				if (mounted) enableStream();
			} else {
				return () => {
					mediaStream.getTracks().forEach((track) => {
						track.stop();
					});
				};
			}
			return () => (mounted = false);
		},
		[ mediaStream ]
	);

	//  when useEffect ended it will check again
	if (mediaStream && videoRef.current) {
		if (!videoRef.current.srcObject) videoRef.current.srcObject = mediaStream;
	}
	function handlePlay() {
		const canvas = canvasPicWebCam.current;
		const displaySize = { width: videoRef.current.width, height: videoRef.current.height };
		faceapi.matchDimensions(canvas, displaySize);
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

				if (detection) {
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
