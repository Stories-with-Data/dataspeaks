const prisonData = require('./data/prisonPop2018.json'),
  sampleData = require('../development/SampleDataOutput.json')

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
	}
}