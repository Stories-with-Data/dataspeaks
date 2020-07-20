import React, { Component } from 'react'
import Nav from './components/Nav/Nav';
import Routes from './routes'
import './reset.css'
import './App.css'

class App extends Component {
	constructor() {
		super()

		this.state = {
			navOpen: false
		}
	}

	render() {
		return (
			<div className='App'>
				<Nav />
				{Routes}
			</div>
		)
	}
}

export default App
