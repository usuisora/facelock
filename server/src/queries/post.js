const pool = require('../pool');
const faceapiUtil = require('../faceapiUtil');
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

const postAuthLog = (request, response) => {
	const { descriptor, terminal_uuid, success } = request.body;

	pool.query(
		`insert into login_event(terminal_uuid, moment,face_descriptor, success)
		values ($1,LOCALTIMESTAMP,$2,$3)`,
		[ terminal_uuid, descriptor, success ],
		(error, results) => {
			if (error) {
				throw error;
			}
			response.status(201).send('terminal added');
		}
	);
};

const postWorker = async (request, response) => {
	const { uuid, name, last_name, phone, officeUuid, descriptor } = request.body;

	pool.query(
		`insert into Worker (uuid, name, last_name, phone, office_uuid, face_descriptor)
	values ($1,$2,$3,$4, $5, $6)`,
		[ uuid, name, last_name, phone, officeUuid, descriptor ],
		(error, result) => {
			if (error) {
				response.status(404).send(null);
			}
			response.status(201).send(`Worker added with ID: ${result.uuid}`);
		}
	);
};

const postOtherLog = (request, response) => {
	const { message, terminalUuid } = request.body;
	pool.query(
		`insert into other_event ( moment, message, terminal_uuid)
		VALUES (current_timestamp,$1,$2)`,
		[ message, terminalUuid ],
		(error, results) => {
			if (error) {
				throw error;
			}
			response.status(201).send(`Other event event posted `);
		}
	);
};

module.exports = {
	postTerminal,
	postAuthLog,
	postWorker,
	postOtherLog
};
