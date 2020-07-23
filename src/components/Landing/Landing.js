<<<<<<< HEAD
import React from 'react'
// import TransitionTemplate from '../../development/TransitionTemplate/TransitionTemplate'
import './Landing.css'
=======
import React, { useState, useEffect } from 'react'
>>>>>>> master
import { Link } from 'react-router-dom'
import Axios from 'axios'
import Typography from '@material-ui/core/Typography'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import IconButton from '@material-ui/core/IconButton'
import WordChanger from './WordChanger'
import Grid from '@material-ui/core/Grid'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import FullPage from './FullPage'
import './Landing.css'

const Landing = () => {
	const [loading, setLoading] = useState(true)
	const [firstVisit, setFirstVisit] = useState()
	const [you, setYou] = useState(false)

	const [transitions, setTransitions] = useState({
		0: { 0: false },
		1: { 0: false },
		2: { 0: false }
	})

	// * Handle transition delays
	const [timeouts, setTimeouts] = useState([])

	useEffect(() => {
		const CancelToken = Axios.CancelToken,
			source = CancelToken.source()

		const getSession = async () => {
			try {
				const { data } = await Axios.get('/session')
				if (data.views === 1) {
					setFirstVisit(true)
					setLoading(false)
				} else {
					setLoading(false)
					setFirstVisit(false)
				}
			} catch (err) {
				if (Axios.isCancel(err)) {
					console.log('Cancelled')
				} else {
					throw err
				}
			}
		}

		getSession()

		return () => {
			timeouts.forEach(to => clearTimeout(to))
			source.cancel()
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const newVisitorPages = [
		// ! PAGE ONE
		{
			props: {
				style: {
					backgroundColor: '#171515'
				}
			},
			transitions: [
				{
					type: 'Fade',
					delay: 0,
					props: {
						timeout: { enter: 1000, exit: 250 }
					},
					children: () => (
						<Typography
							className='landingH1'
							align='left'
							variant='h1'
							style={{ paddingLeft: 40 }}
						>
							Racism?
						</Typography>
					)
				},
				{
					type: 'Fade',
					delay: 500,
					props: {
						timeout: { enter: 500, exit: 250 }
					},
					children: () => (
						<Typography
							className='landingH1'
							align='left'
							variant='h1'
							style={{ paddingLeft: 40 }}
						>
							Social Inequality?
						</Typography>
					)
				},
				{
					type: 'Fade',
					delay: 250,
					props: {
						timeout: { enter: 500, exit: 250 }
					},
					children: () => (
						<Typography
							className='landingH1'
							align='left'
							variant='h1'
							style={{ paddingLeft: 40 }}
						>
							Data speaks.
						</Typography>
					)
				},
				{
					type: 'Slide',
					delay: 0,
					props: {
						timeout: { enter: 500, exit: 250 },
						direction: 'right',
						onEntering: () => {
							setTransitions({
								...transitions,
								0: { ...transitions[0], 4: true }
							})
						}
					},
					children: () => (
						<Typography
							className='landingH1'
							align='left'
							id='t3'
							variant='h1'
							style={{ paddingLeft: 40 }}
						>
							It's up to{' '}
							<WordChanger
								wordOne='you'
								wordTwo='us'
								delay={500}
								timingOne={{ enter: 500, exit: 500 }}
								timingTwo={{ enter: 500, exit: 500 }}
								transitionStart={transitions[0][4]}
								wordOneProps={{
									variant: 'inherit',
									display: 'inline',
									align: 'inherit'
								}}
								wordTwoProps={{
									variant: 'inherit',
									display: 'inline',
									align: 'inherit',
									style: {
										color: '#FCE21B'
									}
								}}
							/>{' '}
							to listen.
						</Typography>
					)
				},
				{
					type: 'Fade',
					delay: 0,
					props: {
						timeout: { enter: 500, exit: 250 }
					},
					children: fullpageApi => (
						<IconButton
							id='downArrowBtn'
							onClick={() => {
								fullpageApi.moveSectionDown()
								// console.log(fullpageApi.getActiveSection())
							}}
						>
							<ArrowDownwardIcon style={{ fontSize: 40 }} />
						</IconButton>
					)
				}
			]
		},
		// ! PAGE TWO
		{
			props: {
				style: {
					backgroundColor: '#3747C4'
				}
			},
			transitions: [
				{
					type: 'Fade',
					delay: 0,
					props: {
						timeout: { enter: 1000, exit: 250 }
					},
					children: () => (
						<Grid container justify='center'>
							<div
								className='crestContainer'
								// style={{
								// 	border: '2px solid white',
								// 	borderRadius: 5,
								// 	width: '50vw',
								// 	padding: 20
								// }}
							>
								<Typography color='textPrimary' variant='h4'>
									Government Data
								</Typography>
								<img
									className='sourceSeals'
									alt=''
									src='/assets/landing/fbi-seal.png'
								/>

								<img
									className='sourceSeals'
									alt=''
									src='/assets/landing/justice-seal.png'
								/>

								<img
									className='sourceSeals'
									alt=''
									src='/assets/landing/census-seal.png'
								/>
							</div>
						</Grid>
					)
				},
				{
					type: 'Fade',
					delay: 0,
					props: {
						timeout: { enter: 500, exit: 250 }
					},
					children: () => (
						<Typography
							color='textPrimary'
							className='landingPlus'
							align='center'
							variant='h1'
						>
							+
						</Typography>
					)
				},
				{
					type: 'Fade',
					delay: 0,
					props: {
						timeout: { enter: 500, exit: 250 }
					},
					children: () => (
						<Grid container justify='center'>
							<div
								className='crestContainer'
								// style={{
								// 	border: '2px solid white',
								// 	borderRadius: 5,
								// 	width: '50vw',
								// 	padding: 20,
								// 	marginBottom: 30
								// }}
							>
								<Typography color='textPrimary' variant='h4'>
									Harvard Research Study
								</Typography>
								<img
									className='sourceSeals'
									alt=''
									src='/assets/landing/harvard-seal.png'
								/>
							</div>
						</Grid>
					)
				},
				{
					type: 'Fade',
					delay: 0,
					props: {
						timeout: { enter: 500, exit: 250 }
					},
					children: () => (
						<Typography
							display='inline'
							className='landingH1'
							align='left'
							variant='h2'
						>
							Real Data.
						</Typography>
					)
				},
				{
					type: 'Fade',
					delay: 0,
					props: {
						timeout: { enter: 500, exit: 250 }
					},
					children: () => (
						<Typography
							display='inline'
							className='landingH1'
							align='right'
							variant='h2'
							style={{
								color: '#FCE21B'
							}}
						>
							{' '}
							Trusted Sources.
						</Typography>
					)
				},
				{
					type: 'Fade',
					delay: 0,
					props: {
						timeout: { enter: 500, exit: 250 }
					},
					children: fullpageApi => (
						<IconButton
							id='downArrowBtn'
							onClick={() => fullpageApi.moveSectionDown()}
						>
							<ArrowDownwardIcon style={{ fontSize: 40 }} />
						</IconButton>
					)
				}
			]
		},
		// ! PAGE THREE
		{
			props: {
				style: {
					backgroundColor: '#FCE21B'
				}
			},
			transitions: [
				{
					type: 'Fade',
					delay: 0,
					props: {
						timeout: { enter: 1000, exit: 250 }
					},
					children: () => (
						<Typography className='lastText' variant='h2'>
							How does the data speak to you?
						</Typography>
					)
				},
				{
					type: 'Fade',
					delay: 0,
					props: {
						timeout: { enter: 500, exit: 250 }
					},
					children: () => (
						<Link className='zIndex' to='/map'>
							<button className='landingBtn'>Explore</button>
						</Link>
					)
				}
			]
		}
	]

	const repeatVisitorPages = [
		// ! PAGE ONE
		{
			props: {
				style: {
					backgroundColor: '#171515'
				}
			},
			transitions: [
				{
					type: 'Fade',
					delay: 0,
					props: {
						timeout: { enter: 250, exit: 250 }
					},
					children: () => (
						<Typography
							color='textPrimary'
							align='center'
							variant='h1'
							style={{ paddingLeft: 40 }}
						>
							Data speaks.
						</Typography>
					)
				},
				{
					type: 'Fade',
					delay: 0,
					props: {
						timeout: { enter: 250, exit: 250 },
						onEntering: () => {
							setTransitions({
								...transitions,
								0: { ...transitions[0], 4: true }
							})
						}
					},
					children: () => (
						<Typography
							color='textPrimary'
							align='center'
							variant='h1'
							style={{ paddingLeft: 40 }}
						>
							What does it say to{' '}
							{!you ? (
								<WordChanger
									wordOne='you'
									wordTwo='us'
									delay={500}
									timingOne={{ enter: 250, exit: 250 }}
									timingTwo={{ enter: 500, exit: 500 }}
									transitionStart={transitions[0][4]}
									wordOneProps={{
										variant: 'inherit',
										display: 'inline',
										align: 'inherit'
									}}
									wordTwoProps={{
										variant: 'inherit',
										display: 'inline',
										align: 'inherit',
										style: {
											color: '#FCE21B'
										}
									}}
								/>
							) : (
								<WordChanger
									wordOne='us'
									wordTwo='you'
									delay={500}
									timingOne={{ enter: 250, exit: 250 }}
									timingTwo={{ enter: 250, exit: 250 }}
									transitionStart={transitions[0][4]}
									wordOneProps={{
										variant: 'inherit',
										display: 'inline',
										align: 'inherit'
									}}
									wordTwoProps={{
										variant: 'inherit',
										display: 'inline',
										align: 'inherit',
										style: {
											color: '#11ABAB'
										}
									}}
								/>
							)}
							{''}?
						</Typography>
					)
				},
				{
					type: 'Fade',
					delay: 0,
					props: {
						timeout: { enter: 500, exit: 250 }
					},
					children: () => (
						<Link className='zIndex' to='/map'>
							<button
								className='repeatLandingBtn'
								onMouseOver={() => {
									setYou(true)
								}}
								onMouseOut={() => {
									setYou(false)
								}}
							>
								Explore
							</button>
						</Link>
					)
				}
			]
		}
	]

	const fullPageProps = {
		licenseKey: process.env.REACT_APP_FULL_PAGE_LICENSE,
		fadingEffect: true,
		scrollingSpeed: 500,
		afterRender: () => {
			setTransitions({
				...transitions,
				0: { ...transitions[0], 0: true }
			})
		},
		onLeave: (cur, next) => {
			// console.log(cur, next, direction)
			// console.log(cur.index, next.index)
			let curTransitions = {}
			Object.keys(transitions[cur.index]).forEach(
				key => (curTransitions[key] = false)
			)
			setTransitions({
				...transitions,
				[cur.index]: curTransitions,
				[next.index]: { ...transitions[next.index], 0: true }
			})
		}
	}

	return (
		<>
			<Backdrop open={loading}>
				<CircularProgress />
			</Backdrop>
			{/* <Loading firstVisit={loading ? false : firstVisit} /> */}
			{!loading && (
				<FullPage
					pages={
						firstVisit && firstVisit ? newVisitorPages : repeatVisitorPages
					}
					setTransitions={setTransitions}
					transitions={transitions}
					setTimeouts={setTimeouts}
					timeouts={timeouts}
					fullPageProps={fullPageProps}
				/>
			)}
		</>
	)
}

export default Landing
