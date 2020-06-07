import React from 'react';
import CamsList from './CamsList';
import OfficesList from './OfficesList';
import TerminalInfo from '../Terminal/TerminalInfo';

export default function Settings() {
	return (
		<div className="container">
			<h3>Settings</h3>
			<p>Select Camera and Office to setup the terminal.</p>
			<TerminalInfo />
			<CamsList />
			<OfficesList />
		</div>
	);
}
