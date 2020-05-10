const pool = require('../constants/pool');

export const postWorker = (request, response) => {
	const { name, lastname, phone, officeId, faceDescriptor } = request.body;
	pool.query(
		`insert into Worker(name, last_name, phone, office_id, face_descriptor)
	values ($1,$2,$3,$4)`,
		[ name, lastname, phone, officeId, faceDescriptor ],
		(error, result) => {
			response.status(201).send(`Worker added with ID: ${result.id}`);
		}
	);
};
export const postGuard = (request, response) => {
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
export const postTerminal = (request, response) => {
	const { id, officeId } = request.body;
	pool.query(
		`insert into terminal (id,office_id)
		VALUES ($1,$2)`,
		[ id, officeId ],
		(error, result) => {
			response.status(201).send(`Terminal added with ID: ${result.id}`);
		}
	);
};
export const postLoginEvent = (success, faceDescriptor, terminalId) => {
	const moment = new Date.UTC.toString();
	pool.query(
		`insert into login_event (face_descriptor, moment, success, terminal_id)
		VALUES ($1,current_timestamp,$2,$3)`,
		[ faceDescriptor, success, terminalId ],
		(error, result) => {
			response.status(201).send(`Login event posted `);
		}
	);
};

export const postOtherEvent = (message, terminalId) => {
	pool.query(
		`insert into other_event ( moment, message, terminal_id)
		VALUES (current_timestamp,$1,$2)`,
		[ faceDescriptor, message, terminalId ],
		(error, result) => {
			response.status(201).send(`Other event event posted `);
		}
	);
};
