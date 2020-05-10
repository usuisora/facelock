const pool = require('../constants/pool');

export const _ = (request, response) => {
	pool.query('', [], (error, result) => {});
};

export const openOfficeDoor = (office_id) => {
	pool.query('UPDATE office SET open = $1 WHERE id = $1', [ true ], (error, result) => {
		if (error) {
			throw error;
		}
		response.status(200).send(` Office ${office_id} Opened`);
		setTimeout(() => closeOfficeDoorToggle(office_id), 5000);
	});
};

export const closeOfficeDoor = (office_id) => {
	pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [ false ], (error, result) => {
		if (error) {
			throw error;
		}
		response.status(200).send(` Office ${office_id} closed`);
	});
};

export const updateGuardPassword = (request, response) => {
	const { oldpassword, newpassword } = request.body;

	pool.query('UPDATE Guard SET password = $2, WHERE password = $1', [ oldpassword, newpassword ], (error, result) => {
		if (error) {
			throw error;
		}
		response.status(200).send(` Guard password updated`);
	});
};
