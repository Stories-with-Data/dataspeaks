import React, { useState, useEffect } from 'react'
import { geoCentroid } from 'd3-geo'
import State from '../State/State'
import {
	ComposableMap,
	Geographies,
	Geography,
	ZoomableGroup,
	Marker,
	Annotation
} from 'react-simple-maps'
// import counties from '../../assets/topoJSONs/counties-10m.json'
import stateFlags from '../../assets/stateFlags/stateFlags.json'
import states from '../../assets/topoJSONs/states-10m.json'
import './USMap.css'
import useStatesData from '../../hooks/useStatesData'
import { makeStyles } from '@material-ui/core/styles'
import Popover from '@material-ui/core/Popover'
import Typography from '@material-ui/core/Typography'
import Backdrop from '@material-ui/core/Backdrop'
import CircularProgress from '@material-ui/core/CircularProgress'
import Fade from '@material-ui/core/Fade'
import FirstMapVisit from './FirstMapVisit/FirstMapVisit'
// import Rank from '../Rank/Rank'

const offsets = {
	VT: [50, -8],
	NH: [34, 2],
	MA: [30, -1],
	RI: [28, 2],
	CT: [35, 10],
	NJ: [34, 1],
	DE: [33, 0],
	MD: [47, 10],
	DC: [49, 21]
}

const useStyles = makeStyles(theme => ({
	popover: {
		pointerEvents: 'none'
	},
	paper: {
		padding: theme.spacing(1)
	},
	backdrop: {
		zIndex: theme.zIndex.drawer + 1000
	}
}))

const USMap = () => {
	// * All state hooks here
	const data = useStatesData()
	const [selectedState, setSelectedState] = useState('')
	const [position, setPosition] = useState({ coords: [0, 0], zoom: 1 })
	const [mapSize, setMapSize] = useState({ height: 600, width: 800 })
	const [loading, setLoading] = useState(true)
	const [heatMap, setHeatMap] = useState('')
	const [menuOpen, setMenuOpen] = useState(false)
	const [firstVisit, setFirstVisit] = useState(true)

	// * All component functions
	const handleStateOpen = stateName => {
		setSelectedState(stateName)
	}

	const handleStateClose = () => {
		setSelectedState('')
	}

	const getHeatTitle = mapType => {
		switch (mapType) {
			case 'black_pop':
				return 'Black Population'
			case 'overall':
				return 'Overall'
			case 'plainMap':
				return 'Plain Map'
			case 'iat':
				return 'IAT Score'
			case 'arrest_rate':
				return 'Arrest Rate'
			case 'incarcerated_rate':
				return 'Incarcerated Rate'
			default:
				return 'Heat Map'
		}
	}

	const getHeatColor = stateName => {
		// arrestRates and incarcerated rates are inverted (50 is green, 1 is red)
		// black pop should go from rgb(221, 221, 221) to black with more population
		// iat and overall (50 is red, 1 is green)
		if (!heatMap || heatMap === 'plainMap') {
			return '#ddd'
		}

		const ranks = data.heatmapRanks.filter(
			elem => elem.state_name === stateName
		)

		if (!ranks[0]) {
			return '#ddd'
		}

		const rank = ranks[0][heatMap]
		let color = 0

		if (heatMap === 'arrest_rate' || heatMap === 'incarcerated_rate') {
			if (rank <= 25) {
				color = Math.ceil(40 + (rank / 25) * (240 - 40))
				return `rgb(240, ${color}, 0)`
			} else {
				color = Math.ceil(240 - ((rank - 25) / 25) * (240 - 40))
				return `rgb(${color}, 240, 0)`
			}
		}
		if (heatMap === 'overall' || heatMap === 'iat') {
			if (rank <= 25) {
				color = Math.ceil(40 + (rank / 25) * (240 - 40))
				return `rgb(${color}, 240, 0)`
			} else {
				color = Math.ceil(240 - ((rank - 25) / 25) * (240 - 40))
				return `rgb(240, ${color}, 0)`
			}
		}
		if (heatMap === 'black_pop') {
			color = Math.ceil((rank / 50) * 221)
			return `rgb(${color}, ${color}, 221)`
		}
	}

	const handleHeatMap = mapType => {
		setMenuOpen(false)
		setHeatMap(mapType)
	}

	const handleMoveEnd = position => setPosition(position)

	const finishFirstVisit = () => {
		setFirstVisit(false)
	}

	// * useEffect behaving like componentDidMount and componentWillUnmount
	useEffect(() => {
		setMapSize({ height: window.innerHeight, width: window.innerWidth })
	}, [])

	useEffect(() => {
		if (data.Texas) {
			setFirstVisit(data.mapViews === 1 ? true : false)
			setLoading(false)
		}
	}, [data])

	// * For Popover
	const classes = useStyles()
	const [anchorEl, setAnchorEl] = useState(null)
	const [popoverText, setPopoverText] = useState('Loading...')
	const popoverOpen = Boolean(anchorEl)

	const handlePopoverOpen = e => setAnchorEl(e.currentTarget)
	const handlePopoverClose = () => setAnchorEl(null)

	return (
		<div className='mapPage'>
			{selectedState ? (
				<State
					stateSelected={selectedState ? true : false}
					stateData={selectedState ? data[selectedState] : data.Texas}
					handleStateClose={handleStateClose}
					stateFlag={stateFlags[selectedState.replace(/\s/g, '')]}
				/>
			) : null}
			{loading ? (
				<Backdrop open={loading}>
					<CircularProgress />
				</Backdrop>
			) : (
				<Fade mountOnEnter in={!loading} timeout={{ enter: 500, exit: 500 }}>
					<div className='mapContainer'>
						{/* {data.mapViews === 1 ? ( */}
						<FirstMapVisit
							backdropClass={classes.backdrop}
							open={firstVisit}
							finishFirstVisit={finishFirstVisit}
						/>
						{/* ) : null} */}
						<div className={`heatMapMenu${menuOpen}`}>
							<ul>
								<div onClick={() => setMenuOpen(!menuOpen)}>
									{getHeatTitle(heatMap)}
								</div>
								<li onClick={() => handleHeatMap('plainMap')}>Plain Map</li>
								<li onClick={() => handleHeatMap('overall')}>Overall</li>
								<li onClick={() => handleHeatMap('arrest_rate')}>
									Arrest Rate
								</li>
								<li onClick={() => handleHeatMap('iat')}>IAT Score</li>
								<li onClick={() => handleHeatMap('black_pop')}>
									Black Population
								</li>
								<li onClick={() => handleHeatMap('incarcerated_rate')}>
									Incarcerated Rate
								</li>
							</ul>
						</div>
						<ComposableMap
							width={mapSize.width || 800}
							height={mapSize.height || 600}
							projection='geoAlbersUsa'
						>
							<ZoomableGroup
								minZoom={0.5}
								maxZoom={4}
								zoom={1}
								center={position.coords}
								onMoveEnd={handleMoveEnd}
							>
								<Geographies geography={states}>
									{({ geographies }) => (
										<>
											{geographies.map(geo => (
												<React.Fragment key={geo.rsmKey}>
													<Geography
														id='state'
														geography={geo}
														onClick={() => {
															handleStateOpen(geo.properties.name)
														}}
														style={{
															default: {
																fill: getHeatColor(geo.properties.name),
																stroke: '#ffffff00'
															},
															hover: {
																cursor: 'pointer',
																outline: 'none',
																fill: '#FCE21B'
															},
															pressed: {
																outline: 'none'
															}
														}}
														onMouseEnter={e => {
															setPopoverText(geo.properties.name)
															handlePopoverOpen(e)
														}}
														onMouseLeave={() => {
															handlePopoverClose()
														}}
													/>
												</React.Fragment>
											))}
											{geographies.map(geo => {
												const centroid = geoCentroid(geo)
												const cur = data.heatmapRanks.find(
													s => s.state_name === geo.properties.name
												)
												// console.log(Object.keys(offsets))
												// console.log(cur.state_abv)
												return (
													<g key={geo.rsmKey + '-name'}>
														{cur &&
															centroid[0] > -160 &&
															centroid[0] < -67 &&
															(Object.keys(offsets).indexOf(cur.state_abv) ===
															-1 ? (
																<Marker coordinates={centroid}>
																	<text y='2' fontSize={14} textAnchor='middle'>
																		{cur[heatMap]}
																	</text>
																</Marker>
															) : heatMap === '' || heatMap === 'plainMap' ? (
																''
															) : (
																<Annotation
																	subject={centroid}
																	dx={offsets[cur.state_abv][0]}
																	dy={offsets[cur.state_abv][1]}
																>
																	<text
																		x={4}
																		fontSize={14}
																		alignmentBaseline='middle'
																	>
																		{cur[heatMap]}
																	</text>
																</Annotation>
															))}
													</g>
												)
											})}
										</>
									)}
								</Geographies>
							</ZoomableGroup>
						</ComposableMap>
					</div>
				</Fade>
			)}
			<Popover
				className={classes.popover}
				classes={{
					paper: classes.paper
				}}
				open={popoverOpen}
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'center'
				}}
				transformOrigin={{
					vertical: 'center',
					horizontal: 'center'
				}}
				onClose={handlePopoverClose}
				disableRestoreFocus
			>
				<Typography variant='body1'>{popoverText}</Typography>
			</Popover>
		</div>
	)
}

export default USMap
