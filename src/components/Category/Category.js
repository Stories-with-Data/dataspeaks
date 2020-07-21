import React from 'react'
import './Category.css'
import Rank from '../Rank/Rank'
import Chart from '../Chart/Chart'

function Category(props) {
	const { catData, highlighted } = props
	return (
		<div className='categoryContainer'>
			<div className='categoryTitle'>
				<span className='pCategory'>{catData.title}</span>
			</div>
			<div className='categoryTitle'>
				<span className='categoryDescription'>{catData.description}</span>
			</div>

			<div className='rankContainer'>
				<Rank rank={catData.rank} />
			</div>

			<div className='chartContainer'>
				<Chart 
					chartData={catData.data} 
					changeHighlight={props.changeHighlight} 
					highlighted={highlighted} 
				/>
			</div>
		</div>
	)
}

export default Category
