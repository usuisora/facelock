import React, { useContext } from 'react';
import { isValueState, isLoading, isReady } from 'util/valueState';
import MessageCentered from 'partials/MessageCentered';
import { OfficeContext } from 'contexts/OfficeContext';

import styles from './Settings.module.scss';
import { IOffice } from 'types/Office.type';
import { BUTTON_CLASS_NAME } from 'constants/styleConsts';

export default function OfficesList() {
	const { offices, setSelectedOffice, selectedOffice } = useContext(OfficeContext);

	const isSelectedOffice = (officeUuid: string ) : boolean =>   (selectedOffice?.uuid === officeUuid) && !!(officeUuid)
	
	return !isReady(offices) ? (
		<MessageCentered>No offices found.</MessageCentered>
	) : (
		<div className={styles.termilList}>
			<h4 className="grey-text">Available Offices</h4>
			{(offices as IOffice[]).map((office: IOffice) => (
				<div   key  = {office.uuid} className={styles.row}>
					<ul className={styles.left}>
						<li>{office.uuid} </li>
						<li>{office.name} </li>
						<li>{office.open ? 'Open' : 'Closed'} </li>
					</ul>
					<ul className={styles.action}>
					{<button
							className={BUTTON_CLASS_NAME}
							onClick={() => setSelectedOffice!(office)}
							disabled={isSelectedOffice(office.uuid)}
						>
							Choose
						</button>}
					</ul>
				</div>
			))}
		</div>
	);
}
