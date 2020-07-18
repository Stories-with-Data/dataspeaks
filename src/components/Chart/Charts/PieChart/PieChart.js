import React, { Component } from 'react';
import { VictoryPie, VictoryChart, VictoryAxis, VictoryTheme, VictoryLabel } from 'victory';


class PieChart extends Component {
  constructor() {
    super()
    this.state = {
      data: {}
    }
  }


  render() {
    
    return (
      <div>
       
      
          <VictoryPie
            data={this.props.data}
            theme={VictoryTheme.material}
            animate={{
              duration: 2000,
              onLoad: { duration: 1000 }
            }}
            x='label'
            y='value'
            labelComponent={<VictoryLabel angle={45}/>}
          />

       
      </div>
    );
  }
}

// const app = document.getElementById('app');
// ReactDOM.render(<BarGraph />, app);


export default PieChart;