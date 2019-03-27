import React, {Component} from 'react';
import BrigandContext from './BrigandContext';

export default class ContextProvider extends Component {
  state = {
    turn: 0,
    ap: 1,
    items: ContextProvider.generateItems(),
    selected: undefined,
  };

  static generateItems(size = 10) {
    const items = [{id: 0, x: 1, y: 2, hp: 5, type: 'x'}, {id: 1, x: 0, y: 0, hp: 5, type: 'o'}];
    return ContextProvider.generatePosition(size, items);
  }

  static generatePosition(size, items) {
    const xs = ContextProvider.generateRandomArray(size);
    const ys = ContextProvider.generateRandomArray(size);
    return items.map((item) => ({...item, x: xs.shift(), y: ys.shift()}));
  };

  static generateRandomArray(size) {
    const array = Array.from(Array(size).keys());
    ContextProvider.shuffleArray(array);
    return array;
  };

  static shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  };

  endTurn = () => {
    this.setState(state => ({turn: state.turn + 1, ap: 1}));
    this.aiTurn();
    this.setState(() => ({ap: 1}));
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
      console.log("ap " + state.ap);
      return {items, ap: state.ap - 1};
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
    const {turn, ap, items, selected} = this.state;

    const value = {
      endTurn: this.endTurn,
      turn,
      ap,
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
