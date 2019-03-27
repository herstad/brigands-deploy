import React, {Component} from 'react';
import BrigandContext from "./BrigandContext";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

class Orders extends Component {

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
            {({moveTowardEnemy, ap}) => {
              return ((ap > 0) ?
                <Button onClick={moveTowardEnemy}>Move Toward Enemy</Button> : undefined)
            }}
          </BrigandContext.Consumer>
          <BrigandContext.Consumer>
            {({moveAwayFromEnemy, ap}) => {
              return ((ap > 0) ?
                <Button onClick={moveAwayFromEnemy}>Move Away From Enemy</Button> : undefined)
            }}
          </BrigandContext.Consumer>
          <BrigandContext.Consumer>
            {({attack, inRange, items, ap}) => {
              return (ap > 0 && inRange(items[0], items[1]) ?
                <Button onClick={attack}>Attack!</Button> : undefined)
            }}
          </BrigandContext.Consumer>
        </CardContent>
      </Card>
    </div>
  }
}

export default Orders;