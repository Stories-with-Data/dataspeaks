import React from 'react'
import TransitionTemplate from '../../development/TransitionTemplate/TransitionTemplate'
import './Landing.css'
import Axios from 'axios'

function Landing(props) {
	return (
		<div className='landingPage'>
			<div className='header'>Title animation?</div>
			<div className='missionStatement'>
				<TransitionTemplate />
			</div>
		</div>
	)
}

export default Landing
