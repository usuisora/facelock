const pool = require('../pool');
const faceapi = require('face-api.js');

const updateOffice = (request, response) => {
	const { office_uuid } = request.body;

	pool.query('SELECT * from worker where office_uuid = $1', [ office_uuid ], (error, { rows: workers }) => {
		if (error) {
			throw error;
		}
		if (!workers.length) {
			response.status(200).send('no workers');
		}
		const labeledDescriptors = workers.length
			? workers.map((worker) => {
					const arr = [];
					const fd = JSON.parse(worker.face_descriptor);
					for (const property in fd) {
						arr.push(fd[property]);
					}
					const descriptor = new Float32Array(arr);
					return new faceapi.LabeledFaceDescriptors(worker.uuid, [ descriptor ]);
				})
			: null;

		const faceMatcherBlob = JSON.stringify(labeledDescriptors ? new faceapi.FaceMatcher(labeledDescriptors) : null);

		pool.query(
			'UPDATE office SET face_matcher = $1 WHERE uuid = $2',
			[ faceMatcherBlob, office_uuid ],
			(error, results) => {
				if (error) {
					throw error;
				}
				response.status(200);
			}
		);
	});
};

module.exports = {
	updateOffice
};
