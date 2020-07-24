import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import useMediaQuery from '@material-ui/core/useMediaQuery'

const useStyles = makeStyles({
	header: {
		flexGrow: 1,
		backgroundColor: '#171515'
	},
	toolbar: {}
})

const StateHeader = ({ buttons }) => {
	const classes = useStyles()
	const matches = useMediaQuery('(max-width:600px)')

	return (
		// <div className={classes.root}>
		<AppBar
			className={classes.header}
			position='fixed'
			// variant='outlined'
		>
			<Toolbar
				className={classes.toolbar}
				style={{ justifyContent: matches ? 'space-between' : 'center' }}
			>
				{buttons.map(btn => (
					<Button key={btn.text} onClick={btn.onClick} {...btn.props}>
						{btn.text}
					</Button>
				))}
			</Toolbar>
		</AppBar>
		// </div>
	)
}

StateHeader.propTypes = {
	buttons: PropTypes.arrayOf(
		PropTypes.exact({
			text: PropTypes.string,
			onClick: PropTypes.func,
			props: PropTypes.object
		})
	)
}

export default StateHeader
