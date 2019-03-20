import React, {Component} from 'react';

class Orders extends Component {

  render() {
    return <div><button onClick={this.props.moveOnClick}>Move</button></div>
  }
}

export default Orders;