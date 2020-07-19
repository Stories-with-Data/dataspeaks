import React, { Component } from 'react'
import {
	VictoryPie,
	VictoryChart,
	VictoryAxis,
	VictoryTheme,
	VictoryLabel,
	VictoryTooltip
} from 'victory'

class PieChart extends Component {
	constructor() {
		super()
		this.state = {
			data: {}
		}
	}

	render() {
		return (
			<div>
				<VictoryPie
					data={this.props.data}
					theme={VictoryTheme.material}
					animate={{
						duration: 2000,
						onLoad: { duration: 1000 }
					}}
					x='race'
					y='value'
					labelComponent={<VictoryTooltip />}
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
				/>
			</div>
		)
	}
}

// const app = document.getElementById('app');
// ReactDOM.render(<BarGraph />, app);

export default PieChart
