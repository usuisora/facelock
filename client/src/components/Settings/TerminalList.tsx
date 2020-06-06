import React, { useContext } from 'react';
import { TerminalContext } from '../../contexts/TerminalContext';
import { isValueState, isLoading, isReady } from 'util/valueState';
import MessageCentered from 'partials/MessageCentered';
import { ITerminal } from 'types/Terminal.type';

import styles from './Settings.module.scss';

export default function TerminalList() {
	const { terminals, selectedTerminal } = useContext(TerminalContext);

	const isSelectedTerminal = (uuid) => {
		console.log('isSelectedTermianl');
		if (!isReady(selectedTerminal)) {
			return false;
		} else return (selectedTerminal as ITerminal).uuid === uuid;
	};

	return !isReady(terminals) ? (
		<MessageCentered>No terminals Loaded</MessageCentered>
	) : (
		<div className={styles.termilList}>
			<h3>Available terminals</h3>
			<ul>
				{(terminals as ITerminal[]).map((terminal) => {
					return (
						<li className={styles.row}>
							<span>{terminal.uuid}</span>
							<span>{terminal.officeUuid}</span>
							<button disabled={isSelectedTerminal(terminal.uuid)} />
						</li>
					);
				})}
			</ul>
		</div>
	);
}
