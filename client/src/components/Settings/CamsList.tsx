import React, { useContext } from 'react';
import { TerminalContext } from '../../contexts/TerminalContext';
import { isValueState, isLoading, isReady } from 'util/valueState';
import MessageCentered from 'partials/MessageCentered';
import { ITerminal } from 'types/Terminal.type';

import styles from './Settings.module.scss';
import { CamsContext } from 'contexts/CamsContext';
import { BUTTON_CLASS_NAME } from 'constants/styleConsts';

export default function CamsList() {
	const { camUuids, selectedCamUuid, setSelectedCamUuid } = useContext(CamsContext);

	const isSelectedCamUuid = (camUuid: string): boolean => selectedCamUuid === camUuid && !!camUuid;

	return !isReady(camUuids) ? (
		<MessageCentered>No cams found</MessageCentered>
	) : (
		<div className={styles.terminalList}>
			<h4 className="grey-text">Available cams id</h4>

			{(camUuids as string[]).map((camUuid) => (
				<ul key={camUuid} className={styles.row}>
					<li className={styles.left}>{camUuid} </li>
					<li className={styles.action}>
						<button
							className={BUTTON_CLASS_NAME}
							onClick={() => setSelectedCamUuid!(camUuid)}
							disabled={isSelectedCamUuid(camUuid)}
						>
							choose
						</button>
					</li>
				</ul>
			))}

			<button className={BUTTON_CLASS_NAME}>refresh</button>
		</div>
	);
}
