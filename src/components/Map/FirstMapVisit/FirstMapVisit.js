import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Backdrop from '@material-ui/core/Backdrop'
import Grid from '@material-ui/core/Grid'
import Fade from '@material-ui/core/Fade'
import Slide from '@material-ui/core/Slide'
import Grow from '@material-ui/core/Grow'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles(theme => ({
	heatmapInstructions: {
		position: 'absolute',
		top: 7,
		left: 230
	}
}))

const FirstMapVisit = ({ open, backdropClass, finishFirstVisit }) => {
	const classes = useStyles()
	const [transitions, setTransitions] = useState({
		0: true
	})
	const elements = [
		{
			type: 'Fade',
			transitionProps: {
				mountOnEnter: true,
				unmountOnExit: true,
				timeout: { enter: 1500, exit: 500 },
				onEntered: () => {
					setTransitions({ ...transitions, 0: false })
				},
				onExited: () => {
					setTransitions({ ...transitions, 1: true })
				}
			},
			children: (
				<Typography variant='h2' color='primary'>
					Welcome to the map
				</Typography>
			)
		},
		{
			type: 'Fade',
			transitionProps: {
				mountOnEnter: true,
				unmountOnExit: true,
				timeout: { enter: 500, exit: 500 },
				onEntered: () => {
					setTransitions({ ...transitions, 2: true })
				}
			},
			children: (
				<Typography variant='h2' color='primary'>
					Click on a state to see its story
				</Typography>
			)
		},
		{
			type: 'Slide',
			transitionProps: {
				direction: 'left',
				onEntered: () => {
					setTransitions({ ...transitions, 3: true })
				}
			},
			children: (
				<div className={classes.heatmapInstructions}>
					{/* <Typography align='center' color='textPrimary' variant='h5'>
						↑
					</Typography> */}
					<Typography align='left' variant='h5' color='primary'>
						← Try out the different heatmap displays
					</Typography>
				</div>
			)
		},
		{
			type: 'Grow',
			transitionProps: {
				timeout: { enter: 1000, exit: 500 }
			},
			children: (
				<Button
					onClick={() => {
						finishFirstVisit()
          }}
          variant='outlined'
          color='primary'
          size='large'
				>
					Got it I'm ready
				</Button>
			)
		}
	]
	return (
		<Backdrop className={backdropClass} open={open} unmountOnExit>
			<Grid>
				{elements.map((e, i) => {
					switch (e.type) {
						case 'Fade':
							return (
								<Fade
									key={`${e.type}${i}`}
									in={transitions[i]}
									{...e.transitionProps}
								>
									{e.children}
									{/* <Typography {...e.typographyProps}>{e.text}</Typography> */}
								</Fade>
							)
						case 'Slide':
							return (
								<Slide
									key={`${e.type}${i}`}
									in={transitions[i]}
									{...e.transitionProps}
								>
									{e.children}
									{/* <Typography {...e.typographyProps}>{e.text}</Typography> */}
								</Slide>
							)
						case 'Grow':
							return (
								<Grow
									key={`${e.type}${i}`}
									in={transitions[i]}
									{...e.transitionProps}
								>
									{e.children}
									{/* <Typography {...e.typographyProps}>{e.text}</Typography> */}
								</Grow>
							)
						default:
							return e
					}
				})}
			</Grid>
		</Backdrop>
	)
}

export default FirstMapVisit
