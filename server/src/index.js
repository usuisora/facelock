const app = require('express')({});
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const port = 5000;

const corsy = cors({
	credentials: true,
	origin: true
});

app.use(corsy);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);

app.get('/', (request, response) => response.send('Hello world!'));
app.get('/data', (request, response) =>
	response.json({
		data: 'Ivan',
		id: 123123,
		office_uuid: 1
	})
);

app.get('/other-logs/:id', (request, response) =>
	response.json([
		{
			uuid: 'uuid1',
			moment: 'today',
			message: 'entered emplo001'
		}
	])
);
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
