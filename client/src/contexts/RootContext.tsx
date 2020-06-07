import React from 'react';
import { OtherLogsProvider } from './OtherLogsContext';
import { AuthLogsProvider } from './AuthLogsContext';
import { TerminalProvider } from './TerminalContext';
import { OfficeContextProvider } from './OfficeContext';
import { WorkerContextProvider } from './WorkerContext';
import { CamsContextProvider } from './CamsContext';

export const RootContextProvider = ({ children }) => (
	<CamsContextProvider>
		<OfficeContextProvider>
			<TerminalProvider>
				<WorkerContextProvider>
					<OtherLogsProvider>
						<AuthLogsProvider>{children}</AuthLogsProvider>
					</OtherLogsProvider>
				</WorkerContextProvider>
			</TerminalProvider>
		</OfficeContextProvider>
	</CamsContextProvider>
);
