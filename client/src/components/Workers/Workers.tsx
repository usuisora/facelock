import React, { useContext, useState } from 'react';
import MessageCentered from 'partials/MessageCentered';
import { OfficeContext } from 'contexts/OfficeContext';
import { Link } from 'react-router-dom';
import { path } from 'constants/routes';
import WorkersList from './WorkersList';
import { BUTTON_CLASS_NAME } from 'constants/styleConsts';

export default function Workers() {
	const { selectedOffice } = useContext(OfficeContext);

	return !selectedOffice ? (
		<div className="center">
			<MessageCentered>No office selected</MessageCentered>
			<Link to={path.settings} className="waves-effect  black  waves-light btn">
				Choose Office
			</Link>
		</div>
	) : (
		<div className="container">
			<ul>
				<li className="black-text">
					Terminal connected to office - {selectedOffice.name} - {selectedOffice.floor}floor.
				</li>
				<li>Office ID: {selectedOffice.uuid}</li>
			</ul>
			<WorkersList />
		</div>
	);
}
