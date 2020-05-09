const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(
	bodyParser.urlencoded({
		extended: true
	})
);
app.get('/models', (request, response) => {
	response.json({ info: 'no data' });
});
app.get('/', (request, response) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
