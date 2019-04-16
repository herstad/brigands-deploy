import React, {Component} from 'react';
import BrigandContext from "./BrigandContext";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {getItemById, getItemsByPlayer} from "./itemsUtil";

class Orders extends Component {

  selectedHasAp = (selectedId, items) => {
    const ap = getItemById(selectedId, items).ap;
    return ap > 0;
  };

  render() {
    return <div>
      <Card>
        <CardContent>
          <BrigandContext.Consumer>
            {({endTurn, turn}) => {
              return (
                <Button onClick={endTurn}>Turn: {turn}</Button>
              )
            }}
          </BrigandContext.Consumer>
          <BrigandContext.Consumer>
            {({moveTowardEnemy, selectedId, items}) => {
              return (this.selectedHasAp(selectedId, items) ?
                <Button onClick={moveTowardEnemy}>Move Toward Enemy</Button> : undefined)
            }}
          </BrigandContext.Consumer>
          <BrigandContext.Consumer>
            {({moveAwayFromEnemy, selectedId, items}) => {
              return (this.selectedHasAp(selectedId, items) ?
                <Button onClick={moveAwayFromEnemy}>Move Away From Enemy</Button> : undefined)
            }}
          </BrigandContext.Consumer>
          <BrigandContext.Consumer>
            {({attack, inRange, selectedId, items}) => {
              const selected = getItemById(selectedId, items);
              //TODO create a button for each attack option
              const target = getItemsByPlayer('ai', items).find((enemy) => inRange(selected, enemy));
              return (this.selectedHasAp(selectedId, items) && target ?
                <Button onClick={attack}>Attack!</Button> : undefined)
            }}
          </BrigandContext.Consumer>
        </CardContent>
      </Card>
    </div>
  }
}

export default Orders;