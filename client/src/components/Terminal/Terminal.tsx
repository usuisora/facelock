import React, { useContext, useEffect } from 'react';
import CameraFactory from 'components/Terminal/CameraFactory';
import { loadModels } from 'util/faceApiUtil';
import { TerminalContext } from '../../contexts/TerminalContext';
import Camera from './Camera';
import TerminalInfo from './TerminalInfo';

import styles from '/Terminal.module.scss';
import MessageCentered from 'partials/MessageCentered';

const WIDTH = 420;
const HEIGHT = 420;
const inputSize = 160;

export default function Terminal() {
	const { selectedTerminal } = useContext(TerminalContext);

	// useEffect(
	// 	() => {
	// 		// if (didNotStartLoading(selectedTerminal)) {
	// 		// 	loadTerminal();
	// 		// 	return;
	// 		// } else
	// 		if (isValueState(selectedTerminal)) {
	// 			return;
	// 		} else {
	// 			setCamUuid((selectedTerminal as ITerminal).uuid);
	// 		}
	// 	},
	// 	[ selectedTerminal ]
	// );

	return selectedTerminal ? (
		<div className={styles.terminal}>
			<h3>Terminal</h3>
			<TerminalInfo />
			<Camera camUuid={selectedTerminal.uuid} />
		</div>
	) : (
		<MessageCentered>No selected terminal</MessageCentered>
	);
}
