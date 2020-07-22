import React from 'react'
import './Chart.css'
import BarGraph from './Charts/BarGraph/BarGraph'
import StackedBar from './Charts/StackedBar/StackedBar'
import PieChart from './Charts/PieChart/PieChart'

function Chart(props) {
	const { chartData, highlighted } = props
	// console.log(chartData)
	return (
		<div className='chartMain'>
			{chartData.map((elem, ind) => {
				switch (elem.chartType) {
					case 'bar':
						return (
							<div
								key={ind}
								className='singleChartDiv'
								style={{
									// height: `${Math.floor(100 / chartData.length)}%`
								}}
							>
								<h4>{elem.chartTitle}</h4>
								<BarGraph 
									data={elem.data} 
									changeHighlight={props.changeHighlight} 
									highlighted={highlighted} 
									/>
							</div>
						)
					case 'stackedBar':
						return (
							<div
								key={ind}
								className='singleChartDiv'
								style={{
									// height: `${Math.floor(100 / chartData.length)}%`
								}}
							>
								<h4>{elem.chartTitle}</h4>
								<StackedBar 
									data={elem.data}
									changeHighlight={props.changeHighlight} 
									highlighted={highlighted} 
									/>
							</div>
						)
					case 'pie':
						return (
							<div
								key={ind}
								className='singleChartDiv'
								style={{
									// height: `${Math.floor(100 / chartData.length)}%`
								}}
							>
								<h4>{elem.chartTitle}</h4>
								<PieChart 
									data={elem.data} 
									changeHighlight={props.changeHighlight}
									highlighted={highlighted} />
							</div>
						)
					default:
						break
        }
        return null
      }
      )}
		</div>
	)
}

export default Chart
