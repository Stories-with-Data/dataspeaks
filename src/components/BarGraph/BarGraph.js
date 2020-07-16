import React, {Component} from 'react'
import * as d3 from 'd3'
import './BarGraph.css'

// 0: {label: "White", value: 0.35, tooltip: "Description of data"}
// 1: {label: "Black", value: 0.05, tooltip: "Description of data"}
// 2: {label: "Hispanic", value: 0.3, tooltip: "Description of data"}
// 3: {label: "Asian", value: 0.33, tooltip: "Description of data"}
// 4: {label: "Other", value: 0.3, tooltip: "Description of data"}

class BarGraph extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  
    
  componentDidMount () {
    this.setState({data: this.props.data})

    this.drawChart()
  }

  drawChart () {
    
  }

  render () {
    console.log(this.state.data)
    return (
    <div className='bar-chart-container'>
      
    </div>
  )}
}

export default BarGraph;