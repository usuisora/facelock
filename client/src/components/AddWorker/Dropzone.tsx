import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
interface IDropzoneProps {
	setPreview: (state: any) => any;
}

function Dropzone({ setPreview }: IDropzoneProps) {
	const onDrop = useCallback((files) => {
		setPreview(URL.createObjectURL(files[0]));
	}, []);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return (
		<div className="dropzone" {...getRootProps()}>
			<input {...getInputProps()} accept=".jpg, .jpeg, .png, .svg" />
			{isDragActive ? <p>Drop the image here ...</p> : <p>Upload Worker Image</p>}
		</div>
	);
}
export default Dropzone;
