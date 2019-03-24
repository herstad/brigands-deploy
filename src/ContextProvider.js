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
    this.update(((item, state) => item.type === 'x' && this.inRange(this.getItemByType('o', state), item)), (item) => {
      console.log('ai attack');
      return ({hp: item.hp - 1})
    });
    this.update(((item, state) => item.type === 'o' && !this.inRange(this.getItemByType('x', state), item)), (item, state) => {
      console.log('ai move');
      return this.moveFn(item, this.toward(item, this.getItemByType('x', state)));
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
    return this.toward(brigand, enemy);
  };

  toward = (attacker, target) => {
    const xd = target.x - attacker.x;
    const yd = target.y - attacker.y;
    return Math.abs(xd) > Math.abs(yd) ? {x: Math.sign(xd), y: 0} : {x: 0, y: Math.sign(yd)};
  };

  awayFromEnemy = (state) => {
    const {x, y} = this.towardEnemy(state);
    return {x: x * -1, y: y * -1};
  };

  move = (direction) => {
    return this.update(this.matchId(0), (item, state) => this.moveFn(item, direction(state)));
  };

  attack = () => {
    this.update(this.matchId(1), (item) => ({hp: item.hp - 1}));
  };

  update = (predicate, updateFn) => {
    this.setState((state) => {
      const items = state.items.map(this.updateItem(predicate, updateFn, state));
      return {items};
    });
  };


  updateItem(predicate, updateFn, state) {
    return el => (predicate(el, state) ? {...el, ...updateFn(el, state)} : el);
  }

  moveFn(item, {x, y}) {
    return {x: (item.x + x), y: (item.y + y)}
  }

  inRange = (attacker, target, range = 1) => {
    return Math.abs(target.x - attacker.x) + Math.abs(target.y - attacker.y) <= range;
  };

  matchId = (id) => {
    return (item) => item.id === id;
  };

  matchType = (type) => {
    return (item) => item.type === type;
  };

  getItemById = (id, state) => state.items.find((item) => item.id === id);

  getItemByType = (type, state) => state.items.find((item) => item.type === type);


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
