import React, { useState, useEffect } from 'react'
import Fade from '@material-ui/core/Fade'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'

const WordChanger = ({
	wordOne,
	wordTwo,
	timingOne = { enter: 250, exit: 250 },
	timingTwo = { enter: 250, exit: 250 },
	transitionStart,
	delay = 0,
	wordOneProps,
	wordTwoProps,
	transOneProps,
	transTwoProps
}) => {
	const [transitions, setTransitions] = useState({
		t1: false,
		t2: false
	})
	const [timeoutClear, setTimeoutClear] = useState(null)

	useEffect(() => {
		if (transitionStart) {
			setTransitions({ t1: true, t2: false })
		}
		return () => {
			clearTimeout(timeoutClear)
		}
	}, [transitionStart, timeoutClear])
	return (
		<>
			<Fade
				in={transitions.t1}
				timeout={timingOne}
				onEnter={() => {
					const timeout = setTimeout(() => {
						setTransitions({ ...transitions, t1: false })
					}, delay)
					setTimeoutClear(timeout)
				}}
				onExited={() => {
					setTransitions({ ...transitions, t2: true })
				}}
				unmountOnExit
				{...transOneProps}
			>
				<Typography {...wordOneProps}>{wordOne}</Typography>
			</Fade>
			<Fade
				mountOnEnter
				in={transitions.t2}
				timeout={timingTwo}
				{...transTwoProps}
			>
				<Typography {...wordTwoProps}>{wordTwo}</Typography>
			</Fade>
		</>
	)
}

WordChanger.propTypes = {
	wordOne: PropTypes.string.isRequired,
	wordTwo: PropTypes.string.isRequired,
	timingOne: PropTypes.exact({
		enter: PropTypes.number,
		exit: PropTypes.number
	}),
	timingTwo: PropTypes.exact({
		enter: PropTypes.number,
		exit: PropTypes.number
	}),
	transitionStart: PropTypes.bool,
	delay: PropTypes.number,
	wordOneProps: PropTypes.object,
	wordTwoProps: PropTypes.object,
	transOneProps: PropTypes.object,
	transTwoProps: PropTypes.object
}

export default WordChanger
