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
      <button onClick={this.props.moveOnClick}>Move</button>
    </div>
  }
}

export default Orders;