import React from 'react';

import styles from './MessageCentred.module.scss';

export default function MessageCentered({ children }) {
	return (
		<div className={styles.wrapper}>
			<div className="center">{children}</div>
		</div>
	);
}
