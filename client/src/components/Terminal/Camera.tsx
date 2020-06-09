import React, { useRef, useEffect, useState, useContext } from 'react';
import * as faceapi from 'face-api.js';
import MessageCentered from 'partials/MessageCentered';
import {  getFaceDetection } from 'util/faceApiUtil';

import styles from './Terminal.module.scss';
import { FaceApiContext } from 'contexts/FaceApiContext';
import { displaySize } from 'constants/faceApiConst';
const getStreamByCamUuid = (camUuid: string): Promise<MediaStream> =>
	navigator.mediaDevices.getUserMedia({
		video: {
			deviceId: { exact: camUuid }
		}
	});

interface IOuterProps {
	camUuid: string;
}

type Detection =
	| faceapi.WithFaceDescriptor<
			faceapi.WithFaceLandmarks<
				{
					detection: faceapi.FaceDetection;
				},
				faceapi.FaceLandmarks68
			>
		>
	| null
	| undefined;

const Camera: React.FC<IOuterProps> = ({ camUuid }) => {
	const { modelsLoaded } = useContext(FaceApiContext);
	const [ mediaStream, setMediaStream ] = useState<MediaStream | null>(null);
	const [ detection, setDetection ] = useState<Detection>();
	const [ faceClose, setFaceClose ] = useState<boolean>(false);
	const videoRef = useRef<HTMLVideoElement>(null);
	const canvasPicWebCam = useRef<HTMLCanvasElement>(null);

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

	const handlePlay = async () => {
		faceapi.matchDimensions(canvasPicWebCam.current as faceapi.IDimensions, displaySize);
		setInterval(async () => {
			videoRef.current && setDetection(await getFaceDetection(videoRef.current));
		}, 300);
	};

	const drawDetections = () => {
		const canvas = canvasPicWebCam.current;
		if (detection && canvas) {
		
				setFaceClose(true);
				const resizedDetection = faceapi.resizeResults(detection, displaySize);
				//@ts-ignore
				canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
				faceapi.draw.drawDetections(canvas, resizedDetection);
				faceapi.draw.drawFaceLandmarks(canvas, resizedDetection);
			 
		}
	};

	useEffect(
		() => {
		const canvas = canvasPicWebCam.current;
			if(canvas){
				if ( detection && detection?.detection.box.height > 150) {
					
					drawDetections();
				}
				else {
					setFaceClose(false);
					// @ts-ignore
					canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
				}
			}
		
		},
		[ detection ]
	);

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
		[ mediaStream, modelsLoaded ]
	);

	return (
		<div className="center">
			{!modelsLoaded ? (
				<MessageCentered>loading models...</MessageCentered>
			) : (
				<div className={styles.camera}>
					<video
						id={camUuid}
						ref={videoRef}
						width={displaySize.width}
						height={displaySize.height}
						onPlay={handlePlay}
						onCanPlay={() => videoRef.current!.play()}
						autoPlay
						muted
						className="center"
					/>
					<canvas className="center" ref={canvasPicWebCam} />
					{!faceClose && <h5 className="yellow">Stay closer to terminal</h5>}
				</div>
			)}
		</div>
	);
};

export default Camera;
