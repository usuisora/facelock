const Pool = require('pg').Pool;

const config = {
	user: 'postgres',
	host: 'localhost',
	database: 'CompanyDB',
	password: '0000',
	port: 5432
};
const pool = new Pool(config);
module.exports = pool;
