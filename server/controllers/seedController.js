const axios = require('axios'),
	fs = require('fs'),
	prisonData = require('../development/prisonPop2018.json')

module.exports = {
	populateFbiData: async (req, res) => {
		const db = req.app.get('db'),
			{ DATA_GOV_API_KEY } = process.env

		fs.writeFileSync('./server/development/fbi.sql', '')

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
			'liquor-laws',
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
			'human-trafficking-commercial',
			'human-trafficking-servitude',
			'motor-vehicle-theft',
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
			for (let j = 0; j < races.length; j++) {
				let totalNonViolentArrests = 0
				let totalViolentArrests = 0
				for (let i = 0; i < crimes.length; i++) {
					const res = await axios.get(
						`https://api.usa.gov/crime/fbi/sapi/api/arrest/states/${states[k].state_abv}/${crimes[i]}/race/2018/2018?API_KEY=${DATA_GOV_API_KEY}`
					)

					if (res.data.data[0]) {
						if (nonViolentCrimes.includes(crimes[i])) {
							totalNonViolentArrests += res.data.data[j].value
						} else {
							totalViolentArrests += res.data.data[j].value
						}
					}
				}
				console.log(
					`insert into fbi_data (state_abv, race, violent_arrests, non_violent_arrests) values ('${states[k].state_abv}', '${races[j]}', ${totalViolentArrests}, ${totalNonViolentArrests});`
				)

				fs.appendFileSync(
					'./server/development/fbi.sql',
					`insert into fbi_data (state_abv, race, violent_arrests, non_violent_arrests) values ('${states[k].state_abv}', '${races[j]}', ${totalViolentArrests}, ${totalNonViolentArrests});\r\n`
				)
			}
		}
		console.log(
			'The script has run. copy an paste the above console logs into seed.sql'
		)
	},
	seedDb: async (req, res, next) => {
		const db = req.app.get('db')

		try {
			await db.withTransaction(async tx => {
				await tx.seed.seed()
				console.log('Seed initialized')
				await tx.seed.seed_races()
				console.log('Races seeded')
				await tx.seed.seed_states()
				console.log('States seeded')
				await tx.seed.seed_iat_data()
				console.log('iat_data seeded')
				await tx.seed.seed_fbi_data()
				console.log('fbi_data seeded')
				await tx.seed.seed_census_data()
				console.log('census_data seeded')
				await tx.seed.seed_refresh_view()
				console.log('refresh_view seeded')
			})
			next()
		} catch (err) {
			console.error(err)
			res.sendStatus(500)
		}
	},
	populateCensusData: async (req, res) => {
		const db = req.app.get('db'),
			states = await db.get_states_list().catch(err => console.error(err)),
			races = await db.get_races_list().catch(err => console.error(err)),
			{ CENSUS_API_KEY } = process.env

		await states.forEach(async state => {
			await races.forEach(async race => {
				if (state.census_id && race.census_lookup && state.census_id !== ' ') {
					const { data: censusData } = await axios
						.get(
							`https://api.census.gov/data/2019/pep/charage?get=POP&for=state:${state.census_id}&RACE=${race.census_lookup}&key=${CENSUS_API_KEY}`
						)
						.catch(err => {
							console.log(err.code)
						})

					if (censusData[1]) {
						await db.census_data
							.insert({
								state: state.state_name,
								race: race.name,
								year: 2019,
								population: +censusData[1][0]
							})
							.catch(err => {
								if (err.code === 53300) {
									setTimeout(async () => {
										await db.census_data.insert({
											state: state.state_name,
											race: race.name,
											year: 2019,
											population: +censusData[1][0]
										})
									}, 0)
								}
							})
						console.log(`${state.state_name} - ${race.name} finished`)
					}
				}
			})
		})

		res.sendStatus(200)
	},
	populatePrisonData: async (req, res, next) => {
		const db = req.app.get('db')

		const raceConversion = {
			total: null,
			white: 1,
			black: 2,
			hispanic: 7,
			asian: 3,
			pacificIslander: 4,
			americanIndian: 5,
			twoOrMore: null,
			other: 6,
			unknown: 6,
			didNotReport: 0
		}
		const populateData = async () => {
			for (let state in prisonData) {
				for (let race in prisonData[state]) {
					if (race !== 'note') {
						try {
							await db.prison_data.insert({
								state_name: state,
								race: raceConversion[race],
								pop_count: prisonData[state][race],
								year: 2018
							})
						} catch (err) {
							console.error(err)
						}
						console.log(`${state} - ${race} finished`)
						// console.log({
						// 	state_name: state,
						// 	race: raceConversion[race],
						// 	pop_count: prisonData[state][race],
						// 	year: 2018
						// })
					}
				}
			}
		}

		await populateData()

		next()
	},
	generateStateRanks: async (req, res) => {
		const db = req.app.get('db')

		// * This async await syntax will allow all of the database query functions to execute
		// * simultaneously, but it won't continue until all are complete.

		let [iat, arrestRate, ciRate, blackPop, states] = await Promise.all([
			db.ranks_iat(),
			db.ranks_arrest_rate(),
			db.ranks_cir(),
			db.ranks_black_pop(),
			db.get_states_list()
		]).catch(err => {
			console.error(err)
		})

		// * Uncomment to see the schema
		// console.table(iat)
		// console.table(arrestRate)
		// console.table(ciRate)
		// console.table(blackPop)

		// * Function to calculate overall rank. Will allow easy adjustments.
		// TODO: Figure out how to generate overall rank with unique rank position.
		// const overallRank = (iatI, arI, cirI, bpI) => {
		// 	const rankSum =
		// 		+iat[iatI].rank +
		// 		+arrestRate[arI].rank +
		// 		+ciRate[cirI].rank +
		// 		+blackPop[bpI].rank

		// 	return Math.round(rankSum / 4)
		// }

		// * Used to filter out the following rows from the states table
		const excludedStates = ['Federal', 'None', 'Washington DC']

		// * Looping over states array to update state_ranks table
		states.forEach(async (state, i) => {
			if (!excludedStates.includes(state.state_name)) {
				// * Finding index in each array for the current state
				const iatI = iat.findIndex(e => e.state_name === state.state_name),
					arI = arrestRate.findIndex(e => e.state_name === state.state_name),
					cirI = ciRate.findIndex(e => e.state_name === state.state_name),
					bpI = blackPop.findIndex(e => e.state_name === state.state_name)

				try {
					await db.state_ranks.insert(
						{
							state_name: state.state_name,
							iat: iat[iatI].rank,
							arrest_rate: arrestRate[arI].rank,
							incarcerated_rate: ciRate[cirI].rank,
							black_pop: blackPop[bpI].rank
						},
						{
							onConflict: {
								target: 'state_name',
								action: 'update'
							}
						}
					)
				} catch (err) {
					console.log(err)
				}

				console.log(`${state.state_name}'s rank updated`)
			}
		})

		res.sendStatus(200)
	}
}
