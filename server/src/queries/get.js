const pool = require('../pool');

const _ = (request, response) => {
	pool.query('', (error, result) => {});
};
export const getWorkers = (request, response) => {
	pool.query('', (error, result) => {});
};

export const getWorkerByFaceDescripror = (request, response) => {
	pool.query('', (error, result) => {});
};

export const getLoginEvent = (request, response) => {
	pool.query('', (error, result) => {});
};
export const getOtherEvents = (request, response) => {
	pool.query('', (error, result) => {});
};

// ////
// export const getUsers = (request, response) => {
// 	pool.query('SELECT * FROM users ORDER BY id ASC', (error, results) => {
// 		if (error) {
// 			throw error;
// 		}
// 		response.status(200).json(results.rows);
// 	});
// };

// export const getUserById = (request, response) => {
// 	const id = parseInt(request.params.id);

// 	pool.query('SELECT * FROM users WHERE id = $1', [ id ], (error, results) => {
// 		if (error) {
// 			throw error;
// 		}
// 		response.status(200).json(results.rows);
// 	});
// };
