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
		transition2: false,
		transition3: false,
		transition4: false,
		transition5: false,
		transition6: false,
		transition7: false,
		transition8: false,
		transition9: false,
	})

	// * Determines how long transition takes to enter and exit (in milliseconds)
	const timing = {
		transition1: { enter: 500, exit: 500 },
		transition2: { enter: 500, exit: 500 },
		transition3: { enter: 500, exit: 500 },
		transition4: { enter: 500, exit: 500 },
		transition5: { enter: 500, exit: 500 },
		transition6: { enter: 500, exit: 500 },
		transition7: { enter: 500, exit: 500 },
		transition8: { enter: 500, exit: 500 },
		transition9: { enter: 500, exit: 500 }
	}

	// * Function that fires as soon as transition changes from FALSE to TRUE
	const onEntering = {
		transition1: () => {},
		transition2: () => {},
		transition3: () => {},
		transition4: () => {},
		transition5: () => {},
		transition6: () => {},
		transition7: () => {},
		transition8: () => {},
		transition9: () => {},
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
		transition2: () => {
			setTimeout(() => {
				setTransitions({ ...transitions, transition2: false })
			  },1000)
		},
		transition3: () => {
			setTimeout(() => {
				setTransitions({ ...transitions, transition3: false })
			  },1000)
		},
		transition4: () => {
			setTimeout(() => {
				setTransitions({ ...transitions, transition4: false })
			  },1000)
		},
		transition5: () => {
			setTimeout(() => {
				setTransitions({ ...transitions, transition5: false })
			  },1000)
		},
		transition6: () => {
			setTimeout(() => {
				setTransitions({ ...transitions, transition6: false })
			  },1000)
		},
		transition7: () => {
			setTimeout(() => {
				setTransitions({ ...transitions, transition7: false })
			  },1000)
		},
		transition8: () => {
			setTimeout(() => {
				setTransitions({ ...transitions, transition8: false })
			  },1000)
		},
		transition9: () => {
			setTimeout(() => {
				setTransitions({ ...transitions, transition9: false })
			  },1000)
		},
  }
  
  // * Function that fires as soon as transition changes from TRUE to FALSE
	const onExiting = {
		transition1: () => {},
		transition2: () => {},
		transition3: () => {},
		transition4: () => {},
		transition5: () => {},
		transition6: () => {},
		transition7: () => {},
		transition8: () => {},
		transition9: () => {}
	}

	// * Function that fires as soon as transition exit has completed
	const onExited = {
		transition1: () => {
        setTransitions({ ...transitions, transition2: true })
      },
		transition2: () => {
		setTransitions({ ...transitions, transition3: true })
	  },
	  transition3: () => {
		setTransitions({ ...transitions, transition4: true })
	  },
	  transition4: () => {
		setTransitions({ ...transitions, transition5: true })
	  },
	  transition5: () => {
		setTransitions({ ...transitions, transition6: true })
	  },
	  transition6: () => {
		setTransitions({ ...transitions, transition7: true })
	  },
	  transition7: () => {
		setTransitions({ ...transitions, transition8: true })
	  },
	  transition8: () => {
		setTransitions({ ...transitions, transition9: true })
	  },
	  transition9: () => {
		setTransitions({ ...transitions, transition10: true })
	  },
		
		
	}
	const BLMimages = ['https://i.insider.com/5b537d1157a20731008b4577?width=1100&format=jpeg&auto=webp','https://media3.s-nbcnews.com/i/newscms/2015_42/633526/140824-michael-brown-4p_08ecc72838564eecdc6a811f80158e3c.jpg','https://cdn.vox-cdn.com/thumbor/p-aprsQmpuSxJTP8zc1deomEmQI=/0x0:890x688/1200x800/filters:focal(466x227:608x369)/cdn.vox-cdn.com/uploads/chorus_image/image/55008753/B3KG3RmIAAABp6r.0.0.jpg']
	BLMimages[3] = 'https://bloximages.newyork1.vip.townnews.com/postandcourier.com/content/tncms/assets/v3/editorial/1/8a/18a2f634-18aa-11e7-bf21-7bc0c5c57ffb/58e2ad35a7c58.image.jpg'
	BLMimages[4] = 'https://cdn.vox-cdn.com/thumbor/Y0X6xIdD2okd13XpNriRI8hwI9c=/0x34:514x420/1200x800/filters:focal(0x34:514x420)/cdn.vox-cdn.com/uploads/chorus_image/image/50036359/Alton_20sterling.0.jpg'
	BLMimages[5] = 'https://www.twincities.com/wp-content/uploads/2016/07/castile-philando-2.jpg'
	BLMimages[6] = 'https://s.abcnews.com/images/US/shooting-victim-01-kxtv-jrl-180321_hpMain_16x9_1600.jpg'
	BLMimages[7] = 'https://media2.s-nbcnews.com/i/newscms/2020_20/3351286/200515-breonna-taylor-al-0958_9d27d03246118154eaeab4510feb36a7.jpg'
	BLMimages[8] = 'https://upload.wikimedia.org/wikipedia/en/9/9c/George_Floyd.png'
	
	// https://upload.wikimedia.org/wikipedia/en/6/63/Sandra_Bland_re-crop.jpg
	return (
		<>
			<Fade // ! TRANSITION 1
				mountOnEnter  timeout={timing.transition1} in={transitions.transition1} onEntering={onEntering.transition1} onEntered={onEntered.transition1} onExiting={onExiting.transition1} onExited={onExited.transition1} >
        		<img id='BLMimage' alt='.img' src={BLMimages[0]} />
				{/* INSERT STUFF TO TRANSITION TO HERE */}
			</Fade>
			<Fade // ! TRANSITION 2
				mountOnEnter  timeout={timing.transition2} in={transitions.transition2} onEntering={onEntering.transition2} onEntered={onEntered.transition2} onExiting={onExiting.transition2} onExited={onExited.transition2} >
        		<img id='BLMimage' alt='.img' src={BLMimages[1]} />
				{/* INSERT STUFF TO TRANSITION TO HERE */}
			</Fade>
			<Fade // ! TRANSITION 2
				mountOnEnter  timeout={timing.transition3} in={transitions.transition3} onEntering={onEntering.transition3} onEntered={onEntered.transition3} onExiting={onExiting.transition3} onExited={onExited.transition3} >
        		<img id='BLMimage' alt='.img' src={BLMimages[2]} />
				{/* INSERT STUFF TO TRANSITION TO HERE */}
			</Fade>
			<Fade // ! TRANSITION 2
				mountOnEnter  timeout={timing.transition4} in={transitions.transition4} onEntering={onEntering.transition4} onEntered={onEntered.transition4} onExiting={onExiting.transition4} onExited={onExited.transition4} >
        		<img id='BLMimage' alt='.img' src={BLMimages[3]} />
				{/* INSERT STUFF TO TRANSITION TO HERE */}
			</Fade>
			<Fade // ! TRANSITION 2
				mountOnEnter  timeout={timing.transition5} in={transitions.transition5} onEntering={onEntering.transition5} onEntered={onEntered.transition5} onExiting={onExiting.transition5} onExited={onExited.transition5} >
        		<img id='BLMimage' alt='.img' src={BLMimages[4]} />
				{/* INSERT STUFF TO TRANSITION TO HERE */}
			</Fade>
			<Fade // ! TRANSITION 2
				mountOnEnter  timeout={timing.transition6} in={transitions.transition6} onEntering={onEntering.transition6} onEntered={onEntered.transition6} onExiting={onExiting.transition6} onExited={onExited.transition6} >
        		<img id='BLMimage' alt='.img' src={BLMimages[5]} />
				{/* INSERT STUFF TO TRANSITION TO HERE */}
			</Fade>
			<Fade // ! TRANSITION 2
				mountOnEnter  timeout={timing.transition3} in={transitions.transition7} onEntering={onEntering.transition7} onEntered={onEntered.transition7} onExiting={onExiting.transition7} onExited={onExited.transition7} >
        		<img id='BLMimage' alt='.img' src={BLMimages[6]} />
				{/* INSERT STUFF TO TRANSITION TO HERE */}
			</Fade>
			<Fade // ! TRANSITION 2
				mountOnEnter  timeout={timing.transition3} in={transitions.transition8} onEntering={onEntering.transition8} onEntered={onEntered.transition8} onExiting={onExiting.transition8} onExited={onExited.transition8} >
        		<img id='BLMimage' alt='.img' src={BLMimages[7]} />
				{/* INSERT STUFF TO TRANSITION TO HERE */}
			</Fade>
			<Fade // ! TRANSITION 2
				mountOnEnter  timeout={timing.transition3} in={transitions.transition9} onEntering={onEntering.transition9} onEntered={onEntered.transition9} onExiting={onExiting.transition9} onExited={onExited.transition9} >
        		<img id='BLMimage' alt='.img' src={BLMimages[8]} />
				{/* INSERT STUFF TO TRANSITION TO HERE */}
			</Fade>
		</>
	)
}

export default TransitionTemplate
