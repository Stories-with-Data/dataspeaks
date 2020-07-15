import React from 'react'
import Category from '../Category/Category'
import './State.css'

function State(props) {

  return (
    <div className='stateContainer'>
      <h1>State Name</h1>
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