const prisonData = require('./data/prisonPop2018.json')

module.exports = {
	prisonData: (req, res) => {
		let output

		if (Object.keys(req.query).length) {
			for (let query in req.query) {
				switch (query) {
					case 'state':
						if (prisonData[req.query.state]) {
							output = prisonData[req.query.state]
						} else {
							return res.status(404).send('State not found')
						}
						break
					default:
						return res.status(400).send('Query parameter not found')
				}
			}
		} else {
			output = prisonData
		}
		res.status(200).send(output)
	},

	getStateAbv: async (req, res) => {
		const db = req.app.get('db')
		const {stateName} = req.params
		console.log(stateName)

		const stateAbv = await db.get_state_abv(stateName)
		
		res.status(200).send(stateAbv[0])
	}
}
