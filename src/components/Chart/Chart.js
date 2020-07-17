import React from 'react'
import './Chart.css'
import BarGraph from './Charts/BarGraph/BarGraph'

function Chart(props) {
  const {chartData} = props
  // console.log(chartData)
  return (
  <div className='chartMain'>
    {chartData.map((elem, ind) => {
      if(elem.chartType === 'bar'){
        console.log('check')
        return (
        <div className='singleChartDiv' style={{width: '100%', height: `${Math.floor(100 / chartData.length)}%`, border: '1px solid black'}}>
          <BarGraph key={ind} data={elem.data}/> 
        </div>
        )
      }
    })}
  </div>
  )
}

export default Chart