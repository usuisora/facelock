import React, { Component, useContext, useEffect } from 'react';
import { IOtherLog } from '../../types/otherLog.type';
import { isReady } from '../../util/valueState';

import { OtherLogsContext } from 'contexts/OtherLogsContext';
import { AuthLogsContext } from 'contexts/AuthLogsContext';
import { IAuthLog } from 'types/AuthLog.type';

import styles from './Logs.module.scss';
import MessageCentered from 'partials/MessageCentered';

interface IPropsFromStore {
	otherLogs: IOtherLog[];
}

const OtherLogList: React.SFC = () => {
	const { otherLogs} = useContext(OtherLogsContext);

	return !isReady(otherLogs) ? (
		<MessageCentered> No other logs</MessageCentered>
	) : (
		<div className={styles.otherList}>
			<h4>Other logs</h4>
				<ul className={styles.rowHeader}  >
			{[ 'timestamp', 'message',].map(el => <li key = {el}>{el}</li>)}
				</ul>
			{(otherLogs as IOtherLog[]).map((item) => (
				<ul className={styles.row}>
					<li>{item.moment}</li>
					<li>{item.message}</li>

				</ul>
			))}
		</div>
	);
};
const AuthLogList = () => {
	const { authLogs} = useContext(AuthLogsContext);

	return !isReady(authLogs) ? (
		<MessageCentered> No auth logs</MessageCentered>
	) : (
		<div className={styles.authList}>
			<h4>Auth logs</h4>
				<ul className={styles.rowHeader}>
			{['worker id','Descriptor', 'timestamp', 'status'].map(el => <li key = {el} className={styles.rowHeader}>{el}</li>)}
				</ul>
			{(authLogs as IAuthLog[]).map((item) => (
				<>
				
				<ul className={styles.row}>
				<a >{item.worker_id || 'Unknown'}</a>
					<li>{item.face_descriptor }</li>
					<li>{item.moment}</li>
					<li>{item.success ? 'Succeed' : 'Failed'}</li>
				</ul>
				</>
				
			))}
		</div>
	);
};

const Logs: React.SFC = () => {
	return (
		<div className='container'>
			<div className={styles.logs}>
			<OtherLogList />
			<AuthLogList />
			</div>
		</div>
	);
};

export default Logs;
