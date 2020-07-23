import React, { Component } from 'react'
import Nav from './components/Nav/Nav'
import { withRouter } from 'react-router-dom'
import Routes from './routes'
import './reset.css'
import './App.css'

class App extends Component {
	constructor() {
		super()

		this.state = {}
	}

	render() {
		const { pathname } = this.props.location
		return (
			<div className='App'>
				{pathname === '/' ? null : <Nav />}
				{Routes}
			</div>
		)
	}
}

export default withRouter(App)
