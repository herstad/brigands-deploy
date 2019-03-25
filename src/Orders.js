import React, {Component} from 'react';
import BrigandContext from "./BrigandContext";

class Orders extends Component {

  render() {
    return <div>
      <BrigandContext.Consumer>
        {({endTurn, turn}) => {
          return (
            <button onClick={endTurn}>Turn: {turn}</button>
          )
        }}
      </BrigandContext.Consumer>
      <BrigandContext.Consumer>
        {({moveTowardEnemy, ap}) => {
          return ((ap > 0) ? <button onClick={moveTowardEnemy}>MoveTowardEnemy</button> : undefined)
        }}
      </BrigandContext.Consumer>
      <BrigandContext.Consumer>
        {({moveAwayFromEnemy, ap}) => {
          return ((ap > 0) ?
            <button onClick={moveAwayFromEnemy}>MoveAwayFromEnemy</button> : undefined)
        }}
      </BrigandContext.Consumer>
      <BrigandContext.Consumer>
        {({attack, inRange, items, ap}) => {
          return (ap > 0 && inRange(items[0], items[1]) ?
            <button onClick={attack}>Attack!</button> : undefined)
        }}
      </BrigandContext.Consumer>
    </div>
  }
}

export default Orders;