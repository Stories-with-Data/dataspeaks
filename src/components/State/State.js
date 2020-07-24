import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Category from '../Category/Category'
import './State.css'
import Rank from '../Rank/Rank'
import Fade from '@material-ui/core/Fade'
import GetInvolved from '../GetInvolved/GetInvolved'
import StateHeader from './StateHeader/StateHeader'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Typography from '@material-ui/core/Typography'

function State(props) {
	const { stateData, handleStateClose, stateFlag } = props

	const [stateVis, setStateVis] = useState(true)
	const [involvedVis, setInvolvedVis] = useState(false)
	const [highlightedRace, setHighlightedRace] = useState('')
	const [summary, setSummary] = useState()


	const exit = 500

	const toggleInvolvedVis = () => {
		setInvolvedVis(!involvedVis)
	}

	const changeHighlight = race => {
		setHighlightedRace(race)
	}

	const resetCharts = e => {
		if (e.target.nodeName !== 'path') {
			setHighlightedRace('')
		}
	}

	const getRaceColor = race => {
		switch (race) {
			case highlightedRace:
				return '#fce21b'
			case 'Black or African American':
				return highlightedRace ? '#00000070' : '#000000'
			case 'White or Caucasian':
				return highlightedRace ? '#ffffff70' : '#ffffff'
			case 'Asian':
				return highlightedRace ? '#C47AC070' : '#C47AC0'
			case 'American Indian or Alaska Native':
				return highlightedRace ? '#2B972070' : '#2B9720'
			case 'Native Hawaiian or Pacific Islander':
				return highlightedRace ? '#32CBFF70' : '#32CBFF'
			case 'Other':
				return highlightedRace ? '#1B3B6F70' : '#1B3B6F'
			default:
				return highlightedRace ? '#32CBFF70' : '#32CBFF'
		}
	}

	const headerBtns = [
		{
			text: 'Get Involved',
			onClick: () => {
				toggleInvolvedVis()
			}
		},
		{
			text: 'Back to Map',
			onClick: () => {
				setStateVis(false)
				setTimeout(() => {
					handleStateClose()
				}, exit)
			}
		}
	]


	useEffect(() => {
		const replacements = {
			$$IAT$$: (
				<Link key='iatSumLink' className='summaryLink' to='/methodology#iat'>
					Harvard's Race IAT
				</Link>
			),
			$$ARREST_RATE$$: (
				<Link
					key='arSumLink'
					className='summaryLink'
					to='/methodology#arrestRate'
				>
					arrest rate
				</Link>
			),
			$$CIR$$: (
				<Link key='cirSumLink' className='summaryLink' to='/methodology#cir'>
					currently incarcerated
				</Link>
			),
			$$POPULATION$$: (
				<Link
					key='popSumLink'
					className='summaryLink'
					to='/methodology#population'
				>
					Black or African American population
				</Link>
			)
		}
		const regEx = /(\$\$IAT\$\$|\$\$CIR\$\$|\$\$ARREST_RATE\$\$|\$\$POPULATION\$\$)/

		setSummary(
			stateData.overall.summary
				.split(regEx)
				.map(e => (replacements[e] ? replacements[e] : e))
		)
	}, [stateData.overall.summary])

	return (
		<Fade
			mountOnEnter
			in={stateVis}
			timeout={{ enter: 500, exit }}
			unmountOnExit
		>
			<div
				onScroll={() => {
					if (involvedVis) {
						setInvolvedVis(false)
					}
				}}
				className='stateContainer'
				style={{ backgroundImage: `url(${stateFlag})` }}
			>
				<StateHeader buttons={headerBtns} />
				<div className='stateSubContainer'>
					<div className='stateHeadContainer'>
						<div className='stateTitleContainer'>
							<Typography align='center' variant='h2' className='stateTitle'>
								{stateData && stateData.overall.stateName}
							</Typography>
							<div className='overall'>
								<Typography align='center'>Overall Rank</Typography>
								<Rank rank={stateData.overall.rank} />
							</div>
						</div>

						<div className='summaryContainer'>
							<div className='summary'>{summary}</div>
						</div>
					</div>

					<ClickAwayListener onClickAway={resetCharts}>
						<div className='stateRaceLegend'>
							<h4>Legend</h4>
							<div className='legendRaceContainer'>
								{stateData &&
									stateData.categories[0].data[0].data.map(elem => {
										return (
											<div
												key={elem.race}
												className='legendRace'
												onClick={() => changeHighlight(elem.race)}
											>
												<div
													className='raceColor'
													style={{ backgroundColor: getRaceColor(elem.race) }}
												>
													<Typography
														variant='body1'
														style={{
															color:
																elem.race === 'White or Caucasian'
																	? '#000'
																	: highlightedRace === elem.race
																	? '#000'
																	: '#fff',
															fontWeight:
																highlightedRace === elem.race
																	? 'bolder'
																	: 'normal'
														}}
													>{`${elem.race}`}</Typography>
												</div>
											</div>
										)
									})}
							</div>
						</div>
					</ClickAwayListener>
					<div className='categoryColumnContainer'>
						{stateData &&
							stateData.categories.map(elem => {
								return (
									<Category
										key={elem.title}
										highlighted={highlightedRace}
										changeHighlight={changeHighlight}
										catData={elem}
									/>
								)
							})}
					</div>
				</div>
				<div className={`involvedVis${involvedVis}`}>
					<GetInvolved
						open={involvedVis}
						toggleInvolvedVis={toggleInvolvedVis}
						stateName={stateData && stateData.overall.stateName}
					/>
				</div>
			</div>
		</Fade>
	)
}

export default State
