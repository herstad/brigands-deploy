import {generateState, PLAYERS} from "./stateGenerator";
import {
  getEnemyItems,
  getItemById,
  getItemsByPlayer,
  inRange,
  isPlayer,
  updateItemById,
  updateItems
} from "./itemsUtil";
import {moveFn, toward} from "./movement";

const nextPlayer = (activePlayerId) => {
  const index = PLAYERS.findIndex((id) => id === activePlayerId);
  return PLAYERS[(index + 1) % PLAYERS.length];
};

const nextTurn = (turn, activePlayerId) => PLAYERS.slice(-1)[0] === activePlayerId ? turn + 1 : turn;

const printIs = (state) => state.items.map(item => console.log('item' + item.x, item.y, item.ap));

const getWinner = (state) => {
  return isLoser('ai', state.items) ? 'human' : isLoser('human', state.items) ? 'ai' : undefined;
};

const isLoser = (playerId, items) => {
  return getItemsByPlayer(playerId, items).every((item) => item.hp <= 0);
};

export default (state, action) => {
  console.log('Action type: ' + action.type);
  const {items} = state;
  const {payload} = action;
  switch (action.type) {
    case 'END_TURN': {
      console.log(`Player ${payload} ended the turn`);

      return updateItems((item) => isPlayer(payload, item), (item) => ({
        ...item,
        ap: 1
      }), {
        ...state,
        turn: nextTurn(state.turn, state.activePlayerId),
        activePlayerId: nextPlayer(state.activePlayerId),
        winner: getWinner(state)
      });
    }
    case 'RESTART': {
      return generateState();
    }
    case 'SET_SELECTED': {
      console.log('reducer set selected' + payload);
      return {...state, selectedId: payload};
    }
    case 'ATTACK': {
      const {attackerId, targetId} = payload;
      const attacker = {...getItemById(attackerId, items), ap: 0, action};
      const target = getItemById(targetId, items);

      const apConsumedState = updateItemById(attacker, state);
      console.log('Attacker: ' + attackerId + ' Target: ' + targetId);

      if (inRange(attacker, target)) {
        console.log('target in range!');
        return updateItemById({...target, hp: target.hp - 1}, apConsumedState);
      } else {
        console.log('target not in range!');
        const direction = toward(attacker, target);
        console.log('move in direction xy:' + direction.x + direction.y);
        return updateItemById(moveFn(attacker, direction), apConsumedState);
      }
    }
    case 'DEFEND': {
      const {defenderId, areaId} = payload;
      const defender = {...getItemById(defenderId, items), ap: 0, action};
      const area = getItemById(areaId, items);

      const apConsumedState = updateItemById(defender, state);
      console.log('Defend: ' + defenderId + ' Area: ' + areaId);
      const target = getEnemyItems(state).find((enemy) => inRange(defender, enemy));
      if (!!target) {
        console.log('target in range!');
        return updateItemById({...target, hp: target.hp - 1}, apConsumedState);
      } else {
        console.log('target not in range!');
        const direction = toward(defender, area);
        console.log('move in direction xy:' + direction.x + direction.y);
        return updateItemById(moveFn(defender, direction), apConsumedState);
      }
    }
    case 'BUILD_FARM': {
      const {builderId} = payload;
      const builder = getItemById(builderId, items);
      const farm = {
        id: items.length,
        builderId,
        x: builder.x,
        y: builder.y,
        type: 'farm',
      };
      return {...state, items: [...items, farm]}
    }
    default:
      return state;
  }
};
