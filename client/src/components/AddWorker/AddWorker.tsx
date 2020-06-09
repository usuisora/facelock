import React, { useState, useCallback, FormEvent, ChangeEvent } from 'react';
import MyDropzone from './Dropzone';
import { createLabeledDescriptor } from '../../util/faceMatcher';
// @ts-ignore
import placeholder from '../media/placeholder.png';

interface IForm {
	name: string;
	surname: string;
	id: string;
}

interface IState {
	isSubmitted: boolean;
	isImage: boolean;
}

const stateDef: IForm = {
	name: '',
	surname: '',
	id: ''
};

function AddWorker() {
	const [ isSubmitted, setIsSubmitted ] = useState(false);

	const [ failed, setFailed ] = useState({
		image: false,
		password: false
	});

	const [ preview, setPreview ] = useState<string>(placeholder);

	const [ password, setPassword ] = useState<string>('');

	const [ state, setState ] = useState<IForm>({ ...stateDef });

	const handleChange = (e: ChangeEvent) => {
		//@ts-ignore
		const attr = e.target.placeholder.toLowerCase();
		//@ts-ignore
		setState({ ...state, [attr]: e.target.value });
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (password === '123') {
			const labeledDescriptor = createLabeledDescriptor(state.name + ' ' + state.surname, preview);
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

export default AddWorker;
