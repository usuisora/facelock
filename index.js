const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
app.get('/models', (req, res) => res.sendFile(__dirname+'/models.json'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))