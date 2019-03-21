import React, {Component} from 'react';
import BrigandContext from './BrigandContext';

export default class ContextProvider extends Component {
  state = {
    count: 0,
    items: [{x: 1, y: 2, type: 'x'}, {x: 0, y: 0, type: 'o'}],
    selected: undefined,
  };

  addOne = () => {
    this.setState(state => ({count: state.count + 1}))
  };

  moveRight = () => {
    console.log('clicked moveOnClick');
    this.setState((state) => {
      const [mover, ...rest] = state.items;
      const moved = Object.assign({}, mover);
      moved.x = mover.x + 1;
      console.log('clicked moveOnClick. moved.x: ' + moved.x);
      return {items: [moved, ...rest]};
    });
  };

  setSelected = (selected) => {
    console.log('setSelected x:' + selected.x);
    this.setState({selected});
  };

  render() {
    const {count, items, selected} = this.state;

    const value = {
      addOne: this.addOne,
      count,
      moveRight: this.moveRight,
      items,
      selected,
      setSelected: this.setSelected
    };

    return (
      <BrigandContext.Provider value={value}>
        {this.props.children}
      </BrigandContext.Provider>
    )
  }
}
