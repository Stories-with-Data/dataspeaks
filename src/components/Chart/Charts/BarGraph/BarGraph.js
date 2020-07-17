import React, { Component } from 'react';
import { VictoryBar, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel  } from 'victory';
  
  
 
  class BarGraph extends Component {
    constructor() {
      super()
      this.state = {
        data: {}
      }
    }


    render() {
      
      return (
        <div>
          <VictoryChart
            domainPadding={20}
            theme={VictoryTheme.material} 
            >
            <VictoryAxis
            style={{
              grid: {stroke: 'rgb(255, 255, 255, 0.0)'}
            }}
              tickLabelComponent={<VictoryLabel 
              angle={45}
              verticalAnchor={'start'}
              y={350}
              >

              </VictoryLabel>}
              // style={{tickLabels: {
              //   angle: 45
              // }}}
            />
  
            <VictoryAxis
            style={{
              grid: {stroke: 'rgb(255, 255, 255, 0.0)'}
            }}
              dependentAxis
              tickFormat={(x) => (`${x}`)}
              />
            <VictoryBar
              data={this.props.data}
              x='label'
              y='value'
              barRatio={1}
              cornerRadius={{top: 10}}
              animate={{
                duration: 2000,
                onLoad: { duration: 1000 }
              }}
            />
  
          </VictoryChart>
        </div>
      );
    }
  }

  // const app = document.getElementById('app');
  // ReactDOM.render(<BarGraph />, app);


export default BarGraph;