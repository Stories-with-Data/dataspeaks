import React, {useEffect, useState} from 'react'
import Axios from 'axios'
import './GetInvolved.css'
import TwitterIcon from '@material-ui/icons/Twitter';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import IconButton from '@material-ui/core/IconButton'
import ContactMailRoundedIcon from '@material-ui/icons/ContactMailRounded';

// this component needs stateName to passed into it as a prop. this should be the only prop needed.

function GetInvolved(props) {
  const [senators, setSenators] = useState([])
  const [stateName, setStateName] = useState('')

  useEffect(() => {
    if(!props.stateName){
      setStateName(props.stateName)
      getMemberData()
    }
  }, [props])

  async function getMemberData() {
    const res = await Axios.get('https://api.propublica.org/congress/v1/116/senate/members.json', {
      headers: {
        'X-API-KEY': 'sTgSE1HxTFvOD7NVYqQFCt32afEhu0ApzxLf4uav'
      }
    })

    const response = await Axios.get(`/api/states/${'Utah'}`)
    const senateList = res.data.results[0].members
    for(let i = senateList.length - 1; i >= 0; i--){
      if(senateList[i].state !== response.data.state_abv){
        senateList.splice(i, 1)
      }
    }
    setSenators(senateList)
  }

  const senatorsMap = senators.map(elem => {
    console.log(senators)
    return (
      <div className='senator-container'
      key={elem.id}>
        <div className='senator-name'>{`${elem.first_name} ${elem.last_name}`}</div>
        <div className='media-links'>
          <IconButton
          href={elem.twitter_account ? `https://twitter.com/${elem.twitter_account}`: `https://twitter.com/search?q=${elem.first_name}%20${elem.last_name}&src=typed_query`}
          target='_blank'
          >
            <TwitterIcon fontSize='large'/>
          </IconButton>
          <IconButton
          href={elem.facebook_account ? `https://www.facebook.com/${elem.facebook_account}` : `https://www.facebook.com/search/top?q=senator%20${elem.first_name}%20${elem.last_name}`}
          target='_blank'
          >
            <FacebookIcon fontSize='large'/>
          </IconButton>
          <IconButton
          href={elem.youtube_account ? `https://www.youtube.com/${elem.youtube_account}` : `https://www.youtube.com/results?search_query=senator+${elem.first_name}+${elem.last_name}`}
          target='_blank'
          >
            <YouTubeIcon fontSize='large'/>
          </IconButton>
        </div>
        <div className='contact-form'>
          {`Write ${elem.first_name} a message expressing how to feel the government needs change. Click below`}
          <IconButton
          href={elem.contact_form}
          target='_blank'
          >
            <ContactMailRoundedIcon fontSize='large'/>
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
    </div>
  )
}

export default GetInvolved