import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Loading from '../Loading/Loading'
import Typography from '@material-ui/core/Typography'
import ReactFullpage from '@fullpage/react-fullpage'
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward'
import IconButton from '@material-ui/core/IconButton'
import Fade from '@material-ui/core/Fade'
import Slide from '@material-ui/core/Slide'
import WordChanger from './WordChanger'
import './Landing.css'

const Landing = () => {
	const [transitions, setTransitions] = useState({
		0: { in: false, t1: true, t2: false, t3: false, t4: false, next: false },
		1: {
			in: false,
			t1: false,
			t2: false,
			t3: false,
			t4: false,
			t5: false,
			t6: false,
			next: false
		}
	})

	const timing = {
		scrollingSpeed: 500,
		0: {
			t1: { enter: 500, exit: 250 }, // * Data speaks.
			t2: { enter: 500, exit: 250 }, // * Numbers don't lie.
			t3: { enter: 500, exit: 250 }, // * It's up to us to listen.
			next: { enter: 750, exit: 250 }
		},
		1: {
			t1: { enter: 750, exit: 250 }, // * Credible sources
			t2: { enter: 250, exit: 250 }, // * Government seals
			t3: { enter: 250, exit: 250 }, // * Harvard data
			t4: { enter: 250, exit: 250 }, // * Census seal
			t5: { enter: 250, exit: 250 }, // * Harvard seal
			t6: { enter: 250, exit: 250 },
			next: { enter: 750, exit: 250 }
		}
	}

	const onEntering = {
		0: {
			t3: () => {
				setTransitions({ ...transitions, 0: { ...transitions[0], t4: true } })
			}
		}
	}

	const onEntered = {
		0: {
			t1: () =>
				setTransitions({ ...transitions, 0: { ...transitions[0], t2: true } }),
			t2: () =>
				setTransitions({ ...transitions, 0: { ...transitions[0], t3: true } }),
			t3: e => {
				// e.childNodes[1].style.transition = 'all linear 500ms'
				// e.childNodes[1].style.color = '#FCE21B'
				// console.log(e.childNodes)

				setTransitions({ ...transitions, 0: { ...transitions[0], next: true } })
			},
			next: () => {
				setTransitions({
					...transitions,
					0: { ...transitions[0], next: false }
				})
			}
		},
		1: {
			t1: () =>
				setTransitions({ ...transitions, 1: { ...transitions[1], t2: true } }),
			t2: () =>
				setTransitions({ ...transitions, 1: { ...transitions[1], t3: true } }),
			t3: () =>
				setTransitions({ ...transitions, 1: { ...transitions[1], t4: true } }),
			t4: () =>
				setTransitions({ ...transitions, 1: { ...transitions[1], t5: true } }),
			t5: e => {
				setTransitions({ ...transitions, 1: { ...transitions[1], t6: true } })
			},
			t6: e => {
				setTransitions({ ...transitions, 1: { ...transitions[1], next: true } })
			},
			next: () => {
				setTransitions({
					...transitions,
					1: { ...transitions[1], next: false }
				})
			}
		}
	}

	const onExiting = {
		0: {
			t3: e => {
				// e.childNodes[1].style.color = '#FFF'
			}
		}
	}

	const onExited = {
		0: {
			next: () => {
				setTransitions({ ...transitions, 0: { ...transitions[0], next: true } })
			}
		},
		1: {
			next: () => {
				setTransitions({ ...transitions, 1: { ...transitions[1], next: true } })
			}
		}
	}

	return (
		<>
			<Loading />
			<ReactFullpage
				cards
				cardsOptions={{ perspective: 200 }}
				fadingEffect={true}
				scrollingSpeed={timing.scrollingSpeed}
				onLeave={(cur, next, direction) => {
					console.log(cur, next, direction)
					// console.log(cur.index, next.index)
					let curTransitions = {}
					Object.keys(transitions[cur.index]).forEach(
						key => (curTransitions[key] = false)
					)
					setTransitions({
						...transitions,
						[cur.index]: curTransitions,
						[next.index]: { ...transitions[next.index], t1: true }
					})
				}}
				render={({ state, fullpageApi }) => {
					// * Disable scroll up
					fullpageApi && fullpageApi.setAllowScrolling(false, 'up')
					return (
						<ReactFullpage.Wrapper>
							<div className='landingPage section fullPageLanding'>
								<Fade
									in={transitions[0].t1}
									timeout={timing[0].t1}
									onEntered={onEntered[0].t1}
								>
									<Typography
										className='landingH1'
										align='left'
										id='t1'
										variant='h1'
										style={{ paddingLeft: 40 }}
									>
										Data speaks.
									</Typography>
								</Fade>
								{/* <Typography variant='h1'></Typography> */}
								<Fade
									in={transitions[0].t2}
									timeout={timing[0].t2}
									onEntered={onEntered[0].t2}
								>
									<Typography
										className='landingH1'
										align='left'
										id='t2'
										variant='h1'
										style={{ paddingLeft: 40 }}
									>
										Numbers don't lie.
									</Typography>
								</Fade>
								<Slide
									direction='right'
									in={transitions[0].t3}
									timeout={timing[0].t3}
									onEntering={onEntering[0].t3}
									onEntered={onEntered[0].t3}
									onExiting={onExiting[0].t3}
								>
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
											transitionStart={transitions[0].t4}
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
								</Slide>
								<IconButton
									id='downArrowBtn'
									onClick={() => {
										fullpageApi.moveSectionDown()
										console.log(fullpageApi.getActiveSection())
									}}
								>
									<Fade
										in={transitions[0].next}
										timeout={timing[0].next}
										onEntered={onEntered[0].next}
										onExited={onExited[0].next}
									>
										<ArrowDownwardIcon style={{ fontSize: 40 }} />
									</Fade>
								</IconButton>
							</div>
							<div className='flexCol section'>
								{/* <div className='bg-image' /> */}
								<Fade
									in={transitions[1].t1}
									timeout={timing[1].t1}
									onEntered={onEntered[1].t1}
								>
									<div
										style={{
											border: '2px solid white',
											borderRadius: 5,
											width: '50vw'
										}}
									>
										<Typography color='textPrimary' variant='h3'>
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
								</Fade>
								<Fade
									in={transitions[1].t2}
									timeout={timing[1].t2}
									onEntered={onEntered[1].t2}
								>
									<Typography
										className='landingH1'
										align='center'
										style={{ fontSize: 120 }}
										variant='h1'
									>
										+
									</Typography>
								</Fade>
								<Fade
									in={transitions[1].t3}
									timeout={timing[1].t3}
									onEntered={onEntered[1].t3}
								>
									<img
										className='sourceSeals'
										alt=''
										src='/assets/landing/harvard-seal.png'
									/>
								</Fade>
								<Slide
									direction='left'
									in={transitions[1].t4}
									timeout={timing[1].t4}
									onEntered={onEntered[1].t4}
								>
									<Typography className='landingH1' variant='h1'>
										Real data.
									</Typography>
								</Slide>

								<IconButton
									id='downArrowBtn'
									onClick={() => fullpageApi.moveSectionDown()}
								>
									<Fade
										in={transitions[1].next}
										timeout={timing[1].next}
										onEntered={onEntered[1].next}
										onExited={onExited[1].next}
									>
										<ArrowDownwardIcon style={{ fontSize: 40 }} />
									</Fade>
								</IconButton>
							</div>
							<div className='section' style={{ backgroundColor: 'yellow' }}>
								<Link className='zIndex' to='/map'>
									<button className='button'>See Map</button>
								</Link>
							</div>
						</ReactFullpage.Wrapper>
					)
				}}
			/>
		</>
	)
}

export default Landing
