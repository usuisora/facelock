import React, { useContext, useState, useEffect } from 'react';
import { OfficeContext } from '../../contexts/OfficeContext';
// import {TerminalContext}from  '../../contexts/TerminalContext';
import { isValueState, didNotStartLoading, isReady } from 'util/valueState';
import { IOffice } from 'types/Office.type';
import MessageCentered from 'partials/MessageCentered';

interface ITerminalInfo {
	officeName: string;
	floor: number;
	open: boolean;
}

export default function TerminalInfo() {
	const { office } = useContext(OfficeContext);
	// const { selectedTerminal } = useContext(TerminalContext);
	const [ terminalInfo, setTerminalInfo ] = useState<ITerminalInfo | null>(null);
	useEffect(
		() => {
			if (isReady(office)) {
				const { open, floor, name: officeName } = office as IOffice;
				setTerminalInfo({
					open,
					floor,
					officeName
				});
            }
            
		},
		[ office ]
	);
	return terminalInfo  ? (<div>
             <p>Office name: {terminalInfo?.officeName}</p>
             <p>Office floor: {terminalInfo?.officeName}</p>
             <p>Open:  {terminalInfo?.officeName}</p>
        </div>) :
        (<MessageCentered>No terminal connected</MessageCentered>)
}
