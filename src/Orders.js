import React, {Component} from 'react';
import BrigandContext from "./BrigandContext";

class Orders extends Component {

  render() {
    return <div>
      <BrigandContext.Consumer>
        {({addOne, count}) => {
          return (
            <button onClick={addOne}>Turn: {count}</button>
          )
        }}
      </BrigandContext.Consumer>
      <BrigandContext.Consumer>
        {({moveRight}) => {
          return (
            <button onClick={moveRight}>MoveRight</button>
          )
        }}
      </BrigandContext.Consumer>

    </div>
  }
}

export default Orders;