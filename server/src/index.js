const app = require('express')({});
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const apiUrl = require('./apiEndpoints');
const getQueries = require('./queries/get');
const postQueries = require('./queries/post');
const updateQueries = require('./queries/update');
const deleteQueries = require('./queries/delete');

const { loadFaceApiModels } = require('./faceapiUtil');
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

app.post(apiUrl.authLogs, postQueries.postAuthLog);

app.get(apiUrl.offices, getQueries.getOffices);

app.put(apiUrl.offices, updateQueries.updateOffice);

app.get(apiUrl.terminals, getQueries.getTerminals);

app.post(apiUrl.terminals, postQueries.postTerminal);

app.get(apiUrl.workers, getQueries.getWorkersByOfficeUuid);

app.post(apiUrl.workers, postQueries.postWorker);

app.get(apiUrl.workerByUuid, getQueries.getWorkerByUuid);

app.delete(apiUrl.workerByUuid, deleteQueries.deleteWorker);

app.get(apiUrl.faceMatch, getQueries.getMatchByFaceDescriptor);

app.listen(port, async () => {
	await loadFaceApiModels;
	console.log(`Example app listening on port ${port}!`);
});
