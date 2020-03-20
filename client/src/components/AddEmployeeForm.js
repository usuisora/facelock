import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

function MyDropzone() {
	const onDrop = useCallback((acceptedFiles) => {
		// Do something with the files
	}, []);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return (
		<div className="dropzone" {...getRootProps()}>
			<input {...getInputProps()} />
			{isDragActive ? (
				<p>Drop the files here ...</p>
			) : (
				<p>Drag 'n' drop some files here, or click to select files</p>
			)}
		</div>
	);
}

function AddEmployeeForm() {
	return (
		<div class="mycenter">
			<h2>Add Employee</h2>
			<h6>Fullfill a form with new emploee credentials. Add a photo to proccess to recognintion system</h6>
			<form>
				<input placeholder="Name" />
				<input placeholder="Surmame" />
				<input placeholder="Id" />
				<MyDropzone />
				<button variant="contained" class=" btn white black-text left">
					Add
				</button>
			</form>
		</div>
	);
}

export default AddEmployeeForm;
