import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack  } from 'victory';
  
  
 
  class BarGraph extends React.Component {
    constructor() {
      super()
      this.state = {
        data: {}
      }
    }


    render() {
      console.log(this.props)
      
      return (
        <div>
          <h1>Victory Tutorial</h1>
          <VictoryChart
            domainPadding={20}
            theme={VictoryTheme.material} >
            <VictoryAxis
              tickValues={[1, 2, 3, 4]}
              tickFormat={["Quarter 1", "Quarter 2", "Quarter 3", "Quarter 4"]}
              />
  
            <VictoryAxis
              dependentAxis
              tickFormat={(x) => (`$${x / 1000}k`)}
              />
            <VictoryBar
              data={this.props.data}
              x='label'
              y='value'
            />
  
          </VictoryChart>
        </div>
      );
    }
  }

  // const app = document.getElementById('app');
  // ReactDOM.render(<BarGraph />, app);


export default BarGraph;