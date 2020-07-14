import React, { Component } from 'react'
import State from '../State/State'
import {
	ComposableMap,
	Geographies,
	Geography,
	ZoomableGroup
} from 'react-simple-maps'
// import counties from '../../assets/topoJSONs/counties-10m.json'
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
													return (
														<Geography
															id='state'
															key={geo.rsmKey}
															geography={geo}
															onClick={() => {
																console.log(geo.properties.name)
															}}
															style={{
																default: {
																	fill: '#ddd',
																	stroke: '#fff'
																},
																hover: {
                                  stroke: '#fff',
																	fill: 'black',
																	cursor: 'pointer',
                                  outline: 'none'
																},
																pressed: {
																	outline: 'none'
																}
															}}
														/>
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
