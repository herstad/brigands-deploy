import {generateState, PLAYERS} from "./stateGenerator";
import {
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
  switch (action.type) {
    case 'END_TURN':
      console.log(`Player ${action.payload} ended the turn`);

      return updateItems((item) => isPlayer(action.payload, item), (item) => ({
        ...item,
        ap: 1
      }), {
        ...state,
        turn: nextTurn(state.turn, state.activePlayerId),
        activePlayerId: nextPlayer(state.activePlayerId),
        winner: getWinner(state)
      });
    case 'RESTART':
      console.log('selectedId: ' + state.selectedId);
      console.log('restarting: action: ' + action.type);
      return generateState();
    case 'SET_SELECTED':
      console.log('reducer set selected' + action.payload);
      return {...state, selectedId: action.payload};
    case 'ATTACK':
      const {attackerId, targetId} = action.payload;
      const attacker = {...getItemById(attackerId, state.items), ap: 0, action};
      const target = getItemById(targetId, state.items);

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
    default:
      return state;
  }
};
