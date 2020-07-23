import React from 'react'
import ReactFullpage from '@fullpage/react-fullpage'
import Fade from '@material-ui/core/Fade'
import Slide from '@material-ui/core/Slide'

const FullPage = ({
	pages,
	setTransitions,
	transitions,
	timeouts,
	setTimeouts,
	fullPageProps
}) => (
	<>
		<ReactFullpage
			{...fullPageProps}
			render={({ state, fullpageApi }) => {
				// * Disable scroll up
				// fullpageApi && fullpageApi.setAllowScrolling(false, 'up')
				return (
					<ReactFullpage.Wrapper>
						{pages.map((page, pageI) => (
							<div key={'section' + pageI} className='section' {...page.props}>
								{page.transitions.map((trans, transI) => {
									switch (trans.type) {
										case 'Fade':
											return (
												<Fade
													key={pageI + transI + trans.type}
													in={transitions[pageI][transI]}
													onEntered={() => {
														if (trans.delay) {
															const timeout = setTimeout(() => {
																setTransitions({
																	...transitions,
																	[pageI]: {
																		...transitions[pageI],
																		[transI + 1]: true
																	}
																})
															}, trans.delay)
															setTimeouts([...timeouts, timeout])
															return
														}
														setTransitions({
															...transitions,
															[pageI]: {
																...transitions[pageI],
																[transI + 1]: true
															}
														})
													}}
													{...trans.props}
												>
													{trans.children(fullpageApi)}
												</Fade>
											)
										case 'Slide':
											return (
												<Slide
													key={pageI + transI + trans.type}
													in={transitions[pageI][transI]}
													onEntered={() => {
														setTransitions({
															...transitions,
															[pageI]: {
																...transitions[pageI],
																[transI + 1]: true
															}
														})
													}}
													{...trans.props}
												>
													{trans.children(fullpageApi)}
												</Slide>
											)
										default:
											return null
									}
								})}
							</div>
						))}
					</ReactFullpage.Wrapper>
				)
			}}
		/>
	</>
)

export default FullPage
