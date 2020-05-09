const pool = require('../constants/pool');

export const _ = (request, response) => {
	pool.query('', [], (error, result) => {});
};

export const openOfficeDoor = (office_id) => {
	pool.query('', [ true ], (error, result) => {
		closeOfficeDoorToggle(office_id);
	});
};

export const closeOfficeDoor = (office_id) => {
	pool.query('', [ false ], (error, result) => {});
};

// const updateOfficeDoorToggle = (request, response) => {
// 	const id = parseInt(request.params.id);
// 	const { name, email } = request.body;

// 	pool.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [ name, email, id ], (error, results) => {
// 		if (error) {
// 			throw error;
// 		}
// 		response.status(200).send(`User modified with ID: ${id}`);
// 	});
// };
