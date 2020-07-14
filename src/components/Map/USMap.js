import React, { Component } from 'react'
import State from '../State/State'
import {
	ComposableMap,
	Geographies,
	Geography,
	ZoomableGroup
} from 'react-simple-maps'
// import counties from '../../assets/topoJSONs/counties-10m.json'
import stateFlags from './assets/stateFlags/stateFlags.json'
import states from '../../assets/topoJSONs/states-10m.json'
import './USMap.css'

class USMap extends Component {
	constructor() {
		super()
		this.state = {
			iat: {},
			fbi: {},
			census: {},
			stateClicked: false,
			stateSelected: '',
			isLoading: false,
			transitions: {}
		}
		this.handleStateClose = this.handleStateClose.bind(this)
	}

	handleStateOpen() {
		this.setState({
			stateClicked: true
		})
	}

	handleStateClose() {
		this.setState({
			stateClicked: false
		})
	}

	componentDidMount() {}

	render() {
		console.log(this.props)
		return (
			<div>
				<div className='mapPage'>
					Map Page
					<div className='mapContainer'>
						{this.state.stateClicked ? (
							<State
								stateOpen={this.state.stateClicked}
								handleStateClose={this.handleStateClose}
							/>
						) : (
							<div>
								<ComposableMap projection='geoAlbersUsa'>
									<ZoomableGroup zoom={1}>
										<Geographies geography={states}>
											{({ geographies }) =>
												geographies.map(geo => {
													// console.log(geo)
													// ! defs tag is for defining the svg background pattern
													// TODO: Get all state flags loaded in public/assets/stateFlags/1x
													return (
														<>
															<defs>
																<pattern
																	id={`${geo.properties.name}Flag`}
																	patternUnits='userSpaceOnUse'
																	// TODO: Figure out how to programatically get State flag SVG to size with State geo SVG
																	width='100'
																	height='80'
																>
																	<image
																		xlinkHref={stateFlags[geo.properties.name]}
																		x='0'
																		y='0'
																		width='100'
																		height='80'
																	/>
																</pattern>
															</defs>
															<Geography
																id='state'
																key={geo.rsmKey}
																geography={geo}
																onClick={() => {
																	const { stateSelected } = this.state
																	this.setState({
																		stateSelected:
																			stateSelected === ''
																				? geo.properties.name
																				: ''
																	})
																}}
																style={{
																	default: {
																		fill: '#ddd',
																		stroke: '#fff'
																	},
																	hover: {
																		stroke: '#fff',
																		cursor: 'pointer',
																		outline: 'none',
																		fill: `url(#${geo.properties.name}Flag)`
																	},
																	pressed: {
																		outline: 'none'
																	}
																}}
															/>
														</>
													)
												})
											}
										</Geographies>
									</ZoomableGroup>
								</ComposableMap>
							</div>
						)}
					</div>
					{this.state.stateClicked ? (
						''
					) : (
						<button className='button' onClick={() => this.handleStateOpen()}>
							State Open
						</button>
					)}
				</div>
			</div>
		)
	}
}

export default USMap
