import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import TwitterIcon from '@material-ui/icons/Twitter'
import FacebookIcon from '@material-ui/icons/Facebook'
import YouTubeIcon from '@material-ui/icons/YouTube'
import IconButton from '@material-ui/core/IconButton'
import ContactMailRoundedIcon from '@material-ui/icons/ContactMailRounded'
import stateAbv from '../../assets/stateAbv/stateAbv.json'
import Dialog from '@material-ui/core/Dialog'
import Typography from '@material-ui/core/Typography'
import './GetInvolved.css'

// this component needs stateName to passed into it as a prop. this should be the only prop needed.

function GetInvolved(props) {
	const { stateName } = props
	const [senators, setSenators] = useState([])

	useEffect(() => {
		const CancelToken = Axios.CancelToken,
			source = CancelToken.source()

		const getMemberData = async () => {
			try {
				const { data } = await Axios.get(
					'https://api.propublica.org/congress/v1/116/senate/members.json',
					{
						headers: {
							'X-API-KEY': 'sTgSE1HxTFvOD7NVYqQFCt32afEhu0ApzxLf4uav'
						}
					}
				)

				setSenators(
					data.results[0].members.filter(
						m => m.state === stateAbv[stateName.replace(/\s/g, '')].abv
					)
				)
			} catch (err) {
				if (Axios.isCancel(err)) {
					console.log('Cancelled')
				} else {
					throw err
				}
			}
		}

		getMemberData()

		return () => {
			source.cancel()
		}
	}, [stateName])

	const senatorsMap = senators.map(elem => {
		return (
			<div className='senator-container' key={elem.id}>
				<Typography className='senator-name' variant='h4'>{`${elem.first_name} ${elem.last_name}`}</Typography>
				<div className='media-links'>
					<IconButton
						href={
							elem.twitter_account
								? `https://twitter.com/${elem.twitter_account}`
								: `https://twitter.com/search?q=${elem.first_name}%20${elem.last_name}&src=typed_query`
						}
						target='_blank'
					>
						<TwitterIcon className='linkButton' fontSize='large' />
					</IconButton>
					<IconButton
						href={
							elem.facebook_account
								? `https://www.facebook.com/${elem.facebook_account}`
								: `https://www.facebook.com/search/top?q=senator%20${elem.first_name}%20${elem.last_name}`
						}
						target='_blank'
					>
						<FacebookIcon className='linkButton' fontSize='large' />
					</IconButton>
					<IconButton
						href={
							elem.youtube_account
								? `https://www.youtube.com/${elem.youtube_account}`
								: `https://www.youtube.com/results?search_query=senator+${elem.first_name}+${elem.last_name}`
						}
						target='_blank'
					>
						<YouTubeIcon className='linkButton' fontSize='large' />
					</IconButton>
				</div>
				<div className='contact-form'>
					<Typography variant='body1' align='center'>
						{`Write ${elem.first_name} a message expressing how you feel the government needs to change. Click below`}
					</Typography>
					<IconButton
						className='linkButton'
						href={elem.contact_form}
						target='_blank'
					>
						<ContactMailRoundedIcon className='linkButton' fontSize='large' />
					</IconButton>
				</div>
			</div>
		)
	})

	return (
		<Dialog
			// className='get-involved-container'
			PaperProps={{
				className: 'get-involved-container'
			}}
			open={props.open}
			onClose={props.handleClose}
		>
			<Typography variant='h3' color='textPrimary' align='center' gutterBottom >
				Is the data speaking to you?
			</Typography>
			<Typography
				variant='h5'
				color='textPrimary'
				align='center'
			>{`Get involved by contacting the U.S senators from ${stateName}`}</Typography>
			<div className='senators'>{senatorsMap}</div>
			<button onClick={() => props.toggleInvolvedVis()} className='button'>
				Close
			</button>
		</Dialog>
	)
}

export default GetInvolved
