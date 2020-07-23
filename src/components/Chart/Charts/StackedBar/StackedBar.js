import React, { Component } from 'react'
import {
	VictoryBar,
	VictoryChart,
	VictoryGroup,
	VictoryAxis,
	VictoryTheme,
	VictoryTooltip,
	VictoryLegend,
	VictoryContainer
} from 'victory'

class StackedBar extends Component {
	constructor() {
		super()
		this.state = {
			data: {}
		}
	}

	render() {
		const { categories, values } = this.props.data
		// console.log(values)
		return (
			<div>
				<VictoryChart
					containerComponent={
						<VictoryContainer style={{ touchAction: 'auto' }} />
					}
					domainPadding={20}
					theme={VictoryTheme.material}
					events={categories.map(cat => ({
						childName: 'legend',
						target: 'labels',
						eventHandlers: {
							onMouseOver: () => {
								return [
									{
										childName: cat.name,
										target: 'data',
										mutation: props => ({
											style: Object.assign({}, props.style, { fill: 'gold' })
										})
									}
								]
							},
							onMouseOut: () => {
								return [
									{
										childName: cat.name,
										target: 'data',
										mutation: () => null
									}
								]
							}
						}
					}))}
				>
					<VictoryLegend
						name='legend'
						colorScale='qualitative'
						data={categories.map(cat => ({ name: cat.name }))}
						style={{
							labels: {
								fill: '#fff'
							}
						}}
					/>
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
					/>

					<VictoryAxis
						dependentAxis
						style={{
							grid: { stroke: 'rgb(255, 255, 255, 0.0)' },
							tickLabels: {
								fill: '#fff'
							}
						}}
						tickFormat={x => `${x}`}
					/>

					<VictoryGroup offset={20} colorScale='qualitative'>
						{categories.map(cat => {
							return (
								<VictoryBar
									name={'stackedBar'}
									barRatio={0.2}
									barWidth={20}
									data={values.filter(val => val.category === cat.name)}
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
									key={cat.name}
									animate={{
										duration: 2000,
										onLoad: { duration: 1000 }
									}}
									x='race'
									y='value'
									standalone={false}
									cornerRadius={{ top: 5 }}
									labelComponent={
										<VictoryTooltip
											flyoutStyle={{
												fill: '#ffffff90'
											}}
										/>
									}
									style={{
										labels: {
											fill: '#000'
										},
										data: {
											fill: ({ datum }) => {
												const { highlighted } = this.props
												if (datum.race === highlighted) {
													return '#fce21b'
												}
												if (datum.category === 'Non-violent Crimes') {
													return highlighted ? '#59C5B370' : '#59C5B3'
												}
												if (datum.category === 'Violent Crimes') {
													return highlighted ? '#2D596370' : '#2D5963'
												}
											}
										}
										// data: {
										// 	fill: ({ datum }) => {
										// 		switch (datum.race) {
										// 			case this.props.highlighted:
										// 				return '#fce21b'
										// 			case 'Black or African American':
										// 				return '#000'
										// 			case 'rgb(255, 255, 255)':
										// 				return '#fff'
										// 			case 'Asian':
										// 				return '#C47AC0'
										// 			case 'American Indian or Alaska Native':
										// 				return '#2B9720'
										// 			case 'Native Hawaiian or Pacific Islander':
										// 				return '#32CBFF'
										// 			case 'Other':
										// 				return '#1B3B6F'
										// 			default:
										// 				return '#32CBFF'
										// 		}
										// 	}
										// }
									}}
								/>
							)
						})}
					</VictoryGroup>
				</VictoryChart>
			</div>
		)
	}
}

// const app = document.getElementById('app');
// ReactDOM.render(<BarGraph />, app);

export default StackedBar
