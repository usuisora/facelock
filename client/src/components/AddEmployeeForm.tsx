import React, { useState, useCallback, FormEvent, ChangeEvent } from 'react';
import { useDropzone } from 'react-dropzone';
import { createLabeledDescriptor } from '../util/faceMatcher';
// @ts-ignore
import placeholder from '../media/placeholder.png';

interface IDropzoneProps {
	setPreview: (state: any) => any;
}

function MyDropzone({ setPreview }: IDropzoneProps) {
	const onDrop = useCallback((files) => {
		setPreview(URL.createObjectURL(files[0]));
	}, []);
	const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

	return (
		<div className="dropzone" {...getRootProps()}>
			<input {...getInputProps()} accept=".jpg, .jpeg, .png, .svg" />
			{isDragActive ? <p>Drop the image here ...</p> : <p>Drag 'n' drop some image here, or click to select </p>}
		</div>
	);
}
const stateDef = {
	name: '',
	surname: '',
	id: ''
};

function AddEmployeeForm() {
	const [ isSubmitted, setIsSubmitted ] = useState(false);
	const [ failed, setFailed ] = useState({
		image: false,
		password: false
	});
	const [ preview, setPreview ] = useState(placeholder);
	const [ password, setPassword ] = useState('');
	const [ state, setState ] = useState({ ...stateDef });

	const handleChange = (e: ChangeEvent) => {
		//@ts-ignore
		const attr = e.target.placeholder.toLowerCase();
		//@ts-ignore
		setState({ ...state, [attr]: e.target.value });
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (password === '123') {
			const labeledDescriptor = createLabeledDescriptor(state.name, preview);
			if (!labeledDescriptor) {
				setFailed({ image: true, password: false });
				setPreview(placeholder);
				return;
			}
			setIsSubmitted(true);
			setFailed({ password: false, image: false });
		} else {
			setFailed({ password: true, image: true });
		}
		setPassword('');
	};

	const clearForm = () => {
		setIsSubmitted(false);
		setState(stateDef);
		setPreview(placeholder);
	};
	const toCap = (s: string | any[]) => s[0].toUpperCase() + s.slice(1);

	return isSubmitted ? (
		<div className="add-form container">
			<h4>Submitted</h4>
			<button className="  btn  white  black-text left" onClick={clearForm}>
				Back to form
			</button>
		</div>
	) : (
		<div className="add-form container">
			<h4>Add new employee to the system</h4>
			<div className="wrapper">
				<form onSubmit={handleSubmit}>
					{Object.keys(state).map((s) => (
						<input className="white-text" placeholder={toCap(s)} onChange={handleChange} required />
					))}
					{failed.image && <p className="sub red-text">Face not found</p>}
					<MyDropzone setPreview={setPreview} />
					<div className="row">
						<input
							type="password"
							onChange={({ target }) => setPassword(target.value)}
							className="col s6 white-text"
							placeholder="Admin password"
							required
							value={password}
						/>
						{failed.password && <p className="red-text">Password incorrect</p>}
					</div>

					<button className=" col s1 btn  green lighten-3  black-text left">Add</button>
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
