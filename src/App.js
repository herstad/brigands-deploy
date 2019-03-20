import React, { Component } from 'react';
import './App.css';
import PlayingField from './PlayingField';
import Orders from './Orders';

class App extends Component {


  constructor(props) {
    super(props);

    const items = [{x: 1, y: 2, type: 'x'}, {x: 0, y: 0, type: 'o'}];
    this.state = {items:items};
    this.moveOnClick =this.moveOnClick.bind(this);
  }

  render() {
    return (
      <div className="App">
        <PlayingField size="10" items={this.state.items}/>
        <Orders moveOnClick={this.moveOnClick}/>
      </div>
    );
  }

  moveOnClick(e) {
    console.log('clicked moveOnClick');
    e.preventDefault();
    this.setState((state) => {
      const [mover, ...rest] = state.items;
      const moved = Object.assign({}, mover);
      moved.x = mover.x + 1;
      console.log('clicked moveOnClick. moved.x: ' + moved.x);
      return {items: [moved, ...rest]};
    });
  }
}

export default App;
