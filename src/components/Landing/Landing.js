import React from 'react'
import './Landing.css'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading';


function Landing(props) {
	return (
		<div className='landingPage'>
			<div className='bg-image'>h</div>
	
			<div className='header'>
      			<h3> <span className='span-title'>When</span> <span className='span-title'>They</span> <br/> <span>See</span> <span>U.</span> <span>S.</span> <span className='span-title2'>A.</span> </h3>
      		</div>
			<Loading />
			<div className='missionStatement'>

					<div className='quote-div'>
						
					</div>
					<div className='quote-div'>
						<p>"And if we cannot end now our differences, at least we can help make the world safe 
							for diversity. For, in the final analysis, our most basic common link is 
							that we all inhabit this small planet. We all breathe the same air. 
							We all cherish our children's future. And we are all mortal."</p>
							<cite>- John F. Kennedy</cite>
					</div>
				
			</div>
			<Link className='zIndex' to='/map'>
				<button className='button'>See Map</button>
			</Link>
		</div>
	)
}

export default Landing
