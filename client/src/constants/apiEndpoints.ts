export const ApiUrl = {
	login: `api-token-auth/`,
	logout: `api-token-deauth/`,
	passwordChange: `rest-auth/password/change/`,
	workers: `workers/`,
	workerById: (uuid) => `workers/${uuid}`,

	verifyWorker: `workers/verify`,
	offices: `offices/`,
	officeById: (uuid) => `offices/${uuid}`,

	faceMatcherByOfficeUuid: (uuid) => `offices/${uuid}/facematcher/`,
	otherLogs: `other-logs/`,
	otherLogsByOfficeId: (uuid) => `other-logs/${uuid}`,

	authLogs: `auth-logs/`,
	authLogsByOfficeId: (uuid) => `auth-logs/${uuid}`,

	terminals: `terminals/`,
	terminalsByParams: (params) => `terminals/${params} `,

	activate: `users/activate/`,
	settings: `settings/`
};
