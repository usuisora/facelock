import React, { useState, useContext, FormEvent, ChangeEvent } from 'react';
import MyDropzone from './Dropzone';
import { createLabeledDescriptor } from '../../util/faceMatcher';
// @ts-ignore
import placeholder from '../../media/placeholder.png';
import { BUTTON_CLASS_NAME } from 'constants/styleConsts';
import { OfficeContext } from 'contexts/OfficeContext';
import sha256 from 'sha256';
import { WorkerContext } from 'contexts/WorkerContext';
import { IWorkerForm, IWorker } from 'types/Worker.type';
import { getUuid } from 'util/formatUtil';

const formInitValues: IWorkerForm = {
	name: '',
	lastName: '',
	phone: '',
	password: ''
};

function WorkerForm() {
	const { selectedOffice } = useContext(OfficeContext);

	const { postWorker } = useContext(WorkerContext);

	const [ imageBlob, setImageBlob ] = useState<string>(placeholder);

	const [ failed, setFailed ] = useState(false);
	const [ workersData, setWorkersData ] = useState<IWorkerForm>({ ...formInitValues });

	const clearForm = () => {
		setWorkersData(formInitValues);
		setFailed(false);
	};

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		const attr = e.target.name;
		if (attr === 'password') {
			debugger;
			setWorkersData({ ...workersData, [attr]: sha256(e.target.value) });
			return;
		}
		setWorkersData({ ...workersData, [attr]: e.target.value });
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();
		debugger;
		if (!imageBlob || imageBlob === placeholder) {
			window.alert('Upload the worker image');
		} else if (workersData.password === sha256('1111')) {
			const { name, lastName, phone } = workersData;
			postWorker!({
				uuid: getUuid(),
				name,
				lastName,
				phone,
				imageBlob,
				officeUuid: selectedOffice!.uuid
			} as IWorker);
			clearForm();
			window.alert('Added!');
		} else {
			setFailed(true);
		}
	};

	const toCap = (s: string | any[]) => s[0].toUpperCase() + s.slice(1);

	return (
		<div className="add-form container">
			<div className="row">
				<form className="form col s5  " onSubmit={handleSubmit}>
					{Object.keys(workersData).map((attr) => {
						return (
							<input key={attr} name={attr} placeholder={toCap(attr)} onChange={handleChange} required />
						);
					})}
					<MyDropzone setPreview={setImageBlob} />;
					<button className={BUTTON_CLASS_NAME}>Add</button>
					{failed && <p className=" red-text">Password wrong!</p>}
				</form>

				<div className="preview col s4  ">
					<div className="card">
						<div className="card-image">
							<img src={imageBlob} />
						</div>
						<div className="card-content">
							<div className="card-title">Preview</div>
							<p> {workersData.name}</p>
							<p> {workersData.lastName}</p>
							<p> {workersData.phone}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default WorkerForm;
