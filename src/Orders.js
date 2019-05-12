import React, {useContext} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {getEnemyItems, getItemById, getItemsByPlayer, getSelectedItem} from "./itemsUtil";
import {ReducerDispatch} from "./App";
import {PLAYERS} from "./stateGenerator";

const isSelectedAction = (type, selectedId, items) => {
  const itemAction = getItemById(selectedId, items).action;
  return itemAction && type === itemAction.type;
};

function TurnButton() {
  const {state, dispatch} = useContext(ReducerDispatch);
  const {items, activePlayerId} = state;
  const handleEndTurn = (playerId) => () => {
    getItemsByPlayer(playerId, items)
      .filter((item) => item.action && item.ap)
      .forEach((item) => dispatch(item.action));
    dispatch({
      type: 'END_TURN',
      payload: playerId
    })
  };
  return (
    <Button onClick={handleEndTurn(activePlayerId)}>Turn({activePlayerId}): {state.turn}</Button>
  );
}

function AttackButton({targetId}) {
  const {state, dispatch} = useContext(ReducerDispatch);
  const selectedItem = getSelectedItem(state);
  if (selectedItem.ap < 1 || selectedItem.playerId !== state.activePlayerId) {
    return null;
  }
  const color = isSelectedAction('ATTACK', state.selectedId, state.items) ? 'primary' : 'default';
  const handleAttack = () => {
    dispatch({
      type: 'ATTACK',
      payload: {
        attackerId: state.selectedId,
        targetId
      }
    })
  };
  return (<Button color={color} onClick={handleAttack}>Attack Enemy</Button>);
}

function DefendButton({areaId}) {
  const {state, dispatch} = useContext(ReducerDispatch);
  const selectedItem = getSelectedItem(state);
  if (selectedItem.ap < 1 || selectedItem.playerId !== state.activePlayerId) {
    return null;
  }
  const color = isSelectedAction('DEFEND', state.selectedId, state.items) ? 'primary' : 'default';
  const handleAttack = () => {
    dispatch({
      type: 'DEFEND',
      payload: {
        defenderId: state.selectedId,
        areaId: areaId,
      }
    })
  };
  return (<Button color={color} onClick={handleAttack}>Defend Area {areaId}</Button>);
}

export default function Orders() {
  const {state} = useContext(ReducerDispatch);
  return <div>
    <Card>
      <CardContent>
        <TurnButton/>
        {
          getEnemyItems(state).map((enemy) => <AttackButton key={enemy.id} targetId={enemy.id}/>)
        }
        <DefendButton areaId={5}/>
      </CardContent>
    </Card>
  </div>
}
