module.exports = {
	login: '/api-token-auth/',
	logout: '/api-token-deauth/',
	passwordChange: '/rest-auth/password/change/',
	workers: '/workers/',
	verifyWorker: '/workers/verify',
	offices: '/offices/',

	faceMatch: `/facematch/`,
	// officeByUuidandDescriptor: '/offices/:office_uuid/:face_descriptor',
	// officeByTerminalId: `/offices/:id`,

	// faceMatcherByOfficeUuid: (uuid) => `/offices/${uuid}/facematcher`,
	faceMatcherByOfficeUuid: `/facematcher/:office_uuid`,

	otherLogs: '/other-logs/',
	otherLogsByOfficeUuid: '/other-logs/:officeUuid',
	authLogs: '/auth-logs/',
	authLogsByOfficeUuid: '/auth-logs/:officeUuid',
	terminals: '/terminals/',
	terminalsByParams: '/terminals/:cam_uuid&:office_uuid',
	activate: '/users/activate/',
	settings: '/settings/'
};
