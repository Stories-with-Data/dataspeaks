import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import NavLinks from './NavLinks/NavLinks'
import './Nav.css'

const drawerStyles = makeStyles({
	list: {
		width: 250
	},
	fullList: {
		width: 'auto'
	},
	menuBtn: {
		position: 'fixed',
		top: 0,
		left: 0,
		zIndex: 10,
		color: '#fff'
	}
})

const Nav = () => {
	const classes = drawerStyles(),
		// * anchor determines which side of the screen the drawer enters from
		anchor = 'left',
		[state, setState] = useState({}),
		toggleDrawer = (anchor, open) => event => {
			if (
				event.type === 'keydown' &&
				(event.key === 'Tab' || event.key === 'Shift')
			) {
				return
			}
			setState({ ...state, [anchor]: open })
		}

	return (
		<>
			<IconButton
				className={classes.menuBtn}
				color='inherit'
				onClick={toggleDrawer(anchor, true)}
			>
				<MenuIcon />
			</IconButton>
			<Drawer
				anchor={anchor}
				open={state[anchor]}
				onClose={toggleDrawer(anchor, false)}
			>
				<NavLinks
					styleClasses={classes}
					toggleDrawer={toggleDrawer}
					anchor={anchor}
				/>
			</Drawer>
		</>
	)
}

export default Nav
