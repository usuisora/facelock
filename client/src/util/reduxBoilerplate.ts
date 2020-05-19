import { createReducer } from 'redux-create-reducer';
import { getInitialStore } from '../store/initialStore';
import { IStore } from '../types/Store.type';

import { notLoadedState, commitState, errorState } from './valueState';

enum IActionType {
	run = 'run',
	commit = 'commit',
	fail = 'fail'
}

export const payloadAction = (type: string) => (payload?: any) => ({
	type,
	payload
});

export const commitAction = <T>(type: string) => (data?: T) => ({
	type,
	data
});

export const errorAction = (type: string) => (error: Error) => ({
	type,
	error
});

export const createActionTypes = (resource: string, actions: string[]): any =>
	actions.reduce(
		(types, action) => ({
			...types,
			[action]: {
				[IActionType.run]: `${resource}:${action}::${IActionType.run}`,
				[IActionType.commit]: `${resource}:${action}::${IActionType.commit}`,
				[IActionType.fail]: `${resource}:${action}::${IActionType.fail}`
			}
		}),
		{}
	);

export const createActions = <T>(resource: string, actions: string[]): any =>
	actions.reduce(
		(prevActions, action) => ({
			...prevActions,
			[action]: {
				[IActionType.run]: payloadAction(`${resource}:${action}::${IActionType.run}`),
				[IActionType.commit]: commitAction<T>(`${resource}:${action}::${IActionType.commit}`),
				[IActionType.fail]: errorAction(`${resource}:${action}::${IActionType.fail}`)
			}
		}),
		{}
	);

export const createReducers = <T>(resource: string, actions: string[], reducerName?: string): any =>
	createReducer(
		reducerName ? getInitialStore()[reducerName] : notLoadedState(),
		actions.reduce(
			(reducers, action) => ({
				// @ts-ignore
				...reducers,
				[`${resource}:${action}::${IActionType.run}`]: (state: IStore): IStore => state,
				[`${resource}:${action}::${IActionType.commit}`]: (state: IStore, { data }: { data: T }): IStore =>
					commitState(state, data),
				[`${resource}:${action}::${IActionType.fail}`]: (state, { error }) => errorState(state, error)
			}),
			// @ts-ignore
			{}
		)
	);
