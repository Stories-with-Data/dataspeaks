import React from 'react'
import Category from '../Category/Category'
import './State.css'
import Rank from '../Rank/Rank'

function State(props) {

  return (
    <div className='stateContainer'>

    <div className='stateTitleContainer'>
      <h1 className='stateTitle'>State Name</h1>
      <div className='flagImage' href='(State flag)'></div>
    </div>

    <div className='summaryContainer'>
      <div className='overall'>Overall Rank
        <Rank/>
      </div>
      <div className='summary'>summary</div>
    </div>

      <div className='categoryColumnContainer'>
        <Category data={props.data}/>
        <Category data={props.data}/>
        <Category data={props.data}/>
      </div>
      
      <button className='button' onClick={() => props.handleStateClose()}>State Close</button>
    
    </div>
  )
}

export default State