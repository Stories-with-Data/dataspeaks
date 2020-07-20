const ordinal = require('ordinal-numbers')

module.exports = {
	getData: async (req, res) => {
		const db = req.app.get('db'),
			states = await db.state_ranks.find().catch(err => console.log(err)),
			data = await db.get_return_data()

		//#region  //! SCHEMA for states:
		// ! All columns except state_name are the state's rank in the category
		// * state_name
		// * iat
		// * arrest_rate
		// * incarcerated_rate
		// * black_pop
		// * overall
		//#endregion

		// #region //! SCHEMA for data:
		// * state
		// * race
		// * population
		// * iat_responses
		// * iat_sum
		// * iat_avg
		// * non_violent_arrests
		// * non_violent_arrest_rate
		// * violent_arrests
		// * violent_arrest_rate
		// * prison_pop_count
		// * currently_incarcerated_rate
		//#endregion

		let output = {}

		// * Looping over states array to generate output data
		states.forEach(async state => {
			// * destructuring all ranks
			const {
					state_name: stateName,
					iat: iatRank,
					arrest_rate: arRank,
					incarcerated_rate: cirRank,
					black_pop: bpRank,
					overall: overallRank
				} = state,
				// * Filter out other states from data
				stateData = data.filter(d => d.state === stateName),
				// * Find total population ('All races' in race column of data)
				stateTotPop =
					stateData[stateData.findIndex(j => j.race === 'All races')].population

			//#region
			output[stateName] = {
				overall: {
					stateName,
					rank: overallRank,
					summary: `The state of ${stateName} is ${ordinal(
						iatRank
					)} in overall score on Harvard's Race IAT by the state's White population while it's Black or African American population size is ${ordinal(
						bpRank
					)} in the nation (Based on 2019 Census Estimate Data). Additionally, ${stateName} has the ${ordinal(
						arRank
					)} highest overall arrest rate of Black or African Americans (according to FBI 2018 arrest data) and the ${ordinal(
						cirRank
					)} highest rate of Black or African American's currently incarcerated (per 100,000 based on Bureau of Justice Prisoners in 2018 Report).`
				},
				categories: [
					// * IAT Category
					{
						title: 'IAT',
						rank: iatRank,
						tooltip:
							'Harvard Implicit Association Test Data aggregated from completed responses between 2015 and 2019',
						data: [
							{
								chartType: 'bar',
								chartTitle: 'Mean IAT Score',
								data: stateData
									.filter(e => e.iat_avg)
									.map(d => {
										return {
											race: d.race,
											value: d.iat_avg,
											label: `${d.race} IAT Race Score of ${Number.parseFloat(d.iat_avg).toPrecision(3)} \nBased on ${d.iat_responses} responses between 2015 and 2019`
										}
									})
							}
						]
					},
					// * Arrest Rate Category
					{
						title: 'Arrest Rate',
						rank: arRank,
						tooltip:
							'Arrest Rate per 100,000 based on 2018 FBI Arrest Data and 2019 Census Population Estimates',
						data: [
							{
								chartType: 'stackedBar',
								chartTitle: '',
								data: {
									categories: [
										{
											name: 'Violent Crimes',
											description: `Violent crimes include: Burglary, Arson, Human Trafficking Commercial, Human Trafficking Servitude, Motor Vehicle Theft, Murder, Rape, Robbery, Sex Offenses, Simple Assault, Aggravated Assault`
										},
										{
											name: 'Non-violent Crimes',
											description: `Non-violent crimes include: All Other Offenses, Curfew, Disorderly Conduct, Dui, Drug Grand Total, Drunkenness, Embezzlement, Forgery, Fraud, Gambling Total, Larceny, Liquor Laws, Offense Against Family, Prostitution, Prostitution Assisting, Prostitution Prostitution, Prostitution Purchasing, Runaway, Stolen Property, Suspicion, Vagrancy, Vandalism, Weapons`
										} 

									],
									values: stateData.reduce((a, c) => {
										if (c.violent_arrest_rate) {
											return [
												...a,
												{
													race: c.race,
													category: 'Violent Crimes',
													value: c.violent_arrest_rate,
													label: `${c.violent_arrest_rate} per 100,000\nBased on a ${c.race} state population of ${c.population} in 2019 \nand ${c.violent_arrests} arrests for Violent crimes in 2018`
												},
												{
													race: c.race,
													category: 'Non-violent Crimes',
													value: c.non_violent_arrest_rate,
													label: `${c.non_violent_arrest_rate} per 100,000\nBased on a ${c.race} state population of ${c.population} in 2019 \nand ${c.non_violent_arrests} arrests for Non-Violent crimes in 2018`
												}
											]
										} else {
											return a
										}
									}, [])
								}
							}
						]
					},
					// * Currently Incarcerated Rate
					{
						title: 'Currently Incarcerated Rate (CIR)',
						rank: cirRank,
						tooltip:
							'Rate per 100,000 based on 2018 Bureau of Justice year-end prison population and 2019 Census Bureau estimates',
						data: [
							{
								chartType: 'bar',
								chartTitle: 'CIR',
								data: stateData
									.filter(e => e.currently_incarcerated_rate)
									.map(d => {
										return {
											race: d.race,
											value: d.currently_incarcerated_rate,
											label: `Per 100,000 based on a 2018 year-end prison population of ${d.prison_pop_count} and a state ${d.race} population of ${d.population}.`
										}
									})
							}
						]
					},
					// * Census Population Data
					{
						title: 'Black or African American Population',
						rank: bpRank,
						tooltip: `Based on 2019 Census Bureau Estimates`,
						data: [
							{
								chartType: 'pie',
								chartTitle: 'Est. 2019 population by race',
								data: stateData
									.filter(e => e.race !== 'All races')
									.map(d => {
										return {
											race: d.race,
											value: Math.round((d.population / stateTotPop) * 100),
											label: `${Math.round(
												(d.population / stateTotPop) * 100
											)}% of ${stateName}'s population \nBased on a ${
												d.race
											} population of ${
												d.population
											} \nand a total population of ${stateTotPop}`
										}
									})
							}
						]
					}
				]
			}
			//#endregion
		})

		res.status(200).send(output)
	}
}
