require('dotenv').config()
const express = require('express')
const massive = require('massive')
const ctrl = require('./controllers/controller')
const seedCtrl = require('./development/seedController')
const { SERVER_PORT, CONNECTION_STRING } = process.env

const app = express()
app.use(express.json())

// * Development Endpoints
app.get('/api/seed/fbi', seedCtrl.populateFbiData)
app.post('/seed', seedCtrl.seedDb)

// * Data Endpoints
app.get('/api/data', ctrl.sampleData)

massive({
	connectionString: CONNECTION_STRING,
	ssl: {
		rejectUnauthorized: false
	}
}).then(db => {
	app.set('db', db)
	console.log('connected to db')
	app.listen(SERVER_PORT, () => console.log(`Goliath ${SERVER_PORT} online`))
})