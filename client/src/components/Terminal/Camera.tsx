import React, { useRef, useEffect, useState, useContext } from 'react';

import { OfficeContext } from '../../contexts/OfficeContext';
import { TerminalContext } from '../../contexts/TerminalContext';

import * as faceapi from 'face-api.js';
import Info from '../Info';
import { isValueState, didNotStartLoading, isReady } from 'util/valueState';
import { IOffice } from 'types/Office.type';
import { ITerminal } from 'types/Terminal.type';
import MessageCentered from 'partials/MessageCentered';

const getStreamByCamUuid = (camUuid: string): Promise<MediaStream> =>
	navigator.mediaDevices.getUserMedia({
		video: {
			deviceId: { exact: camUuid }
		}
	});

interface IOuterProps {
	camUuid: string;
}

const Camera: React.FC<IOuterProps> = ({ camUuid }) => {
	const [ mediaStream, setMediaStream ] = useState<MediaStream | null>(null);

	const videoRef = useRef<HTMLVideoElement>(null);

	const canvasPicWebCam = useRef<HTMLCanvasElement>(null);

	const ratio = {
		width: '400',
		height: '300'
	};

	const enableStream = async () => {
		try {
			if (camUuid) {
				const stream: MediaStream = await getStreamByCamUuid(camUuid);
				setMediaStream(stream);
			}
		} catch (err) {
			console.error(err);
		}
	};

	const handlePlay = () => {
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

				if (detection) {
					const resizedDetection = faceapi.resizeResults(detection, displaySize);
					// @ts-ignore
					canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
					faceapi.draw.drawDetections(canvas, resizedDetection);
					faceapi.draw.drawFaceLandmarks(canvas, resizedDetection);
					faceapi.draw.drawFaceExpressions(canvas, resizedDetection);
				}
			}
		}, 200);
	};

	useEffect(
		() => {
			let mounted = true;
			if (!mediaStream && mounted) {
				enableStream();
			} else if (mediaStream && videoRef.current && mounted) {
				videoRef.current.srcObject = mediaStream;
			} else if (mediaStream && mounted) {
				return () => {
					mediaStream.getTracks().forEach((track) => {
						track.stop();
					});
					mounted = false;
				};
			}
			return () => (mounted = false);
		},
		[ mediaStream ]
	);

	return (
		<div className="camera">
			<video
				id={camUuid}
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
		</div>
	);
};

export default Camera;
