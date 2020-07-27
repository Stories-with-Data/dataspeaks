require('dotenv').config()
const express = require('express'),
	massive = require('massive'),
	ctrl = require('./controllers/controller'),
	middlewareCtrl = require('./middleware/controller'),
	seedCtrl = require('./controllers/seedController'),
	session = require('express-session'),
	path = require('path'),
	{ SERVER_PORT, CONNECTION_STRING, SESSION_SECRET } = process.env

const app = express()

app.use(express.json())
app.use(
	session({
		resave: false,
		rolling: true,
		saveUninitialized: true,
		secret: SESSION_SECRET,
		cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 } // 30 Days
	})
)



app.use(express.static(`${__dirname}/../build`))

// * Development Endpoints
app.post('/dev/seed/fbi', seedCtrl.populateFbiData)
app.post('/dev/seed/census', seedCtrl.populateCensusData)
app.post('/dev/seed/prison', seedCtrl.populatePrisonData)
app.post('/dev/seed/ranks', seedCtrl.generateStateRanks)
app.post(
	'/dev/seed',
	seedCtrl.seedDb,
	seedCtrl.populatePrisonData,
	seedCtrl.generateStateRanks
)

// * Data Endpoints
app.get('/api/data', middlewareCtrl.mapViews, ctrl.getData)
app.get('/api/states/:state', ctrl.getStateAbv)

// * Session Endpoint
app.get('/session',middlewareCtrl.totalViews,  (req, res) => res.status(200).send(req.session))

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, '../build/index.html'))
})

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
// // TODO: Write Postgres function and trigger to refresh materialized views on update
