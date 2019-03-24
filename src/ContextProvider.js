import React, {Component} from 'react';
import BrigandContext from './BrigandContext';

export default class ContextProvider extends Component {
  state = {
    count: 0,
    items: [{id: 0, x: 1, y: 2, hp: 5, type: 'x'}, {id: 1, x: 0, y: 0, hp: 5, type: 'o'}],
    selected: undefined,
  };

  addOne = () => {
    this.setState(state => ({count: state.count + 1}));
    this.aiTurn();
  };

  aiTurn = () => {
    this.update(0, (item, state) => {
      if (this.inRange(state.items[1], state.items[0])) {
        return ({hp: item.hp - 1})
      }
      return {};
    });
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
    return Math.abs(xd) > Math.abs(yd) ? {x: Math.sign(xd), y: 0} : {x: 0, y: Math.sign(yd)};
  };

  awayFromEnemy = (state) => {
    const {x, y} = this.towardEnemy(state);
    return {x: x * -1, y: y * -1};
  };

  move = (direction) => {
    return this.update(0, (item, state) => this.moveFn(item, direction(state)));
  };

  attack = () => {
    this.update(1, (item) => ({hp: item.hp - 1}));
  };

  update = (id, updateFn) => {
    this.setState((state) => {
      const items = state.items.map(this.updateItem(id, (item) => updateFn(item, state)));
      return {items};
    });
  };

  updateItem(id, updateFn) {
    return el => (el.id === id ? {...el, ...updateFn(el)} : el);
  }

  moveFn(item, {x, y}) {
    return {x: (item.x + x), y: (item.y + y)}
  }

  inRange = (attacker, target, range = 1) => {
    return Math.abs(target.x - attacker.x) + Math.abs(target.y - attacker.y) <= range;
  };

  render() {
    const {count, items, selected} = this.state;

    const value = {
      addOne: this.addOne,
      count,
      moveTowardEnemy: this.moveTowardEnemy,
      moveAwayFromEnemy: this.moveAwayFromEnemy,
      attack: this.attack,
      inRange: this.inRange,
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
