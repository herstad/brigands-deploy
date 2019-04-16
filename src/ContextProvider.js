import React, {Component} from 'react';
import BrigandContext from './BrigandContext';
import {generateState} from './stateGenerator';
import {getItemsByPlayer, isPlayer, matchPlayer} from './itemsUtil';

export default class ContextProvider extends Component {

  state = generateState();

  restart = () => {
    this.setState(generateState());
  };

  endTurn = () => {
    this.setState((state) => {
      const winner = this.getWinner(state);
      console.log('Winner: ', winner);
      return ({turn: state.turn + 1, winner, selectedId: 0})
    });
    this.update(matchPlayer('ai'), () => ({ap: 1}));
    this.aiTurn();
    this.update(matchPlayer('human'), () => ({ap: 1}));
  };

  getWinner(state) {
    return this.isLoser('ai', state.items) ? 'human' : this.isLoser('human', state.items) ? 'ai' : undefined;
  }

  isLoser(playerId, items) {
    return getItemsByPlayer(playerId, items).every((item) => item.hp <= 0);
  };

  aiTurn = () => {
    this.update(((item, state) => !state.winner && isPlayer('human', item) && this.inRange(getItemsByPlayer('ai', state.items)[0], item)), (item) => {
      console.log('ai attack');
      return ({hp: item.hp - 1})
    });
    this.update(((item, state) => !state.winner && isPlayer('ai', item) && !this.inRange(getItemsByPlayer('human', state.items)[0], item)), (item, state) => {
      console.log('ai move');
      return this.moveFn(item, this.toward(item, this.getItemByType('x', state)));
    });
  };

  setSelected = (selectedId) => {
    console.log('setSelectedId:' + selectedId);
    this.setState({selectedId});
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
    this.update(this.matchId(0), (item, state) => this.moveFn(item, direction(state)));
    this.update(this.matchId(0), (item) => ({ap: item.ap - 1}))
  };

  attack = () => {
    this.update(this.matchId(1), (item) => {
      const hp = item.hp - 1;
      return hp > 0 ? {hp} : {hp, type: 'dead'};
    });
    this.update(this.matchId(0), (item) => ({ap: item.ap - 1}));
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

  getItemByType = (type, state) => state.items.find((item) => item.type === type);


  render() {
    const {ap, items, selectedId, turn, winner,} = this.state;

    const value = {
      ap,
      items,
      selectedId,
      turn,
      winner,
      endTurn: this.endTurn,
      moveTowardEnemy: this.moveTowardEnemy,
      moveAwayFromEnemy: this.moveAwayFromEnemy,
      attack: this.attack,
      inRange: this.inRange,
      setSelected: this.setSelected,
      restart: this.restart,
    };

    return (
      <BrigandContext.Provider value={value}>
        {this.props.children}
      </BrigandContext.Provider>
    )
  }
}
