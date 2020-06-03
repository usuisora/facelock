import React from 'react';
import { OtherLogsProvider } from './OtherLogsContext';
import { AuthLogsProvider } from './AuthLogsContext';

export const RootContextProvider = ({ children }) => (
	<OtherLogsProvider>
		<AuthLogsProvider>{children}</AuthLogsProvider>
	</OtherLogsProvider>
);
