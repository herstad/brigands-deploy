import React from 'react';

const BrigandContext = React.createContext({

  turn: 0,
  ap: 1,
  items: [],
  selected: undefined,
  endTurn() {
  },
  setSelected(selected) {
  },
  moveTowardEnemy() {
  },
  moveAwayFromEnemy() {
  },
  attack() {
  },
  inRange() {
  },
});

export default BrigandContext;