import React, { useContext } from 'react';
import { OfficeContext } from 'contexts/OfficeContext';
import WorkerForm from './WorkerForm';
import MessageCentered from 'partials/MessageCentered';
import { BUTTON_CLASS_NAME } from 'constants/styleConsts';
import { path } from 'constants/routes';
import { Link } from 'react-router-dom';

export default function AddWorker() {
	const { selectedOffice } = useContext(OfficeContext);
	return selectedOffice ? (
		<div>
			<h3>Add new worker</h3>
			<p className="black-text">
				Terminal connected to office - {selectedOffice.name} - {selectedOffice.floor}floor.
			</p>
			<WorkerForm />
		</div>
	) : (
		<div className="center">
			<MessageCentered>No office selected</MessageCentered>
			<Link to={path.settings} className="waves-effect  black  waves-light btn">
				Choose office
			</Link>
		</div>
	);
}
