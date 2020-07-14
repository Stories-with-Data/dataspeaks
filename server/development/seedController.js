const Axios = require('axios')
const { stackOffsetSilhouette } = require('d3')

module.exports = {
	populateFbiData: async (req, res) => {
    const db = req.app.get('db')

		const nonViolentCrimes = [
      'all-other-offenses',
			'curfew',
			'disorderly-conduct',
			'dui',
			'drug-grand-total',
			'drunkenness',
			'embezzlement',
			'forgery',
			'fraud',
			'gambling-total',
			'larceny',
			'liqour-laws',
			'offense-against-family',
			'prostitution',
			'prostitution-assisting',
			'prostitution-prostitution',
			'prostitution-purchasing',
			'runaway',
			'stolen-property',
			'suspicion',
			'vagrancy',
			'vandalism',
			'weapons'
		]

		const violentCrimes = [
			'burglary',
			'arson',
			'human-trafficking-commerical',
			'human-trafficking-servitude',
			'motor-vehcile-theft',
			'murder',
			'rape',
			'robbery',
			'sex-offenses',
			'simple-assault',
			'aggravated-assault'
		]

		const races = [
			'Asian',
			'Native Hawaiian',
			'Black or African American',
			'American Indian or Alaska Native',
			'White',
			'Other'
    ]
    
    const states = await db.get_states_list()

    const crimes = violentCrimes.concat(nonViolentCrimes)
    
    for (let k = 1; k < states.length; k++) {
      for (let j = 0; j < races.length; j++){
        let totalNonViolentArrests = 0
        let totalViolentArrests = 0
        for (let i = 0; i < crimes.length; i++) {
          const res = await Axios.get(`https://api.usa.gov/crime/fbi/sapi/api/arrest/states/${states[k].state_abv}/${crimes[i]}/race/2018/2018?API_KEY=X8yPHRM4OynSw8CtVB8FuwP0y5J9WKng3UiIChCf`)
          
          if (res.data.data[0]){
            if(nonViolentCrimes.includes(crimes[i])){
              totalNonViolentArrests += res.data.data[j].value
            }
            else {
              totalViolentArrests += res.data.data[j].value
            }
          }
        }
        console.log(`insert into fbi_data (state_abv, race, violent_arrests, non_violent_arrests) values ('${states[k].state_abv}', '${races[j]}', ${totalViolentArrests}, ${totalNonViolentArrests});`)
      }
    }
    console.log('The script has run. copy an paste the above console logs into seed.sql')
  },

  seedDb: async (req, res) => {
		const db = req.app.get('db')

		try {
			await db.seed()
		} catch (err) {
			console.error(err)
		}
		res.sendStatus(200)
	}
}
