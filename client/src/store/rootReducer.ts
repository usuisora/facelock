import { authTypes } from '../sagas/auth';
import { appReducer } from './appReducer';
import { getInitialStore } from './initialStore';

export const rootReducer = (store, action) => {
	switch (action.type) {
		case authTypes.delete.commit:
			store = getInitialStore();
			break;
	}

	return appReducer(store, action);
};
