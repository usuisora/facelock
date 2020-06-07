'use strict';

const pool = require('../pool');

const getAuthLogsByOfficeUuid = (request, response) => {
	const officeUuid = parseInt(request.params.officeUuid);

	pool.query(
		`select login_event.face_descriptor , moment, success, worker.uuid as worker_uuid from login_event
		join terminal on terminal.uuid  = login_event.terminal_uuid
		join office on terminal.office_uuid = office.uuid
		
		full join worker on login_event.face_descriptor = worker.face_descriptor 
		where terminal.office_uuid = $1`,
		[ officeUuid ],
		(error, results) => {
			if (error) {
				response.status(404);
			}
			response.status(200).json(results.rows);
		}
	);
};

const getOtherLogsByOfficeUuid = (request, response) => {
	const officeUuid = parseInt(request.params.officeUuid);
	pool.query(
		'select * from other_event join terminal on terminal.uuid = other_event.terminal_uuid where terminal.office_uuid = $1',
		[ officeUuid ],
		(error, results) => {
			if (error) {
				response.status(404);
			}
			response.status(200).json(results.rows);
		}
	);
};

const getWorkers = (request, response) => {
	pool.query('select id, name, last_name, phone, office_id from worker', (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
}; //checked

const getGuards = (request, response) => {
	pool.query('select id, name, last_name, phone from guard', (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
}; // checked
const getOffices = (request, response) => {
	pool.query('select * from office', (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).json(results.rows);
	});
}; // checked

const getTerminals = (request, response) => {
	const { cam_uuid, office_uuid } = request.query;

	// console.log(cam_uuid, office_uuid);

	pool.query(
		'select * from terminal where cam_uuid = $1 and  office_uuid = $2',
		[ cam_uuid, office_uuid ],
		(error, results) => {
			if (error) {
				throw error;
			}
			// console.log(results.rows);
			response.status(200).json(results.rows);
		}
	);
};
const getWorkersByOfficeUuid = (request, response) => {
	const { office_uuid } = request.params;
	pool.query(
		`select uuid, name, last_name, phone , office_uuid from worker where office_uuid = $1`,
		[ office_uuid ],
		(error, results) => {
			if (error) {
				throw error;
			}

			response.status(200).json(results.rows);
		}
	);
}; //checked

const getWorkerByFaceDescriptor = (request, response) => {
	const { face_descriptor } = request.body();
	pool.query(
		`select id, name, last_name, phone_number, office_id from worker where face_descriptor = $1`,
		[ face_descriptor ],
		(error, results) => {
			if (error) {
				throw error;
			}

			response.status(200).json(results.rows);
		}
	);
}; //checked

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

const getVarified = (request, response) => {
	try {
		getVarifiedAsGuard(request, response);
	} catch (err) {
		getVarifiedAsAdmin(request, response);
	}
};

const getCheckWorker = (request, response) => {
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
		(error, results) => {
			if (error) {
				throw error;
			}

			response.status(200).json(results.rows);
		}
	);
};
const getCheckGuard = (request, response) => {
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

module.exports = {
	getOtherLogsByOfficeUuid,
	getAuthLogsByOfficeUuid,
	getOffices,
	getTerminals,
	getWorkersByOfficeUuid
};
