import React, { Component } from 'react'
import {
	VictoryBar,
	VictoryChart,
	VictoryAxis,
	VictoryTheme,
	VictoryLabel,
	VictoryTooltip,
  VictoryLegend,
  VictoryContainer
} from 'victory'
import { withTheme } from '@material-ui/core'
import { values } from 'd3'

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
					<VictoryAxis
						style={{
							grid: { stroke: 'rgb(255, 255, 255, 0.0)' },
							tickLabels: {
								fill: '#fff',
								visibility: 'hidden'
							},
							axisLabel: {
								fill: '#fff'
							},
							ticks: {
								visibility: 'hidden'
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
					/>

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
						data={this.props.data}
						x='race'
						y='value'
						// categories={{ x: this.props.data.map(e => e.label) }}
						barRatio={1}
						cornerRadius={{ top: 5 }}
						animate={{
							duration: 2000,
							onLoad: { duration: 1000 }
						}}
						style={{
							labels: {
								fill: '#000'
							},
							data: {
								fill: ({ datum }) => {
									switch (datum.race) {
										case 'Black or African American':
											return '#000'
										case 'rgb(255, 255, 255)':
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
						labelComponent={
							<VictoryTooltip
								flyoutStyle={{
									fill: '#ffffff90'
								}}
							/>
						}
					/>
					{/* <VictoryLegend
            padding={20}
						data={this.props.data.map(e => ({ name: e.race }))}
						style={{
							labels: {
								fill: '#fff'
							},
							data: {
								fill: ({ datum }) => {
									switch (datum.name) {
										case 'Black or African American':
											return '#000'
										case 'rgb(255, 255, 255)':
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
					/> */}
				</VictoryChart>
			</div>
		)
	}
}

// const app = document.getElementById('app');
// ReactDOM.render(<BarGraph />, app);

export default BarGraph
