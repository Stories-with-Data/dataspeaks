import React, { Component } from 'react'
import Nav from './components/Nav/Nav'
import { withRouter } from 'react-router-dom'
import Routes from './routes'
import './reset.css'
import './App.css'
import axios from 'axios';

class App extends Component {
	constructor() {
		super()

		this.state = {}
	}
async componentDidMount(){
	await axios.get('/session').then(res => this.setState({user: res.data})).catch(err => console.log(err))
	if (this.state.user.name){
		this.setState({
			loading: false
		})
	}
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
