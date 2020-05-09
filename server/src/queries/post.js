const pool = require('../constants/pool');
export const _ = (request, response) => {
	pool.query('', [], (error, result) => {});
};

export const postWorker = (request, response) => {
	const { name, lastname, phone, descriptor } = request.body;
	pool.query('', [ name, lastname, phone, descriptor ], (error, result) => {});
};

export const postLoginEvent = (success, face_id, terminal_id) => {
	const moment = new Date.UTC.toString();
	pool.query('', [ terminal_id, moment, success, face_id ], (error, result) => {});
};

export const postOtherEvent = (request, response) => {
	const { msg, terminal_id } = request.body;
	const moment = new Date.UTC.toString();
	pool.query('', [ terminal_id, msg, moment ], (error, result) => {});
};

// const createUser = (request, response) => {
// 	const { name, email } = request.body;

// 	pool.query('INSERT INTO users (name, email) VALUES ($1, $2)', [ name, email ], (error, results) => {
// 		if (error) {
// 			throw error;
// 		}
// 		response.status(201).send(`User added with ID: ${result.insertId}`);
// 	});
// };
