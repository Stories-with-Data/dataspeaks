import React, { Component } from 'react'
import {
	VictoryBar,
	VictoryChart,
	VictoryAxis,
	VictoryTheme,
	VictoryLabel
} from 'victory'
import { withTheme } from '@material-ui/core'

class BarGraph extends Component {
	constructor() {
		super()
		this.state = {
			data: {}
		}
	}
	render() {
		return (
			<div>
				<VictoryChart domainPadding={20} theme={VictoryTheme.material}>
					{/* <VictoryAxis
						style={{
							grid: { stroke: 'rgb(255, 255, 255, 0.0)' },
							tickLabels: {
								fill: '#fff'
							},
							axisLabel: {
								fill: '#fff'
							}
						}}
						// tickLabelComponent={
						// 	<VictoryLabel
						// 		angle={45}
						// 		verticalAnchor={'start'}
						// 		y={350}
						// 		style={{ color: 'white' }}
						// 	></VictoryLabel>
						// }
						// style={{tickLabels: {
						//   angle: 45
						// }}}
					/> */}

					<VictoryAxis
						style={{
              grid: { stroke: 'rgb(255, 255, 255, 0.0)' },
              tickLabels: {
                fill: '#fff'
              }
						}}
						dependentAxis
						tickFormat={x => `${x}`}
					/>
					<VictoryBar
						data={this.props.data.map(e =>
							e.label === 'White' ? { ...e, label: 'White or Caucasian' } : e
						)}
						x='label'
						y='value'
						categories={{ x: this.props.data.map(e => e.label) }}
						barRatio={1}
						cornerRadius={{ top: 5 }}
						animate={{
							duration: 2000,
							onLoad: { duration: 1000 }
						}}
						style={{
							labels: {
								fill: '#fff'
							},
							data: {
								fill: ({ datum }) => {
									switch (datum.label) {
										case 'Black or African American':
											return '#000'
										case 'White or Caucasian':
                      return '#fff'
                    case 'Asian':
                      return '#C47AC0'
                    case 'American Indian or Alaska Native':
                      return '#2B9720'
                    case 'Native Hawaiian or Pacific Islander':
                      return '#32CBFF'
                    case 'Other':
                      return '#1B3B6F'
										default:
											return '#32CBFF'
									}
								}
							}
						}}
					/>
				</VictoryChart>
			</div>
		)
	}
}

// const app = document.getElementById('app');
// ReactDOM.render(<BarGraph />, app);

export default BarGraph
