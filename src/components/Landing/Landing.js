import React from 'react'
import TransitionTemplate from '../../development/TransitionTemplate/TransitionTemplate'
import './Landing.css'
import Loading from '../Loading/Loading';

function Landing(props) {
	return (
		<div className='landingPage'>
			<div className='header'>
      			<h1>See <span>U</span>. <span>S</span>. <span id='span-A'>A</span>.</h1>
      		</div>
			<Loading />
			<div className='missionStatement'>
        		<h1>Mission Statement</h1>
			</div>
		</div>
	)
}

export default Landing
