import React, {Component} from 'react';
import Footer from './components/Footer/Footer';
import Nav from './components/Nav/Nav';
import Routes from './routes'
import './reset.css'
import './App.css';
import Axios from 'axios';

class App extends Component {
  constructor(){
    super();
    
    this.state = {
      navOpen: false
    }
  }

  render(){
    return (
      <div className="App">
        {Routes} 
        <Footer />
      </div>
    );
  }
}

export default App;
