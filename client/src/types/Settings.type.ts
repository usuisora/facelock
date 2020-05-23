export interface IOption {
	option_uuid: string;
	name: string;
	selected: boolean;
}

export interface ISettings {
	uuid: string;
	name: string;
	options: IOption[];
}
