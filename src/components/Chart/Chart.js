import React from 'react'
import './Chart.css'
import BarGraph from '../BarGraph/BarGraph'

function Chart(props) {
  const {chartData} = props
  return (
  <div className='chartMain'>
    {/* <BarChart data={chartData}/> */}
    {chartData.map((elem, ind) => {
      if(elem.chartType === 'bar'){
        return <BarGraph key={ind} data={elem}/>
      }
    })}
  </div>
  )
}

export default Chart