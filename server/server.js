require('dotenv').config()
const express = require('express')
const massive = require('massive')
const ctrl = require('../server/controllers/controller')
const {SERVER_PORT, CONNECTION_STRING, FBI_API, IAT_API, PUBLICA_API} = process.env

const app = express()
app.use(express.json())

app.listen(SERVER_PORT, () => console.log(`Goliath ${SERVER_PORT} online`))