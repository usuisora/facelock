import React, { useContext, useState } from 'react';
import { WorkerContext } from 'contexts/WorkerContext';
import { isValueState } from 'util/valueState';
import MessageCentered from 'partials/MessageCentered';
import { OfficeContext } from 'contexts/OfficeContext';
import { Link } from 'react-router-dom';
import { path } from 'constants/routes';
import WorkersList from './WorkersList';

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
			<p className="black-text">
				Terminal connected to office - {selectedOffice.name} - {selectedOffice.floor}floor.
			</p>
			<p>Office ID: {selectedOffice.uuid}</p>
			<WorkersList />
		</div>
	);
}
