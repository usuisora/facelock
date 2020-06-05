module.exports = {
	login: '/api-token-auth/',
	logout: '/api-token-deauth/',
	passwordChange: '/rest-auth/password/change/',
	workers: '/workers/',
	verifyWorker: '/workers/verify',
	offices: '/offices/',
	officeByTerminalId: `/offices/:id`,
	// faceMatcherByOfficeUuid: (uuid) => `/offices/${uuid}/facematcher`,
	faceMatcherByOfficeUuid: `/offices/:id/facematcher/`,

	otherLogs: '/other-logs/',
	otherLogsByOfficeId: '/other-logs/:id',
	authLogs: '/auth-logs/',
	authLogsByOfficeId: '/auth-logs/:id',
	terminals: '/terminals/',
	activate: '/users/activate/',
	settings: '/settings/'
};
