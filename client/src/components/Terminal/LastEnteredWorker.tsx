import React, { useContext } from 'react';
import { OfficeContext } from 'contexts/OfficeContext';

export default function LastEnteredWorker() {
	const { lastEnteredWorker } = useContext(OfficeContext);
	return (
		<div className="card center">
			<div className="card-content">
				<div className="card-title">Last Entered worker</div>
				{lastEnteredWorker ? (
					<div>
						<li>{lastEnteredWorker.uuid}</li>
						<li> {lastEnteredWorker.name + ' ' + lastEnteredWorker.last_name}</li>
					</div>
				) : (
					<div className="grey-text center">NO LAST</div>
				)}
			</div>
		</div>
	);
}
