import React, { Component } from 'react';

class BarGraph extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: []
    }
  }
  componentDidMount() {
    console.log(this.props.data)
    this.setState({data: this.props.data})
  }

  componentWillUnmount() {

  }

  render() {
    const {data} = this.state
    const graphStyle = {
      width: '100%',
      height: '100%',
      backgroundColor: 'blue'
    }

    const axisStyle = {
      width: ``,
      height: '100%',
      backgroundColor: 'blue'
    }

    return (
      <div className='graphDiv' style={graphStyle}>
        <div className='axisDiv' style={axisStyle}>
          
        </div>
      </div>
    );
  }
}

export default BarGraph;