const app = require('express')({});
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const apiUrl = require('./apiEndpoints');

const getQueries = require('./queries/get');
const postQueries = require('./queries/post');

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

app.get(apiUrl.otherLogsByOfficeUuid, getQueries.getOtherLogsByOfficeUuid);

app.get(apiUrl.authLogsByOfficeUuid, getQueries.getAuthLogsByOfficeUuid);

// app.get(apiUrl.terminalsByCamUuids, getQueries.getTerminalsByCamUuids);

app.get(apiUrl.offices, getQueries.getOffices);

app.get(apiUrl.terminals, getQueries.getTerminals);

app.post(apiUrl.terminals, postQueries.postTerminal);

app.get(apiUrl.workers, getQueries.getWorkersByOfficeUuid);

// app.get(apiUrl.officeByTerminalId, (request, response) => {
// 	const terminalUuid = request.params.id;

// 	response.json([
// 		{
// 			uuid: 'office123132',
// 			name: 'Goana-Office',
// 			faceMatcher: JSON.stringify({ faces: [ 'f1', 'f2' ] }),
// 			businessCenterUuid: '1',
// 			open: true,
// 			floor: 3
// 		},
// 		{
// 			uuid: 'office123144432',
// 			name: 'Goana-Office',
// 			faceMatcher: JSON.stringify({ faces: [ 'f1', 'f2' ] }),
// 			businessCenterUuid: '1',
// 			open: true,
// 			floor: 3
// 		}
// 	]);
// });

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
