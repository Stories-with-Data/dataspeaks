import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import MaterialTable from 'material-table'
import TwitterIcon from '@material-ui/icons/Twitter'
import FacebookIcon from '@material-ui/icons/Facebook'
import YouTubeIcon from '@material-ui/icons/YouTube'
import MailIcon from '@material-ui/icons/Mail'
import LanguageIcon from '@material-ui/icons/Language'
import axios from 'axios'

const useStyles = makeStyles({
	root: {
		marginTop: 50
	}
})

const GetInvolvedFromNav = () => {
	const classes = useStyles()
	const [senatorData, setSenatorData] = useState([])
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		axios
			.get('https://api.propublica.org/congress/v1/116/senate/members.json', {
				headers: {
					'X-API-KEY': 'sTgSE1HxTFvOD7NVYqQFCt32afEhu0ApzxLf4uav'
				}
			})
			.then(res => {
				setSenatorData(res.data.results[0].members)
				setIsLoading(false)
			})
	}, [])

	const columns = [
		{
			title: 'Last Name',
			field: 'last_name'
		},
		{
			title: 'First Name',
			field: 'first_name'
		},
		{
			title: 'State',
			field: 'state'
		},
		{
			title: 'Office Phone',
			field: 'phone'
		},
		{
			title: 'Senator Position',
			field: 'state_rank'
		}
	]

	return (
		<div className={classes.root}>
			<MaterialTable
				data={Object.values(senatorData)}
				columns={columns}
				isLoading={isLoading}
				actions={[
					{
						icon: TwitterIcon,
						tooltip: 'Twitter Account',
						onClick: (event, elem) => {
							window.open(
								elem.twitter_account
									? `https://twitter.com/${elem.twitter_account}`
									: `https://twitter.com/search?q=${elem.first_name}%20${elem.last_name}&src=typed_query`,
								'_blank'
							)
						}
					},
					{
						icon: FacebookIcon,
						tooltip: 'Facebook Account',
						onClick: (event, elem) => {
							window.open(
								elem.facebook_account
									? `https://www.facebook.com/${elem.facebook_account}`
									: `https://www.facebook.com/search/top?q=senator%20${elem.first_name}%20${elem.last_name}`
							)
						}
					},
					{
						icon: YouTubeIcon,
						tooltip: 'YouTube Account',
						onClick: (event, elem) => {
							window.open(
								elem.youtube_account
									? `https://www.youtube.com/${elem.youtube_account}`
									: `https://www.youtube.com/results?search_query=senator+${elem.first_name}+${elem.last_name}`
							)
						}
					},
					{
						icon: MailIcon,
						tooltip: 'Contact Form',
						onClick: (event, elem) => {
							window.open(elem.contact_form)
						}
					},
					{
						icon: LanguageIcon,
						tooltip: 'Website',
						onClick: (event, elem) => {
							window.open(elem.url)
						}
					}
				]}
				options={{
					pageSize: 25,
					pageSizeOptions: [25]
				}}
				title='US Senators'
			/>
		</div>
	)
}

export default GetInvolvedFromNav
