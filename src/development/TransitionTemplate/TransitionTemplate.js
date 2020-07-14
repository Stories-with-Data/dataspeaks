import React, { useState } from 'react'
import Collapse from '@material-ui/core/Collapse'
import Fade from '@material-ui/core/Fade'
import Grow from '@material-ui/core/Grow'
import Slide from '@material-ui/core/Slide'
import Zoom from '@material-ui/core/Zoom'

const TransitionTemplate = () => {
  // * Determines whether transition children are visible
	const [transitions, setTransitions] = useState({
		transition1: true,
		transition2: false
	})

  // * Determines how long transition takes to enter and exit (in milliseconds)
	const timing = {
		transition1: { enter: 500, exit: 500 },
		transition2: { enter: 500, exit: 500 }
	}

  // * Function that fires as soon as transition changes from FALSE to TRUE 
	const onEntering = {
		transition1: () => {},
		transition2: () => {}
	}

  // * Function that fires as soon as transition enter has completed
	const onEntered = {
		transition1: () => {
      // * If you want to delay the exit of a transition
      setTimeout(() => {
        setTransitions({ ...transitions, transition1: false })
      }, 1000) // ! Set Delay here in milliseconds
			// setTransitions({ ...transitions, transition1: false })
		},
		transition2: () => {}
  }
  
  // * Function that fires as soon as transition changes from TRUE to FALSE
	const onExiting = {
		transition1: () => {},
		transition2: () => {}
	}

  // * Function that fires as soon as transition exit has completed
	const onExited = {
		transition1: () => {
      setTransitions({ ...transitions, transition2: true })
    },
		transition2: () => {}
	}

	return (
		<>
			<Fade // ! TRANSITION 1
				mountOnEnter
				unmountOnExit
				timeout={timing.transition1}
				in={transitions.transition1}
				onEntering={onEntering.transition1}
				onEntered={onEntered.transition1}
				onExiting={onExiting.transition1}
				onExited={onExited.transition1}
			>
        <h1>Transition 1</h1>
				{/* INSERT STUFF TO TRANSITION TO HERE */}
			</Fade>
			<Fade // ! TRANSITION 2
				mountOnEnter
				unmountOnExit
				timeout={timing.transition2}
				in={transitions.transition2}
				onEntering={onEntering.transition2}
				onEntered={onEntered.transition2}
				onExiting={onExiting.transition2}
				onExited={onExited.transition2}
        >
        <h1>Transition 2</h1>
				{/* INSERT STUFF TO TRANSITION TO HERE */}
			</Fade>
		</>
	)
}

export default TransitionTemplate
