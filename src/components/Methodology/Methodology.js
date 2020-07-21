import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMoreOutlined'
import CrimeTypesTable from './CrimeTypesTable'

const useStyles = makeStyles(theme => ({
	inlineLink: {
		color: '#fff',
		'&:hover': {
			color: theme.palette.primary.main
		},
		'&:visited': {
			color: '#fff',
			'&:hover': {
				color: theme.palette.primary.main
			}
		}
	}
}))

const Methodology = () => {
	const classes = useStyles()

	return (
		<Box p={1} pt={6}>
			<Paper
				component={Grid}
				container
				justify='center'
				alignItems='center'
				direction='column'
			>
				<Accordion>
					<AccordionSummary expandIcon={<ExpandMoreIcon />}>
						<Typography variant='h6'>Title</Typography>
					</AccordionSummary>
					<AccordionDetails>
						<Typography variant='body1'>Body</Typography>
					</AccordionDetails>
				</Accordion>
				<Typography variant='h1'>Methodology</Typography>
				<List>
					<ListItem button>
						<ListItemText primary='IAT' />
					</ListItem>
				</List>
				<Grid item container justify='center' direction='column'>
					<Box p={1}>
						<Paper variant='outlined' id='iat'>
							<Typography variant='h2'>IAT</Typography>
							<Typography variant='subtitle1'>
								Implicit Association Test
							</Typography>
							<Accordion>
								<AccordionSummary expandIcon={<ExpandMoreIcon />}>
									<Typography variant='h6'>What is it?</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Paper variant='outlined'>
										<Typography variant='subtitle2'>
											Credit:{' '}
											<a
												target='_blank'
												rel='noopener noreferrer'
												href='https://implicit.harvard.edu/implicit/education.html'
												className={classes.inlineLink}
											>
												Project Implicit
											</a>
										</Typography>
										<Typography variant='body1'>
											"The Implicit Association Test (IAT) measures attitudes
											and beliefs that people may be unwilling or unable to
											report. The IAT may be especially interesting if it shows
											that you have an implicit attitude that you did not know
											about. For example, you may believe that women and men
											should be equally associated with science, but your
											automatic associations could show that you (like many
											others) associate men with science more than you associate
											women with science."
										</Typography>

										<Accordion>
											<AccordionSummary expandIcon={<ExpandMoreIcon />}>
												<Typography variant='h6'>More Details</Typography>
											</AccordionSummary>
											<AccordionDetails>
												<Paper variant='outlined'>
													<Typography variant='subtitle2'>
														Credit:{' '}
														<a
															target='_blank'
															rel='noopener noreferrer'
															href='https://implicit.harvard.edu/implicit/iatdetails.html'
															className={classes.inlineLink}
														>
															Project Implicit
														</a>
													</Typography>
													<Typography variant='body1'>
														"The IAT measures the strength of associations
														between concepts (e.g., black people, gay people)
														and evaluations (e.g., good, bad) or stereotypes
														(e.g., athletic, clumsy). The main idea is that
														making a response is easier when closely related
														items share the same response key. When doing an IAT
														you are asked to quickly sort words into categories
														that are on the left and right hand side of the
														computer screen by pressing the “e” key if the word
														belongs to the category on the left and the “i” key
														if the word belongs to the category on the right.
														The IAT has five main parts. In the first part of
														the IAT you sort words relating to the concepts
														(e.g., fat people, thin people) into categories. So
														if the category “Fat People” was on the left, and a
														picture of a heavy person appeared on the screen,
														you would press the “e” key. In the second part of
														the IAT you sort words relating to the evaluation
														(e.g., good, bad). So if the category “good” was on
														the left, and a pleasant word appeared on the
														screen, you would press the “e” key. In the third
														part of the IAT the categories are combined and you
														are asked to sort both concept and evaluation words.
														So the categories on the left hand side would be Fat
														People/Good and the categories on the right hand
														side would be Thin People/Bad. It is important to
														note that the order in which the blocks are
														presented varies across participants, so some people
														will do the Fat People/Good, Thin People/Bad part
														first and other people will do the Fat People/Bad,
														Thin People/Good part first. In the fourth part of
														the IAT the placement of the concepts switches. If
														the category “Fat People” was previously on the
														left, now it would be on the right. Importantly, the
														number of trials in this part of the IAT is
														increased in order to minimize the effects of
														practice. In the final part of the IAT the
														categories are combined in a way that is opposite
														what they were before. If the category on the left
														was previously Fat People/Good, it would now be Fat
														People/Bad. The IAT score is based on how long it
														takes a person, on average, to sort the words in the
														third part of the IAT versus the fifth part of the
														IAT. We would say that one has an implicit
														preference for thin people relative to fat people if
														they are faster to categorize words when Thin People
														and Good share a response key and Fat People and Bad
														share a response key, relative to the reverse."
													</Typography>
												</Paper>
											</AccordionDetails>
										</Accordion>
									</Paper>
								</AccordionDetails>
							</Accordion>
							<Accordion>
								<AccordionSummary expandIcon={<ExpandMoreIcon />}>
									<Typography variant='h6'>How did we use it?</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography variant='body1'>
										We started with the raw IAT Race aggregate result data from
										2015 to 2019 (
										<a
											target='_blank'
											rel='noopener noreferrer'
											href='https://osf.io/gwofk/files/'
											className={classes.inlineLink}
										>
											sourced here
										</a>
										). Then, we filtered out all incomplete results and rolled
										up the data by the respondents self-identified race.
									</Typography>
								</AccordionDetails>
							</Accordion>
							<Accordion>
								<AccordionSummary expandIcon={<ExpandMoreIcon />}>
									<Typography variant='h6'>
										How did we rank the states?
									</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography variant='body1'>
										Since our goal is to attempt to illustrate social inequality
										and injustice, we ranked the states based on the mean IAT
										Race score of all participants who identified as any race
										other than Black or African American. The number one rank in
										the IAT category belongs to the state whose non-black or
										African American population demonstrated the least implicit
										bias.
									</Typography>
								</AccordionDetails>
							</Accordion>
						</Paper>
					</Box>
					<Box p={1}>
						<Paper variant='outlined' id='arrestRate'>
							<Typography variant='h2'>Arrest Rate</Typography>
							<Accordion>
								<AccordionSummary expandIcon={<ExpandMoreIcon />}>
									<Typography variant='h6'>What is it?</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Grid container direction='column' alignItems='center'>
										<Typography variant='body1'>
											The arrest rate is defined as number of arrests per
											100,000.
										</Typography>
										<Typography variant='body1'>
											The arrest data used is sourced from the FBI crime data
											API (
											<a
												target='_blank'
												rel='noopener noreferrer'
												href='https://crime-data-explorer.fr.cloud.gov/api'
												className={classes.inlineLink}
											>
												here
											</a>
											).
										</Typography>
										<Typography variant='body1'>
											The state population data used is sourced from the Census
											Bureau API (
											<a
												target='_blank'
												rel='noopener noreferrer'
												href='https://www.census.gov/data/developers/guidance/api-user-guide.Overview.html'
												className={classes.inlineLink}
											>
												here
											</a>
											)
										</Typography>
										<Typography variant='body1'>
											The formula used to calculate the rate is as follows:
										</Typography>
										<Typography variant='body1'>
											( Arrest count / State population count ) * 100,000
										</Typography>
									</Grid>
								</AccordionDetails>
							</Accordion>
							<Accordion>
								<AccordionSummary expandIcon={<ExpandMoreIcon />}>
									<Typography variant='h6'>
										What are considered violent or non-violent crimes?
									</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<CrimeTypesTable />
								</AccordionDetails>
							</Accordion>
							<Accordion>
								<AccordionSummary expandIcon={<ExpandMoreIcon />}>
									<Typography variant='h6'>
										How did we rank the states?
									</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography variant='body1'>
										The states are ranked by the mean arrest rate for violent
										and non-violent crimes of the state's Black or African
										American population. This means the number one ranked state
										has the highest arrest rate per 100,000 of Black or African
										Americans living in the.
									</Typography>
								</AccordionDetails>
							</Accordion>
						</Paper>
					</Box>
					<Box p={1}>
						<Paper variant='outlined' id='cir'>
							<Typography variant='h2'>CIR</Typography>
							<Typography variant='subtitle1'>
								Currently Incarcerated Rate
							</Typography>
							<Accordion>
								<AccordionSummary expandIcon={<ExpandMoreIcon />}>
									<Typography variant='h6'>What is it?</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Grid container direction='column' alignItems='center'>
										<Typography variant='body1'>
											The Currently Incarcerated Rate is defined as the 2018
											year-end prison population count per 100,000 corresponding
											state population.
										</Typography>
										<Typography variant='body1'>
											The prison population data used is sourced from the Bureau
											of Justice Statistics 'Prisoners in 2018' report (
											<a
												target='_blank'
												rel='noopener noreferrer'
												href='https://www.bjs.gov/index.cfm?ty=pbdetail&iid=6846'
												className={classes.inlineLink}
											>
												here
											</a>
											).
										</Typography>
										<Typography variant='body1'>
											The state population data used is sourced from the Census
											Bureau API (
											<a
												target='_blank'
												rel='noopener noreferrer'
												href='https://www.census.gov/data/developers/guidance/api-user-guide.Overview.html'
												className={classes.inlineLink}
											>
												here
											</a>
											)
										</Typography>
										<Typography variant='body1'>
											The formula used to calculate the rate is as follows:
										</Typography>
										<Typography variant='body1'>
											( Year-end prison population count / State population
											count ) * 100,000
										</Typography>
									</Grid>
								</AccordionDetails>
							</Accordion>
							<Accordion>
								<AccordionSummary expandIcon={<ExpandMoreIcon />}>
									<Typography variant='h6'>
										How did we rank the states?
									</Typography>
								</AccordionSummary>
								<AccordionDetails>
									<Typography variant='body1'>
										The states are ranked by the mean CIR of the state's Black or African American population. This means the number one ranked state
										has the highest CIR per 100,000 Black or African
										Americans living in the state.
									</Typography>
								</AccordionDetails>
							</Accordion>
						</Paper>
					</Box>
				</Grid>
			</Paper>
		</Box>
	)
}

export default Methodology
