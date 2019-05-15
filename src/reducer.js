import {generateId, generateState, PLAYERS} from "./stateGenerator";
import {
  getEnemyItems,
  getItemById,
  getItemsByPlayer,
  inRange,
  isPlayer,
  removeItemById,
  updateItemById,
  updateItems
} from "./itemsUtil";
import {move, toward} from "./movement";

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

const consumeAp = (action, state) => {
  const selectedItem = {...getItemById(action.payload.agentId, state.items), ap: 0, action};
  return updateItemById(selectedItem, state);
};

const createBuilding = (builderId, type, state) => {
  const builder = getItemById(builderId, state.items);
  const building = {
    id: generateId(),
    builderId,
    x: builder.x,
    y: builder.y,
    type,
  };
  return {...state, items: [...state.items, building]}
};

export default (state, action) => {
  console.log('Action');
  console.log(action);
  console.log(state);
  const {payload} = action;
  switch (action.type) {
    case 'END_TURN': {
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
      return {...state, selectedId: payload};
    }
    case 'ATTACK': {
      const {agentId, targetId} = payload;
      const consumedState = consumeAp(action, state);
      const attacker = getItemById(agentId, consumedState.items);
      const target = getItemById(targetId, consumedState.items);
      if (inRange(attacker, target)) {
        console.log('target in range!');
        return updateItemById({...target, hp: target.hp - 1}, consumedState);
      } else {
        console.log('target not in range!');
        return updateItemById(move(attacker, toward(target)), consumedState);
      }
    }
    case 'DEFEND': {
      const {agentId, areaId} = payload;
      const consumedState = consumeAp(action, state);
      const defender = getItemById(agentId, consumedState.items);
      const area = getItemById(areaId, consumedState.items);
      const target = getEnemyItems(state).find((enemy) => inRange(defender, enemy));
      if (!!target) {
        console.log('target in range!');
        return updateItemById({...target, hp: target.hp - 1}, consumedState);
      } else {
        console.log('target not in range!');
        return updateItemById(move(defender, toward(area)), consumedState);
      }
    }
    case 'BUILD_FARM': {
      return createBuilding(payload.agentId, 'farm', consumeAp(action, state));
    }
    case 'PLANT_CROP': {
      return createBuilding(payload.agentId, 'crop', consumeAp(action, state));
    }
    case 'HARVEST_CROP': {
      const consumedState = consumeAp(action, state);
      return {...consumedState, items: removeItemById(payload.targetId, consumedState.items),}
    }
    default:
      return state;
  }
};
