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
	const { otherLogs, loadOtherLogs } = useContext(OtherLogsContext);

	useEffect(() => {
		loadOtherLogs!('12222');
	}, []);

	return !isReady(otherLogs) ? (
		<MessageCentered> No other logs</MessageCentered>
	) : (
		<div className={styles.otherList}>
			<h4>Other logs</h4>
				<ul className={styles.rowHeader}  >
			{['id','message', 'when'].map(el => <li key = {el}>{el}</li>)}
				</ul>
			{(otherLogs as IOtherLog[]).map((item) => (
				<ul className={styles.row}>
					<li>{item.uuid}</li>
					<li>{item.message}</li>
					<li>{item.moment}</li>
				</ul>
			))}
		</div>
	);
};
const AuthLogList = () => {
	const { authLogs, loadAuthLogs } = useContext(AuthLogsContext);

	useEffect(() => {
		loadAuthLogs!('12222');
	}, []);

	return !isReady(authLogs) ? (
		<MessageCentered> No auth logs</MessageCentered>
	) : (
		<div className={styles.authList}>
			{(authLogs as IAuthLog[]).map((item) => (
				<>
				<h4>Auth logs</h4>
				<ul className={styles.rowHeader}>
			{['id','name', 'when', 'status'].map(el => <li key = {el} className={styles.rowHeader}>{el}</li>)}
				</ul>
				<ul className={styles.row}>
					<li>{item.worker_id}</li>
					<li>{item.worker_name}</li>
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
		<div className={styles.logs}>
			<OtherLogList />
			<AuthLogList />
		</div>
	);
};

export default Logs;
