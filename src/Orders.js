import React, {useContext} from 'react';
import BrigandContext from "./BrigandContext";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {getItemById, getItemsByPlayer} from "./itemsUtil";

const selectedHasAp = (selectedId, items) => {
  const ap = getItemById(selectedId, items).ap;
  return ap > 0;
};

function TurnButton() {
  const {endTurn, turn} = useContext(BrigandContext);
  return (
    <Button onClick={endTurn}>Turn: {turn}</Button>
  );
}

function MoveTowardEnemyButton() {
  const {moveTowardEnemy, selectedId, items} = useContext(BrigandContext);
  if (!selectedHasAp(selectedId, items)) {
    return null;
  }
  return (<Button onClick={moveTowardEnemy}>Move Toward Enemy</Button>);
}

function MoveAwayFromEnemyButton() {
  const {moveAwayFromEnemy, selectedId, items} = useContext(BrigandContext);
  if (!selectedHasAp(selectedId, items)) {
    return null;
  }
  return (<Button onClick={moveAwayFromEnemy}>Move Away From Enemy</Button>);
}

function AttackButton() {
  const {attack, inRange, selectedId, items} = useContext(BrigandContext);
  const selected = getItemById(selectedId, items);
  //TODO create a button for each attack option
  const target = getItemsByPlayer('ai', items).find((enemy) => inRange(selected, enemy));
  if (!selectedHasAp(selectedId, items) || !target) {
    return null;
  }
  return (<Button onClick={attack}>Attack!</Button>);
}

export default function Orders() {
  return <div>
    <Card>
      <CardContent>
        <TurnButton/>
        <MoveTowardEnemyButton/>
        <MoveAwayFromEnemyButton/>
        <AttackButton/>
      </CardContent>
    </Card>
  </div>
}
