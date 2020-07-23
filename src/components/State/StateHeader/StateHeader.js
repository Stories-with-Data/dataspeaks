import React from 'react'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
	header: {
		flexGrow: 1,
		backgroundColor: '#171515'
	},
	toolbar: { justifyContent: 'center' }
})

const StateHeader = ({ buttons }) => {
	const classes = useStyles()
	return (
		// <div className={classes.root}>
		<AppBar
			className={classes.header}
			position='fixed'
			// variant='outlined'
		>
			<Toolbar className={classes.toolbar}>
				{buttons.map(btn => (
					<Button onClick={btn.onClick} {...btn.props}>
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
