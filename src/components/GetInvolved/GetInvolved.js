import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import './GetInvolved.css'
import TwitterIcon from '@material-ui/icons/Twitter'
import FacebookIcon from '@material-ui/icons/Facebook'
import YouTubeIcon from '@material-ui/icons/YouTube'
import IconButton from '@material-ui/core/IconButton'
import ContactMailRoundedIcon from '@material-ui/icons/ContactMailRounded'
import stateAbv from '../../assets/stateAbv/stateAbv.json'

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
				<div className='senator-name'>{`${elem.first_name} ${elem.last_name}`}</div>
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
					{`Write ${elem.first_name} a message expressing how to feel the government needs change. Click below`}
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
		<div className='get-involved-container'>
			<div>Want to help change our damaged system?</div>
			<div>{`Meet the U.S senators for ${stateName}`}</div>
			<div className='senators'>{senatorsMap}</div>
			<button onClick={() => props.toggleInvolvedVis()} className='button'>
				Close
			</button>
		</div>
	)
}

export default GetInvolved
