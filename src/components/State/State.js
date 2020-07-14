import React from 'react'

function State(props) {

  return (
    <div>
      <h1>This is an individual state</h1>
      <button className='button' onClick={() => props.handleStateClose()}>State Close</button>
    </div>
  )
}

export default State