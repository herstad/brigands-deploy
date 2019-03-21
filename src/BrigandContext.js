import React from 'react';

const BrigandContext = React.createContext({
  addOne(){},
  counter: 0,
  items: [],
  selected:undefined,
  setSelected(selected){},
});

export default BrigandContext;