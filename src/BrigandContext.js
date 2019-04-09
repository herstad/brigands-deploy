import React from 'react';

const BrigandContext = React.createContext({

  turn: 0,
  items: [],
  selectedId: undefined,
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