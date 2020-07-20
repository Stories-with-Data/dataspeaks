import React, { Component } from 'react'
import * as d3 from "d3";
import BarChart from './BarChart';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: [122, 1, 12, 6, 9, 10],
      width: 500,
      height: 500,
      id: 1
     }
  }
  render() { 
    return (
      <div>
        <BarChart data={this.state.data} width={this.state.width} height={this.state.height} />
      </div>
    );
  }
}
 
export default Main;