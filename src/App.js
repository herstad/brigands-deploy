import React, { Component } from 'react';
import './App.css';
import Arena from './arena';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Arena size="10"/>
      </div>
    );
  }
}

export default App;
