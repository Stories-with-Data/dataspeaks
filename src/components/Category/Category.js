import React from 'react'
import './Category.css'
// import Rank from '../Rank/Rank'
// import Chart from '../Chart/Chart'

function Category(props) {
  return (
    <div className='categoryContainer'>
      <p>Category Component</p>
      

      <div className='categoryTitle'>
        <p className='pCategory'>Category Name</p>
      </div>

      <div className='rankContainer'>
        {/* <Rank/>   */} RANK
      </div>

      <div className='chartContainer'>
        {/* <Chart/> */} CHART
      </div>

    </div>
  )
}

export default Category