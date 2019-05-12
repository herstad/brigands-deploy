import React, {useContext} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {getEnemyItems, getItemById, getItemsByPlayer, getSelectedItem} from "./itemsUtil";
import {ReducerDispatch} from "./App";

const isSelectedAction = (type, state) => {
  const itemAction = getItemById(state.selectedId, state.items).action;
  return itemAction && type === itemAction.type;
};

const getButtonColor = (type, state) => isSelectedAction(type, state) ? 'primary' : 'default';

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
  const color = getButtonColor('ATTACK', state);
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
  const color = getButtonColor('DEFEND', state);
  const handleDefend = () => {
    dispatch({
      type: 'DEFEND',
      payload: {
        defenderId: state.selectedId,
        areaId: areaId,
      }
    })
  };
  return (<Button color={color} onClick={handleDefend}>Defend Area {areaId}</Button>);
}

function BuildFarmButton() {
  const {state, dispatch} = useContext(ReducerDispatch);
  const selectedItem = getSelectedItem(state);
  if (selectedItem.ap < 1 || selectedItem.playerId !== state.activePlayerId) {
    return null;
  }
  const handleBuildFarm = () => {
    dispatch({
      type: 'BUILD_FARM',
      payload: {
        builderId: state.selectedId,
      }
    })
  };
  return (<Button color='default' onClick={handleBuildFarm}>Build farm</Button>);
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
        <BuildFarmButton/>
      </CardContent>
    </Card>
  </div>
}
