import React, {Component} from 'react';
import * as d3 from "d3";

class BarChart extends Component {
    constructor(props){
        super(props);
  
        this.state = {
  
        }
      }
      componentDidMount() {
        this.drawChart();
      }
      
      drawChart() {
    
        const data = this.props.data;
          
        const svg = d3.select('#svg')
      .append("svg")
      .attr("width", this.props.width)
      .attr("height", this.props.height)
      .style("margin-left", 80)
      .style('transition', 'all 5s')
        
      svg.selectAll("rect")
      .data(data)
      .enter()
      .append("rect")
      .style('transition', 'all 5s')
      .attr("x", (d, i) => i * 80)
      .attr("y", (d, i) => 300 - 10 * d)
      .attr("width", 65)
      .attr("height", (d, i) => d * 10)
      .attr("fill", "green")
  
      }
      render(){
        return (
            <div id={"#" + this.props.id}>
              
               {/* Button for changing values maybe .. */}
                {/* <button onClick={() => this.change()}>Click Me</button> */}
            </div>

            )
      }
}

export default BarChart;