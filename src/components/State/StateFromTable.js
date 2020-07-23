import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Category from '../Category/Category'
import GetInvolved from '../GetInvolved/GetInvolved'
import './State.css'
import Rank from '../Rank/Rank'
import Fade from '@material-ui/core/Fade'
import useStatesData from '../../hooks/useStatesData'
import stateFlags from '../../assets/stateFlags/stateFlags.json'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import StateHeader from './StateHeader/StateHeader'

const StateFromTable = props => {
	const { statename } = props.match.params
	const stateData = useStatesData(statename)
	const history = useHistory()
	const stateFlag = stateFlags[statename.replace(/\s/g, '')]

	const [stateVis, setStateVis] = useState(false)
	const [involvedVis, setInvolvedVis] = useState(false)

	const toggleInvolvedVis = () => {
		setInvolvedVis(!involvedVis)
	}

	useEffect(() => {
		if (stateData.overall) {
			setStateVis(true)
		}
	}, [stateData])

	const exit = 500

	const headerBtns = [
		{
			text: 'Get Involved',
			onClick: () => {
				toggleInvolvedVis()
			}
		},
		{
			text: 'Reset',
			onClick: () => {
				// resetCharts()
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

	return (
		<>
			<Backdrop open={!stateVis} transitionDuration={{ enter: 50, exit: 750 }}>
				<CircularProgress />
			</Backdrop>
			<Fade
				mountOnEnter
				in={stateVis}
				timeout={{ enter: 500, exit }}
				unmountOnExit
			>
				<div
					className='stateContainer'
					style={{ backgroundImage: `url(.${stateFlag})` }}
				>
					<StateHeader buttons={headerBtns} />
					<div className='stateSubContainer'>
						<div className='stateHeadContainer'>
							<div className='stateTitleContainer'>
								<h1 className='stateTitle'>
									{stateData.overall ? stateData.overall.stateName : ''}
								</h1>
								<div className='overall'>
									Overall Rank
									{stateData.overall ? (
										<Rank rank={stateData.overall.rank} />
									) : null}
								</div>
							</div>

							<div className='summaryContainer'>
								<div className='summary'>
									{stateData.overall ? stateData.overall.summary : ''}
								</div>
							</div>
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
										history.push('/states')
									}, exit)
								}}
							>
								Back
							</button>
						</div>

						{/* <button onClick={() => toggleInvolvedVis()} className='button'>
							Get Involved
						</button> */}

						<div className='categoryColumnContainer'>
							{stateData.categories
								? stateData.categories.map(elem => {
										return <Category key={elem.title} catData={elem} />
								  })
								: null}
						</div>
					</div>
					<div className={`involvedVis${involvedVis}`}>
						<GetInvolved
							toggleInvolvedVis={toggleInvolvedVis}
							stateName={statename}
						/>
					</div>
				</div>
			</Fade>
		</>
	)
}

export default StateFromTable
