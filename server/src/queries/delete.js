const pool = require('../pool');

const deleteWorker = async (request, response) => {
	const { uuid } = request.params;

	pool.query('DELETE FROM worker WHERE uuid = $1', [ uuid ], (error, results) => {
		if (error) {
			throw error;
		}
		response.status(200).send(`User deleted with ID: ${uuid}`);
	});
};

module.exports = {
	deleteWorker
};
