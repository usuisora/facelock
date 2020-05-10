'use strict';

const pool = require('../pool');

export const getWorkers = (request, response) => {
	pool.query('select id, name, last_name, phone, office_id from worker', (error, result) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
}; //checked

export const getGuards = (request, response) => {
	pool.query('select id, name, last_name, phone from guard', (error, result) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
}; // checked
export const getOffices = (request, response) => {
	pool.query('select * from office', (error, result) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
}; // checked

export const getWorkerByFaceDescriptor = (request, response) => {
	const { face_descriptor } = request.body();
	pool.query(
		`select id, name, last_name, phone_number, office_id from worker where face_descriptor = $1`,
		[ face_descriptor ],
		(error, result) => {
			if (error) {
				throw error;
			}

			response.status(200).json(results.rows);
		}
	);
}; //checked

export const getLoginEvent = (request, response) => {
	pool.query('select * from login_event ', (error, result) => {
		if (error) {
			throw error;
		}

		response.status(200).json(results.rows);
	});
};
export const getOtherEvents = (request, response) => {
	pool.query('select * from other_event ', (error, result) => {});
};

export const getTerminalById = (request, response) => {
	const id = parseInt(request.params.id);
	pool.query(`select *  from terminal where id = $1`, [ id ], (error, result) => {
		if (error) {
			throw error;
		}

		response.status(200).json(results.rows);
	});
};
//getTe
const getVarifiedAsGuard = (request, response) => {
	const password = parseInt(request.body.password);

	pool.query(`select id, name from guard where password = $1`, [ password ], (error, result) => {
		if (error) {
			throw error;
		}

		response.status(200).json(results.rows);
	});
};
const getVarifiedAsAdmin = (request, response) => {
	const password = parseInt(request.body.password);

	pool.query(`select id from admin where password = $1`, [ password ], (error, result) => {
		if (error) {
			throw error;
		}

		response.status(200).json({ admin: true });
	});
};

export const getVarified = (request, response) => {
	try {
		getVarifiedAsGuard(request, response);
	} catch (err) {
		getVarifiedAsAdmin(request, response);
	}
};

export const getCheckWorker = (request, response) => {
	const { faceDescriptor, terminalId } = request.body;
	pool.query(
		`	SELECT worker.id as "worker_id" , office.id  as "office_id"
		FROM worker
		   JOIN office
			ON  worker.office_id = office.id
		   JOIN terminal
			ON terminal.office_id = office.id
			where ( worker.face_descriptor = $1 and terminal.id = $2);
			`,
		[ faceDescriptor, terminalId ],
		(error, result) => {
			if (error) {
				throw error;
			}

			response.status(200).json(results.rows);
		}
	);
};
export const getCheckGuard = (request, response) => {
	const { faceDescriptor } = request.body;
	pool.query(
		`	SELECT id from guard where face_descriptor = $1 ;
			`,
		[ faceDescriptor ],
		(error, result) => {
			if (error) {
				throw error;
			}

			response.status(200).json(results.rows);
		}
	);
};
