import React from 'react';
import Footer from './components/Footer/Footer';
import Nav from './components/Nav/Nav';
import Routes from './routes.js';
import './reset.css'
import './App.css';

function App() {
  return (
    <div className="App">
      <Nav />
    {Routes} 
    <Footer />
    </div>
  );
}

export default App;
