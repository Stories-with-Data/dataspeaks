import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Category from '../Category/Category'
import './State.css'
import Rank from '../Rank/Rank'
import Fade from '@material-ui/core/Fade'
// import sampleData from './SampleDataOutput.json'
import useStatesData from '../../hooks/useStatesData'
import stateFlags from '../../assets/stateFlags/stateFlags.json'
// import Paper from '@material-ui/core/Paper'

const StateFromTable = props => {
	const { statename } = props.match.params
  const stateData = useStatesData(statename)
  const history = useHistory()
	const stateFlag = stateFlags[statename.replace(/\s/g, '')]
	// const stateData = sampleData.Texas

	const [stateVis, setStateVis] = useState(false)

	// const [stateFlag, setStateFlag] = useState('')

	useEffect(() => {
		if (stateData.overall) {
			setStateVis(true)
		}
	}, [stateData])

	const exit = 500

	return (
		<>
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
                    history.push('/states')
                  }, exit)
								}}
							>
								Back
							</button>
						</div>

						<div className='categoryColumnContainer'>
							{stateData.categories
								? stateData.categories.map(elem => {
										return <Category key={elem.title} catData={elem} />
								  })
								: null}
						</div>
					</div>
				</div>
			</Fade>
		</>
	)
}

export default StateFromTable
