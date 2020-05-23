import { get } from 'lodash';
import React from 'react';

import styles from '../assets/scss/fullPage.module.scss';
import { IValueState } from './valueState';

// @ts-ignore
export const getErrorsByKey = (state: any, keys: string[]): string[] => {
	const error = get(state, '_error.response.data');
	if (error instanceof Object) {
		// @ts-ignore
		return keys.reduce(
			// @ts-ignore
			(acc, key) => (error[key] instanceof Array ? [ ...acc, error[key] ] : acc),
			[]
		);
	}
	return [];
};

export const getAllErrors = (state: IValueState | any): string[] => {
	const error = (state && state._error) || state;
	const errorsObj = error && error.response && error.response.data;
	if (errorsObj instanceof Object) {
		return Object.values(errorsObj).reduce(
			(acc: any[], arr) => (arr instanceof Array ? [ ...acc, ...arr ] : [ ...acc, arr ]),
			[]
		);
	}
	return [];
};

export const displayErrors = (state: object, introMessage: string, expectedErrors?: string[]) => {
	const errorMessages = expectedErrors ? getErrorsByKey(state, expectedErrors) : getAllErrors(state);
	if (errorMessages.length) {
		return (
			<div className={styles.error}>
				<b>{introMessage}:</b> <br />
				<br /> {errorMessages.map((message, index) => <p key={index}>{message}</p>)}
			</div>
		);
	}
};
