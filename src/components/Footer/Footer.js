import React from 'react'
import {Link} from 'react-router-dom'
import './Footer.css'

function Footer(props) {
  return(
    <div id='footer'>
      
      <Link to='/'>
        <button className='button'>Home</button>
      </Link>
      <Link to='/map'>
        <button className='button'>Map</button>
      </Link>
      <Link to='/getinvolved'>
        <button className='button'>Get Involved</button>
      </Link>

    </div>
  )
}

export default Footer