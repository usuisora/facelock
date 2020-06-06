import React, { useContext, useEffect } from 'react';
import CameraFactory from 'components/Terminal/CameraFactory';
import { loadModels } from 'util/faceApiUtil';
import { TerminalContext } from '../../contexts/TerminalContext';
import Camera from './Camera';
import TerminalInfo from './TerminalInfo';
import MessageCentered from 'partials/MessageCentered';

import styles from './Terminal.module.scss';
import { path } from 'constants/routes';
import { Link } from 'react-router-dom';

export default function Terminal() {
	const { selectedTerminal } = useContext(TerminalContext);

	return selectedTerminal ? (
		<div className="container">
			<div className={styles.terminal}>
				<h3>Terminal</h3>
				<TerminalInfo />
				<Camera camUuid={selectedTerminal.uuid} />
			</div>
		</div>
	) : (
		<div className="center">
			<MessageCentered> No selected terminal</MessageCentered>
			<Link to={path.settings} className="waves-effect  black  waves-light btn">
				Choose terminal
			</Link>
		</div>
	);
}
