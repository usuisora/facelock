const pool = require('../pool');

const postGuard = (request, response) => {
	const { name, lastname, phone, password, faceDescriptor } = request.body;
	pool.query(
		`insert into Guard (name, last_name, phone,password , face_descriptor)
		VALUES ($1,$2,$3,$4,$5)`,
		[ name, lastname, phone, password, faceDescriptor ],
		(error, result) => {
			response.status(201).send(`Guard added with ID: ${result.id}`);
		}
	);
};
const postTerminal = (request, response) => {
	const { uuid, cam_uuid, office_uuid } = request.body;
	console.log(request.body);
	pool.query(
		`insert into terminal  (uuid,  cam_uuid, office_uuid)
		VALUES ($1,$2,$3)`,
		[ uuid, cam_uuid, office_uuid ],
		(error, results) => {
			if (error) {
				throw error;
			}
			response.status(201).send('terminal added');
		}
	);
};

// const getOfficeFaceMatcherByTerminalUuid = async (terminal_uuid) => {
// 	pool.query(
// 		`select face_matcher from terminal join office on terminal.office_uuid === office.uuid
// 	 where terminal.uuid === $1`,
// 		[ terminal_uuid ],
// 		(error, results) => {
// 			if (error) {
// 				throw error;
// 			}
// 			return await results[0].face_matcher;
// 		}
// 	);
// };

const postAuthLog = (request, response) => {
	const { descriptor, terminal_uuid, success } = request.query;
	console.log(request.query);
	pool.query(
		`insert into login_event(terminal_uuid, moment,face_descriptor, success)
		values ($1,
				LOCALTIMESTAMP,
				$2,
				$3)`,
		[ terminal_uuid, descriptor, success ],
		(error, results) => {
			if (error) {
				throw error;
			}
			response.status(201).send('terminal added');
		}
	);
};

const postWorker = (request, response) => {
	const { uuid, name, lastName, phone, officeUuid, faceDescriptor } = request.body;
	pool.query(
		`insert into Worker (name, last_name, phone, office_id, face_descriptor)
	values ($1,$2,$3,$4)`,
		[ uuid, name, lastName, phone, officeUuid, faceDescriptor ],
		(error, result) => {
			response.status(201).send(`Worker added with ID: ${result.id}`);
		}
	);
};
// const postLoginEvent = (success, faceDescriptor, terminalId) => {
// 	const moment = new Date.UTC.toString();
// 	pool.query(
// 		`insert into login_event (face_descriptor, moment, success, terminal_id)
// 		VALUES ($1,current_timestamp,$2,$3)`,
// 		[ faceDescriptor, success, terminalId ],
// 		(error, result) => {
// 			response.status(201).send(`Login event posted `);
// 		}
// 	);
// };

const postOtherLog = (message, terminalId) => {
	pool.query(
		`insert into other_event ( moment, message, terminal_id)
		VALUES (current_timestamp,$1,$2)`,
		[ message, terminalId ],
		(error, result) => {
			response.status(201).send(`Other event event posted `);
		}
	);
};

module.exports = {
	postTerminal,
	postAuthLog,
	postWorker
};
