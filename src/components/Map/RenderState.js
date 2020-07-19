import React, { useRef } from 'react'
import { Geography, Marker } from 'react-simple-maps'
import stateFlags from './assets/stateFlags/stateFlags.json'
import { geoCentroid } from 'd3-geo'

const RenderState = ({ geo, handleStateOpen, rest }) => {
	const ref = useRef()
	const bBox = ref.current
		? ref.current.getBBox()
		: { height: 0, width: 0, x: 0, y: 0 }
	const xOffset = (bBox.width / 2) * -1
	const centroid = geoCentroid(geo)
	// const yOffset = ref.current ? (ref.current.getBBox().height / 2) * -1 : 0
	return (
		<svg ref={ref}>
			<defs>
				<pattern
					id={`${geo.properties.name.replace(/\s/g, '')}Flag`}
					// patternUnits='userSpaceOnUse'
					// TODO: Figure out how to programatically get State flag SVG to size with State geo SVG
					x='0'
					y='0'
					height={1}
					width={1.5151}
				>
					{/* <Flags /> */}
					<image
            alignmentBaseline='middle'
						// x={centroid[1] * -1}
						// y={centroid[0] / 2}
						preserveAspectRatio='xMidYMid slice'
						transform={`translate(${centroid[1] * -1}, ${centroid[0] / 2})`}
						// * Replacing space in state name in order to access filepath in JSON object
						xlinkHref={stateFlags[geo.properties.name.replace(/\s/g, '')]}
					/>
				</pattern>
			</defs>
			<Geography
				id='state'
				geography={geo}
				onClick={() => {
					handleStateOpen(geo.properties.name)
          console.log(ref.current.getBBox())
          console.log(centroid)
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
						fill: `url(#${geo.properties.name.replace(/\s/g, '')}Flag)`
					},
					pressed: {
						outline: 'none'
					}
				}}
			/>
		</svg>
	)
}

export default RenderState
