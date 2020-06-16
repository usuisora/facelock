import React, { useContext } from 'react';
import { WorkerContext } from 'contexts/WorkerContext';
import { isReady } from 'util/valueState';
import { IWorker } from 'types/Worker.type';
import MessageCentered from 'partials/MessageCentered';
import { BUTTON_CLASS_NAME } from 'constants/styleConsts';

import styles from './Workers.module.scss';

export default function WorkersList() {
	const { workers, deleteWorker } = useContext(WorkerContext);

	return isReady(workers) && (workers as IWorker[]).length ? (
		<div className={styles.workersList}>
			<ul className={styles.rowHeader}>
				{[ 'ID', 'Name', 'Last Name', 'phone' ].map((el) => (
					<li key={el} className={styles.rowHeader}>
						{el}
					</li>
				))}
			</ul>
			{(workers as IWorker[]).map((worker: IWorker) => (
				<ul key={worker.uuid} className={styles.row}>
					<li>{worker.uuid}</li>
					<li>{worker.name}</li>
					<li>{worker.last_name}</li>
					<li>{worker.phone}</li>
					<button className={BUTTON_CLASS_NAME} onClick={() => deleteWorker!(worker.uuid)}>
						delete
					</button>
				</ul>
			))}
		</div>
	) : (
		<MessageCentered>No workers</MessageCentered>
	);
}
