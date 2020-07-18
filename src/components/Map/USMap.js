import React, { Component } from 'react'
import State from '../State/State'
import {
	ComposableMap,
	Geographies,
	Geography,
	ZoomableGroup
} from 'react-simple-maps'
// import counties from './assets/topoJSONs/counties-10m.json'
import stateFlags from './assets/stateFlags/stateFlags.json'
import states from './assets/topoJSONs/states-10m.json'
import './USMap.css'
import Axios from 'axios'

class USMap extends Component {
	constructor() {
		super()
		this.state = {
			data: {},
			stateClicked: false,
			stateSelected: '',
			isLoading: false,
			transitions: {}
		}
		this.handleStateClose = this.handleStateClose.bind(this)
		this.stateShape = React.createRef()
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

	componentDidMount() {
		Axios.get('/api/data').then(res => {
			this.setState({ data: res.data })
		})
		console.log(this.stateShape.current)
	}

	render() {
		// console.log(this.props)
		return (
			<div>
				<div className='mapPage'>
					Map Page
					<div className='mapContainer'>
						{this.state.stateClicked ? (
							<State
								stateSelected={this.state.stateSelected}
								statesData={this.state.data}
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
													// ! defs tag is for defining the svg background pattern
													// TODO: Get all state flags loaded in public/assets/stateFlags/1x
													return (
														<svg key={geo.rsmKey} ref={this.stateShape}>
															<defs>
																<pattern
																	id={`${geo.properties.name.replace(
																		/\s/g,
																		''
																	)}Flag`}
																	patternUnits='userSpaceOnUse'
																	// TODO: Figure out how to programatically get State flag SVG to size with State geo SVG
																	width='100'
																	height='80'
																>
																	{/* <Flags /> */}
																	<image
																		// * Replacing space in state name in order to access filepath in JSON object
																		xlinkHref={
																			stateFlags[
																				geo.properties.name.replace(/\s/g, '')
																			]
																		}
																		x='0'
																		y='0'
																		width='100'
																		height='80'
																	/>
																</pattern>
															</defs>
															<Geography
																id='state'
																geography={geo}
																onClick={() => {
																	this.handleStateOpen()
																	this.setState({
																		stateSelected: geo.properties.name
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
																		fill: `url(#${geo.properties.name.replace(
																			/\s/g,
																			''
																		)}Flag)`
																	},
																	pressed: {
																		outline: 'none'
																	}
																}}
															/>
														</svg>
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
						<button className='button' onClick={() => this.handleStateClose()}>
							State Close
						</button>
					) : (
						''
					)}
				</div>
			</div>
		)
	}
}

export default USMap
