import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { VictoryBar, VictoryChart, VictoryGroup, VictoryAxis, VictoryTheme, VictoryTooltip } from 'victory';



class StackedBar extends Component {
  constructor() {
    super()
    this.state = {
      data: {}
    }
  }

  componentDidMount() {
    const { data } = this.props
    // console.log(data)

    // for (let i = 0; i < data.categories.length; i++){

    // }
  }

  render() {
    const { categories, values } = this.props.data
    return (
      <div>
        <VictoryChart
          domainPadding={20}
          theme={VictoryTheme.material}
        >
          <VictoryAxis />

          <VictoryAxis
            dependentAxis
            tickFormat={(x) => (`${x}`)}
          />

          <VictoryGroup
          offset={10}
          // categories={categories.map(cat => cat.name)}
          // categories={['Non-violent Crimes', 'Violent Crimes']}
          >
            {categories.map(cat => {
              return (
                <VictoryBar
                  data={values.filter(val => val.category === cat.name)}
                  x='label'
                  y='value'
                  labels={(d) => d.x}
                  labelComponent={
                    <VictoryTooltip
                      dy={0}
                      centerOffset={{
                        x: 20
                      }}
                    />
                  }
                />
              )
            })}
          </VictoryGroup>

        </VictoryChart>
      </div>
    );
  }
}

// const app = document.getElementById('app');
// ReactDOM.render(<BarGraph />, app);


export default StackedBar;