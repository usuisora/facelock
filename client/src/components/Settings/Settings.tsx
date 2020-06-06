import React from 'react';
import { TerminalContext } from 'contexts/TerminalContext';

import styles from './Settings.module.scss';
import TerminalList from './TerminalList';

export default function Settings() {
	return (
		<div className="container">
			<h3>Settings</h3>
			<TerminalList />
		</div>
	);
}
