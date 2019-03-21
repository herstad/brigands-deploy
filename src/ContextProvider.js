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

  setSelected = (selected) => {
    console.log('setSelected x:' + selected.x);
    this.setState({selected});
  };

  moveTowardEnemy = () => {
    this.move(this.towardEnemy);
  };

  moveAwayFromEnemy = () => {
    this.move(this.awayFromEnemy);
  };

  towardEnemy = (state) => {
    const [brigand, enemy] = state.items;
    const xd = enemy.x - brigand.x;
    const yd = enemy.y - brigand.y;
    return Math.abs(xd) > Math.abs(yd) ? {x: Math.sign(xd), y:0} : {x: 0, y: Math.sign(yd)};
  };

  awayFromEnemy = (state) => {
    const {x,y} = this.towardEnemy(state);
    return {x: x*-1, y:y*-1};
  };

  move = (direction) => {
    this.setState((state) => {
      const {x,y} = direction(state);
      const [mover, ...rest] = state.items;
      const moved = Object.assign({}, mover);
      moved.x = mover.x + x;
      moved.y = mover.y + y;
      console.log('clicked moveOnClick. x: ' + x + 'y: ' + y);
      console.log('clicked moveOnClick. moved.x: ' + moved.x + 'moved.y: ' + moved.y);
      return {items: [moved, ...rest]};
    });
  }

  render() {
    const {count, items, selected} = this.state;

    const value = {
      addOne: this.addOne,
      count,
      moveTowardEnemy: this.moveTowardEnemy,
      moveAwayFromEnemy: this.moveAwayFromEnemy,
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
