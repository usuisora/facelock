interface ILocationState {
	initial: boolean;
}

export interface ILocation {
	pathname: string;
	search: string;
	hash: string;
	state: ILocationState;
	key?: string;
}
