export const ApiUrl = {
	login: `api-token-auth/`,
	logout: `api-token-deauth/`,
	passwordChange: `rest-auth/password/change/`,
	workers: `workers/`,
	verifyWorker: `workers/verify`,
	offices: `offices/`,
	officeByTerminalId: (uuid) => `offices/${uuid}`,
	faceMatcherByOfficeUuid: (uuid) => `offices/${uuid}/facematcher/`,
	otherLogs: `other-logs/`,
	otherLogsByOfficeId: (uuid) => `other-logs/:id`,
	authLogs: `auth-logs/`,
	authLogsByOfficeId: (uuid) => `auth-logs/:id`,
	terminals: `terminals/`,
	activate: `users/activate/`,
	settings: `settings/`
};
