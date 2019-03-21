import React, {Component} from 'react';
import BrigandContext from "./BrigandContext";

class InfoPane extends Component {
  render() {

    return <div>
      <BrigandContext.Consumer>
        {({selected}) => {
          if (!selected) {
            return undefined;
          }
          const {x,y,type} = selected;
          return (
            <div>
              <span>x:{x}</span><span>y:{y}</span><span>type:{type}</span>
            </div>
          )
        }}
      </BrigandContext.Consumer>
    </div>
  }

}

export default InfoPane;