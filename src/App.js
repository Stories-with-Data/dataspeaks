import React, { Component } from 'react'
import Nav from './components/Nav/Nav';
import Routes from './routes'
import './reset.css'
import './App.css'
import axios from 'axios';

class App extends Component {
	constructor() {
		super()

		this.state = {
			navOpen: false,
			user: {},
			loading: true
		}
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
		// console.log(this.state);
		return (
			<div className='App'>
				<Nav />
				{Routes}
			</div>
		)
	}
}

export default App
