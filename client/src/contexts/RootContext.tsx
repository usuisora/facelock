import React from 'react';
import { OtherLogsProvider } from './OtherLogsContext';
import { AuthLogsProvider } from './AuthLogsContext';
import { TerminalProvider } from './TerminalContext';
import OfficeContextProvider from './OfficeContext';
import WorkerContextProvider, { WorkerContext } from './WorkerContext';

export const RootContextProvider = ({ children }) => (
	<TerminalProvider>
		<OfficeContextProvider>
			<WorkerContextProvider>
				<OtherLogsProvider>
					<AuthLogsProvider>{children}</AuthLogsProvider>
				</OtherLogsProvider>
			</WorkerContextProvider>
		</OfficeContextProvider>
	</TerminalProvider>
);
