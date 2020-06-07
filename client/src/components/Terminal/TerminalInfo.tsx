import React, { useContext } from 'react';
import { TerminalContext } from '../../contexts/TerminalContext';
import { OfficeContext } from '../../contexts/OfficeContext';
import { CamsContext } from '../../contexts/CamsContext';

import { isValueState, isLoading, isReady } from 'util/valueState';
import MessageCentered from 'partials/MessageCentered';
import { ITerminal } from 'types/Terminal.type';
import { BUTTON_CLASS_NAME } from 'constants/styleConsts';

import styles from './Settings.module.scss';

export default function TerminalInfo() {
	const { terminalUuid } = useContext(TerminalContext);
	const { selectedOffice } = useContext(OfficeContext);
	const { selectedCamUuid } = useContext(CamsContext);
	return !terminalUuid || !isReady(terminalUuid) ? (
		<MessageCentered>No selected terminal yet</MessageCentered>
	) : (
		// <div className="card">
		// <div className="card-content">
		<ul className="collection with-header">
			<li className="collection-header grey-text">
				<h4>Terminal info</h4>
			</li>
			<li className="collection-item row ">
				<span className="col s2 orange-text text-darken-4">Terminal uuid:</span> {terminalUuid || 'no'}
			</li>
			<li className="collection-item row">
				<span className="col s2 orange-text text-darken-4">Office:</span> {selectedOffice!.name}
			</li>
			<li className="collection-item row">
				<span className="col s2 orange-text text-darken-4">Office uuid:</span> {selectedOffice!.uuid}
			</li>
			<li className="collection-item row">
				<span className="col s2 orange-text text-darken-4">Floor:</span> {selectedOffice!.floor}
			</li>
			<li className="collection-item row">
				<span className="col s2 orange-text text-darken-4">Camera uuid:</span> {selectedCamUuid}
			</li>
		</ul>
		// </div>
		// </div>
	);
}
