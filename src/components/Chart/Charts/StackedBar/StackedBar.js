import React, { Component } from 'react'
import {
	VictoryBar,
	VictoryChart,
	VictoryGroup,
	VictoryAxis,
	VictoryTheme,
	VictoryTooltip,
	VictoryLegend
} from 'victory'

class StackedBar extends Component {
	constructor() {
		super()
		this.state = {
			data: {}
		}
	}

	//  categories: Array(2)
	// 0: {name: "Violent", tooltip: "Description of category"}
	// 1: {name: "Non-violent", tooltip: "Description of category"}
	// length: 2
	// __proto__: Array(0)
	// values: Array(10)
	// 0: {label: "White", category: "Violent Crimes", value: 2, tooltip: "Description of data"}
	// 1: {label: "White", category: "Non-violent Crimes", value: 3, tooltip: "Description of data"}
	// 2: {label: "Black", category: "Violent Crimes", value: 15, tooltip: "Description of data"}
	// 3: {label: "Black", category: "Non-violent Crimes", value: 14, tooltip: "Description of data"}
	// 4: {label: "Hispanic", category: "Violent Crimes", value: 5, tooltip: "Description of data"}
	// 5: {label: "Hispanic", category: "Non-violent Crimes", value: 3, tooltip: "Description of data"}
	// 6: {label: "Asian", category: "Violent Crimes", value: 1, tooltip: "Description of data"}
	// 7: {label: "Asian", category: "Non-violent Crimes", value: 2, tooltip: "Description of data"}
	// 8: {label: "Other", category: "Violent Crimes", value: 3, tooltip: "Description of data"}
	// 9: {label: "Other", category: "Non-violent Crimes", value: 4, toolti

	render() {
		const { categories, values } = this.props.data
		// console.log(values)
		return (
			<div>
				<VictoryChart
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
									name={cat.name}
									barRatio={0.2}
									barWidth={20}
									data={values.filter(val => val.category === cat.name)}
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
										}
										// data: {
										// 	fill: ({ datum }) => {
										// 		switch (datum.race) {
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
