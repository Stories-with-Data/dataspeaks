import React, { useState, useEffect } from 'react'
import State from '../State/State'
import {
	ComposableMap,
	Geographies,
	Geography,
	ZoomableGroup
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

	// * All component functions
	const handleStateOpen = stateName => {
		setSelectedState(stateName)
	}

	const handleStateClose = () => {
		setSelectedState('')
	}

	const handleMoveEnd = position => setPosition(position)

	// * useEffect behaving like componentDidMount and componentWillUnmount
	useEffect(() => {
		setMapSize({ height: window.innerHeight, width: window.innerWidth })
	}, [])

	useEffect(() => {
		if (data.Texas) {
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
				<Fade
					mountOnEnter
					in={!loading}
					timeout={{enter: 500, exit: 500}}
				>
					<div className='mapContainer'>
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
																fill: '#ddd',
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
