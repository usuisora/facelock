import React, { useContext } from 'react';
import Camera from './Camera';
import TerminalInfo from './TerminalInfo';
import MessageCentered from 'partials/MessageCentered';

import styles from './Terminal.module.scss';
import { path } from 'constants/routes';
import { Link } from 'react-router-dom';
import { CamsContext } from 'contexts/CamsContext';
import LastEnteredWorker from './LastEnteredWorker';

export default function Terminal() {
	const { selectedCamUuid } = useContext(CamsContext);

	return selectedCamUuid ? (
		<div className="container">
			<div className={styles.terminal}>
				<div className="card white  lighten-2">
					<div className="card-content">
						<Camera camUuid={selectedCamUuid} />
					</div>
				</div>
				<LastEnteredWorker />
				<TerminalInfo />
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
