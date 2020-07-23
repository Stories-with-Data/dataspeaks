import React, { useState, useEffect } from 'react'
// import { useHistory } from 'react-router-dom'
// import useStatesData from '../../hooks/useStatesData'
import MaterialTable from 'material-table'
import TwitterIcon from '@material-ui/icons/Twitter'
import FacebookIcon from '@material-ui/icons/Facebook'
import YouTubeIcon from '@material-ui/icons/YouTube'
import axios from 'axios'
// import IconButton from '@material-ui/core/IconButton'

const GetInvolvedFromNav = () => {
	// const data = useStatesData()
	// const history = useHistory()

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
				// console.log(res.data.results[0].members)
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
			title: 'Twitter',
			field: 'twitter_account'
		},
		{
			title: 'Facebook',
			field: 'facebook_account'
		},
		{
			title: 'YouTube',
			field: 'youtube_account'
		},
		{
			title: 'Contact Form',
			field: 'overall.ranks.bpRank'
		}
	]

	return (
		<>
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
						tooltip: 'Facebook Account'
					},
					{
						icon: YouTubeIcon,
						tooltip: 'YouTube Account'
					}
				]}
				options={{
					pageSize: 101,
					pageSizeOptions: [10, 25, 50, 101]
				}}
				title='US Senators'
				// onRowClick={(event, rowData) => {
				// 	history.push(
				// 		`/states/${rowData.overall.stateName}`
				// 	)
				// }}
			/>
		</>
	)
}

export default GetInvolvedFromNav
