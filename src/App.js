import React from 'react';
import './reset.css'
import './App.css';
import Axios from 'axios';

function App() {
  
  return (
    <div className="App">
      <button onClick={() => Axios.get('/api/seed/fbi')}>click</button>
    </div>
  );
}

export default App;
