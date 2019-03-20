import React, {Component} from 'react';
import './App.css';
import PlayingField from './PlayingField';
import Orders from './Orders';
import InfoPane from './InfoPane';

class App extends Component {


  constructor(props) {
    super(props);

    const items = [{x: 1, y: 2, type: 'x'}, {x: 0, y: 0, type: 'o'}];
    this.state = {items: items, selected: items[0]};
    this.moveOnClick = this.moveOnClick.bind(this);
    this.genSelectOnClick = this.genSelectOnClick.bind(this);
  }

  render() {
    return (
      <div className="App">
        <InfoPane item={this.state.selected}/>
        <PlayingField size="10" items={this.state.items} genSelectOnClick={this.genSelectOnClick}/>
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

  genSelectOnClick(selected) {
    return (e) => {
      console.log('clicked selectOnClick');
      e.preventDefault();
      this.setState({selected: selected})
    }
  }
}

export default App;
