import React, {Component} from 'react'
import State from '../State/State'
import './USMap.css'


class USMap extends Component {
  constructor() {
    super()
    this.state = {
      iat: {},
      fbi: {},
      census: {},
      stateClicked: false,
      stateSelected: '',
      isLoading: false,
      transitions: {}
    }
    this.handleStateClose = this.handleStateClose.bind(this)
  }

  handleStateOpen() {
    this.setState({
      stateClicked: true
    })
  }

  handleStateClose() {
    this.setState({
      stateClicked: false
    })
  }

  render() {
    console.log(this.props)
    return (
      <div>
        <div className='mapPage'>Map Page
          <div className='mapContainer'>
            {this.state.stateClicked ? (
              < State 
                stateOpen={this.state.stateClicked}
                handleStateClose={this.handleStateClose}/>
              ) : (
              <div>This is the full US map</div>
            )}
          </div>
          {this.state.stateClicked ? (
            ''
            ) : (
           <button className='button' onClick={() => this.handleStateOpen()}>State Open</button>
        )}
        </div>
      </div>
    )
  }
}

export default USMap