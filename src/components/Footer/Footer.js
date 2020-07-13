import React from 'react'
import {Link} from 'react-router-dom'

function Footer(props) {
  return(
    <div id='footer'>
      <Link to='/'>
        <button className='footerButton'>Home</button>
      </Link>
      <Link to='/map'>
        <button className='footerButton'>Map</button>
      </Link>
      <Link to='/getinvolved'>
        <button className='footerButton'>Get Involved</button>
      </Link>

    </div>
  )
}

export default Footer