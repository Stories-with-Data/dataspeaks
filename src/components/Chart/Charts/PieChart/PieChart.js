import React, { Component } from 'react'
import {
	VictoryPie,
	// VictoryChart,
	// VictoryAxis,
	VictoryTheme,
	VictoryContainer,
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
					containerComponent={
						<VictoryContainer style={{ touchAction: 'auto' }} />
					}
					name='pie'
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
					theme={VictoryTheme.material}
					animate={{
						duration: 2000,
						onLoad: { duration: 1000 }
					}}
					x='race'
					y='value'
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
				/>
			</div>
		)
	}
}

// const app = document.getElementById('app');
// ReactDOM.render(<BarGraph />, app);

export default PieChart
