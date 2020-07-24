import React, { useState, useEffect } from 'react'
import { useHistory, Link } from 'react-router-dom'
import Category from '../Category/Category'
import GetInvolved from '../GetInvolved/GetInvolved'
import './State.css'
import Rank from '../Rank/Rank'
import Fade from '@material-ui/core/Fade'
import useStatesData from '../../hooks/useStatesData'
import stateFlags from '../../assets/stateFlags/stateFlags.json'
import Typography from '@material-ui/core/Typography'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import StateHeader from './StateHeader/StateHeader'

const StateFromTable = props => {
	const { statename } = props.match.params
	const stateData = useStatesData(statename)
	const history = useHistory()
	const headerBtns = [
		{
			text: 'Get Involved',
			onClick: () => {
				toggleInvolvedVis()
			}
		},
		{
			text: 'Back',
			onClick: () => {
				// * Setting the stateVis to trigger exit transition
				setStateVis(false)
				// * Using a setTimeout synced to exit transition time
				// * before altering USMap state with handleStateClose
				setTimeout(() => {
					history.push('/states')
				}, exit)
			},
			props: {}
		}
	]
	const stateFlag = stateFlags[statename.replace(/\s/g, '')]

	const [stateVis, setStateVis] = useState(true)
	const [involvedVis, setInvolvedVis] = useState(false)
	const [highlightedRace, setHighlightedRace] = useState('')
	const [summary, setSummary] = useState()
	const [loading, setLoading] = useState(true)

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

		if (stateData.overall) {
			setLoading(false)
			setSummary(
				stateData.overall.summary
					.split(regEx)
					.map(e => (replacements[e] ? replacements[e] : e))
			)
		}
	}, [stateData.overall])

	return (
		<>
			{loading ? (
				<Backdrop open={loading}>
					<CircularProgress />
				</Backdrop>
			) : (
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
						style={{ backgroundImage: `url(.${stateFlag})` }}
					>
						<StateHeader buttons={headerBtns} />
						<div className='stateSubContainer'>
							<div className='stateHeadContainer'>
								<div className='stateTitleContainer'>
									<Typography
										align='center'
										variant='h2'
										className='stateTitle'
									>
										{stateData.overall && stateData.overall.stateName}
									</Typography>
									<div className='overall'>
										<Typography align='center'>Overall Rank</Typography>
										{stateData.overall ? (
											<Rank rank={stateData.overall.rank} />
										) : null}
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
										{stateData.categories &&
											stateData.categories[0].data[0].data.map(elem => {
												return (
													<div
														key={elem.race}
														className='legendRace'
														onClick={() => changeHighlight(elem.race)}
													>
														<div
															className='raceColor'
															style={{
																backgroundColor: getRaceColor(elem.race)
															}}
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
								{stateData.categories &&
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
								stateName={stateData.overall && stateData.overall.stateName}
							/>
						</div>
					</div>
				</Fade>
			)}
		</>
	)
}

export default StateFromTable
