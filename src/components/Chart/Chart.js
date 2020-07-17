import React from 'react'
import './Chart.css'
import BarGraph from './Charts/BarGraph/BarGraph'
import StackedBar from './Charts/StackedBar/StackedBar'

function Chart(props) {
  const {chartData} = props
  console.log(chartData)
  return (
  <div className='chartMain'>
    {chartData.map((elem, ind) => {
      if(elem.chartType === 'bar'){
        return (
        <div className='singleChartDiv' style={{padding: '10px',width: '100%', height: `${Math.floor(100 / chartData.length)}%`, border: '1px solid black'}}>
          <h4>{elem.chartTitle}</h4>
          <BarGraph key={ind} data={elem.data}/> 
        </div>
        )
      }
      if (elem.chartType === 'stackedBar'){
        return (
        <div className='singleChartDiv' style={{padding: '10px',width: '100%', height: `${Math.floor(100 / chartData.length)}%`, border: '1px solid black'}}>
          <h4>{elem.chartTitle}</h4>
          <StackedBar key={ind} data={elem.data}/> 
        </div>
        )
      }
    })}
  </div>
  )
}

export default Chart