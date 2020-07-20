import React from 'react'
import { Link } from 'react-router-dom'
import clsx from 'clsx'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'

const NavLinks = ({ styleClasses, anchor, toggleDrawer }) => {
	const links = [
		{
			primary: 'Home',
			to: '/'
		},
		{
			primary: 'Map',
			to: '/map'
		},
		{
			primary: 'All States',
			to: '/states'
		}
	]

	return (
		<div
			className={clsx(styleClasses.list, {
				[styleClasses.fullList]: anchor === 'top' || anchor === 'bottom'
			})}
			role='presentation'
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<List>
				{links.map((link, i) => (
					<ListItem key={link.primary + i} component={Link} to={link.to} button>
						<ListItemText primary={link.primary} />
					</ListItem>
				))}
			</List>
		</div>
	)
}

export default NavLinks
