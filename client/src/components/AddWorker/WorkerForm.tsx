import React, { useState, useContext, FormEvent, ChangeEvent } from 'react';
import MyDropzone from './Dropzone';
import { createLabeledDescriptor } from '../../util/faceMatcher';
// @ts-ignore
import placeholder from '../../media/placeholder.png';
import { BUTTON_CLASS_NAME } from 'constants/styleConsts';
import { OfficeContext } from 'contexts/OfficeContext';
interface IForm {
	name: string;
	last_name: string;
	phone: string;
}

interface IState {
	isSubmitted: boolean;
	isImage: boolean;
}

const formInitValues: IForm = {
	name: '',
	last_name: '',
	phone: ''
};

function WorkerForm() {
	const [ isSubmitted, setIsSubmitted ] = useState(false);

	const [ failed, setFailed ] = useState({
		image: false,
		password: false
	});

	const [ preview, setPreview ] = useState<string>(placeholder);

	const [ password, setPassword ] = useState<string>('');

	const [ workersData, setWorkersData ] = useState<IForm>({ ...formInitValues });

	const { selectedOffice } = useContext(OfficeContext);

	const handleChange = (e: ChangeEvent) => {
		//@ts-ignore
		const attr = e.target.placeholder.toLowerCase();
		//@ts-ignore
		setWorkersData({ ...workersData, [attr]: e.target.value });
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		if (password === '123') {
			const labeledDescriptor = createLabeledDescriptor(workersData.name + ' ' + workersData.last_name, preview);
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
		setWorkersData(formInitValues);
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
			<div className="row">
				<form className="col s5  " onSubmit={handleSubmit}>
					{Object.keys(workersData).map((s) => (
						<input key={s} placeholder={toCap(s)} onChange={handleChange} required />
					))}
					{failed.image && <p className="sub red-text">Face not found</p>}
					<MyDropzone setPreview={setPreview} />
					<div className="row">
						<div className="col s9">
							<input
								type="password"
								onChange={({ target }) => setPassword(target.value)}
								placeholder="Admin password"
								required
								value={password}
							/>
							{failed.password && <p className=" red-text">Password incorrect</p>}
						</div>
						<button className={BUTTON_CLASS_NAME}>Add</button>
					</div>
				</form>
				<div className="col s4  ">
					<div className="card">
						<div className="card-title">Preview</div>
						<div className="card-image">
							<img src={preview} />
						</div>
						<div className="card-content">
							<p> {workersData.name}</p>
							<p> {workersData.last_name}</p>
							<p> {workersData.phone}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default WorkerForm;
