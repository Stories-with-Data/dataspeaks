import React, { useState } from 'react'
import Category from '../Category/Category'
import './State.css'
import Rank from '../Rank/Rank'
import Fade from '@material-ui/core/Fade'
import GetInvolved from '../GetInvolved/GetInvolved'
import {VictorySharedEvents} from 'victory'
// import Paper from '@material-ui/core/Paper'

function State(props) {
	const { stateData, handleStateClose, stateFlag } = props

	const [stateVis, setStateVis] = useState(true)
	const [involvedVis, setInvolvedVis] = useState(false)
	const [highlightedRace, setHighlightedRace] = useState('')

	const exit = 500

	const toggleInvolvedVis = () => {
		setInvolvedVis(!involvedVis)
	}

	const changeHighlight = (race) => {
		setHighlightedRace(race)
	}

	const getRaceColor = (race) => {
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

	return (
		<Fade
			mountOnEnter
			in={stateVis}
			timeout={{ enter: 500, exit }}
			unmountOnExit
		>
			<div
				className='stateContainer'
				style={{ backgroundImage: `url(${stateFlag})` }}
			>
				<div className='stateSubContainer'>
					<div className='stateHeadContainer'>
						<div className='stateTitleContainer'>
							<h1 className='stateTitle'>{stateData.overall.stateName}</h1>
							<div className='overall'>
								Overall Rank
								<Rank rank={stateData.overall.rank} />
							</div>
						</div>

						<div className='summaryContainer'>
							<div className='summary'>{stateData.overall.summary}</div>
						</div>

						{/* <div className='flagImageContainer'>
							<svg className='flagSvg'>
								<image className='flagSvg' xlinkHref={stateFlag} />
							</svg>
						</div> */}
					</div>

					<div className='closeStateBtnContainer'>
						<button
							className='button'
							onClick={() => {
								// * Setting the stateVis to trigger exit transition
								setStateVis(false)
								// * Using a setTimeout synced to exit transition time
								// * before altering USMap state with handleStateClose
								setTimeout(() => {
									handleStateClose()
								}, exit)
							}}
						>
							Close
						</button>
					</div>

					<button onClick={() => toggleInvolvedVis()} className='button'>
						Get Involved
					</button>

					<div className='stateRaceLegend'>
						<h4>Legend</h4>
						<div className='legendRaceContainer'>
							{stateData.categories[0].data[0].data.map(elem => {
								return (
									<div 
										className='legendRace'
										onClick={() => changeHighlight(elem.race)}
									>
										<div 
											className='raceColor'
											style={{backgroundColor: getRaceColor(elem.race)}}
											>
										</div>
										<p>{`:	${elem.race}`}</p>
									</div>
								)
							})}
						</div>
					</div>

					<div className='categoryColumnContainer'>
						{stateData.categories.map(elem => {
							return (
								<Category 
									key={elem.title} 
									highlighted={highlightedRace} 
									changeHighlight={changeHighlight}
									catData={elem} />
							)
						})}
					</div>
				</div>
				<div className={`involvedVis${involvedVis}`}>
					<GetInvolved 
						toggleInvolvedVis={toggleInvolvedVis} 
						stateName={stateData.overall.stateName} 
					/>
				</div>
			</div>
		</Fade>
	)
}

export default State
