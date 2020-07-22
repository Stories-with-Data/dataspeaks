require('dotenv').config()
const express = require('express'),
	massive = require('massive'),
	ctrl = require('./controllers/controller'),
	seedCtrl = require('./controllers/seedController'),
	session = require('express-session'),
	{ SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

const app = express()

app.use(express.json())
app.use(session({
	resave: false,
	saveUninitialized: true,
	secret: SESSION_SECRET,
	cookie: { maxAge: 1000 * 60 * 60 * 24 * 30} // 30 Days
}))

// * Development Endpoints
app.post('/dev/seed/fbi', seedCtrl.populateFbiData)
app.post('/dev/seed/census', seedCtrl.populateCensusData)
app.post('/dev/seed/prison', seedCtrl.populatePrisonData)
app.post('/dev/seed/ranks', seedCtrl.generateStateRanks)
app.post('/dev/seed', seedCtrl.seedDb)

// * Data Endpoints
app.get('/api/data', ctrl.getData)
app.get('/api/states/:state', ctrl.getStateAbv)

// * Session Endpoint

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

// TODO: Write seed middleware to protect seed endpoints
// TODO: Write Postgres function and trigger to refresh materialized views on update
