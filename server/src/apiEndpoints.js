module.exports = {
	login: '/api-token-auth/',
	logout: '/api-token-deauth/',
	passwordChange: '/rest-auth/password/change/',
	workers: '/workers/',
	workerByUuid: '/workers/:uuid',
	faceMatch: '/facematch/',
	offices: '/offices/',
	// workerByFaceDescriptor: `/workerByFaceDescriptor/`,
	otherLogs: '/other-logs/',
	otherLogsByOfficeUuid: '/other-logs/:officeUuid',
	authLogs: '/auth-logs/',
	authLogsByOfficeUuid: '/auth-logs/:officeUuid',
	terminals: '/terminals/',
	terminalsByParams: '/terminals/:cam_uuid&:office_uuid',
	activate: '/users/activate/',
	settings: '/settings/'
};
