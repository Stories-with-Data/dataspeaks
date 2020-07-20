import React from 'react'
// import TransitionTemplate from '../../development/TransitionTemplate/TransitionTemplate'
import './Landing.css'
// import Loading from '../Loading/Loading';

function Landing(props) {
	return (
		<div className='landingPage'>
			<div className='bg-image'>h</div>
	
			<div className='header'>
      			<h1>See <span>U</span>. <span>S</span>. <span id='span-A'>A</span>.</h1>
      		</div>
			{/* <Loading /> */}
			<div className='missionStatement'>

					<div className='quote-div'>
						<p><cite>The Scream</cite> by Edward Munch. Painted in 1893.</p>
					</div>
					<div className='quote-div'>
						<p><cite>The Scream</cite> by Edward Munch. Painted in 1893.</p>
					</div>
					<div className='quote-div'>
						<p><cite>The Scream</cite> by Edward Munch. Painted in 1893.</p>
					</div>
				
			</div>

		</div>
	)
}

export default Landing
