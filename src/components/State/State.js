import React from 'react'
import Category from '../Category/Category'

function State(props) {

  return (
    <div>
      <h1>This is an individual state</h1>
      <Category data={props.data}/>
      <button className='button' onClick={() => props.handleStateClose()}>State Close</button>
    </div>
  )
}

export default State