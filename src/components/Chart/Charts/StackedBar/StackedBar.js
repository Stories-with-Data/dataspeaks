import React, { Component } from 'react';
import { VictoryBar, VictoryChart, VictoryGroup, VictoryAxis, VictoryTheme, VictoryTooltip } from 'victory';



class StackedBar extends Component {
  constructor() {
    super()
    this.state = {
      data: {}
    }
  }

  //  categories: Array(2)
  // 0: {name: "Violent", tooltip: "Description of category"}
  // 1: {name: "Non-violent", tooltip: "Description of category"}
  // length: 2
  // __proto__: Array(0)
  // values: Array(10)
  // 0: {label: "White", category: "Violent Crimes", value: 2, tooltip: "Description of data"}
  // 1: {label: "White", category: "Non-violent Crimes", value: 3, tooltip: "Description of data"}
  // 2: {label: "Black", category: "Violent Crimes", value: 15, tooltip: "Description of data"}
  // 3: {label: "Black", category: "Non-violent Crimes", value: 14, tooltip: "Description of data"}
  // 4: {label: "Hispanic", category: "Violent Crimes", value: 5, tooltip: "Description of data"}
  // 5: {label: "Hispanic", category: "Non-violent Crimes", value: 3, tooltip: "Description of data"}
  // 6: {label: "Asian", category: "Violent Crimes", value: 1, tooltip: "Description of data"}
  // 7: {label: "Asian", category: "Non-violent Crimes", value: 2, tooltip: "Description of data"}
  // 8: {label: "Other", category: "Violent Crimes", value: 3, tooltip: "Description of data"}
  // 9: {label: "Other", category: "Non-violent Crimes", value: 4, toolti

  componentDidMount() {
    const { data } = this.props
    // console.log(data)

    // for (let i = 0; i < data.categories.length; i++){

    // }
  }

  render() {
    const { categories, values } = this.props.data
    console.log(values)
    return (
      <div>
        <VictoryChart
          domainPadding={20}
          theme={VictoryTheme.material}
        >
          <VictoryAxis 
          style={{
            grid: {stroke: 'rgb(255, 255, 255, 0.0)'}
          }}/>

          <VictoryAxis
            dependentAxis
            style={{
              grid: {stroke: 'rgb(255, 255, 255, 0.0)'}
            }}
            tickFormat={(x) => (`${x}`)}
          />

          <VictoryGroup
          offset={20}
          barRatio={1}
          
          // categories={categories.map(cat => cat.name)}
          // categories={['Non-violent Crimes', 'Violent Crimes']}
          >
            {categories.map(cat => {
              return (
                <VictoryBar
                
                animate={{
                  duration: 2000,
                  onLoad: { duration: 1000 }
                }}
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