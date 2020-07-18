import React, { useState, useEffect } from 'react'
import Odometer from 'react-odometerjs'
import ordinal from 'ordinal-numbers'
import Grow from '@material-ui/core/Grow'
import './Rank.css'

// import "odometer/themes/odometer-theme-car.css";

import 'odometer/themes/odometer-theme-default.css'
// import "odometer/themes/odometer-theme-minimal.css";
// import "odometer/themes/odometer-theme-car.css"
// import "odometer/themes/odometer-theme-plaza.css"
// import "odometer/themes/odometer-theme-slot-machine.css"
// import "odometer/themes/odometer-theme-train-station.css"
// import "odometer/themes/odometer-theme-digital.css"
// Odometer themes above

const Rank = ({ rank }) => {
	const [odomValue, setOdom] = useState('0')
	const [ordinalEnter, setOrdinalEnter] = useState(false)

	useEffect(() => {
		setOdom(rank)
		setTimeout(() => {
			setOrdinalEnter(true)
		}, 2200)
	}, [rank])

	const ordinalRank = ordinal(rank)
    
	return (
		<div className='odometerContainer'>
			<Odometer
				className='odom'
				value={odomValue}
				format='(.ddd)'
			/>
			<Grow
				timeout={{
					enter: 500,
					exit: 500
				}}
				in={ordinalEnter}
				unmountOnExit
			>
				<span className='rankOrdinal'>
					{ordinalRank.substring(ordinalRank.length - 2)}
				</span>
			</Grow>
		</div>
	)
}

export default Rank
