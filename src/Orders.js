import React, {useContext} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {getItemById, getItemsByPlayer} from "./itemsUtil";
import {ReducerDispatch} from "./App";

const selectedHasAp = (selectedId, items) => {
  const ap = getItemById(selectedId, items).ap;
  return ap > 0;
};

const isSelectedAction = (type, selectedId, items) => {
  const itemAction = getItemById(selectedId, items).action;
  return itemAction && type === itemAction.type;
};

function TurnButton() {
  const {state, dispatch} = useContext(ReducerDispatch);
  const handleEndTurn = (playerId) => () => {
    getItemsByPlayer(playerId, state.items)
      .filter((item) => item.action && item.ap)
      .forEach((item) => dispatch(item.action));
    dispatch({
      type: 'END_TURN',
      payload: playerId
    })
  };
  return (
    <Button onClick={handleEndTurn('human')}>Turn: {state.turn}</Button>
  );
}

function AttackButton() {
  const {state, dispatch} = useContext(ReducerDispatch);
  if (!selectedHasAp(state.selectedId, state.items)) {
    return null;
  }
  const color = isSelectedAction('ATTACK', state.selectedId, state.items) ? 'primary' : '';
  const handleAttack = (targetId) => () => {
    dispatch({
      type: 'ATTACK',
      payload: {
        attackerId: state.selectedId,
        targetId
      }
    })
  };
  return (<Button color={color} onClick={handleAttack(getItemsByPlayer('ai', state.items)[0].id)}>Attack
    Enemy</Button>);
}

export default function Orders() {
  return <div>
    <Card>
      <CardContent>
        <TurnButton/>
        <AttackButton/>
      </CardContent>
    </Card>
  </div>
}
