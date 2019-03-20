import React, {Component} from 'react';

class InfoPane extends Component {
  render() {
    const {x,y,type} = this.props.item;
    return <div><span>x:{x}</span><span>y:{y}</span><span>type:{type}</span></div>
  }
}

export default InfoPane;