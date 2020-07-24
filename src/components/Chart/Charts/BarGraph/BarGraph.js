import React, { Component } from 'react'
import {
	VictoryBar,
	VictoryChart,
	VictoryAxis,
	VictoryTheme,
	// VictoryLabel,
	VictoryTooltip,
	// VictoryLegend,
	VictoryContainer
} from 'victory'
// import { withTheme } from '@material-ui/core'
// import { values } from 'd3'

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
				<VictoryChart
					containerComponent={
						<VictoryContainer style={{ touchAction: 'auto' }} />
					}
					domainPadding={20}
					theme={VictoryTheme.material}
				>
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
						name='bar'
						data={this.props.data}
						events={[
							{
								target: 'data',
								eventHandlers: {
									onClick: () => {
										return {
											target: 'data',
											mutation: props =>
												this.props.changeHighlight(props.datum.race)
										}
									}
								}
							}
						]}
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
									const { highlighted } = this.props
									switch (datum.race) {
										case highlighted:
											return '#fce21b'
										case 'Black or African American':
											return highlighted ? '#00000070' : '#000000'
										case 'White or Caucasian':
											return highlighted ? '#ffffff70' : '#ffffff'
										case 'Asian':
											return highlighted ? '#C47AC070' : '#C47AC0'
										case 'American Indian or Alaska Native':
											return highlighted ? '#2B972070' : '#2B9720'
										case 'Native Hawaiian or Pacific Islander':
											return highlighted ? '#32CBFF70' : '#32CBFF'
										case 'Other':
											return highlighted ? '#1B3B6F70' : '#1B3B6F'
										default:
											return highlighted ? '#32CBFF70' : '#32CBFF'
									}
								}
							}
						}}
						labelComponent={
							<VictoryTooltip
								constrainToVisibleArea
								pointerWidth={50}
								pointerLength={100}
								flyoutStyle={{
									fill: '#ffffff'
								}}
								flyuotPadding={10}
								flyoutWidth={350}
								style={{
									fontSize: 15
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
