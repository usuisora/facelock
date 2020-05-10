const Pool = require('pg').Pool;

const config = {
	user: 'me',
	host: 'localhost',
	database: 'api',
	password: 'password',
	port: 5432
};
const pool = new Pool(config);
export default pool;
