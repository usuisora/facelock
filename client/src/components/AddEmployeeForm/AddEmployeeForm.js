import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { createDescriptor } from '../../utils/face-matcher';
import './AddEmployee.module.scss';
import placeholder from '../../media/placeholder.png';

function MyDropzone({ setPreview }) {
	const onDrop = useCallback((files) => {
		setPreview(URL.createObjectURL(files[0]));
	}, []);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return (
		<div className="dropzone" {...getRootProps()}>
			<input {...getInputProps()} accept=".jpg, .jpeg, .png, .svg" required />
			{isDragActive ? <p>Drop the image here ...</p> : <p>Drag 'n' drop some image here, or click to select </p>}
		</div>
	);
}

function AddEmployeeForm() {
	const [ preview, setPreview ] = useState(placeholder);
	const [ password, setPassword ] = useState('');

	let stateDef = {
		name: '',
		surname: '',
		id: ''
	};
	const [ state, setState ] = useState({ ...stateDef });

	const handleChange = (e) => {
		const attr = e.target.placeholder.toLowerCase();
		setState({ ...state, [attr]: e.target.value });
	};

	const handleSubmit = () => {
		if (password === '123') {
			const d = createDescriptor();
		} else {
			console.log('incorrect');
		}
	};
	const toCap = (s) => {
		return s[0].toUpperCase() + s.slice(1);
	};
	return (
		<div className="add-form container">
			<h4>Add new employee to the system</h4>
			<div className="wrapper">
				<form>
					{Object.keys(state).map((s) => (
						<input className="white-text" placeholder={toCap(s)} onChange={handleChange} required />
					))}
					<MyDropzone setPreview={setPreview} />
					<div className="row">
						<input
							type="password"
							onChange={handleChange}
							className="col s6 white-text"
							placeholder="Admin password"
							required
						/>
					</div>

					<button
						variant="contained"
						className=" col s1 btn  green lighten-3  black-text left"
						onClick={handleSubmit}
					>
						Add
					</button>
				</form>
				<div className="preview">
					<h4>Preview</h4>
					<li>Name: {state.name}</li>
					<li>Surname: {state.surname}</li>
					<li>ID: {state.id}</li>

					<img src={preview} />
				</div>
			</div>
		</div>
	);
}

export default AddEmployeeForm;
