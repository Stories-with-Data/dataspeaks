import React from 'react'
import './Landing.css'
import Axios from 'axios'

function Landing(props) {

  return (
    <div className='landingPage'>
      <div onClick={() => Axios.get('/api/seed/fbi')} className='header'>Title animation?</div>
      <h1 className='missionStatement'>Landing Page / Mission statement</h1>
    </div>
  )
}

export default Landing