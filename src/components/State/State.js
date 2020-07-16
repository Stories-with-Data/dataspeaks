import React, {useState} from 'react'
import Category from '../Category/Category'
import './State.css'
import Rank from '../Rank/Rank'

function State(props) {
  const stateData = props.statesData[props.stateSelected]

  return (
    <div className='stateContainer'>

    <div className='stateTitleContainer'>
  <h1 className='stateTitle'>{stateData.overall.stateName}</h1>
      <div className='flagImage' href='(State flag)'></div>
    </div>

    <div className='summaryContainer'>
      <div className='overall'>Overall Rank
        <Rank rank={stateData.overall.rank}/>
      </div>
  <div className='summary'>{stateData.overall.summary}</div>
    </div>

      <div className='categoryColumnContainer'>
        {stateData.categories.map(elem => {
          return (
            <Category key={elem.title} catData={elem}/>
          )
        })}
      </div>
    </div>
  )
}

export default State