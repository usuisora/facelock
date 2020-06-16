import React, { useRef, useEffect, useState, useContext } from 'react';
import * as faceapi from 'face-api.js';
import MessageCentered from 'partials/MessageCentered';
import {  getFaceDetectionFromStream } from 'util/faceApiUtil';

import { FaceApiContext } from 'contexts/FaceApiContext';
import { displaySize } from 'constants/faceApiConst';
import { useLocation } from 'react-router-dom';
import { BUTTON_CLASS_NAME, BUTTON_PERIFERAL } from 'constants/styleConsts';
import { OfficeContext } from 'contexts/OfficeContext';

import styles from './Terminal.module.scss';
import { AuthLogsContext } from 'contexts/AuthLogsContext';
import { IWorker } from 'types/Worker.type';

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

	const { getWorkerByFaceMatch } = useContext(OfficeContext);
	const { postAuthLog } = useContext(AuthLogsContext);

	const location = useLocation()

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

	const handlePlay = () => {
		faceapi.matchDimensions(canvasPicWebCam.current as faceapi.IDimensions, displaySize);
		setInterval(async () => {
			videoRef.current && setDetection(await getFaceDetectionFromStream(videoRef.current));
		}, 100);
	};

	const drawDetections = () => {
		const canvas = canvasPicWebCam.current;
		if (detection && canvas) {
				setFaceClose(true);
				const resizedDetection = faceapi.resizeResults(detection, displaySize);
				//@ts-ignore
				canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
				// faceapi.draw.drawDetections(canvas, resizedDetection);
				faceapi.draw.drawFaceLandmarks(canvas, resizedDetection);
			 
		}
	};

	useEffect(
		() => {
		const canvas = canvasPicWebCam.current;
			if(canvas ){
				if ( detection && detection?.detection.box.height > 190) {
					drawDetections();
				}
				else {
					setFaceClose(false);
					// @ts-ignore
					canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
				}
			}
		},
		[ detection , drawDetections]
	);
		const showResults = ( worker : IWorker | null ) => 
		worker ? window.alert('Wellcome '+worker.name+' '+worker.last_name) : window.alert('You are unknown! Closed')
	
		const handleApprove  = async () => {
		if(detection?.descriptor) 
		{ const worker = await  getWorkerByFaceMatch!(detection?.descriptor)
			 postAuthLog!(detection?.descriptor, !!worker)
			 showResults(worker)
		} 
		 else 
		 {window.alert("No face detected!")};
	}

	useEffect(
		() => {
			if ( modelsLoaded && videoRef.current && !mediaStream ) {
				enableStream();
			} else if (modelsLoaded && mediaStream && videoRef.current ) {
				videoRef.current.srcObject = mediaStream;
			} 
		},
		[ mediaStream, modelsLoaded ]
	);

	useEffect(() => {
		if(mediaStream && location.pathname !== '/'){
			mediaStream.getTracks().forEach((track) => {
				track.stop();
			});
		}
		
	}, [location])


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
					<button className={BUTTON_CLASS_NAME} onClick={handleApprove}>Approve</button>
					{!faceClose && <h5 className={styles.message}>Stay closer to terminal</h5>}
				</div>
			)}
		</div>
	);
};

export default Camera;
