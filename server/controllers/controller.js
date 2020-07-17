const sampleData = require('../development/SampleDataOutput.json')

module.exports = {
	getData: async (req, res) => {
		const db = req.app.get('db'),
			states = await db.get_states_list()

		let output

		const ranks = {
			iat: await db.get_iat_rank(),
			arrest: ''
		}

		for (let i = 0; i < states.length; i++) {
			output[states[i].state_name] = {
				overall: {
					stateName: states[i].state_name,
					rank: 2
				}
			}
		}

		res.status(200).send(states)
	},
	getStateAbv: async (req, res) => {
		const db = req.app.get('db')
		const { stateName } = req.params
		console.log(stateName)

		const stateAbv = await db.get_state_abv(stateName)

		res.status(200).send(stateAbv[0])
	},

	sampleData: (req, res) => {
		res.status(200).send(sampleData)
	}
}
