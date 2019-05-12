import React, {useContext} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {getItemById, getItemsByPlayer, getSelectedItem} from "./itemsUtil";
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

export default function Orders() {
  const {state} = useContext(ReducerDispatch);
  const otherPlayers = PLAYERS.filter((player) => state.activePlayerId !== player);
  const enemyItems = otherPlayers.flatMap((otherPlayer) => getItemsByPlayer(otherPlayer, state.items));
  return <div>
    <Card>
      <CardContent>
        <TurnButton/>
        {
          enemyItems.map((enemy) => <AttackButton key={enemy.id} targetId={enemy.id}/>)
        }
      </CardContent>
    </Card>
  </div>
}
