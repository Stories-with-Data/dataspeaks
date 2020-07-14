const Axios = require('axios')

module.exports = {
	populateFbiData: async (req, res) => {
		const nonViolentCrimes = [
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
			'all-other-offenses',
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

    for (let j = 0; j < races.length; j++){
      let totalNonViolentArrests = 0
      for (let i = 0; i < nonViolentCrimes.length; i++) {
        const res = await Axios.get(`https://api.usa.gov/crime/fbi/sapi/api/arrest/national/${nonViolentCrimes[i]}/race/2018/2018?API_KEY=X8yPHRM4OynSw8CtVB8FuwP0y5J9WKng3UiIChCf`)
        console.log(res.data.data[j].value)
        
        totalNonViolentArrests += res.data.data[j].value
      }
      console.log(`NonViolent ${races[j]} ${totalNonViolentArrests}`)
    }

    for (let j = 0; j < races.length; j++){
      let totalViolentArrests = 0
      for (let i = 0; i < violentCrimes.length; i++) {
        const res = await Axios.get(`https://api.usa.gov/crime/fbi/sapi/api/arrest/national/${violentCrimes[i]}/race/2018/2018?API_KEY=X8yPHRM4OynSw8CtVB8FuwP0y5J9WKng3UiIChCf`)
        console.log(res.data.data[j].value)
        
        totalViolentArrests += res.data.data[j].value
      }
      console.log(`Violent ${races[j]} ${totalViolentArrests}`)
    }
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
